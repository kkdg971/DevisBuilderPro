import type { DevisCalcule, QuestionnaireAnswers } from '../types/questionnaire';
import type { DevisStructure } from '../types/devis';
import { calculators } from '../calculators';

export type DevisResult = DevisCalcule | DevisStructure;

export function isNewFormat(devis: DevisResult): devis is DevisStructure {
  return 'phases' in devis && 'dureeEstimee' in devis;
}

export function calculateDevisWithFormat(poste: string, answers: Record<string, any>): DevisResult {
  // Récupérer le calculateur correspondant au métier
  const calculator = calculators[poste];
  
  if (!calculator) {
    // Si pas de calculateur trouvé, retourner un devis vide
    console.warn(`Pas de calculateur trouvé pour le métier: ${poste}`);
    return {
      poste: poste.charAt(0).toUpperCase() + poste.slice(1),
      lignes: [],
      sousTotal: 0
    };
  }
  
  // Utiliser le calculateur pour générer le devis
  try {
    const devis = calculator(answers as QuestionnaireAnswers);
    return devis;
  } catch (error) {
    console.error(`Erreur lors du calcul du devis pour ${poste}:`, error);
    return {
      poste: poste.charAt(0).toUpperCase() + poste.slice(1),
      lignes: [],
      sousTotal: 0
    };
  }
}