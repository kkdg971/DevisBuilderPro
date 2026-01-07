import { QuestionnaireAnswers, DevisCalcule, LigneDevis, Coefficient } from '../types/questionnaire';

// Prix unitaires électricité (HT, main d'œuvre + fourniture)
const PRIX = {
  // TABLEAU ÉLECTRIQUE
  tableau_1_rangee: 850,
  tableau_2_rangees: 1200,
  tableau_3_rangees: 1650,
  tableau_4_rangees: 2100,
  differentiel_30ma: 85,
  parafoudre: 180,
  disjoncteur_branchement: 250,
  
  // CIRCUITS ET PRISES
  circuit_prises: 120, // par circuit
  prise_16a: 65,
  prise_cuisine: 70,
  prise_sdb: 85, // IPX4
  
  // CIRCUITS SPÉCIALISÉS
  circuit_four_20a: 145,
  circuit_plaques_20a: 165,
  circuit_plaques_32a: 220,
  circuit_plaques_40a: 280,
  circuit_lave_linge: 145,
  circuit_lave_vaisselle: 145,
  circuit_seche_linge: 145,
  circuit_congelateur: 145,
  circuit_chauffe_eau_20a: 165,
  circuit_chauffe_eau_32a: 220,
  contacteur_jour_nuit: 95,
  
  // ÉCLAIRAGE
  circuit_eclairage: 110,
  dcl_plafond: 75,
  applique: 85,
  spot_encastre: 45,
  interrupteur_simple: 55,
  interrupteur_va_et_vient: 75,
  detecteur_presence: 95,
  variateur: 85,
  
  // CHAUFFAGE ÉLECTRIQUE
  circuit_chauffage_faible: 180,
  circuit_chauffage_moyen: 240,
  circuit_chauffage_fort: 320,
  programmateur: 280,
  
  // COMMUNICATION
  gtl: 350,
  prise_rj45: 65,
  prise_tv: 55,
  coffret_communication: 420,
  
  // POSE
  saignee_ml: 28,
  rebouchage_ml: 12,
  goulotte_ml: 18,
  
  // TERRE ET PROTECTION
  mise_terre_verification: 180,
  mise_terre_creation: 450,
  liaison_equipotentielle: 220,
  
  // PRESTATIONS ANNEXES
  consuel: 180,
  etiquetage: 120,
  schema_unifilaire: 280,
  nettoyage: 150,
};

// Coefficients multiplicateurs
function getCoefficients(answers: QuestionnaireAnswers): Coefficient[] {
  const coeffs: Coefficient[] = [];
  
  if (answers.acces_difficile) {
    coeffs.push({ 
      nom: 'Accès difficile', 
      valeur: 1.12, 
      description: 'Majoration pour difficulté d\'accès (étage sans ascenseur)' 
    });
  }
  
  if (answers.travaux_occupes) {
    coeffs.push({ 
      nom: 'Site occupé', 
      valeur: 1.15, 
      description: 'Majoration pour contraintes horaires et protection renforcée' 
    });
  }
  
  if (answers.urgence) {
    coeffs.push({ 
      nom: 'Intervention urgente', 
      valeur: 1.35, 
      description: 'Majoration pour dépannage ou délai < 48h' 
    });
  }
  
  return coeffs;
}

function applyCoefficients(montant: number, coefficients: Coefficient[]): number {
  return coefficients.reduce((total, coeff) => total * coeff.valeur, montant);
}

export function calculateElectricite(answers: QuestionnaireAnswers): DevisCalcule {
  const lignes: LigneDevis[] = [];
  const coefficients = getCoefficients(answers);
  
  // ========== TABLEAU ÉLECTRIQUE ==========
  if (answers.tableau_electrique === 'remplacement_complet') {
    // Tableau principal
    let prixTableau = PRIX.tableau_2_rangees;
    let designation = 'Fourniture et pose d\'un tableau électrique 2 rangées (26 modules)';
    
    if (answers.type_tableau === '1_rangee') {
      prixTableau = PRIX.tableau_1_rangee;
      designation = 'Fourniture et pose d\'un tableau électrique 1 rangée (13 modules) pré-équipé, conforme NF C 15-100';
    } else if (answers.type_tableau === '3_rangees') {
      prixTableau = PRIX.tableau_3_rangees;
      designation = 'Fourniture et pose d\'un tableau électrique 3 rangées (39 modules) pré-équipé, conforme NF C 15-100';
    } else if (answers.type_tableau === '4_rangees') {
      prixTableau = PRIX.tableau_4_rangees;
      designation = 'Fourniture et pose d\'un tableau électrique 4 rangées (52 modules) pré-équipé, conforme NF C 15-100';
    }
    
    lignes.push({
      designation,
      quantite: 1,
      unite: 'U',
      prixUnitaire: prixTableau,
      montantHT: prixTableau,
    });
    
    // Interrupteurs différentiels 30mA
    if (answers.interrupteur_differentiel) {
      const nb = Number(answers.interrupteur_differentiel);
      lignes.push({
        designation: 'Fourniture et pose d\'interrupteur différentiel 30mA (Type A et AC) - Protection des personnes selon NF C 15-100',
        quantite: nb,
        unite: 'U',
        prixUnitaire: PRIX.differentiel_30ma,
        montantHT: nb * PRIX.differentiel_30ma,
      });
    }
    
    // Parafoudre
    if (answers.parafoudre) {
      lignes.push({
        designation: 'Fourniture et pose de parafoudre modulaire Type 2 - Protection des équipements selon NF C 15-100',
        quantite: 1,
        unite: 'U',
        prixUnitaire: PRIX.parafoudre,
        montantHT: PRIX.parafoudre,
      });
    }
    
    // Disjoncteur de branchement
    if (answers.disjoncteur_branchement) {
      lignes.push({
        designation: 'Remplacement du disjoncteur de branchement (limite de propriété) - Coordination avec Enedis',
        quantite: 1,
        unite: 'U',
        prixUnitaire: PRIX.disjoncteur_branchement,
        montantHT: PRIX.disjoncteur_branchement,
      });
    }
  } else if (answers.tableau_electrique === 'mise_aux_normes') {
    lignes.push({
      designation: 'Mise aux normes du tableau électrique existant - Ajout différentiels et protection selon NF C 15-100',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: 650,
      montantHT: 650,
    });
  } else if (answers.tableau_electrique === 'extension') {
    lignes.push({
      designation: 'Extension du tableau électrique existant - Ajout de modules et disjoncteurs',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: 450,
      montantHT: 450,
    });
  }
  
  // ========== CIRCUITS DE PRISES ==========
  if (answers.nb_circuits_prises) {
    const nb = Number(answers.nb_circuits_prises);
    lignes.push({
      designation: 'Création de circuit(s) de prises 16A - Câble 3G2.5mm², disjoncteur 20A, max 8 prises par circuit selon NF C 15-100',
      quantite: nb,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_prises,
      montantHT: applyCoefficients(nb * PRIX.circuit_prises, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_prises_standard) {
    const nb = Number(answers.nb_prises_standard);
    lignes.push({
      designation: 'Fourniture et pose de prise 2P+T 16A avec connexion au circuit - Appareillage encastré ou apparent',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.prise_16a,
      montantHT: applyCoefficients(nb * PRIX.prise_16a, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_prises_cuisine) {
    const nb = Number(answers.nb_prises_cuisine);
    lignes.push({
      designation: 'Fourniture et pose de prise 2P+T 16A en cuisine - Min. 6 prises dont 4 sur plan de travail selon NF C 15-100',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.prise_cuisine,
      montantHT: applyCoefficients(nb * PRIX.prise_cuisine, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_prises_sdb) {
    const nb = Number(answers.nb_prises_sdb);
    lignes.push({
      designation: 'Fourniture et pose de prise 2P+T 16A en salle de bain - Hors volumes, indice IPX4 selon NF C 15-100',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.prise_sdb,
      montantHT: applyCoefficients(nb * PRIX.prise_sdb, coefficients),
      coefficients,
    });
  }
  
  // ========== CIRCUITS SPÉCIALISÉS ==========
  if (answers.circuit_four) {
    lignes.push({
      designation: 'Circuit spécialisé four - Câble 3G2.5mm², disjoncteur 20A, prise dédiée - Obligatoire NF C 15-100',
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_four_20a,
      montantHT: applyCoefficients(PRIX.circuit_four_20a, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_plaques && answers.circuit_plaques !== 'aucun') {
    let prix = PRIX.circuit_plaques_20a;
    let designation = 'Circuit spécialisé plaques de cuisson - Câble 3G2.5mm², disjoncteur 20A, prise 20A ou sortie de câble';
    
    if (answers.circuit_plaques === '32a') {
      prix = PRIX.circuit_plaques_32a;
      designation = 'Circuit spécialisé plaques de cuisson - Câble 3G6mm², disjoncteur 32A, prise 32A ou sortie de câble (3600W à 7200W)';
    } else if (answers.circuit_plaques === '40a') {
      prix = PRIX.circuit_plaques_40a;
      designation = 'Circuit spécialisé plaques de cuisson - Câble 3G10mm², disjoncteur 40A, sortie de câble (> 7200W)';
    }
    
    lignes.push({
      designation,
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: prix,
      montantHT: applyCoefficients(prix, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_lave_linge) {
    lignes.push({
      designation: 'Circuit spécialisé lave-linge - Câble 3G2.5mm², disjoncteur 20A, prise dédiée 16A',
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_lave_linge,
      montantHT: applyCoefficients(PRIX.circuit_lave_linge, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_lave_vaisselle) {
    lignes.push({
      designation: 'Circuit spécialisé lave-vaisselle - Câble 3G2.5mm², disjoncteur 20A, prise dédiée 16A',
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_lave_vaisselle,
      montantHT: applyCoefficients(PRIX.circuit_lave_vaisselle, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_seche_linge) {
    lignes.push({
      designation: 'Circuit spécialisé sèche-linge - Câble 3G2.5mm², disjoncteur 20A, prise dédiée 16A',
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_seche_linge,
      montantHT: applyCoefficients(PRIX.circuit_seche_linge, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_congelateur) {
    lignes.push({
      designation: 'Circuit spécialisé congélateur - Câble 3G2.5mm², disjoncteur 20A, prise dédiée protégée',
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_congelateur,
      montantHT: applyCoefficients(PRIX.circuit_congelateur, coefficients),
      coefficients,
    });
  }
  
  if (answers.circuit_chauffe_eau && answers.circuit_chauffe_eau !== 'aucun') {
    let prix = PRIX.circuit_chauffe_eau_20a;
    let designation = 'Circuit spécialisé chauffe-eau électrique - Câble 3G2.5mm², disjoncteur 20A (< 2000W)';
    
    if (answers.circuit_chauffe_eau === '32a') {
      prix = PRIX.circuit_chauffe_eau_32a;
      designation = 'Circuit spécialisé chauffe-eau électrique - Câble 3G6mm², disjoncteur 32A (2000W à 4500W)';
    }
    
    lignes.push({
      designation,
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: prix,
      montantHT: applyCoefficients(prix, coefficients),
      coefficients,
    });
    
    if (answers.contacteur_jour_nuit) {
      lignes.push({
        designation: 'Fourniture et pose de contacteur jour/nuit - Pilotage heures creuses pour chauffe-eau',
        quantite: 1,
        unite: 'U',
        prixUnitaire: PRIX.contacteur_jour_nuit,
        montantHT: PRIX.contacteur_jour_nuit,
      });
    }
  }
  
  // ========== ÉCLAIRAGE ==========
  if (answers.nb_circuits_eclairage) {
    const nb = Number(answers.nb_circuits_eclairage);
    lignes.push({
      designation: 'Création de circuit(s) d\'éclairage - Câble 3G1.5mm², disjoncteur 16A, max 8 points lumineux par circuit selon NF C 15-100',
      quantite: nb,
      unite: 'Circuit',
      prixUnitaire: PRIX.circuit_eclairage,
      montantHT: applyCoefficients(nb * PRIX.circuit_eclairage, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_points_lumineux_plafond) {
    const nb = Number(answers.nb_points_lumineux_plafond);
    lignes.push({
      designation: 'Fourniture et pose de point lumineux plafond avec DCL (Dispositif de Connexion Luminaire) - Obligatoire NF C 15-100',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.dcl_plafond,
      montantHT: applyCoefficients(nb * PRIX.dcl_plafond, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_appliques) {
    const nb = Number(answers.nb_appliques);
    lignes.push({
      designation: 'Fourniture et pose d\'applique murale avec connexion au circuit d\'éclairage',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.applique,
      montantHT: applyCoefficients(nb * PRIX.applique, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_spots_encastres) {
    const nb = Number(answers.nb_spots_encastres);
    lignes.push({
      designation: 'Fourniture et pose de spot encastré LED (basse tension ou 230V) avec transformateur si nécessaire',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.spot_encastre,
      montantHT: applyCoefficients(nb * PRIX.spot_encastre, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_interrupteurs_simples) {
    const nb = Number(answers.nb_interrupteurs_simples);
    lignes.push({
      designation: 'Fourniture et pose d\'interrupteur simple - Appareillage encastré ou apparent',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.interrupteur_simple,
      montantHT: applyCoefficients(nb * PRIX.interrupteur_simple, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_interrupteurs_va_et_vient) {
    const nb = Number(answers.nb_interrupteurs_va_et_vient);
    lignes.push({
      designation: 'Fourniture et pose d\'interrupteur va-et-vient (commande depuis 2 endroits) - Câblage 4 fils',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.interrupteur_va_et_vient,
      montantHT: applyCoefficients(nb * PRIX.interrupteur_va_et_vient, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_detecteurs_presence) {
    const nb = Number(answers.nb_detecteurs_presence);
    lignes.push({
      designation: 'Fourniture et pose de détecteur de présence - Allumage automatique (couloirs, WC, dégagements)',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.detecteur_presence,
      montantHT: applyCoefficients(nb * PRIX.detecteur_presence, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_variateurs) {
    const nb = Number(answers.nb_variateurs);
    lignes.push({
      designation: 'Fourniture et pose de variateur d\'intensité lumineuse - Compatible LED',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.variateur,
      montantHT: applyCoefficients(nb * PRIX.variateur, coefficients),
      coefficients,
    });
  }
  
  // ========== CHAUFFAGE ÉLECTRIQUE ==========
  if (answers.chauffage_electrique && answers.puissance_totale_chauffage) {
    let prix = PRIX.circuit_chauffage_faible;
    let designation = 'Création de circuit(s) de chauffage électrique - Câble 3G2.5mm², disjoncteur 20A (< 3500W)';
    
    if (answers.puissance_totale_chauffage === 'moyenne') {
      prix = PRIX.circuit_chauffage_moyen;
      designation = 'Création de circuit(s) de chauffage électrique - Câble 3G2.5mm², disjoncteur 25A (3500W à 5750W)';
    } else if (answers.puissance_totale_chauffage === 'forte') {
      prix = PRIX.circuit_chauffage_fort;
      designation = 'Création de circuit(s) de chauffage électrique - Câble 3G6mm², disjoncteur 32A (> 5750W)';
    }
    
    lignes.push({
      designation,
      quantite: 1,
      unite: 'Circuit',
      prixUnitaire: prix,
      montantHT: applyCoefficients(prix, coefficients),
      coefficients,
    });
    
    if (answers.programmateur_chauffage) {
      lignes.push({
        designation: 'Fourniture et pose de programmateur / gestionnaire d\'énergie - Pilotage fil pilote des radiateurs',
        quantite: 1,
        unite: 'U',
        prixUnitaire: PRIX.programmateur,
        montantHT: PRIX.programmateur,
      });
    }
  }
  
  // ========== COMMUNICATION ET MULTIMÉDIA ==========
  if (answers.gaine_technique_logement) {
    lignes.push({
      designation: 'Fourniture et pose de Gaine Technique Logement (GTL) - Coffret regroupant tableau électrique et communication selon NF C 15-100',
      quantite: 1,
      unite: 'U',
      prixUnitaire: PRIX.gtl,
      montantHT: PRIX.gtl,
    });
  }
  
  if (answers.nb_prises_rj45) {
    const nb = Number(answers.nb_prises_rj45);
    lignes.push({
      designation: 'Fourniture et pose de prise RJ45 Grade 3 - Réseau informatique / téléphone, câble Cat 6',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.prise_rj45,
      montantHT: applyCoefficients(nb * PRIX.prise_rj45, coefficients),
      coefficients,
    });
  }
  
  if (answers.nb_prises_tv) {
    const nb = Number(answers.nb_prises_tv);
    lignes.push({
      designation: 'Fourniture et pose de prise TV coaxiale - Câble coaxial blindé',
      quantite: nb,
      unite: 'U',
      prixUnitaire: PRIX.prise_tv,
      montantHT: applyCoefficients(nb * PRIX.prise_tv, coefficients),
      coefficients,
    });
  }
  
  if (answers.coffret_communication) {
    lignes.push({
      designation: 'Fourniture et pose de coffret de communication Grade 2 - Brassage téléphone, internet, TV',
      quantite: 1,
      unite: 'U',
      prixUnitaire: PRIX.coffret_communication,
      montantHT: PRIX.coffret_communication,
    });
  }
  
  // ========== TYPE DE POSE ==========
  if (answers.ml_saignees) {
    const ml = Number(answers.ml_saignees);
    lignes.push({
      designation: 'Réalisation de saignées dans les murs - Rainurage au burineur électrique, profondeur 20-30mm',
      quantite: ml,
      unite: 'ml',
      prixUnitaire: PRIX.saignee_ml,
      montantHT: ml * PRIX.saignee_ml,
    });
    
    if (answers.rebouchage_saignees) {
      lignes.push({
        designation: 'Rebouchage des saignées au plâtre - Après pose des gaines ICTA et câbles',
        quantite: ml,
        unite: 'ml',
        prixUnitaire: PRIX.rebouchage_ml,
        montantHT: ml * PRIX.rebouchage_ml,
      });
    }
  }
  
  if (answers.ml_goulottes) {
    const ml = Number(answers.ml_goulottes);
    lignes.push({
      designation: 'Fourniture et pose de goulottes PVC - Pose en apparent, fixation par clips',
      quantite: ml,
      unite: 'ml',
      prixUnitaire: PRIX.goulotte_ml,
      montantHT: ml * PRIX.goulotte_ml,
    });
  }
  
  // ========== TERRE ET PROTECTION ==========
  if (answers.mise_terre === 'a_verifier') {
    lignes.push({
      designation: 'Vérification et mise aux normes de la prise de terre - Mesure de résistance (< 100 Ohms selon NF C 15-100)',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: PRIX.mise_terre_verification,
      montantHT: PRIX.mise_terre_verification,
    });
  } else if (answers.mise_terre === 'a_creer') {
    lignes.push({
      designation: 'Création de prise de terre - Piquet de terre en acier galvanisé, barrette de mesure, conducteur de terre 25mm²',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: PRIX.mise_terre_creation,
      montantHT: PRIX.mise_terre_creation,
    });
  }
  
  if (answers.liaison_equipotentielle) {
    lignes.push({
      designation: 'Liaison équipotentielle salle de bain - Connexion de toutes les masses métalliques (baignoire, tuyauteries) selon NF C 15-100',
      quantite: 1,
      unite: 'U',
      prixUnitaire: PRIX.liaison_equipotentielle,
      montantHT: PRIX.liaison_equipotentielle,
    });
  }
  
  // ========== PRESTATIONS ANNEXES ==========
  if (answers.consuel) {
    lignes.push({
      designation: 'Attestation de conformité CONSUEL - Obligatoire pour rénovation complète et raccordement Enedis',
      quantite: 1,
      unite: 'U',
      prixUnitaire: PRIX.consuel,
      montantHT: PRIX.consuel,
    });
  }
  
  if (answers.etiquetage_tableau) {
    lignes.push({
      designation: 'Étiquetage complet du tableau électrique - Identification de tous les circuits et disjoncteurs',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: PRIX.etiquetage,
      montantHT: PRIX.etiquetage,
    });
  }
  
  if (answers.schema_unifilaire) {
    lignes.push({
      designation: 'Réalisation du schéma unifilaire de l\'installation - Plan électrique réglementaire',
      quantite: 1,
      unite: 'U',
      prixUnitaire: PRIX.schema_unifilaire,
      montantHT: PRIX.schema_unifilaire,
    });
  }
  
  if (answers.nettoyage_chantier) {
    lignes.push({
      designation: 'Nettoyage de fin de chantier - Évacuation des gravats, déchets et emballages',
      quantite: 1,
      unite: 'Forfait',
      prixUnitaire: PRIX.nettoyage,
      montantHT: PRIX.nettoyage,
    });
  }
  
  const sousTotal = lignes.reduce((sum, ligne) => sum + ligne.montantHT, 0);
  
  return {
    poste: 'Électricité',
    lignes,
    sousTotal,
  };
}
