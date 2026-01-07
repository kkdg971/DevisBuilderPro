/**
 * Calculator Électricité - Conforme DTU 15.100 & NFC 15-100
 * Génère un devis ultra-complet et professionnel
 */

interface DevisElectricite {
  poste: string;
  type: string;
  lignes: Array<{
    description: string;
    quantite: number;
    unite: string;
    prixUnitaire: number;
    sousTotal: number;
  }>;
  totalHT: number;
  tva: number;
  tauxTVA: number;
  totalTTC: number;
  notes?: string;
  conformite?: string;
}

export function calculateElectriciteNew(answers: any): DevisElectricite {
  const lignes: DevisElectricite['lignes'] = [];
  let totalHT = 0;

  // ===== 1. TABLEAU ÉLECTRIQUE & DISJONCTEUR =====
  
  if (answers.tableau_electrique_existant === 'absent' || answers.tableau_electrique_existant === 'ancien') {
    const prixTableau = 450; // € TTC
    lignes.push({
      description: 'Tableau électrique (remplacement/création)',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixTableau,
      sousTotal: prixTableau
    });
    totalHT += prixTableau;
  }

  // Disjoncteur principal
  const prixDisjoncteur: Record<string, number> = {
    '30A': 80,
    '45A': 100,
    '60A': 120,
    '90A': 150,
    '120A': 200
  };
  
  if (answers.amperage_disjoncteur_principal) {
    const prix = prixDisjoncteur[answers.amperage_disjoncteur_principal] || 100;
    lignes.push({
      description: `Disjoncteur principal ${answers.amperage_disjoncteur_principal}`,
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prix,
      sousTotal: prix
    });
    totalHT += prix;
  }

  // ===== 2. PRISES DE COURANT =====

  const prixPriseStandard = 45; // € par prise 16A
  const prixPrise32A = 80; // € par prise 32A

  if (answers.prises_courant_standard && answers.prises_courant_standard > 0) {
    const sousTotal = answers.prises_courant_standard * prixPriseStandard;
    lignes.push({
      description: `Prises de courant standard (16A) - ${answers.prises_courant_standard} unités`,
      quantite: answers.prises_courant_standard,
      unite: 'prise',
      prixUnitaire: prixPriseStandard,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  if (answers.prises_courant_32A && answers.prises_courant_32A > 0) {
    const sousTotal = answers.prises_courant_32A * prixPrise32A;
    lignes.push({
      description: `Prises 32A (cuisine/atelier) - ${answers.prises_courant_32A} unités`,
      quantite: answers.prises_courant_32A,
      unite: 'prise',
      prixUnitaire: prixPrise32A,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 3. INTERRUPTEURS =====

  const prixInterrupteurSimple = 35;
  const prixInterrupteurDouble = 50;
  const prixInterrupteurVV = 55;
  const prixDifferentiel = 120;

  if (answers.interrupteurs_simples && answers.interrupteurs_simples > 0) {
    const sousTotal = answers.interrupteurs_simples * prixInterrupteurSimple;
    lignes.push({
      description: `Interrupteurs simples - ${answers.interrupteurs_simples} unités`,
      quantite: answers.interrupteurs_simples,
      unite: 'interrupteur',
      prixUnitaire: prixInterrupteurSimple,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  if (answers.interrupteurs_doubles && answers.interrupteurs_doubles > 0) {
    const sousTotal = answers.interrupteurs_doubles * prixInterrupteurDouble;
    lignes.push({
      description: `Interrupteurs doubles - ${answers.interrupteurs_doubles} unités`,
      quantite: answers.interrupteurs_doubles,
      unite: 'interrupteur',
      prixUnitaire: prixInterrupteurDouble,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  if (answers.interrupteurs_va_et_vient && answers.interrupteurs_va_et_vient > 0) {
    const sousTotal = answers.interrupteurs_va_et_vient * prixInterrupteurVV;
    lignes.push({
      description: `Interrupteurs va-et-vient - ${answers.interrupteurs_va_et_vient} unités`,
      quantite: answers.interrupteurs_va_et_vient,
      unite: 'interrupteur',
      prixUnitaire: prixInterrupteurVV,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  if (answers.interrupteurs_differentiels && answers.interrupteurs_differentiels > 0) {
    const sousTotal = answers.interrupteurs_differentiels * prixDifferentiel;
    lignes.push({
      description: `Interrupteurs différentiels 30mA - ${answers.interrupteurs_differentiels} unités`,
      quantite: answers.interrupteurs_differentiels,
      unite: 'interrupteur',
      prixUnitaire: prixDifferentiel,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 4. ÉCLAIRAGE =====

  const prixPointEclairage = 80;
  const prixPointEclairageExt = 120;

  if (answers.points_eclairage_interieur && answers.points_eclairage_interieur > 0) {
    const sousTotal = answers.points_eclairage_interieur * prixPointEclairage;
    lignes.push({
      description: `Points d'éclairage intérieur - ${answers.points_eclairage_interieur} unités`,
      quantite: answers.points_eclairage_interieur,
      unite: 'point',
      prixUnitaire: prixPointEclairage,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  if (answers.points_eclairage_exterieur && answers.points_eclairage_exterieur > 0) {
    const sousTotal = answers.points_eclairage_exterieur * prixPointEclairageExt;
    lignes.push({
      description: `Points d'éclairage extérieur - ${answers.points_eclairage_exterieur} unités`,
      quantite: answers.points_eclairage_exterieur,
      unite: 'point',
      prixUnitaire: prixPointEclairageExt,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 5. CÂBLAGE =====

  const prixCablageApparent = 8; // € par ml
  const prixCablageEncastre = 15; // € par ml
  const prixCablageMixte = 12; // € par ml

  if (answers.longueur_cablage_total && answers.longueur_cablage_total > 0) {
    const prixParML = 
      answers.cablage_type === 'apparent' ? prixCablageApparent :
      answers.cablage_type === 'encastre' ? prixCablageEncastre :
      prixCablageMixte;
    
    const sousTotal = answers.longueur_cablage_total * prixParML;
    lignes.push({
      description: `Câblage ${answers.cablage_type || 'mixte'} - ${answers.longueur_cablage_total} ml`,
      quantite: answers.longueur_cablage_total,
      unite: 'ml',
      prixUnitaire: prixParML,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 6. GAINES DE PROTECTION =====

  if (answers.longueur_cablage_total && answers.longueur_cablage_total > 0) {
    const prixGaine = 
      answers.gaines_protection === 'pvc' ? 3 :
      answers.gaines_protection === 'icta' ? 5 :
      8; // acier
    
    const sousTotal = answers.longueur_cablage_total * prixGaine;
    lignes.push({
      description: `Gaines de protection ${answers.gaines_protection || 'PVC'} - ${answers.longueur_cablage_total} ml`,
      quantite: answers.longueur_cablage_total,
      unite: 'ml',
      prixUnitaire: prixGaine,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 7. MISE À LA TERRE =====

  if (answers.mise_a_la_terre === 'absent') {
    const prixTerre = 250;
    lignes.push({
      description: 'Mise à la terre (création)',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixTerre,
      sousTotal: prixTerre
    });
    totalHT += prixTerre;
  } else if (answers.mise_a_la_terre === 'existant_non_conforme') {
    const prixTerre = 150;
    lignes.push({
      description: 'Mise à la terre (conformité)',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixTerre,
      sousTotal: prixTerre
    });
    totalHT += prixTerre;
  }

  // ===== 8. PARAFOUDRE =====

  if (answers.parafoudre === 'oui') {
    const prixParafoudre = 180;
    lignes.push({
      description: 'Parafoudre',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixParafoudre,
      sousTotal: prixParafoudre
    });
    totalHT += prixParafoudre;
  }

  // ===== 9. COMPTEUR =====

  if (answers.compteur_type === 'ancien') {
    const prixCompteur = 200;
    lignes.push({
      description: 'Compteur Linky (remplacement)',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixCompteur,
      sousTotal: prixCompteur
    });
    totalHT += prixCompteur;
  } else if (answers.compteur_type === 'neuf') {
    const prixCompteur = 150;
    lignes.push({
      description: 'Compteur Linky (installation)',
      quantite: 1,
      unite: 'pièce',
      prixUnitaire: prixCompteur,
      sousTotal: prixCompteur
    });
    totalHT += prixCompteur;
  }

  // ===== 10. CIRCUITS SPÉCIALISÉS =====

  const prixCircuitSpecialise = 200;
  if (answers.circuits_specialises && Array.isArray(answers.circuits_specialises)) {
    const sousTotal = answers.circuits_specialises.length * prixCircuitSpecialise;
    lignes.push({
      description: `Circuits spécialisés (${answers.circuits_specialises.length}) - ${answers.circuits_specialises.join(', ')}`,
      quantite: answers.circuits_specialises.length,
      unite: 'circuit',
      prixUnitaire: prixCircuitSpecialise,
      sousTotal: sousTotal
    });
    totalHT += sousTotal;
  }

  // ===== 11. DOMOTIQUE/SÉCURITÉ =====

  const prixDomotique: Record<string, number> = {
    'alarme': 300,
    'videosurveillance': 400,
    'interphone': 250,
    'controle_acces': 350,
    'detecteurs_mouvement': 150
  };

  if (answers.domotique_securite && Array.isArray(answers.domotique_securite)) {
    answers.domotique_securite.forEach((item: string) => {
      const prix = prixDomotique[item] || 200;
      lignes.push({
        description: `${item.charAt(0).toUpperCase() + item.slice(1).replace(/_/g, ' ')}`,
        quantite: 1,
        unite: 'pièce',
        prixUnitaire: prix,
        sousTotal: prix
      });
      totalHT += prix;
    });
  }

  // ===== 12. SURCOÛTS =====

  // Accès difficile
  if (answers.acces_difficile_elec === 'oui') {
    const surcoût = totalHT * 0.15; // 15% de surcoût
    lignes.push({
      description: 'Surcoût accès difficile (+15%)',
      quantite: 1,
      unite: 'forfait',
      prixUnitaire: surcoût,
      sousTotal: surcoût
    });
    totalHT += surcoût;
  }

  // Urgence
  if (answers.urgence_intervention === 'urgent') {
    const surcoût = totalHT * 0.20; // 20% de surcoût
    lignes.push({
      description: 'Surcoût intervention urgente (+20%)',
      quantite: 1,
      unite: 'forfait',
      prixUnitaire: surcoût,
      sousTotal: surcoût
    });
    totalHT += surcoût;
  } else if (answers.urgence_intervention === 'rapide') {
    const surcoût = totalHT * 0.10; // 10% de surcoût
    lignes.push({
      description: 'Surcoût intervention rapide (+10%)',
      quantite: 1,
      unite: 'forfait',
      prixUnitaire: surcoût,
      sousTotal: surcoût
    });
    totalHT += surcoût;
  }

  // ===== 13. MAIN D'ŒUVRE =====

  // Estimation : 50€ par heure, 1-2 jours selon complexité
  const heuresEstimees = 
    (answers.surface_totale || 100) / 50 + // 1h par 50m²
    (answers.prises_courant_standard || 0) * 0.5 / 60 + // 30min par 60 prises
    (answers.points_eclairage_interieur || 0) * 0.5 / 60; // 30min par 60 points

  const prixMainOeuvre = Math.max(300, heuresEstimees * 50); // Min 300€
  lignes.push({
    description: `Main d'œuvre (${Math.round(heuresEstimees)}h estimées)`,
    quantite: 1,
    unite: 'forfait',
    prixUnitaire: prixMainOeuvre,
    sousTotal: prixMainOeuvre
  });
  totalHT += prixMainOeuvre;

  // ===== CALCUL TVA =====

  const tauxTVA = parseFloat(answers.tva_electricite) || 20;
  const tva = totalHT * (tauxTVA / 100);
  const totalTTC = totalHT + tva;

  return {
    poste: 'Électricité',
    type: 'Devis DTU 15.100 & NFC 15-100',
    lignes,
    totalHT: Math.round(totalHT * 100) / 100,
    tva: Math.round(tva * 100) / 100,
    tauxTVA,
    totalTTC: Math.round(totalTTC * 100) / 100,
    conformite: answers.conformite_norme || 'NFC 15-100'
  };
}
