export interface DevisLine {
  designation: string;
  unite: string;
  quantite: number;
  prixUnitaire: number;
  total: number;
  reference?: string; // Référence DTU/norme
}

export interface DevisSection {
  titre: string;
  lignes: DevisLine[];
  sousTotal: number;
}

export interface DevisPhase {
  titre: string;
  sections: DevisSection[];
  total: number;
}

export interface DevisStructure {
  phases: DevisPhase[];
  dureeEstimee: {
    jours: number;
    heures: number;
  };
  sousTotal: number;
  tauxTVA: number; // 5.5, 10, ou 20
  montantTVA: number;
  totalTTC: number;
}

export type TauxTVA = 5.5 | 10 | 20;

export interface TVAOption {
  taux: TauxTVA;
  label: string;
  description: string;
}

export const TVA_OPTIONS: TVAOption[] = [
  {
    taux: 20,
    label: "TVA 20%",
    description: "Taux normal - Travaux neufs"
  },
  {
    taux: 10,
    label: "TVA 10%",
    description: "Taux intermédiaire - Rénovation (logement > 2 ans)"
  },
  {
    taux: 5.5,
    label: "TVA 5,5%",
    description: "Taux réduit - Rénovation énergétique"
  }
];
