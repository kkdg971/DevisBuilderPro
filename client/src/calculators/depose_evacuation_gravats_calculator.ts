import { QuoteCalculation, QuoteLine } from '@/types/quote';

/**
 * Calculateur : Dépose et Évacuation des Gravats
 * 
 * Tarifs 2024-2025 basés sur les standards du marché français
 * TVA incluse dans les calculs
 */

interface DeposeAnswers {
  poste_depose?: string;
  // Électricité
  depose_electricite_type?: string;
  depose_electricite_surface?: number;
  // Plomberie
  depose_plomberie_type?: string;
  depose_plomberie_longueur?: number;
  // Sols
  depose_sols_type?: string;
  depose_sols_surface?: number;
  depose_sols_difficulte?: string;
  // Menuiserie
  depose_menuiserie_type?: string;
  depose_menuiserie_quantite?: number;
  // Isolation
  depose_isolation_type?: string;
  depose_isolation_surface?: number;
  // Chauffage
  depose_chauffage_type?: string;
  depose_chauffage_quantite?: number;
  // Peinture
  depose_peinture_type?: string;
  depose_peinture_surface?: number;
  // Plâtrerie
  depose_platrerie_type?: string;
  depose_platrerie_surface?: number;
  // VMC
  depose_vmc_type?: string;
  depose_vmc_longueur?: number;
  // Questions communes
  difficulte_depose_generale?: string;
  evacuation_dechets?: string;
  volume_gravats_estime?: number;
  acces_difficile_depose?: string;
  urgence_depose?: string;
  notes_depose?: string;
}

/**
 * Tarifs de dépose par métier (HT en €)
 * Basés sur les tarifs du marché français 2024-2025
 */
const TARIFS_DEPOSE = {
  electricite: {
    partielle: { base: 150, par_ml: 2.5 }, // Dépose partielle + 2.50€/ml
    complete: { base: 300, par_ml: 2.5 }, // Dépose complète + 2.50€/ml
    tableau_seul: { base: 200, par_ml: 0 } // Tableau uniquement
  },
  plomberie: {
    tuyauterie: { base: 100, par_ml: 3 }, // Tuyauterie + 3€/ml
    sanitaires: { base: 150, par_piece: 80 }, // Sanitaires 80€ pièce
    complete: { base: 250, par_ml: 3 }, // Complète + 3€/ml
    baignoire_douche: { base: 150, par_piece: 150 } // Baignoire/douche 150€
  },
  sols: {
    carrelage: { base: 50, par_m2: 15 }, // Carrelage 15€/m²
    parquet: { base: 50, par_m2: 12 }, // Parquet 12€/m²
    vinyle: { base: 30, par_m2: 8 }, // Vinyle 8€/m²
    moquette: { base: 30, par_m2: 6 }, // Moquette 6€/m²
    mixte: { base: 60, par_m2: 12 } // Mixte 12€/m²
  },
  menuiserie: {
    portes: { base: 50, par_piece: 60 }, // Portes 60€ pièce
    fenetres: { base: 50, par_piece: 80 }, // Fenêtres 80€ pièce
    volets: { base: 40, par_piece: 40 }, // Volets 40€ pièce
    mixte: { base: 80, par_piece: 70 } // Mixte 70€ pièce
  },
  isolation: {
    combles: { base: 100, par_m2: 5 }, // Combles 5€/m²
    murs: { base: 150, par_m2: 8 }, // Murs 8€/m²
    toiture: { base: 200, par_m2: 10 }, // Toiture 10€/m²
    complete: { base: 300, par_m2: 7 } // Complète 7€/m²
  },
  chauffage: {
    radiateurs: { base: 100, par_piece: 50 }, // Radiateurs 50€ pièce
    chaudiere: { base: 300, par_piece: 0 }, // Chaudière 300€ forfait
    tuyauterie: { base: 100, par_ml: 4 }, // Tuyauterie 4€/ml
    complete: { base: 500, par_piece: 50 } // Complète (radiateurs) + 500€ forfait
  },
  peinture: {
    decapage: { base: 50, par_m2: 8 }, // Décapage 8€/m²
    papier_peint: { base: 30, par_m2: 5 }, // Papier peint 5€/m²
    mixte: { base: 60, par_m2: 7 } // Mixte 7€/m²
  },
  platrerie: {
    cloisons: { base: 80, par_m2: 10 }, // Cloisons 10€/m²
    plafonds: { base: 100, par_m2: 12 }, // Plafonds 12€/m²
    mixte: { base: 150, par_m2: 11 } // Mixte 11€/m²
  },
  vmc: {
    groupe: { base: 100, par_piece: 0 }, // Groupe 100€ forfait
    gaines: { base: 80, par_ml: 2.5 }, // Gaines 2.50€/ml
    bouches: { base: 50, par_piece: 20 }, // Bouches 20€ pièce
    complete: { base: 200, par_ml: 2.5 } // Complète + 2.50€/ml gaines
  }
};

/**
 * Tarifs d'évacuation des gravats
 */
const TARIFS_EVACUATION = {
  // Par m³ de gravats
  par_m3: 45, // 45€/m³ pour mise en déchetterie
  // Location benne
  location_benne_petit: 250, // Benne 3-5 m³
  location_benne_moyen: 400, // Benne 6-10 m³
  location_benne_grand: 600, // Benne 10-15 m³
  // Surcharge accès difficile
  surcharge_acces_difficile: 50 // +50€ si accès difficile
};

/**
 * Majorations selon la difficulté
 */
const MAJORATIONS_DIFFICULTE = {
  facile: 0, // 0%
  moyen: 0.15, // +15%
  difficile: 0.35, // +35%
  tres_difficile: 0.65 // +65%
};

/**
 * Majorations selon l'urgence
 */
const MAJORATIONS_URGENCE = {
  normal: 0, // 0%
  rapide: 0.20, // +20%
  urgent: 0.40 // +40%
};

/**
 * Calcule le coût de dépose selon le métier
 */
function calculerCoutDepose(
  poste: string,
  type: string,
  answers: DeposeAnswers
): number {
  let cout = 0;

  switch (poste) {
    case 'electricite': {
      const tarif = TARIFS_DEPOSE.electricite[type as keyof typeof TARIFS_DEPOSE.electricite];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_electricite_surface) {
          cout += answers.depose_electricite_surface * (tarif.par_ml || 0);
        }
      }
      break;
    }

    case 'plomberie': {
      const tarif = TARIFS_DEPOSE.plomberie[type as keyof typeof TARIFS_DEPOSE.plomberie];
      if (tarif) {
        cout = tarif.base;
        if ('par_ml' in tarif && answers.depose_plomberie_longueur) {
          cout += answers.depose_plomberie_longueur * tarif.par_ml;
        }
      }
      break;
    }

    case 'sols': {
      const tarif = TARIFS_DEPOSE.sols[type as keyof typeof TARIFS_DEPOSE.sols];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_sols_surface) {
          cout += answers.depose_sols_surface * tarif.par_m2;
        }
      }
      break;
    }

    case 'menuiserie': {
      const tarif = TARIFS_DEPOSE.menuiserie[type as keyof typeof TARIFS_DEPOSE.menuiserie];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_menuiserie_quantite) {
          cout += answers.depose_menuiserie_quantite * tarif.par_piece;
        }
      }
      break;
    }

    case 'isolation': {
      const tarif = TARIFS_DEPOSE.isolation[type as keyof typeof TARIFS_DEPOSE.isolation];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_isolation_surface) {
          cout += answers.depose_isolation_surface * tarif.par_m2;
        }
      }
      break;
    }

    case 'chauffage': {
      const tarif = TARIFS_DEPOSE.chauffage[type as keyof typeof TARIFS_DEPOSE.chauffage];
      if (tarif) {
        cout = tarif.base;
        if ('par_piece' in tarif && answers.depose_chauffage_quantite) {
          cout += answers.depose_chauffage_quantite * tarif.par_piece;
        }
      }
      break;
    }

    case 'peinture': {
      const tarif = TARIFS_DEPOSE.peinture[type as keyof typeof TARIFS_DEPOSE.peinture];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_peinture_surface) {
          cout += answers.depose_peinture_surface * tarif.par_m2;
        }
      }
      break;
    }

    case 'platrerie': {
      const tarif = TARIFS_DEPOSE.platrerie[type as keyof typeof TARIFS_DEPOSE.platrerie];
      if (tarif) {
        cout = tarif.base;
        if (answers.depose_platrerie_surface) {
          cout += answers.depose_platrerie_surface * tarif.par_m2;
        }
      }
      break;
    }

    case 'vmc': {
      const tarif = TARIFS_DEPOSE.vmc[type as keyof typeof TARIFS_DEPOSE.vmc];
      if (tarif) {
        cout = tarif.base;
        if ('par_ml' in tarif && answers.depose_vmc_longueur) {
          cout += answers.depose_vmc_longueur * tarif.par_ml;
        }
      }
      break;
    }
  }

  return Math.round(cout * 100) / 100;
}

/**
 * Calcule le coût d'évacuation des gravats
 */
function calculerCoutEvacuation(answers: DeposeAnswers): number {
  let cout = 0;

  if (answers.evacuation_dechets === 'non') {
    return 0; // À charge du client
  }

  const volume = answers.volume_gravats_estime || 0;

  if (answers.evacuation_dechets === 'oui') {
    // Mise en déchetterie
    cout = volume * TARIFS_EVACUATION.par_m3;
  } else if (answers.evacuation_dechets === 'location_benne') {
    // Location benne
    if (volume <= 5) {
      cout = TARIFS_EVACUATION.location_benne_petit;
    } else if (volume <= 10) {
      cout = TARIFS_EVACUATION.location_benne_moyen;
    } else {
      cout = TARIFS_EVACUATION.location_benne_grand;
    }
  }

  // Surcharge accès difficile
  if (answers.acces_difficile_depose === 'oui') {
    cout += TARIFS_EVACUATION.surcharge_acces_difficile;
  }

  return Math.round(cout * 100) / 100;
}

/**
 * Fonction principale de calcul
 */
export function calculateDeposeEvacuationGravats(
  answers: DeposeAnswers
): QuoteCalculation {
  const lines: QuoteLine[] = [];
  let totalHT = 0;

  // ===== DÉPOSE =====
  if (answers.poste_depose) {
    const poste = answers.poste_depose;
    let typeKey = '';
    let typeLabel = '';
    let details = '';

    // Déterminer le type de dépose selon le métier
    switch (poste) {
      case 'electricite':
        typeKey = answers.depose_electricite_type || 'partielle';
        typeLabel = {
          partielle: 'Dépose partielle',
          complete: 'Dépose complète',
          tableau_seul: 'Tableau électrique'
        }[typeKey] || 'Dépose électricité';
        if (answers.depose_electricite_surface) {
          details = `(${answers.depose_electricite_surface} ml)`;
        }
        break;

      case 'plomberie':
        typeKey = answers.depose_plomberie_type || 'tuyauterie';
        typeLabel = {
          tuyauterie: 'Dépose tuyauterie',
          sanitaires: 'Dépose sanitaires',
          complete: 'Dépose complète',
          baignoire_douche: 'Dépose baignoire/douche'
        }[typeKey] || 'Dépose plomberie';
        if (answers.depose_plomberie_longueur) {
          details = `(${answers.depose_plomberie_longueur} ml)`;
        }
        break;

      case 'sols':
        typeKey = answers.depose_sols_type || 'carrelage';
        typeLabel = {
          carrelage: 'Dépose carrelage',
          parquet: 'Dépose parquet',
          vinyle: 'Dépose vinyle',
          moquette: 'Dépose moquette',
          mixte: 'Dépose mixte'
        }[typeKey] || 'Dépose sols';
        if (answers.depose_sols_surface) {
          details = `(${answers.depose_sols_surface} m²)`;
        }
        break;

      case 'menuiserie':
        typeKey = answers.depose_menuiserie_type || 'portes';
        typeLabel = {
          portes: 'Dépose portes',
          fenetres: 'Dépose fenêtres',
          volets: 'Dépose volets',
          mixte: 'Dépose menuiserie mixte'
        }[typeKey] || 'Dépose menuiserie';
        if (answers.depose_menuiserie_quantite) {
          details = `(${answers.depose_menuiserie_quantite} pcs)`;
        }
        break;

      case 'isolation':
        typeKey = answers.depose_isolation_type || 'combles';
        typeLabel = {
          combles: 'Dépose isolation combles',
          murs: 'Dépose isolation murs',
          toiture: 'Dépose isolation toiture',
          complete: 'Dépose isolation complète'
        }[typeKey] || 'Dépose isolation';
        if (answers.depose_isolation_surface) {
          details = `(${answers.depose_isolation_surface} m²)`;
        }
        break;

      case 'chauffage':
        typeKey = answers.depose_chauffage_type || 'radiateurs';
        typeLabel = {
          radiateurs: 'Dépose radiateurs',
          chaudiere: 'Dépose chaudière',
          tuyauterie: 'Dépose tuyauterie chauffage',
          complete: 'Dépose chauffage complète'
        }[typeKey] || 'Dépose chauffage';
        if (answers.depose_chauffage_quantite) {
          details = `(${answers.depose_chauffage_quantite} radiateurs)`;
        }
        break;

      case 'peinture':
        typeKey = answers.depose_peinture_type || 'decapage';
        typeLabel = {
          decapage: 'Décapage peinture',
          papier_peint: 'Enlèvement papier peint',
          mixte: 'Décapage/enlèvement mixte'
        }[typeKey] || 'Dépose peinture';
        if (answers.depose_peinture_surface) {
          details = `(${answers.depose_peinture_surface} m²)`;
        }
        break;

      case 'platrerie':
        typeKey = answers.depose_platrerie_type || 'cloisons';
        typeLabel = {
          cloisons: 'Dépose cloisons',
          plafonds: 'Dépose faux plafonds',
          mixte: 'Dépose plâtrerie mixte'
        }[typeKey] || 'Dépose plâtrerie';
        if (answers.depose_platrerie_surface) {
          details = `(${answers.depose_platrerie_surface} m²)`;
        }
        break;

      case 'vmc':
        typeKey = answers.depose_vmc_type || 'groupe';
        typeLabel = {
          groupe: 'Dépose groupe VMC',
          gaines: 'Dépose gaines VMC',
          bouches: 'Dépose bouches VMC',
          complete: 'Dépose VMC complète'
        }[typeKey] || 'Dépose VMC';
        if (answers.depose_vmc_longueur) {
          details = `(${answers.depose_vmc_longueur} ml)`;
        }
        break;
    }

    // Calculer le coût de dépose
    let coutDepose = calculerCoutDepose(poste, typeKey, answers);

    // Appliquer la majoration de difficulté
    const difficulte = answers.difficulte_depose_generale || 'moyen';
    const majorationDifficulte = MAJORATIONS_DIFFICULTE[difficulte as keyof typeof MAJORATIONS_DIFFICULTE] || 0;
    coutDepose = coutDepose * (1 + majorationDifficulte);

    // Appliquer la majoration d'urgence
    const urgence = answers.urgence_depose || 'normal';
    const majorationUrgence = MAJORATIONS_URGENCE[urgence as keyof typeof MAJORATIONS_URGENCE] || 0;
    coutDepose = coutDepose * (1 + majorationUrgence);

    coutDepose = Math.round(coutDepose * 100) / 100;

    lines.push({
      description: `${typeLabel} ${details}`.trim(),
      quantity: 1,
      unit: 'forfait',
      unitPrice: coutDepose,
      total: coutDepose,
      tva: 20
    });

    totalHT += coutDepose;
  }

  // ===== ÉVACUATION DES GRAVATS =====
  const coutEvacuation = calculerCoutEvacuation(answers);
  if (coutEvacuation > 0) {
    let descriptionEvacuation = '';
    if (answers.evacuation_dechets === 'oui') {
      descriptionEvacuation = `Évacuation des gravats en déchetterie (${answers.volume_gravats_estime} m³)`;
    } else if (answers.evacuation_dechets === 'location_benne') {
      descriptionEvacuation = `Location benne de chantier pour évacuation des gravats (${answers.volume_gravats_estime} m³)`;
    }

    if (descriptionEvacuation) {
      lines.push({
        description: descriptionEvacuation,
        quantity: 1,
        unit: 'forfait',
        unitPrice: coutEvacuation,
        total: coutEvacuation,
        tva: 20
      });

      totalHT += coutEvacuation;
    }
  }

  // ===== CALCUL DES TOTAUX =====
  let totalTVA20 = 0;
  let totalTVA = 0;

  for (const line of lines) {
    const tva = (line.total * (line.tva || 20)) / 100;
    totalTVA20 += tva;
    totalTVA += tva;
  }

  const totalTTC = totalHT + totalTVA;

  return {
    lines,
    totalHT: Math.round(totalHT * 100) / 100,
    totalTVA20: Math.round(totalTVA20 * 100) / 100,
    totalTVA5_5: 0,
    totalTVA10: 0,
    totalTVA: Math.round(totalTVA * 100) / 100,
    totalTTC: Math.round(totalTTC * 100) / 100
  };
}
