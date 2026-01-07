// Types pour le système de questionnaire générique

export type QuestionType = 'number' | 'select' | 'boolean' | 'multi-select' | 'text';

export interface QuestionOption {
  value: string;
  label: string;
}

export interface Question {
  id: string;
  type: QuestionType;
  label: string;
  description?: string;
  unit?: string; // Pour les questions numériques (m², points, etc.)
  options?: QuestionOption[]; // Pour select et multi-select
  min?: number; // Pour les questions numériques
  max?: number;
  step?: number;
  required?: boolean;
  when?: (answers: Record<string, any>) => boolean; // Condition d'affichage
}

export interface QuestionnaireFlow {
  id: string;
  name: string;
  questions: Question[];
}

export type Postes = 
  | 'peinture'
  | 'electricite'
  | 'plomberie'
  | 'menuiserie'
  | 'sols'
  | 'isolation'
  | 'platrerie'
  | 'chauffage'
  | 'vmc';

export type ProjetRenovation =
  | 'appartement'
  | 'maison'
  | 'studio'
  | 'salle-de-bain'
  | 'cuisine'
  | 'extension'
  | 'surelevation'
  | 'bureaux'
  | 'commerce';

export interface QuestionnaireAnswers {
  [key: string]: any;
}

export interface DevisData {
  projetRenovation?: ProjetRenovation;
  postes: Postes[];
  answers: {
    [key: string]: QuestionnaireAnswers;
  };
}

export interface PrixUnitaire {
  base: number; // Prix de base
  unite: string; // Unité (€/m², €/point, €/ml, etc.)
}

export interface Coefficient {
  nom: string;
  valeur: number;
  description?: string;
}

export interface LigneDevis {
  designation: string;
  quantite: number;
  unite: string;
  prixUnitaire: number;
  montantHT: number;
  coefficients?: Coefficient[];
}

export interface DevisCalcule {
  poste: string;
  lignes: LigneDevis[];
  sousTotal: number;
}

export interface DevisFinal {
  date: string;
  reference: string;
  projet?: string;
  postes: DevisCalcule[];
  totalHT: number;
  tva: number;
  totalTTC: number;
}
