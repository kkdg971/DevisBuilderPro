/*
 * Design: Expressionnisme Technique
 * - Palette sombre (bleu nuit) avec accents jaune sécurité et orange construction
 * - Formes trapézoïdales et diagonales évoquant les plans architecturaux
 * - Typographie: Rajdhani (titres), Work Sans (corps), Roboto Mono (données)
 */

import { useState } from 'react';
import { useAuth } from '@/_core/hooks/useAuth';
import { useLocation } from 'wouter';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { postesFlows } from '../flows';
import { projetsRenovationFlows } from '../flows/projets';
import { Postes, ProjetRenovation, DevisData } from '../types/questionnaire';
import { Wrench, Building2, ArrowRight, FileText, Sparkles, Badge, LogOut, User, Zap, ChevronDown } from 'lucide-react';
import { QuestionnaireModal } from '../components/QuestionnaireModal';
import { CustomDescriptionModal } from '../components/CustomDescriptionModal';
import { DevisView } from '../components/DevisView';
import DevisViewNew from '../components/DevisViewNew';
import { calculateDevisWithFormat, isNewFormat } from '../utils/devis-wrapper';
import LoginModal from '../components/LoginModal';
import { Navbar } from '../components/Navbar';

// Postes de dépose et Évacuation des Gravats
const deposeMetiersList: { id: Postes; label: string; icon: string }[] = [
  { id: 'depose_peinture', label: 'Dépose de Peinture et Papier Peint', icon: '🎨' },
  { id: 'depose_revetements_sol', label: 'Dépose de Revêtements de Sol', icon: '📐' },
  { id: 'depose_revetements_plafond', label: 'Dépose de Revêtements de Plafond', icon: '🎪' },
  { id: 'depose_electricite', label: 'Dépose d\'Electricité', icon: '⚡' },
  { id: 'depose_plomberie', label: 'Dépose de Plomberie et Sanitaires', icon: '🚰' },
  { id: 'depose_chauffage', label: 'Dépose de Chauffage', icon: '🔥' },
  { id: 'depose_vmc', label: 'Dépose de VMC/Ventilation', icon: '💨' },
  { id: 'depose_menuiseries_int', label: 'Dépose de Menuiseries Intérieures', icon: '🚪' },
  { id: 'depose_cloisons', label: 'Dépose de Cloisons/Plâtrerie', icon: '🔨' },
  { id: 'depose_isolation', label: 'Dépose d\'Isolation', icon: '🧱' },
  { id: 'depose_menuiseries_ext', label: 'Dépose de Menuiseries Extérieures', icon: '🪟' },
  { id: 'depose_toiture', label: 'Dépose de Toiture/Couverture', icon: '🏠' },
  { id: 'depose_facade', label: 'Dépose de Façade/Bardage', icon: '🎨' },
  { id: 'depose_maconnerie', label: 'Dépose de Maçonnerie', icon: '🧱' },
  { id: 'depose_fondations', label: 'Dépose de Fondations', icon: '🏛️' },
  { id: 'demolition', label: 'Démolition Générale', icon: '💥' },
  { id: 'terrassement', label: 'Terrassement/Excavation', icon: '🏗️' },
];

// Second Œuvre - Métiers de finition
const secondOeuvreList: { id: Postes; label: string; icon: string }[] = [
  { id: 'peinture', label: 'Peinture', icon: '🎨' },
  { id: 'electricite', label: 'Électricité', icon: '⚡' },
  { id: 'plomberie', label: 'Plomberie', icon: '🚰' },
  { id: 'menuiserie', label: 'Menuiserie', icon: '🪟' },
  { id: 'sols', label: 'Sols', icon: '📐' },
  { id: 'isolation', label: 'Isolation', icon: '🧱' },
  { id: 'platrerie', label: 'Plâtrerie', icon: '🔨' },
  { id: 'chauffage', label: 'Chauffage', icon: '🔥' },
  { id: 'vmc', label: 'VMC', icon: '💨' },
];

// Gros Œuvre - Structure
const grosOeuvreList: { id: Postes; label: string; icon: string }[] = [
  { id: 'maconnerie', label: 'Maçonnerie', icon: '🧱' },
  { id: 'charpente', label: 'Charpente', icon: '🪵' },
  { id: 'fondations', label: 'Fondations', icon: '🏛️' },
  { id: 'couverture', label: 'Couverture/Toiture', icon: '🏠' },
  { id: 'menuiserie_ext', label: 'Menuiserie extérieure', icon: '🪟' },
  { id: 'facade', label: 'Façade', icon: '🎨' },
  { id: 'terrassement', label: 'Terrassement', icon: '🏗️' },
  { id: 'demolition', label: 'Démolition', icon: '💥' },
];

const projetsRenovationList: { id: ProjetRenovation; label: string; icon: string }[] = [
  { id: 'appartement', label: 'Appartement', icon: '🏢' },
  { id: 'maison', label: 'Maison / Pavillon', icon: '🏠' },
  { id: 'studio', label: 'Studio', icon: '🛏️' },
  { id: 'salle-de-bain', label: 'Salle de bain', icon: '🚿' },
  { id: 'cuisine', label: 'Cuisine', icon: '🍳' },
  { id: 'extension', label: 'Extension', icon: '📏' },
  { id: 'surelevation', label: 'Surélévation', icon: '⬆️' },
  { id: 'bureaux', label: 'Bureaux', icon: '💼' },
  { id: 'commerce', label: 'Bar / Restaurant / Commerce', icon: '🏪' },
];

export default function Home() {
  // The userAuth hooks provides authentication state
  // To implement login/logout functionality, simply call logout() or redirect to getLoginUrl()
  let { user, loading, error, isAuthenticated, logout } = useAuth();
  const [, setLocation] = useLocation();

  // États pour les sections déroulables
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [expandedMetierCategory, setExpandedMetierCategory] = useState<string | null>(null);
  
  const [selectedDepose, setSelectedDepose] = useState<Postes[]>([]);
  const [selectedMetiers, setSelectedMetiers] = useState<Postes[]>([]);
  const [selectedProjet, setSelectedProjet] = useState<ProjetRenovation | null>(null);
  
  const [showQuestionnaire, setShowQuestionnaire] = useState(false);
  const [showCustomDescription, setShowCustomDescription] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [devisData, setDevisData] = useState<any>(null);

  const handleToggleSection = (section: string) => {
    setExpandedSection(expandedSection === section ? null : section);
  };

  const handleToggleMetierCategory = (category: string) => {
    setExpandedMetierCategory(expandedMetierCategory === category ? null : category);
  };

  const handleDeposeToggle = (deposeId: Postes) => {
    setSelectedDepose((prev) =>
      prev.includes(deposeId)
        ? prev.filter((id) => id !== deposeId)
        : [...prev, deposeId]
    );
  };

  const handleMetierToggle = (posteId: Postes) => {
    setSelectedMetiers((prev) =>
      prev.includes(posteId)
        ? prev.filter((id) => id !== posteId)
        : [...prev, posteId]
    );
  };

  const handleProjetToggle = (projetId: ProjetRenovation) => {
    setSelectedProjet((prev) => (prev === projetId ? null : projetId));
  };

  const handleStartQuestionnaire = () => {
    // Permettre l'accès au questionnaire sans authentification
    setShowQuestionnaire(true);
  };

  const handleStartCustomDescription = () => {
    // Ouvrir le modal de description libre
    setShowCustomDescription(true);
  };

  const handleQuestionnaireComplete = (data: DevisData) => {
    setShowQuestionnaire(false);
    
    // Traiter les données du questionnaire
    if (data.postes && data.postes.length > 0) {
      // Pour chaque métier, générer un devis
      const poste = data.postes[0]; // Prendre le premier métier
      const posteAnswers = data.answers[poste] || {};
      
      // Calculer le devis
      const devis = calculateDevisWithFormat(poste, posteAnswers);
      setDevisData(devis);
    } else if (data.poste && data.devis) {
      // Format électricité (nouveau format)
      setDevisData(data.devis);
    }
  };

  const handleCustomDescriptionComplete = (data: any) => {
    setShowCustomDescription(false);
    
    // Calculer le devis
    const devis = calculateDevisWithFormat(data);
    setDevisData(devis);
  };

  const handleResetDevis = () => {
    setDevisData(null);
    setSelectedDepose([]);
    setSelectedMetiers([]);
    setSelectedProjet(null);
  };

  // Afficher le devis si disponible
  if (devisData) {
    return (
      <>
        <Navbar />
        <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 p-6">
          <div className="max-w-6xl mx-auto">
            <Button
              variant="ghost"
              onClick={handleResetDevis}
              className="mb-6 gap-2"
            >
              <ArrowRight className="w-4 h-4 rotate-180" />
              Retour
            </Button>

            <DevisView devisData={devisData} onReset={handleResetDevis} />
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">
        {/* Contenu principal */}
        <div className="max-w-7xl mx-auto px-6 py-12">
          {/* Titre et description */}
          <div className="mb-12 text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-orange-500/10 border border-orange-500/30 mb-6">
              <Sparkles className="w-4 h-4 text-orange-400" />
              <span className="text-sm font-medium text-orange-400">Solution professionnelle pour artisans</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Générez vos devis professionnels en quelques minutes
            </h2>
            <p className="text-lg text-slate-300 max-w-2xl mx-auto">
              Outil professionnel pour les artisans et entreprises du bâtiment. Créez des devis détaillés et précis adaptés à chaque type de travaux : peinture, électricité, plomberie, menuiserie, isolation, chauffage, et bien d'autres.
            </p>
          </div>

          {/* Sections déroulables */}
          <div className="space-y-4 mb-12">
            {/* Section 1: Dépose et Évacuation des Gravats */}
            <Card className="border-2 border-slate-700 hover:border-orange-500/50 transition-colors overflow-hidden">
              <button
                onClick={() => handleToggleSection('depose')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-red-400 to-red-600 rounded-lg flex items-center justify-center">
                    <span className="text-xl">🗑️</span>
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Dépose et Évacuation des Gravats</h3>
                    {selectedDepose.length > 0 && (
                      <p className="text-sm text-orange-400">
                        {selectedDepose.length} poste{selectedDepose.length > 1 ? 's' : ''} sélectionné{selectedDepose.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-orange-400 transition-transform ${
                    expandedSection === 'depose' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'depose' && (
                <div className="px-6 pb-6 border-t border-slate-700 space-y-3">
                  {deposeMetiersList.map((poste) => (
                    <label
                      key={poste.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedDepose.includes(poste.id)
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <Checkbox
                        checked={selectedDepose.includes(poste.id)}
                        onCheckedChange={() => handleDeposeToggle(poste.id)}
                      />
                      <span className="text-2xl">{poste.icon}</span>
                      <span className="text-white font-medium flex-1">{poste.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </Card>

            {/* Section 2: Postes */}
            <Card className="border-2 border-slate-700 hover:border-orange-500/50 transition-colors overflow-hidden">
              <button
                onClick={() => handleToggleSection('poste')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-600 rounded-lg flex items-center justify-center">
                    <Wrench className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Postes</h3>
                    {selectedMetiers.length > 0 && (
                      <p className="text-sm text-orange-400">
                        {selectedMetiers.length} poste{selectedMetiers.length > 1 ? 's' : ''} sélectionné{selectedMetiers.length > 1 ? 's' : ''}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-orange-400 transition-transform ${
                    expandedSection === 'poste' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'poste' && (
                <div className="px-6 pb-6 border-t border-slate-700 space-y-4">
                  {/* Second Œuvre */}
                  <div>
                    <button
                      onClick={() => handleToggleMetierCategory('second-oeuvre')}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-600 hover:border-slate-500 hover:bg-slate-800/30 transition-colors mb-3"
                    >
                      <span className="text-white font-semibold">Second Œuvre (Finitions)</span>
                      <ChevronDown
                        className={`w-4 h-4 text-orange-400 transition-transform ${
                          expandedMetierCategory === 'second-oeuvre' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMetierCategory === 'second-oeuvre' && (
                      <div className="space-y-3 pl-3 border-l-2 border-orange-500/30">
                        {secondOeuvreList.map((poste) => (
                          <label
                            key={poste.id}
                            className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                              selectedMetiers.includes(poste.id)
                                ? 'border-orange-500 bg-orange-500/10'
                                : 'border-slate-600 hover:border-slate-500'
                            }`}
                          >
                            <Checkbox
                              checked={selectedMetiers.includes(poste.id)}
                              onCheckedChange={() => handleMetierToggle(poste.id)}
                            />
                            <span className="text-2xl">{poste.icon}</span>
                            <span className="text-white font-medium flex-1">{poste.label}</span>
                          </label>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Gros Œuvre */}
                  <div>
                    <button
                      onClick={() => handleToggleMetierCategory('gros-oeuvre')}
                      className="w-full flex items-center justify-between p-3 rounded-lg border border-slate-600 hover:border-slate-500 hover:bg-slate-800/30 transition-colors mb-3"
                    >
                      <span className="text-white font-semibold">Gros Œuvre (Structure)</span>
                      <ChevronDown
                        className={`w-4 h-4 text-orange-400 transition-transform ${
                          expandedMetierCategory === 'gros-oeuvre' ? 'rotate-180' : ''
                        }`}
                      />
                    </button>
                    {expandedMetierCategory === 'gros-oeuvre' && (
                      <div className="space-y-3 pl-3 border-l-2 border-orange-500/30">
                        {grosOeuvreList.length > 0 ? (
                          grosOeuvreList.map((poste) => (
                            <label
                              key={poste.id}
                              className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                                selectedMetiers.includes(poste.id)
                                  ? 'border-orange-500 bg-orange-500/10'
                                  : 'border-slate-600 hover:border-slate-500'
                              }`}
                            >
                              <Checkbox
                                checked={selectedMetiers.includes(poste.id)}
                                onCheckedChange={() => handleMetierToggle(poste.id)}
                              />
                              <span className="text-2xl">{poste.icon}</span>
                              <span className="text-white font-medium flex-1">{poste.label}</span>
                            </label>
                          ))
                        ) : (
                          <p className="text-slate-400 text-sm italic">Aucun métier disponible pour le moment</p>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Card>

            {/* Section 3: Type de Projet */}
            <Card className="border-2 border-slate-700 hover:border-orange-500/50 transition-colors overflow-hidden">
              <button
                onClick={() => handleToggleSection('projet')}
                className="w-full p-6 flex items-center justify-between hover:bg-slate-800/50 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-orange-600 rounded-lg flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-left">
                    <h3 className="text-xl font-bold text-white">Type de Projet</h3>
                    {selectedProjet && (
                      <p className="text-sm text-orange-400">
                        {projetsRenovationList.find(p => p.id === selectedProjet)?.label}
                      </p>
                    )}
                  </div>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-orange-400 transition-transform ${
                    expandedSection === 'projet' ? 'rotate-180' : ''
                  }`}
                />
              </button>

              {expandedSection === 'projet' && (
                <div className="px-6 pb-6 border-t border-slate-700 space-y-3">
                  {projetsRenovationList.map((projet) => (
                    <label
                      key={projet.id}
                      className={`flex items-center gap-3 p-3 rounded-lg border transition-all cursor-pointer ${
                        selectedProjet === projet.id
                          ? 'border-orange-500 bg-orange-500/10'
                          : 'border-slate-600 hover:border-slate-500'
                      }`}
                    >
                      <Checkbox
                        checked={selectedProjet === projet.id}
                        onCheckedChange={() => handleProjetToggle(projet.id)}
                      />
                      <span className="text-2xl">{projet.icon}</span>
                      <span className="text-white font-medium flex-1">{projet.label}</span>
                    </label>
                  ))}
                </div>
              )}
            </Card>
          </div>

          {/* Bouton Générer un devis */}
          <div className="text-center mb-12">
            <Button
              onClick={handleStartQuestionnaire}
              disabled={selectedDepose.length === 0 && selectedMetiers.length === 0 && selectedProjet === null}
              className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold py-3 px-8 rounded-lg gap-2 text-lg disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <FileText className="w-5 h-5" />
              Générer un devis
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>

          {/* Option alternative */}
          <div className="text-center mb-12">
            <p className="text-slate-400 mb-4">Ou décrivez vos travaux librement</p>
            <Button
              onClick={handleStartCustomDescription}
              variant="outline"
              className="gap-2 border-orange-500/50 hover:border-orange-500 text-orange-400 hover:text-orange-300"
            >
              <Sparkles className="w-4 h-4" />
              Description libre
            </Button>
          </div>

          {/* Avantages */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="p-6 border-slate-700 bg-slate-800/30">
              <div className="text-3xl mb-3">⚡</div>
              <h4 className="text-lg font-bold text-white mb-2">Rapide</h4>
              <p className="text-slate-400">Générez un devis professionnel en moins de 5 minutes</p>
            </Card>
            <Card className="p-6 border-slate-700 bg-slate-800/30">
              <div className="text-3xl mb-3">📊</div>
              <h4 className="text-lg font-bold text-white mb-2">Précis</h4>
              <p className="text-slate-400">Tarifs à jour et calculs automatiques pour plus de précision</p>
            </Card>
            <Card className="p-6 border-slate-700 bg-slate-800/30">
              <div className="text-3xl mb-3">📄</div>
              <h4 className="text-lg font-bold text-white mb-2">Professionnel</h4>
              <p className="text-slate-400">Devis formatés et prêts à envoyer à vos clients</p>
            </Card>
          </div>
        </div>

        {/* Modals */}
        {showQuestionnaire && (
          <QuestionnaireModal
            selectedMetiers={selectedMetiers}
            selectedProjet={selectedProjet}
            selectedDepose={selectedDepose}
            onComplete={handleQuestionnaireComplete}
            onClose={() => setShowQuestionnaire(false)}
          />
        )}

        {showCustomDescription && (
          <CustomDescriptionModal
            onComplete={handleCustomDescriptionComplete}
            onClose={() => setShowCustomDescription(false)}
          />
        )}

        {showLoginModal && (
          <LoginModal onClose={() => setShowLoginModal(false)} />
        )}
      </div>
    </>
  );
}