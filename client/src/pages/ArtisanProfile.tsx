import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { toast } from 'sonner';
import { ArrowLeft, Save } from 'lucide-react';

const postesList = [
  { id: 'peinture', label: 'Peinture' },
  { id: 'electricite', label: 'Électricité' },
  { id: 'plomberie', label: 'Plomberie' },
  { id: 'menuiserie', label: 'Menuiserie' },
  { id: 'sols', label: 'Sols' },
  { id: 'isolation', label: 'Isolation' },
  { id: 'platrerie', label: 'Plâtrerie' },
  { id: 'chauffage', label: 'Chauffage' },
  { id: 'vmc', label: 'VMC' },
];

export default function ArtisanProfile() {
  const [, setLocation] = useLocation();
  const { data: profile, isLoading } = trpc.artisan.getMyProfile.useQuery();
  
  const [formData, setFormData] = useState({
    entreprise: '',
    siret: '',
    telephone: '',
    adresse: '',
    codePostal: '',
    ville: '',
    postes: [] as string[],
    zoneIntervention: [] as string[],
    description: '',
    siteWeb: '',
  });

  useEffect(() => {
    if (profile) {
      setFormData({
        entreprise: profile.entreprise || '',
        siret: profile.siret || '',
        telephone: profile.telephone || '',
        adresse: profile.adresse || '',
        codePostal: profile.codePostal || '',
        ville: profile.ville || '',
        postes: profile.postes || [],
        zoneIntervention: profile.zoneIntervention || [],
        description: profile.description || '',
        siteWeb: profile.siteWeb || '',
      });
    }
  }, [profile]);

  const updateProfileMutation = trpc.artisan.upsertProfile.useMutation({
    onSuccess: () => {
      toast.success('Profil mis à jour avec succès');
      setLocation('/artisan/dashboard');
    },
    onError: (error) => {
      toast.error(`Erreur: ${error.message}`);
    },
  });

  const handleMetierToggle = (posteId: string) => {
    setFormData((prev) => ({
      ...prev,
      postes: prev.postes.includes(posteId)
        ? prev.postes.filter((id) => id !== posteId)
        : [...prev.postes, posteId],
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.postes.length === 0) {
      toast.error('Veuillez sélectionner au moins un corps de métier');
      return;
    }

    updateProfileMutation.mutate(formData);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Chargement...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background text-foreground">
      <div className="container py-12">
        <div className="max-w-3xl mx-auto">
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setLocation('/artisan/dashboard')}
              className="mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Retour au tableau de bord
            </Button>
            <h1 className="text-4xl font-bold mb-2">Mon Profil Artisan</h1>
            <p className="text-muted-foreground">
              Complétez votre profil pour recevoir des demandes de devis adaptées
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Informations entreprise */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Informations entreprise</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="entreprise">Nom de l'entreprise</Label>
                  <Input
                    id="entreprise"
                    value={formData.entreprise}
                    onChange={(e) => setFormData({ ...formData, entreprise: e.target.value })}
                    placeholder="Ex: Entreprise Dupont"
                  />
                </div>
                <div>
                  <Label htmlFor="siret">SIRET</Label>
                  <Input
                    id="siret"
                    value={formData.siret}
                    onChange={(e) => setFormData({ ...formData, siret: e.target.value })}
                    placeholder="14 chiffres"
                    maxLength={14}
                  />
                </div>
                <div>
                  <Label htmlFor="telephone">Téléphone</Label>
                  <Input
                    id="telephone"
                    type="tel"
                    value={formData.telephone}
                    onChange={(e) => setFormData({ ...formData, telephone: e.target.value })}
                    placeholder="06 12 34 56 78"
                  />
                </div>
                <div>
                  <Label htmlFor="siteWeb">Site web (optionnel)</Label>
                  <Input
                    id="siteWeb"
                    type="url"
                    value={formData.siteWeb}
                    onChange={(e) => setFormData({ ...formData, siteWeb: e.target.value })}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </Card>

            {/* Adresse */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Adresse</h2>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="adresse">Adresse complète</Label>
                  <Input
                    id="adresse"
                    value={formData.adresse}
                    onChange={(e) => setFormData({ ...formData, adresse: e.target.value })}
                    placeholder="123 rue de la République"
                  />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="codePostal">Code postal</Label>
                    <Input
                      id="codePostal"
                      value={formData.codePostal}
                      onChange={(e) => setFormData({ ...formData, codePostal: e.target.value })}
                      placeholder="75001"
                      maxLength={5}
                    />
                  </div>
                  <div>
                    <Label htmlFor="ville">Ville</Label>
                    <Input
                      id="ville"
                      value={formData.ville}
                      onChange={(e) => setFormData({ ...formData, ville: e.target.value })}
                      placeholder="Paris"
                    />
                  </div>
                </div>
              </div>
            </Card>

            {/* Postes */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Postes *</h2>
              <p className="text-sm text-muted-foreground mb-4">
                Sélectionnez les métiers que vous pratiquez
              </p>
              <div className="grid md:grid-cols-3 gap-3">
                {postesList.map((poste) => (
                  <div
                    key={poste.id}
                    className={`p-3 border-2 rounded-lg cursor-pointer transition-all ${
                      formData.postes.includes(poste.id)
                        ? 'border-primary bg-primary/10'
                        : 'border-border hover:border-primary'
                    }`}
                    onClick={() => handleMetierToggle(poste.id)}
                  >
                    <div className="flex items-center gap-2">
                      <Checkbox checked={formData.postes.includes(poste.id)} />
                      <span className="text-sm font-medium">{poste.label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Description */}
            <Card className="p-6">
              <h2 className="text-2xl font-bold mb-6">Description</h2>
              <Label htmlFor="description">Présentez votre entreprise et vos compétences</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Ex: Entreprise familiale depuis 20 ans, spécialisée dans la rénovation..."
                rows={5}
                className="mt-2"
              />
            </Card>

            {/* Bouton de soumission */}
            <div className="flex justify-end gap-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => setLocation('/artisan/dashboard')}
              >
                Annuler
              </Button>
              <Button
                type="submit"
                disabled={updateProfileMutation.isPending}
                className="bg-primary hover:bg-primary/90"
              >
                <Save className="w-4 h-4 mr-2" />
                {updateProfileMutation.isPending ? 'Enregistrement...' : 'Enregistrer'}
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
