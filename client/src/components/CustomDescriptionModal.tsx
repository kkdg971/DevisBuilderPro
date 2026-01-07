/**
 * Composant pour la description libre avec analyse IA
 * Permet à l'utilisateur de décrire ses travaux en langage libre
 * et génère automatiquement un devis via l'IA
 */

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Loader, Send, Lightbulb, AlertTriangle, RefreshCw } from 'lucide-react';
import { trpc } from '../lib/trpc';
import { toast } from 'sonner';
import { DevisData } from '../types/questionnaire';

interface CustomDescriptionModalProps {
  onClose: () => void;
  onComplete: (data: DevisData) => void;
}

export function CustomDescriptionModal({
  onClose,
  onComplete,
}: CustomDescriptionModalProps) {
  const [description, setDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [aiAlerts, setAiAlerts] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(true);

  // tRPC mutations - Utilise menuiserie.analyzeDescription qui est public
  const analyzeMutation = trpc.menuiserie.analyzeDescription.useMutation();

  // Fonction pour analyser la description avec l'IA
  const handleAnalyzeWithAI = async () => {
    if (!description.trim()) {
      toast.error('Veuillez d\'abord décrire vos travaux');
      return;
    }

    setIsAnalyzing(true);
    try {
      // Utilise la route menuiserie.analyzeDescription qui retourne déjà suggestions et alertes
      const result = await analyzeMutation.mutateAsync({
        description: description.trim(),
      });

      console.log("Résultat de l'analyse IA :", result);

      if (result && result.items) {
        // Extraire les suggestions et alertes de la réponse
        const suggestions = result.items
          .slice(0, 2)
          .map((item: any) => `${item.designation} - ${item.quantite} ${item.unite}`);
        
        setAiSuggestions(suggestions);
        setAiAlerts([
          'Vérifier les dimensions et matériaux spécifiés',
          'Confirmer les délais et conditions de livraison'
        ]);
        
        toast.success('Analyse IA complétée !');
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
      toast.error('Veuillez décrire vos travaux');
      return;
    }

    if (description.trim().length < 20) {
      toast.error('Veuillez fournir une description plus détaillée (au moins 20 caractères)');
      return;
    }

    setIsLoading(true);

    try {
      console.log("Envoi de la description à l'IA :", description);

      // Appel tRPC pour analyser la description
      const result = await analyzeMutation.mutateAsync({
        description: description.trim(),
      });

      console.log("Résultat de l'analyse IA :", result);

      const devisData: DevisData = {
        postes: ['menuiserie'],
        answers: {
          menuiserie: {
            description: description.trim(),
          },
        },
        customAnalysis: result,
      } as any;

      onComplete(devisData);
      toast.success('Devis généré avec succès !');
      handleClose();

    } catch (error) {
      console.error("Erreur lors de l'analyse IA :", error);
      toast.error("Erreur lors de l'analyse IA");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsOpen(false);
    setDescription('');
    setAiSuggestions([]);
    setAiAlerts([]);
    onClose();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
      handleGenerate();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-2xl bg-card border-2 border-border max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">
            Décrivez vos travaux
          </DialogTitle>
          <p className="text-sm text-muted-foreground mt-2">
            Décrivez librement vos travaux. L'IA analysera votre texte
            et générera automatiquement un devis structuré.
          </p>
        </DialogHeader>

        <div className="space-y-6 py-6">
          <div className="space-y-3">
            <Label htmlFor="description" className="text-base font-medium">
              Description de vos travaux
            </Label>

            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={`Exemples :
- Pose de 3 étagères en chêne 120x30cm avec supports invisibles
- Fabrication d'un meuble TV sur mesure 180cm, bois massif
- Création d'un placard encastré avec portes coulissantes

Soyez précis : dimensions, matériaux, quantités, finitions.`}
              className="min-h-[250px] resize-none"
              disabled={isLoading || isAnalyzing}
            />

            <p className="text-xs text-muted-foreground">
              💡 Astuce : plus la description est précise, meilleur sera le devis.
            </p>
          </div>

          {/* Suggestions et Alertes IA */}
          {(aiSuggestions.length > 0 || aiAlerts.length > 0) && (
            <div className="space-y-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg border border-slate-200 dark:border-slate-700">
              {aiSuggestions.length > 0 && (
                <div>
                  <h4 className="font-semibold text-green-600 dark:text-green-400 flex items-center gap-2 mb-2">
                    <Lightbulb size={16} />
                    Éléments détectés
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

          <div className="flex gap-3 justify-end pt-6 border-t">
            <Button
              variant="outline"
              onClick={handleClose}
              disabled={isLoading || isAnalyzing}
            >
              Annuler
            </Button>

            {/* Bouton Analyser avec IA */}
            <Button
              onClick={handleAnalyzeWithAI}
              disabled={isLoading || isAnalyzing || !description.trim()}
              variant="secondary"
              className="gap-2"
            >
              {isAnalyzing ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
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
              disabled={isLoading || isAnalyzing || !description.trim()}
              className="gap-2"
            >
              {isLoading ? (
                <>
                  <Loader className="w-4 h-4 animate-spin" />
                  Génération en cours…
                </>
              ) : (
                <>
                  <Send className="w-4 h-4" />
                  Générer le devis
                </>
              )}
            </Button>
          </div>

          <div className="bg-muted/50 border rounded-lg p-4">
            <p className="text-sm text-muted-foreground">
              <strong>Fonctionnement :</strong> L'IA analyse votre texte,
              détecte les postes de travaux et génère automatiquement
              une base de devis exploitable. Utilisez "Analyser avec IA"
              pour obtenir des suggestions avant de générer le devis.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}