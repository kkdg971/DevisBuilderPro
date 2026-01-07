import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { trpc } from '@/lib/trpc';
import { useLocation } from 'wouter';
import { User, Briefcase } from 'lucide-react';

export default function RoleSelection() {
  const [, setLocation] = useLocation();
  const [selectedRole, setSelectedRole] = useState<'particulier' | 'artisan' | null>(null);
  
  const updateRoleMutation = trpc.artisan.upsertProfile.useMutation({
    onSuccess: () => {
      // Rediriger vers le dashboard approprié
      if (selectedRole === 'artisan') {
        setLocation('/artisan/profile');
      } else {
        setLocation('/');
      }
    },
  });

  const handleRoleSelect = (role: 'particulier' | 'artisan') => {
    setSelectedRole(role);
  };

  const handleConfirm = () => {
    if (!selectedRole) return;
    
    if (selectedRole === 'artisan') {
      // Créer un profil artisan vide
      updateRoleMutation.mutate({
        postes: [],
      });
    } else {
      // Rediriger directement pour les particuliers
      setLocation('/');
    }
  };

  return (
    <div className="min-h-screen bg-background text-foreground flex items-center justify-center p-4">
      <div className="max-w-4xl w-full">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Bienvenue sur <span className="text-primary">Mon Assistant Devis Travaux</span>
          </h1>
          <p className="text-xl text-muted-foreground">
            Pour commencer, sélectionnez votre profil
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          {/* Particulier */}
          <Card
            className={`p-8 border-2 transition-all duration-150 cursor-pointer hover:scale-[0.98] ${
              selectedRole === 'particulier'
                ? 'border-primary bg-primary/10'
                : 'border-border hover:border-primary'
            }`}
            onClick={() => handleRoleSelect('particulier')}
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-primary/20 border-2 border-primary rounded-full flex items-center justify-center mx-auto">
                <User className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-bold">Particulier</h2>
              <p className="text-muted-foreground">
                Je souhaite générer des devis pour mes travaux et recevoir des propositions d'artisans qualifiés
              </p>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Génération de devis automatique</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Publication aux artisans</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2" />
                  <span>Comparaison des offres</span>
                </li>
              </ul>
            </div>
          </Card>

          {/* Artisan */}
          <Card
            className={`p-8 border-2 transition-all duration-150 cursor-pointer hover:scale-[0.98] ${
              selectedRole === 'artisan'
                ? 'border-accent bg-accent/10'
                : 'border-border hover:border-accent'
            }`}
            onClick={() => handleRoleSelect('artisan')}
          >
            <div className="text-center space-y-4">
              <div className="w-20 h-20 bg-accent/20 border-2 border-accent rounded-full flex items-center justify-center mx-auto">
                <Briefcase className="w-10 h-10 text-accent" />
              </div>
              <h2 className="text-2xl font-bold">Artisan</h2>
              <p className="text-muted-foreground">
                Je suis un professionnel du bâtiment et je souhaite recevoir des demandes de devis
              </p>
              <ul className="text-sm text-left space-y-2 text-muted-foreground">
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                  <span>Accès aux demandes de devis</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                  <span>Répondre aux particuliers</span>
                </li>
                <li className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-accent rounded-full mt-2" />
                  <span>Gérer mon profil professionnel</span>
                </li>
              </ul>
            </div>
          </Card>
        </div>

        {selectedRole && (
          <div className="text-center animate-fade-in">
            <Button
              size="lg"
              onClick={handleConfirm}
              disabled={updateRoleMutation.isPending}
              className="text-lg px-8 py-6 bg-primary hover:bg-primary/90 text-primary-foreground border-2 border-primary shadow-lg hover:shadow-xl transition-all duration-150"
            >
              {updateRoleMutation.isPending ? 'Création du profil...' : 'Confirmer mon choix'}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
