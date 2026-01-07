import { useState, useEffect, useCallback } from 'react';
import { trpc } from '@/lib/trpc';

// Typage des données du devis attendues par le hook
interface DevisData {
  poste: string;
  projet: string;
  lignes: Array<{ designation: string; quantite: number; unite: string; prixUnitaire: number; [key: string]: any }>;
  answers: any; // Les réponses brutes du questionnaire
  [key: string]: any;
}

// Typage des données retournées par le hook
interface AiEnhancements {
  descriptions: Record<number, string>;
  analysis: { suggestions: string[]; alertes: string[] };
  summary: { resume: string; notes: string };
  loadingStates: {
    descriptions: boolean;
    analysis: boolean;
    summary: boolean;
  };
  regenerateDescription: (index: number) => void;
}

/**
 * Hook pour orchestrer les appels à l'IA pour enrichir un devis.
 * @param devisData - Les données complètes du devis à analyser.
 */
export function useAiEnhancements(devisData: DevisData | null): AiEnhancements {
  // Mutations tRPC pour les appels à l'IA
  const descriptionMutation = trpc.ai.generateLineDescription.useMutation();
  const analysisMutation = trpc.ai.analyzeAnswers.useMutation();
  const summaryMutation = trpc.ai.generateSummary.useMutation();

  // États pour stocker les résultats de l'IA
  const [descriptions, setDescriptions] = useState<Record<number, string>>({});
  const [analysis, setAnalysis] = useState<{ suggestions: string[]; alertes: string[] }>({ suggestions: [], alertes: [] });
  const [summary, setSummary] = useState<{ resume: string; notes: string }>({ resume: '', notes: '' });

  // Suivi des états de chargement pour chaque appel IA
  const [loadingStates, setLoadingStates] = useState({
    descriptions: false,
    analysis: false,
    summary: false,
  });

  // Fonction pour générer la description d'une ligne spécifique
  const generateDescription = useCallback(async (index: number) => {
    if (!devisData || !devisData.lignes[index]) return;

    const lineItem = devisData.lignes[index];
    const context = { poste: devisData.poste, projet: devisData.projet || 'général' };

    try {
      const result = await descriptionMutation.mutateAsync({ lineItem, context });
      if (result.success && result.description) {
        setDescriptions(prev => ({ ...prev, [index]: result.description }));
      }
    } catch (error) {
      console.error(`Erreur IA pour la ligne ${index}:`, error);
      setDescriptions(prev => ({ ...prev, [index]: 'Impossible de générer la description.' }));
    }
  }, [devisData, descriptionMutation]);

  // Effet principal pour lancer les analyses IA lorsque le devis est prêt
  useEffect(() => {
    if (!devisData) return;

    // 1. Générer les descriptions pour chaque ligne en parallèle
    const generateAllDescriptions = async () => {
      setLoadingStates(prev => ({ ...prev, descriptions: true }));
      const descriptionPromises = devisData.lignes.map((_, index) => generateDescription(index));
      await Promise.all(descriptionPromises);
      setLoadingStates(prev => ({ ...prev, descriptions: false }));
    };

    // 2. Lancer l'analyse du questionnaire
    const runAnalysis = async () => {
      setLoadingStates(prev => ({ ...prev, analysis: true }));
      try {
        const result = await analysisMutation.mutateAsync({ answers: devisData.answers, poste: devisData.poste });
        if (result.success) {
          setAnalysis(result.analysis);
        }
      } catch (error) {
        console.error('Erreur analyse IA:', error);
      }
      setLoadingStates(prev => ({ ...prev, analysis: false }));
    };

    // 3. Générer le résumé global du devis
    const runSummary = async () => {
      setLoadingStates(prev => ({ ...prev, summary: true }));
      try {
        const result = await summaryMutation.mutateAsync({ devisData });
        if (result.success) {
          setSummary(result.summary);
        }
      } catch (error) {
        console.error('Erreur résumé IA:', error);
      }
      setLoadingStates(prev => ({ ...prev, summary: false }));
    };

    // Exécuter toutes les tâches IA
    generateAllDescriptions();
    runAnalysis();
    runSummary();

  }, [devisData, generateDescription, analysisMutation, summaryMutation]);

  // Fonction pour régénérer manuellement une description
  const regenerateDescription = useCallback((index: number) => {
    generateDescription(index);
  }, [generateDescription]);

  return {
    descriptions,
    analysis,
    summary,
    loadingStates,
    regenerateDescription,
  };
}
