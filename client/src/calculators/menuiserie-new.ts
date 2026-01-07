export function calculateMenuiserieNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const nbPortesInt = parseFloat(answers.nombre_portes_interieures) || 0;
  if (nbPortesInt > 0) {
    let prixPorte = 200;
    if (answers.materiau_portes_interieures === 'bois_massif_chene') prixPorte = 350;
    else if (answers.materiau_portes_interieures === 'bois_massif_sapin') prixPorte = 250;
    else if (answers.materiau_portes_interieures === 'bois_plaque_chene') prixPorte = 300;
    else if (answers.materiau_portes_interieures === 'mdf_premium') prixPorte = 250;
    else if (answers.materiau_portes_interieures === 'verre_partiel') prixPorte = 280;
    
    const prix = nbPortesInt * prixPorte;
    details.push({ label: 'Portes intérieures', quantity: nbPortesInt, unitPrice: prixPorte, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_poignees_portes === 'simple') {
    const prix = nbPortesInt * 30;
    details.push({ label: 'Poignées simples', quantity: nbPortesInt, unitPrice: 30, total: prix });
    totalHT += prix;
  } else if (answers.besoin_poignees_portes === 'securisee') {
    const prix = nbPortesInt * 60;
    details.push({ label: 'Serrures sécurisées', quantity: nbPortesInt, unitPrice: 60, total: prix });
    totalHT += prix;
  }

  const nbFenetres = parseFloat(answers.nombre_fenetres) || 0;
  if (nbFenetres > 0) {
    let prixFenetre = 400;
    if (answers.materiau_fenetres === 'bois') prixFenetre = 500;
    else if (answers.materiau_fenetres === 'aluminium') prixFenetre = 450;
    else if (answers.materiau_fenetres === 'pvc') prixFenetre = 350;
    else if (answers.materiau_fenetres === 'mixte_bois_alu') prixFenetre = 600;

    if (answers.type_vitrage === 'triple') prixFenetre *= 1.3;
    else if (answers.type_vitrage === 'double') prixFenetre *= 1.1;

    const prix = nbFenetres * prixFenetre;
    details.push({ label: 'Fenêtres', quantity: nbFenetres, unitPrice: prixFenetre, total: prix });
    totalHT += prix;
  }

  const nbVolets = parseFloat(answers.nombre_volets) || 0;
  if (nbVolets > 0) {
    let prixVolet = 150;
    if (answers.type_volets === 'battants_bois') prixVolet = 180;
    else if (answers.type_volets === 'battants_alu') prixVolet = 160;
    else if (answers.type_volets === 'coulissants') prixVolet = 200;
    else if (answers.type_volets === 'roulants') prixVolet = 250;

    if (answers.motorisation_volets === 'electrique') prixVolet += 150;
    else if (answers.motorisation_volets === 'domotique') prixVolet += 300;

    const prix = nbVolets * prixVolet;
    details.push({ label: 'Volets', quantity: nbVolets, unitPrice: prixVolet, total: prix });
    totalHT += prix;
  }

  const nbPortesExt = parseFloat(answers.nombre_portes_exterieures) || 0;
  if (nbPortesExt > 0) {
    let prixPorteExt = 600;
    if (answers.materiau_portes_exterieures === 'bois') prixPorteExt = 800;
    else if (answers.materiau_portes_exterieures === 'aluminium') prixPorteExt = 700;
    else if (answers.materiau_portes_exterieures === 'pvc') prixPorteExt = 550;

    const prix = nbPortesExt * prixPorteExt;
    details.push({ label: 'Portes extérieures', quantity: nbPortesExt, unitPrice: prixPorteExt, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_escaliers === 'oui') {
    let prixEscalier = 1500;
    if (answers.type_escaliers === 'droit') prixEscalier = 1500;
    else if (answers.type_escaliers === 'tournant') prixEscalier = 2000;
    else if (answers.type_escaliers === 'helicoidal') prixEscalier = 3000;
    else if (answers.type_escaliers === 'suspendu') prixEscalier = 4000;

    if (answers.materiau_escaliers === 'metal') prixEscalier *= 1.2;
    else if (answers.materiau_escaliers === 'mixte') prixEscalier *= 1.3;

    details.push({ label: 'Escaliers', quantity: 1, unitPrice: prixEscalier, total: prixEscalier });
    totalHT += prixEscalier;
  }

  const surfacePlacards = parseFloat(answers.surface_placards) || 0;
  if (surfacePlacards > 0) {
    let prixPlacards = 300;
    if (answers.amenagement_placards === 'standard') prixPlacards = 400;
    else if (answers.amenagement_placards === 'complet') prixPlacards = 600;

    const prix = surfacePlacards * prixPlacards;
    details.push({ label: 'Placards/Dressing', quantity: surfacePlacards, unitPrice: prixPlacards, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_cuisine === 'oui') {
    let prixCuisine = 3000;
    if (answers.type_cuisine === 'lineaire') prixCuisine = 3000;
    else if (answers.type_cuisine === 'en_l') prixCuisine = 4000;
    else if (answers.type_cuisine === 'en_u') prixCuisine = 5000;
    else if (answers.type_cuisine === 'ilot') prixCuisine = 6000;

    if (answers.materiau_cuisine === 'bois') prixCuisine *= 1.2;
    else if (answers.materiau_cuisine === 'laque') prixCuisine *= 1.3;

    details.push({ label: 'Cuisine', quantity: 1, unitPrice: prixCuisine, total: prixCuisine });
    totalHT += prixCuisine;
  }

  const surfaceTerrasse = parseFloat(answers.surface_terrasse) || 0;
  if (surfaceTerrasse > 0) {
    let prixTerrasse = 100;
    if (answers.type_terrasse === 'bois') prixTerrasse = 120;
    else if (answers.type_terrasse === 'composite') prixTerrasse = 150;
    else if (answers.type_terrasse === 'mixte') prixTerrasse = 140;

    const prix = surfaceTerrasse * prixTerrasse;
    details.push({ label: 'Terrasse', quantity: surfaceTerrasse, unitPrice: prixTerrasse, total: prix });
    totalHT += prix;
  }

  if (answers.acces_difficile_menu === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const tva = parseFloat(answers.tva_menuiserie) || 20;
  const montantTVA = totalHT * (tva / 100);
  const totalTTC = totalHT + montantTVA;

  return {
    details,
    totalHT: Math.round(totalHT * 100) / 100,
    tva,
    montantTVA: Math.round(montantTVA * 100) / 100,
    totalTTC: Math.round(totalTTC * 100) / 100,
  };
}

export default calculateMenuiserieNew;
