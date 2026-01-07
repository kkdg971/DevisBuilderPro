export function calculateIsolationNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const surfaceCombles = parseFloat(answers.surface_combles) || 0;
  if (surfaceCombles > 0) {
    let tarifCombles = 25;
    if (answers.type_materiau_isolation === 'laine_verre') tarifCombles = 20;
    else if (answers.type_materiau_isolation === 'laine_roche') tarifCombles = 25;
    else if (answers.type_materiau_isolation === 'polystyrene') tarifCombles = 22;
    else if (answers.type_materiau_isolation === 'liege') tarifCombles = 40;
    else if (answers.type_materiau_isolation === 'chanvre') tarifCombles = 35;

    const prix = surfaceCombles * tarifCombles;
    details.push({ label: 'Isolation combles', quantity: surfaceCombles, unitPrice: tarifCombles, total: prix });
    totalHT += prix;
  }

  const surfaceToiture = parseFloat(answers.surface_toiture) || 0;
  if (surfaceToiture > 0) {
    let tarifToiture = 35;
    if (answers.type_materiau_isolation === 'laine_verre') tarifToiture = 30;
    else if (answers.type_materiau_isolation === 'laine_roche') tarifToiture = 35;
    else if (answers.type_materiau_isolation === 'polystyrene') tarifToiture = 32;
    else if (answers.type_materiau_isolation === 'polyurethane') tarifToiture = 45;
    else if (answers.type_materiau_isolation === 'liege') tarifToiture = 50;

    const prix = surfaceToiture * tarifToiture;
    details.push({ label: 'Isolation toiture', quantity: surfaceToiture, unitPrice: tarifToiture, total: prix });
    totalHT += prix;
  }

  const surfaceMursInt = parseFloat(answers.surface_murs_int) || 0;
  if (surfaceMursInt > 0) {
    let tarifMursInt = 40;
    if (answers.type_materiau_isolation === 'laine_verre') tarifMursInt = 35;
    else if (answers.type_materiau_isolation === 'laine_roche') tarifMursInt = 40;
    else if (answers.type_materiau_isolation === 'polystyrene') tarifMursInt = 38;
    else if (answers.type_materiau_isolation === 'liege') tarifMursInt = 55;
    else if (answers.type_materiau_isolation === 'bois') tarifMursInt = 50;

    const prix = surfaceMursInt * tarifMursInt;
    details.push({ label: 'Isolation murs intérieurs', quantity: surfaceMursInt, unitPrice: tarifMursInt, total: prix });
    totalHT += prix;
  }

  const surfaceMursExt = parseFloat(answers.surface_murs_ext) || 0;
  if (surfaceMursExt > 0) {
    let tarifMursExt = 55;
    if (answers.type_isolation_ext === 'ite_polystyrene') tarifMursExt = 50;
    else if (answers.type_isolation_ext === 'ite_laine_roche') tarifMursExt = 60;
    else if (answers.type_isolation_ext === 'ite_liege') tarifMursExt = 75;
    else if (answers.type_isolation_ext === 'ite_bois') tarifMursExt = 70;

    const prix = surfaceMursExt * tarifMursExt;
    details.push({ label: 'Isolation murs extérieurs (ITE)', quantity: surfaceMursExt, unitPrice: tarifMursExt, total: prix });
    totalHT += prix;
  }

  const surfaceSol = parseFloat(answers.surface_sol) || 0;
  if (surfaceSol > 0) {
    let tarifSol = 30;
    if (answers.type_materiau_isolation === 'laine_verre') tarifSol = 25;
    else if (answers.type_materiau_isolation === 'laine_roche') tarifSol = 30;
    else if (answers.type_materiau_isolation === 'polystyrene') tarifSol = 28;
    else if (answers.type_materiau_isolation === 'polyurethane') tarifSol = 40;

    const prix = surfaceSol * tarifSol;
    details.push({ label: 'Isolation sol', quantity: surfaceSol, unitPrice: tarifSol, total: prix });
    totalHT += prix;
  }

  const surfaceCave = parseFloat(answers.surface_cave) || 0;
  if (surfaceCave > 0) {
    let tarifCave = 35;
    if (answers.type_materiau_isolation === 'laine_verre') tarifCave = 30;
    else if (answers.type_materiau_isolation === 'laine_roche') tarifCave = 35;
    else if (answers.type_materiau_isolation === 'polystyrene') tarifCave = 33;

    if (answers.presence_humidite_cave === 'importante') tarifCave *= 1.3;

    const prix = surfaceCave * tarifCave;
    details.push({ label: 'Isolation cave/sous-sol', quantity: surfaceCave, unitPrice: tarifCave, total: prix });
    totalHT += prix;
  }

  const totalSurface = surfaceCombles + surfaceToiture + surfaceMursInt + surfaceMursExt + surfaceSol + surfaceCave;
  if (answers.besoin_pare_vapeur === 'oui' && totalSurface > 0) {
    const prix = totalSurface * 5;
    details.push({ label: 'Pare-vapeur', quantity: totalSurface, unitPrice: 5, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_pare_air === 'oui' && totalSurface > 0) {
    const prix = totalSurface * 4;
    details.push({ label: 'Pare-air', quantity: totalSurface, unitPrice: 4, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_isolation_acoustique === 'legere') {
    const prix = totalSurface * 8;
    details.push({ label: 'Isolation acoustique légère', quantity: totalSurface, unitPrice: 8, total: prix });
    totalHT += prix;
  } else if (answers.besoin_isolation_acoustique === 'importante') {
    const prix = totalSurface * 15;
    details.push({ label: 'Isolation acoustique importante', quantity: totalSurface, unitPrice: 15, total: prix });
    totalHT += prix;
  }

  if (answers.acces_difficile_isolation === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  if (answers.presence_amiante === 'probable') {
    const prix = totalSurface * 50;
    details.push({ label: 'Désamiantage', quantity: totalSurface, unitPrice: 50, total: prix });
    totalHT += prix;
  }

  const tva = parseFloat(answers.tva_isolation) || 20;
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

export default calculateIsolationNew;
