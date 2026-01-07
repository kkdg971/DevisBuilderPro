import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader2, Sparkles, FileText, Lightbulb, AlertTriangle, RefreshCw } from 'lucide-react';
import { toast } from 'sonner';
import { trpc } from '@/lib/trpc';

interface FreeDescriptionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onGenerate: (devis: any) => void;
  poste: string;
}

export function FreeDescriptionModal({
  isOpen,
  onClose,
  onGenerate,
  poste
}: FreeDescriptionModalProps) {
  const [description, setDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiAlerts, setAiAlerts] = useState<string[]>([]);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Hook tRPC pour analyser la description avec l'IA
  const analyzeDescriptionMutation = trpc.ai.generateDescription.useMutation();

  // Fonction pour analyser la description avec l'IA
  const handleAnalyzeDescription = async () => {
    if (!description.trim()) {
      toast.error('Veuillez d\'abord décrire les travaux');
      return;
    }

    setIsAnalyzing(true);
    try {
      const result = await analyzeDescriptionMutation.mutateAsync({
        prompt: `Tu es un expert en devis BTP. Analyse cette description de travaux et fournis:
1. 2-3 suggestions pour améliorer le devis (matériaux, techniques, optimisations)
2. 1-2 points d'alerte importants (risques, oublis, normes)

Description: ${description}

Réponds en JSON avec cette structure:
{
  "suggestions": ["suggestion 1", "suggestion 2"],
  "alertes": ["alerte 1", "alerte 2"]
}`
      });

      if (result.success && result.description) {
        try {
          const parsed = JSON.parse(result.description);
          setAiSuggestions(parsed.suggestions || []);
          setAiAlerts(parsed.alertes || []);
          toast.success('Analyse IA complétée !');
        } catch (e) {
          toast.error('Erreur lors du parsing de l\'analyse');
        }
      }
    } catch (error) {
      console.error('Erreur analyse IA:', error);
      toast.error('Erreur lors de l\'analyse IA');
    } finally {
      setIsAnalyzing(false);
    }
  };

  const handleGenerate = async () => {
    if (!description.trim()) {
      toast.error('Veuillez décrire les travaux à effectuer');
      return;
    }

    setIsGenerating(true);

    try {
      // Appel à l'API Manus Forge pour générer le devis
      const response = await fetch(import.meta.env.VITE_FRONTEND_FORGE_API_URL + '/chat/completions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${import.meta.env.VITE_FRONTEND_FORGE_API_KEY}`
        },
        body: JSON.stringify({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: `Tu es un expert en devis de travaux du bâtiment spécialisé en ${poste}. 
              
À partir de la description des travaux fournie par l'utilisateur, tu dois générer un devis structuré et professionnel conforme aux normes DTU françaises.

Le devis doit être au format JSON avec cette structure exacte:
{
  "poste": "${poste}",
  "reference": "DEVIS-${Date.now()}",
  "date": "${new Date().toLocaleDateString('fr-FR')}",
  "duree_estimee": "X jours",
  "phases": [
    {
      "id": "phase_1",
      "titre": "Phase préparatoire",
      "sections": [
        {
          "id": "section_1",
          "titre": "Installation de chantier",
          "lignes": [
            {
              "id": "ligne_1",
              "designation": "Description détaillée du poste",
              "unite": "U ou m² ou ml",
              "quantite": 1,
              "prix_unitaire": 50.00,
              "total_ht": 50.00,
              "reference_dtu": "DTU XX.X"
            }
          ]
        }
      ]
    }
  ],
  "taux_tva": 0.20
}

IMPORTANT:
- Inclus TOUJOURS 3 phases: "Phase préparatoire" (coltinage, stationnement, approvisionnement), "Phase travaux" (postes principaux), "Phase finitions" (nettoyage)
- Chaque ligne doit avoir une désignation professionnelle détaillée avec référence DTU
- Les prix doivent être réalistes pour le marché français 2026
- Calcule la durée estimée en fonction de l'ampleur des travaux
- Retourne UNIQUEMENT le JSON, sans texte avant ou après`
            },
            {
              role: 'user',
              content: `Génère un devis pour ces travaux de ${poste}:\n\n${description}`
            }
          ],
          temperature: 0.7,
          max_tokens: 4000
        })
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du devis');
      }

      const data = await response.json();
      const content = data.choices[0].message.content;
      
      // Extraire le JSON de la réponse
      let jsonMatch = content.match(/\{[\s\S]*\}/);
      if (!jsonMatch) {
        throw new Error('Format de réponse invalide');
      }

      const devisGenere = JSON.parse(jsonMatch[0]);

      toast.success('Devis généré avec succès !');
      onGenerate({
        poste,
        devis: devisGenere
      });
      
      setDescription('');
      setAiSuggestions([]);
      setAiAlerts([]);
      onClose();
    } catch (error) {
      console.error('Erreur génération devis:', error);
      toast.error('Erreur lors de la génération du devis. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Sparkles className="w-6 h-6 text-yellow-500" />
            Description libre - {poste}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <Label htmlFor="description" className="text-base font-semibold">
              Décrivez les travaux à effectuer
            </Label>
            <p className="text-sm text-muted-foreground">
              Soyez aussi précis que possible : surfaces, quantités, matériaux souhaités, état actuel, etc.
              L'IA analysera votre description et générera un devis détaillé conforme aux normes DTU.
            </p>
          </div>

          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder={`Exemple pour ${poste}:\n\n"Je souhaite refaire l'électricité complète d'un appartement de 80m² avec 4 pièces. Il faut installer un nouveau tableau électrique 3 rangées, créer 8 circuits de prises 16A, 6 circuits d'éclairage, installer 20 prises simples, 10 prises doubles, 15 interrupteurs simples et 5 interrupteurs doubles. Appareillage de marque Legrand. Mise aux normes NF C 15-100 avec mise à la terre."`}
            className="min-h-[300px] font-mono text-sm"
            disabled={isGenerating || isAnalyzing}
          />

          <div className="flex items-center gap-2 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
            <FileText className="w-5 h-5 text-blue-500" />
            <p className="text-sm text-blue-600 dark:text-blue-400">
              Plus votre description est détaillée, plus le devis généré sera précis et complet.
            </p>
          </div>

          {/* Suggestions et Alertes IA */}
          {(aiSuggestions.length > 0 || aiAlerts.length > 0) && (
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              {aiSuggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-2">
                    <Lightbulb size={16} />
                    Suggestions d'optimisation
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {aiSuggestions.map((s, i) => <li key={i}>{s}</li>)}
                  </ul>
                </div>
              )}

              {aiAlerts.length > 0 && (
                <div>
                  <h4 className="font-semibold text-yellow-600 dark:text-yellow-400 flex items-center gap-2 mb-2">
                    <AlertTriangle size={16} />
                    Points de vigilance
                  </h4>
                  <ul className="list-disc list-inside space-y-1 text-sm text-slate-700 dark:text-slate-300">
                    {aiAlerts.map((a, i) => <li key={i}>{a}</li>)}
                  </ul>
                </div>
              )}
            </div>
          )}

          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isGenerating || isAnalyzing}
            >
              Annuler
            </Button>

            {/* Bouton Analyser avec IA */}
            <Button
              onClick={handleAnalyzeDescription}
              disabled={isGenerating || isAnalyzing || !description.trim()}
              variant="secondary"
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  Analyse en cours...
                </>
              ) : (
                <>
                  <RefreshCw className="w-4 h-4" />
                  Analyser avec IA
                </>
              )}
            </Button>

            {/* Bouton Générer le Devis */}
            <Button
              onClick={handleGenerate}
              disabled={isGenerating || isAnalyzing || !description.trim()}
              className="bg-gradient-to-r from-yellow-500 to-orange-500 hover:from-yellow-600 hover:to-orange-600"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Génération en cours...
                </>
              ) : (
                <>
                  <Sparkles className="w-4 h-4 mr-2" />
                  Générer le devis
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
