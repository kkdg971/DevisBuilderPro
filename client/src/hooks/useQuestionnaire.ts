import { useState, useMemo } from 'react';
import { Question, QuestionnaireAnswers } from '../types/questionnaire';

export function useQuestionnaire(questions: Question[]) {
  const [answers, setAnswers] = useState<QuestionnaireAnswers>({});

  // Filtrer les questions visibles selon les conditions 'when'
  const visibleQuestions = useMemo(() => {
    return questions.filter((question) => {
      if (!question.when) return true;
      return question.when(answers);
    });
  }, [questions, answers]);

  // Mettre à jour une réponse
  const updateAnswer = (questionId: string, value: any) => {
    setAnswers((prev) => {
      const newAnswers = { ...prev, [questionId]: value };
      
      // Nettoyer les réponses des questions qui ne sont plus visibles
      const visibleIds = questions
        .filter((q) => !q.when || q.when(newAnswers))
        .map((q) => q.id);
      
      const cleanedAnswers: QuestionnaireAnswers = {};
      visibleIds.forEach((id) => {
        if (newAnswers[id] !== undefined) {
          cleanedAnswers[id] = newAnswers[id];
        }
      });
      
      return cleanedAnswers;
    });
  };

  // Réinitialiser toutes les réponses
  const resetAnswers = () => {
    setAnswers({});
  };

  // Vérifier si toutes les questions requises ont une réponse
  const isComplete = useMemo(() => {
    return visibleQuestions.every((question) => {
      if (!question.required) return true;
      const answer = answers[question.id];
      
      // Pour les multi-select, vérifier que le tableau n'est pas vide
      if (question.type === 'multi-select') {
        return Array.isArray(answer) && answer.length > 0;
      }
      
      // Pour les champs number, accepter 0 comme valeur valide
      if (question.type === 'number') {
        return answer !== undefined && answer !== null && answer !== '';
      }
      
      // Pour les autres types, vérifier que la valeur existe
      return answer !== undefined && answer !== null && answer !== '';
    });
  }, [visibleQuestions, answers]);

  return {
    answers,
    visibleQuestions,
    updateAnswer,
    resetAnswers,
    isComplete,
  };
}