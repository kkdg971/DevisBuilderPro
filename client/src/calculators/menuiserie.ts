/**
 * Calculateur de prix pour la menuiserie
 * Basé sur les réponses du questionnaire
 */

interface MenuiserieAnswers {
  // Portes intérieures
  nb_portes_interieures?: number;
  type_portes_interieures?: string;

  // Escalier
  escalier?: boolean;
  type_escalier?: string;
  nb_marches?: number;

  // Placards
  placards?: boolean;
  type_placards?: string;
  surface_placards?: number;

  // Plinthes
  ml_plinthes?: number;

  // Fenêtres
  nb_fenetres?: number;
  type_fenetres?: string;
  fenetres_dimensions?: string[];
  nb_fenetres_petit?: number;
  nb_fenetres_moyen?: number;
  nb_fenetres_grand?: number;
  nb_fenetres_tres_grand?: number;
  type_vitrage?: string;
  type_ouverture?: string;

  // Portes extérieures
  portes_exterieures?: boolean;
  nb_portes_exterieures?: number;
  type_portes_exterieures?: string;

  // Volets
  volets?: boolean;
  type_volets?: string;
  nb_volets?: number;

  // Terrasse
  terrasse_pergola?: boolean;
  type_terrasse?: string;
  surface_terrasse?: number;

  // Travaux additionnels
  depose_ancien?: boolean;
  travaux_maconnerie?: boolean;
  finitions?: string[];
  urgence?: string;
}

interface PrixFenetre {
  min: number;
  max: number;
  label: string;
}

// ============ TARIFS DE BASE (FOURCHETTE HAUTE) ============

// Prix par fenêtre selon matériau et vitrage
const prixFenetreParMateriau: Record<string, Record<string, PrixFenetre>> = {
  pvc: {
    simple: { min: 150, max: 250, label: 'Simple vitrage PVC' },
    double_standard: { min: 250, max: 400, label: 'Double vitrage standard PVC' },
    double_renforce: { min: 350, max: 500, label: 'Double vitrage renforcé PVC' },
    double_phonique: { min: 400, max: 600, label: 'Double vitrage phonique PVC' },
    triple: { min: 600, max: 900, label: 'Triple vitrage PVC' },
  },
  alu: {
    simple: { min: 200, max: 350, label: 'Simple vitrage Alu' },
    double_standard: { min: 350, max: 550, label: 'Double vitrage standard Alu' },
    double_renforce: { min: 500, max: 750, label: 'Double vitrage renforcé Alu' },
    double_phonique: { min: 600, max: 900, label: 'Double vitrage phonique Alu' },
    triple: { min: 900, max: 1300, label: 'Triple vitrage Alu' },
  },
  bois: {
    simple: { min: 300, max: 500, label: 'Simple vitrage Bois' },
    double_standard: { min: 500, max: 800, label: 'Double vitrage standard Bois' },
    double_renforce: { min: 700, max: 1100, label: 'Double vitrage renforcé Bois' },
    double_phonique: { min: 800, max: 1300, label: 'Double vitrage phonique Bois' },
    triple: { min: 1200, max: 1800, label: 'Triple vitrage Bois' },
  },
  mixte: {
    simple: { min: 350, max: 600, label: 'Simple vitrage Mixte' },
    double_standard: { min: 600, max: 950, label: 'Double vitrage standard Mixte' },
    double_renforce: { min: 800, max: 1300, label: 'Double vitrage renforcé Mixte' },
    double_phonique: { min: 950, max: 1500, label: 'Double vitrage phonique Mixte' },
    triple: { min: 1400, max: 2100, label: 'Triple vitrage Mixte' },
  },
};

// Multiplicateurs selon la dimension
const multiplicateurDimension: Record<string, number> = {
  petit: 1.0,      // < 1m x 1m
  moyen: 1.3,      // 1m à 1.5m
  grand: 1.6,      // 1.5m à 2m
  tres_grand: 2.0, // > 2m
};

// Prix portes intérieures
const prixPortesInterieures: Record<string, PrixFenetre> = {
  isoplane: { min: 80, max: 150, label: 'Porte isoplane' },
  postformee: { min: 120, max: 200, label: 'Porte postformée' },
  vitree: { min: 150, max: 250, label: 'Porte vitrée' },
  bois_massif: { min: 250, max: 450, label: 'Porte bois massif' },
  coulissante: { min: 200, max: 350, label: 'Porte coulissante' },
};

// Prix escaliers (par marche)
const prixEscalier: Record<string, PrixFenetre> = {
  bois_massif: { min: 150, max: 250, label: 'Marche bois massif' },
  bois_stratifie: { min: 80, max: 150, label: 'Marche bois stratifié' },
  metal_bois: { min: 120, max: 200, label: 'Marche métal/bois' },
  renovation: { min: 50, max: 100, label: 'Rénovation marche' },
};

// Prix placards (par m²)
const prixPlacards: Record<string, PrixFenetre> = {
  portes_battantes: { min: 200, max: 350, label: 'Placard portes battantes/m²' },
  portes_coulissantes: { min: 250, max: 400, label: 'Placard portes coulissantes/m²' },
  portes_pliantes: { min: 300, max: 500, label: 'Placard portes pliantes/m²' },
  dressing: { min: 400, max: 700, label: 'Dressing complet/m²' },
};

// Prix portes extérieures
const prixPortesExterieures: Record<string, PrixFenetre> = {
  entree: { min: 500, max: 1000, label: 'Porte d\'entrée' },
  patio: { min: 800, max: 1500, label: 'Porte patio 2 vantaux' },
  baie_coulissante: { min: 1000, max: 1800, label: 'Baie coulissante' },
  baie_galandage: { min: 1500, max: 2500, label: 'Baie galandage' },
};

// Prix volets
const prixVolets: Record<string, PrixFenetre> = {
  battants: { min: 150, max: 300, label: 'Volet battant' },
  roulants: { min: 300, max: 600, label: 'Volet roulant' },
  coulissants: { min: 250, max: 500, label: 'Volet coulissant' },
  stores: { min: 200, max: 400, label: 'Store extérieur' },
};

// Prix terrasse/pergola (par m²)
const prixTerrasse: Record<string, PrixFenetre> = {
  terrasse_bois: { min: 100, max: 200, label: 'Terrasse bois/m²' },
  pergola: { min: 150, max: 300, label: 'Pergola/m²' },
  auvent: { min: 200, max: 400, label: 'Auvent/m²' },
  carport: { min: 250, max: 500, label: 'Carport/m²' },
};

// ============ FONCTION DE CALCUL ============

export function calculerPrixMenuiserie(answers: MenuiserieAnswers) {
  let prixMin = 0;
  let prixMax = 0;
  const details: string[] = [];

  // ============ MENUISERIE INTÉRIEURE ============

  // Portes intérieures
  if ((answers.nb_portes_interieures || 0) > 0 && answers.type_portes_interieures) {
    const prix = prixPortesInterieures[answers.type_portes_interieures];
    if (prix) {
      const total = answers.nb_portes_interieures * prix.min;
      const totalMax = answers.nb_portes_interieures * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`${answers.nb_portes_interieures} ${prix.label}: ${total}€ - ${totalMax}€`);
    }
  }

  // Escaliers
  if (answers.escalier && answers.type_escalier && answers.nb_marches) {
    const prix = prixEscalier[answers.type_escalier];
    if (prix) {
      const total = answers.nb_marches * prix.min;
      const totalMax = answers.nb_marches * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`Escalier ${answers.nb_marches} marches: ${total}€ - ${totalMax}€`);
    }
  }

  // Placards
  if (answers.placards && answers.type_placards && answers.surface_placards) {
    const prix = prixPlacards[answers.type_placards];
    if (prix) {
      const total = answers.surface_placards * prix.min;
      const totalMax = answers.surface_placards * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`Placards ${answers.surface_placards}m²: ${total}€ - ${totalMax}€`);
    }
  }

  // Plinthes (par ml)
  if ((answers.ml_plinthes || 0) > 0) {
    const prixParML = 15; // 15€/ml min
    const prixParMLMax = 30; // 30€/ml max
    const total = answers.ml_plinthes * prixParML;
    const totalMax = answers.ml_plinthes * prixParMLMax;
    prixMin += total;
    prixMax += totalMax;
    details.push(`Plinthes ${answers.ml_plinthes}ml: ${total}€ - ${totalMax}€`);
  }

  // ============ MENUISERIE EXTÉRIEURE - FENÊTRES ============

  if ((answers.nb_fenetres || 0) > 0 && answers.type_fenetres && answers.type_vitrage) {
    const prixFenetre = prixFenetreParMateriau[answers.type_fenetres]?.[answers.type_vitrage];
    
    if (prixFenetre) {
      let totalFenetres = 0;
      let totalFenetresMax = 0;

      // Calculer par dimension
      if (answers.nb_fenetres_petit && answers.nb_fenetres_petit > 0) {
        const mult = multiplicateurDimension['petit'];
        const prixAjuste = prixFenetre.min * mult;
        const prixAjusteMax = prixFenetre.max * mult;
        totalFenetres += answers.nb_fenetres_petit * prixAjuste;
        totalFenetresMax += answers.nb_fenetres_petit * prixAjusteMax;
        details.push(`${answers.nb_fenetres_petit} fenêtres petit format: ${answers.nb_fenetres_petit * prixAjuste}€ - ${answers.nb_fenetres_petit * prixAjusteMax}€`);
      }

      if (answers.nb_fenetres_moyen && answers.nb_fenetres_moyen > 0) {
        const mult = multiplicateurDimension['moyen'];
        const prixAjuste = prixFenetre.min * mult;
        const prixAjusteMax = prixFenetre.max * mult;
        totalFenetres += answers.nb_fenetres_moyen * prixAjuste;
        totalFenetresMax += answers.nb_fenetres_moyen * prixAjusteMax;
        details.push(`${answers.nb_fenetres_moyen} fenêtres moyen format: ${answers.nb_fenetres_moyen * prixAjuste}€ - ${answers.nb_fenetres_moyen * prixAjusteMax}€`);
      }

      if (answers.nb_fenetres_grand && answers.nb_fenetres_grand > 0) {
        const mult = multiplicateurDimension['grand'];
        const prixAjuste = prixFenetre.min * mult;
        const prixAjusteMax = prixFenetre.max * mult;
        totalFenetres += answers.nb_fenetres_grand * prixAjuste;
        totalFenetresMax += answers.nb_fenetres_grand * prixAjusteMax;
        details.push(`${answers.nb_fenetres_grand} fenêtres grand format: ${answers.nb_fenetres_grand * prixAjuste}€ - ${answers.nb_fenetres_grand * prixAjusteMax}€`);
      }

      if (answers.nb_fenetres_tres_grand && answers.nb_fenetres_tres_grand > 0) {
        const mult = multiplicateurDimension['tres_grand'];
        const prixAjuste = prixFenetre.min * mult;
        const prixAjusteMax = prixFenetre.max * mult;
        totalFenetres += answers.nb_fenetres_tres_grand * prixAjuste;
        totalFenetresMax += answers.nb_fenetres_tres_grand * prixAjusteMax;
        details.push(`${answers.nb_fenetres_tres_grand} fenêtres très grand format: ${answers.nb_fenetres_tres_grand * prixAjuste}€ - ${answers.nb_fenetres_tres_grand * prixAjusteMax}€`);
      }

      prixMin += totalFenetres;
      prixMax += totalFenetresMax;
    }
  }

  // Portes extérieures
  if (answers.portes_exterieures && answers.type_portes_exterieures && answers.nb_portes_exterieures) {
    const prix = prixPortesExterieures[answers.type_portes_exterieures];
    if (prix) {
      const total = answers.nb_portes_exterieures * prix.min;
      const totalMax = answers.nb_portes_exterieures * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`${answers.nb_portes_exterieures} ${prix.label}: ${total}€ - ${totalMax}€`);
    }
  }

  // Volets
  if (answers.volets && answers.type_volets && answers.nb_volets) {
    const prix = prixVolets[answers.type_volets];
    if (prix) {
      const total = answers.nb_volets * prix.min;
      const totalMax = answers.nb_volets * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`${answers.nb_volets} ${prix.label}: ${total}€ - ${totalMax}€`);
    }
  }

  // Terrasse/Pergola
  if (answers.terrasse_pergola && answers.type_terrasse && answers.surface_terrasse) {
    const prix = prixTerrasse[answers.type_terrasse];
    if (prix) {
      const total = answers.surface_terrasse * prix.min;
      const totalMax = answers.surface_terrasse * prix.max;
      prixMin += total;
      prixMax += totalMax;
      details.push(`${answers.type_terrasse} ${answers.surface_terrasse}m²: ${total}€ - ${totalMax}€`);
    }
  }

  // ============ TRAVAUX ADDITIONNELS ============

  // Dépose de l'ancien
  if (answers.depose_ancien) {
    const depose = 300; // 300€ min
    const deposeMax = 800; // 800€ max
    prixMin += depose;
    prixMax += deposeMax;
    details.push(`Dépose de l'ancien: ${depose}€ - ${deposeMax}€`);
  }

  // Travaux de maçonnerie
  if (answers.travaux_maconnerie) {
    const macon = 500; // 500€ min
    const maconMax = 1500; // 1500€ max
    prixMin += macon;
    prixMax += maconMax;
    details.push(`Travaux de maçonnerie: ${macon}€ - ${maconMax}€`);
  }

  // Finitions
  if (answers.finitions && answers.finitions.length > 0) {
    const prixParFinition = 100;
    const prixParFinitionMax = 250;
    const totalFinitions = answers.finitions.length * prixParFinition;
    const totalFinitionsMax = answers.finitions.length * prixParFinitionMax;
    prixMin += totalFinitions;
    prixMax += totalFinitionsMax;
    details.push(`Finitions (${answers.finitions.length}): ${totalFinitions}€ - ${totalFinitionsMax}€`);
  }

  // Urgence (surcoût)
  if (answers.urgence === 'rapide') {
    const surcoût = Math.round(prixMax * 0.15); // +15%
    prixMax += surcoût;
    details.push(`Surcoût urgence rapide: +${surcoût}€`);
  } else if (answers.urgence === 'urgent') {
    const surcoût = Math.round(prixMax * 0.30); // +30%
    prixMax += surcoût;
    details.push(`Surcoût urgence: +${surcoût}€`);
  }

  // Arrondir à la dizaine supérieure
  prixMin = Math.ceil(prixMin / 10) * 10;
  prixMax = Math.ceil(prixMax / 10) * 10;

  return {
    prixMin,
    prixMax,
    details,
    fourchette: `${prixMin}€ - ${prixMax}€`,
  };
}