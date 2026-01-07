export function calculatePlomberieNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const nbBaignoires = parseFloat(answers.nombre_baignoires) || 0;
  const nbDouches = parseFloat(answers.nombre_douches) || 0;
  const nbLavabos = parseFloat(answers.nombre_lavabos) || 0;
  const nbWC = parseFloat(answers.nombre_wc) || 0;
  const nbBidets = parseFloat(answers.nombre_bidets) || 0;
  const nbEviers = parseFloat(answers.nombre_eviers) || 0;
  const nbRobinetExt = parseFloat(answers.nombre_robinets_exterieurs) || 0;

  if (nbBaignoires > 0) {
    const prix = nbBaignoires * 400;
    details.push({ label: 'Baignoires', quantity: nbBaignoires, unitPrice: 400, total: prix });
    totalHT += prix;
  }
  if (nbDouches > 0) {
    const prix = nbDouches * 350;
    details.push({ label: 'Douches', quantity: nbDouches, unitPrice: 350, total: prix });
    totalHT += prix;
  }
  if (nbLavabos > 0) {
    const prix = nbLavabos * 150;
    details.push({ label: 'Lavabos', quantity: nbLavabos, unitPrice: 150, total: prix });
    totalHT += prix;
  }
  if (nbWC > 0) {
    const prix = nbWC * 200;
    details.push({ label: 'WC', quantity: nbWC, unitPrice: 200, total: prix });
    totalHT += prix;
  }
  if (nbBidets > 0) {
    const prix = nbBidets * 180;
    details.push({ label: 'Bidets', quantity: nbBidets, unitPrice: 180, total: prix });
    totalHT += prix;
  }
  if (nbEviers > 0) {
    const prix = nbEviers * 120;
    details.push({ label: 'Éviers', quantity: nbEviers, unitPrice: 120, total: prix });
    totalHT += prix;
  }
  if (nbRobinetExt > 0) {
    const prix = nbRobinetExt * 80;
    details.push({ label: 'Robinets extérieurs', quantity: nbRobinetExt, unitPrice: 80, total: prix });
    totalHT += prix;
  }

  const longueurEauFroide = parseFloat(answers.longueur_tuyauterie_eau_froide) || 0;
  const longueurEauChaude = parseFloat(answers.longueur_tuyauterie_eau_chaude) || 0;
  const longueurEvacuation = parseFloat(answers.longueur_evacuation) || 0;

  if (longueurEauFroide > 0) {
    const prix = longueurEauFroide * 20;
    details.push({ label: 'Tuyauterie eau froide', quantity: longueurEauFroide, unitPrice: 20, total: prix });
    totalHT += prix;
  }
  if (longueurEauChaude > 0) {
    const prix = longueurEauChaude * 25;
    details.push({ label: 'Tuyauterie eau chaude', quantity: longueurEauChaude, unitPrice: 25, total: prix });
    totalHT += prix;
  }
  if (longueurEvacuation > 0) {
    const prix = longueurEvacuation * 18;
    details.push({ label: 'Tuyauterie évacuation', quantity: longueurEvacuation, unitPrice: 18, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_chauffe_eau === 'oui') {
    let prixCE = 600;
    if (answers.type_chauffe_eau === 'electrique') prixCE = 600;
    else if (answers.type_chauffe_eau === 'gaz') prixCE = 800;
    else if (answers.type_chauffe_eau === 'thermodynamique') prixCE = 1500;
    else if (answers.type_chauffe_eau === 'solaire') prixCE = 2500;
    else if (answers.type_chauffe_eau === 'pompe_chaleur') prixCE = 2000;

    details.push({ label: 'Chauffe-eau', quantity: 1, unitPrice: prixCE, total: prixCE });
    totalHT += prixCE;
  }

  const nbRobinets = nbLavabos + nbEviers + nbBaignoires + nbDouches;
  if (nbRobinets > 0) {
    const prix = nbRobinets * 80;
    details.push({ label: 'Robinetterie', quantity: nbRobinets, unitPrice: 80, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_lave_vaisselle === 'oui') {
    const prix = 150;
    details.push({ label: 'Raccordement lave-vaisselle', quantity: 1, unitPrice: 150, total: 150 });
    totalHT += prix;
  }
  if (answers.besoin_lave_linge === 'oui') {
    const prix = 150;
    details.push({ label: 'Raccordement lave-linge', quantity: 1, unitPrice: 150, total: 150 });
    totalHT += prix;
  }
  if (answers.besoin_seche_linge === 'oui') {
    const prix = 150;
    details.push({ label: 'Raccordement sèche-linge', quantity: 1, unitPrice: 150, total: 150 });
    totalHT += prix;
  }

  if (answers.besoin_wc_japonais === 'oui') {
    const prix = 600;
    details.push({ label: 'WC japonais/bidet électronique', quantity: 1, unitPrice: 600, total: 600 });
    totalHT += prix;
  }

  if (answers.etat_tuyauterie_existante === 'mauvais_etat') {
    const prixRempl = (longueurEauFroide + longueurEauChaude + longueurEvacuation) * 10;
    details.push({ label: 'Surcoût remplacement tuyauterie', quantity: 1, unitPrice: prixRempl, total: prixRempl });
    totalHT += prixRempl;
  }

  if (answers.presence_fuites === 'legeres') {
    const prix = 200;
    details.push({ label: 'Réparation fuites légères', quantity: 1, unitPrice: 200, total: 200 });
    totalHT += prix;
  } else if (answers.presence_fuites === 'importantes') {
    const prix = 500;
    details.push({ label: 'Réparation fuites importantes', quantity: 1, unitPrice: 500, total: 500 });
    totalHT += prix;
  }

  if (answers.acces_difficile_plomb === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const tva = parseFloat(answers.tva_plomberie) || 20;
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

export default calculatePlomberieNew;
