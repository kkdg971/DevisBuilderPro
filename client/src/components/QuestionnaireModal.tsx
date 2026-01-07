/**
 * Modal de questionnaire - Affichage de toutes les questions à la fois
 * Design: Formulaire complet avec cases à cocher, champs à remplir, listes déroulantes
 */

import { useState, useMemo } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Postes, ProjetRenovation, DevisData } from '../types/questionnaire';
import { postesFlows } from '../flows';
import { projetsRenovationFlows } from '../flows/projets';
import { useQuestionnaire } from '../hooks/useQuestionnaire';
import { QuestionRenderer } from './QuestionRenderer';
import { ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { calculators } from '../calculators';

interface QuestionnaireModalProps {
  selectedMetiers: Postes[];
  selectedProjet: ProjetRenovation | null;
  selectedDepose?: Postes[];
  onComplete: (data: DevisData) => void;
  onClose: () => void;
}

export function QuestionnaireModal({
  selectedMetiers,
  selectedProjet,
  selectedDepose = [],
  onComplete,
  onClose,
}: QuestionnaireModalProps) {
  const [currentFlowIndex, setCurrentFlowIndex] = useState(0);
  const [allAnswers, setAllAnswers] = useState<Record<string, any>>({});

  // Construire la liste des flows à parcourir
  const flows = useMemo(() => {
    const flowsList = [];
    
    // Ajouter les flows de dépose si sélectionnés
    if (selectedDepose && selectedDepose.length > 0) {
      selectedDepose.forEach((deposeId) => {
        const deposeFlowId = `depose_${deposeId}`;
        if (postesFlows[deposeFlowId]) {
          flowsList.push(postesFlows[deposeFlowId]);
        }
      });
    }
    
    // Ajouter le projet si sélectionné
    if (selectedProjet) {
      flowsList.push(projetsRenovationFlows[selectedProjet]);
      return flowsList;
    }
    
    // Ajouter les métiers si sélectionnés
    if (selectedMetiers && selectedMetiers.length > 0) {
      selectedMetiers.forEach((posteId) => {
        if (postesFlows[posteId]) {
          flowsList.push(postesFlows[posteId]);
        }
      });
    }
    
    return flowsList;
  }, [selectedMetiers, selectedProjet, selectedDepose]);

  const currentFlow = flows[currentFlowIndex];
  const { answers, visibleQuestions, updateAnswer, isComplete } = useQuestionnaire(
    currentFlow?.questions || []
  );

  // Calculer la progression
  const progress = visibleQuestions.length > 0 
    ? (Object.keys(answers).length / visibleQuestions.length) * 100 
    : 0;

  const handleAnswer = (questionId: string, value: any) => {
    updateAnswer(questionId, value);
  };

  const handleNext = () => {
    if (currentFlowIndex < flows.length - 1) {
      // Sauvegarder les réponses du flow actuel
      setAllAnswers({
        ...allAnswers,
        [flows[currentFlowIndex].id]: answers,
      });
      setCurrentFlowIndex(currentFlowIndex + 1);
    } else {
      // Dernier flow - générer le devis
      const finalAnswers = {
        ...allAnswers,
        [flows[currentFlowIndex].id]: answers,
      };

      // Traiter les réponses pour générer les devis
      const devisResults = [];

      // Traiter les dépose
      if (selectedDepose && selectedDepose.length > 0) {
        selectedDepose.forEach((deposeId) => {
          const deposeFlowId = `depose_${deposeId}`;
          const deposeAnswers = finalAnswers[deposeFlowId] || {};
          
          // Récupérer le calculateur de dépose
          const calculator = calculators[deposeFlowId];
          if (calculator) {
            const devis = calculator(deposeAnswers);
            devisResults.push({
              poste: deposeFlowId,
              devis: devis
            });
          }
        });
      }

      // Traiter les métiers
      if (selectedMetiers && selectedMetiers.length > 0) {
        selectedMetiers.forEach((posteId) => {
          const posteAnswers = finalAnswers[posteId] || {};
          
          // Récupérer le calculateur approprié
          const calculator = calculators[posteId];
          if (calculator) {
            const devis = calculator(posteAnswers);
            devisResults.push({
              poste: posteId,
              devis: devis
            });
          }
        });
      }

      // Retourner les résultats
      onComplete({
        postes: selectedMetiers,
        answers: finalAnswers,
        devisResults: devisResults
      });
    }
  };

  const handlePrev = () => {
    if (currentFlowIndex > 0) {
      setCurrentFlowIndex(currentFlowIndex - 1);
    }
  };

  if (!flows || flows.length === 0) {
    return (
      <Dialog open={true} onOpenChange={onClose}>
        <DialogContent className="max-w-2xl bg-slate-900 border-slate-700">
          <DialogHeader>
            <DialogTitle className="text-white">Erreur</DialogTitle>
          </DialogHeader>
          <p className="text-slate-300">Aucun questionnaire sélectionné</p>
          <Button onClick={onClose} className="mt-4">
            Fermer
          </Button>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-slate-900 border-slate-700">
        <DialogHeader>
          <DialogTitle className="text-white">{currentFlow?.name || 'Questionnaire'}</DialogTitle>
        </DialogHeader>

        {/* Barre de progression */}
        <div className="space-y-2 mb-6">
          <div className="flex justify-between text-sm text-slate-400">
            <span>Progression du formulaire</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <Progress value={progress} className="h-2" />
        </div>

        {/* Formulaire avec toutes les questions */}
        <div className="space-y-6 py-6">
          {visibleQuestions && visibleQuestions.length > 0 ? (
            visibleQuestions.map((question) => (
              <div key={question.id} className="border-b border-slate-700 pb-6 last:border-b-0">
                <QuestionRenderer
                  question={question}
                  value={answers[question.id]}
                  onChange={(value) => handleAnswer(question.id, value)}
                />
              </div>
            ))
          ) : (
            <p className="text-slate-300">Chargement des questions...</p>
          )}
        </div>

        {/* Boutons de navigation */}
        <div className="flex justify-between gap-4 pt-6 border-t border-slate-700">
          <Button
            onClick={handlePrev}
            disabled={currentFlowIndex === 0}
            variant="outline"
            className="border-slate-600 text-slate-300 hover:text-white"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          {currentFlowIndex < flows.length - 1 ? (
            <Button
              onClick={handleNext}
              disabled={!isComplete}
              className="bg-orange-500 hover:bg-orange-600 text-white"
            >
              Suivant
              <ArrowRight className="w-4 h-4 ml-2" />
            </Button>
          ) : (
            <Button
              onClick={handleNext}
              disabled={!isComplete}
              className="bg-green-600 hover:bg-green-700 text-white"
            >
              <Check className="w-4 h-4 mr-2" />
              Générer le devis
            </Button>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
