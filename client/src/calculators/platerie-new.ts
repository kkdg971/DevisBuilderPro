export function calculatePlatrerieNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const surfaceTotale = parseFloat(answers.surface_platerie) || 0;
  const surfaceCloisons = parseFloat(answers.surface_cloisons) || 0;
  if (surfaceCloisons > 0) {
    let tarifCloisons = 40;
    if (answers.type_cloisons === 'placoplatre') tarifCloisons = 35;
    else if (answers.type_cloisons === 'placoplatre_renforce') tarifCloisons = 40;
    else if (answers.type_cloisons === 'brique') tarifCloisons = 50;
    else if (answers.type_cloisons === 'parpaing') tarifCloisons = 45;
    else if (answers.type_cloisons === 'carreaux_platre') tarifCloisons = 55;

    if (answers.hauteur_cloisons === 'haut') tarifCloisons *= 1.15;
    else if (answers.hauteur_cloisons === 'tres_haut') tarifCloisons *= 1.3;

    if (answers.besoin_isolation_cloisons === 'acoustique') tarifCloisons += 15;
    else if (answers.besoin_isolation_cloisons === 'thermique') tarifCloisons += 20;
    else if (answers.besoin_isolation_cloisons === 'mixte') tarifCloisons += 30;

    const prix = surfaceCloisons * tarifCloisons;
    details.push({ label: 'Cloisons', quantity: surfaceCloisons, unitPrice: tarifCloisons, total: prix });
    totalHT += prix;
  }

  const surfaceFauxPlafond = parseFloat(answers.surface_faux_plafond) || 0;
  if (surfaceFauxPlafond > 0) {
    let tarifFauxPlafond = 45;
    if (answers.type_faux_plafond === 'placoplatre') tarifFauxPlafond = 40;
    else if (answers.type_faux_plafond === 'dalles_acoustiques') tarifFauxPlafond = 50;
    else if (answers.type_faux_plafond === 'lambris') tarifFauxPlafond = 60;
    else if (answers.type_faux_plafond === 'bois') tarifFauxPlafond = 70;

    if (answers.hauteur_faux_plafond === '20cm') tarifFauxPlafond += 5;
    else if (answers.hauteur_faux_plafond === '30cm') tarifFauxPlafond += 10;
    else if (answers.hauteur_faux_plafond === '50cm') tarifFauxPlafond += 15;

    const nbSpots = parseFloat(answers.nombre_spots_faux_plafond) || 0;
    if (nbSpots > 0) tarifFauxPlafond += 10;

    if (answers.presence_gaines_faux_plafond === 'oui') tarifFauxPlafond += 15;

    const prix = surfaceFauxPlafond * tarifFauxPlafond;
    details.push({ label: 'Faux plafond', quantity: surfaceFauxPlafond, unitPrice: tarifFauxPlafond, total: prix });
    totalHT += prix;
  }

  const surfaceEnduit = parseFloat(answers.surface_enduit) || 0;
  if (surfaceEnduit > 0) {
    let tarifEnduit = 20;
    if (answers.type_enduit === 'enduit_platre') tarifEnduit = 18;
    else if (answers.type_enduit === 'enduit_ciment') tarifEnduit = 22;
    else if (answers.type_enduit === 'enduit_chaux') tarifEnduit = 25;
    else if (answers.type_enduit === 'enduit_decoratif') tarifEnduit = 30;
    else if (answers.type_enduit === 'enduit_monocouche') tarifEnduit = 28;

    if (answers.finition_enduit === 'gratte') tarifEnduit += 3;
    else if (answers.finition_enduit === 'taloche') tarifEnduit += 5;
    else if (answers.finition_enduit === 'brosse') tarifEnduit += 4;

    const nbCouches = answers.nombre_couches_enduit === 'deux_couches' ? 2 : answers.nombre_couches_enduit === 'trois_couches' ? 3 : 1;
    tarifEnduit *= nbCouches;

    const prix = surfaceEnduit * tarifEnduit;
    details.push({ label: 'Enduit', quantity: surfaceEnduit, unitPrice: tarifEnduit, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_rebouchage === 'leger') {
    const prix = surfaceTotale * 5;
    details.push({ label: 'Rebouchage léger', quantity: surfaceTotale, unitPrice: 5, total: prix });
    totalHT += prix;
  } else if (answers.besoin_rebouchage === 'important') {
    const prix = surfaceTotale * 12;
    details.push({ label: 'Rebouchage important', quantity: surfaceTotale, unitPrice: 12, total: prix });
    totalHT += prix;
  }

  const longueurJoints = parseFloat(answers.longueur_joints) || 0;
  if (longueurJoints > 0) {
    let tarifJoints = 8;
    if (answers.type_joints === 'joints_placoplatre') tarifJoints = 8;
    else if (answers.type_joints === 'joints_carrelage') tarifJoints = 10;
    else if (answers.type_joints === 'joints_dilatation') tarifJoints = 12;

    const prix = longueurJoints * tarifJoints;
    details.push({ label: 'Joints', quantity: longueurJoints, unitPrice: tarifJoints, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_decapage_platerie === 'partiel') {
    const prix = surfaceTotale * 5;
    details.push({ label: 'Décapage partiel', quantity: surfaceTotale, unitPrice: 5, total: prix });
    totalHT += prix;
  } else if (answers.besoin_decapage_platerie === 'complet') {
    const prix = surfaceTotale * 10;
    details.push({ label: 'Décapage complet', quantity: surfaceTotale, unitPrice: 10, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_nettoyage_platerie === 'oui') {
    const prix = surfaceTotale * 3;
    details.push({ label: 'Nettoyage', quantity: surfaceTotale, unitPrice: 3, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_placoplatre_hydrofuge === 'oui') {
    const prix = surfaceTotale * 8;
    details.push({ label: 'Surcoût placoplatre hydrofuge', quantity: surfaceTotale, unitPrice: 8, total: prix });
    totalHT += prix;
  }

  if (answers.acces_difficile_platerie === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const tva = parseFloat(answers.tva_platerie) || 20;
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

export default calculatePlatrerieNew;
