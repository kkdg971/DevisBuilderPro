export function calculateVmcNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  let prixUniteCentrale = 0;
  if (answers.type_vmc_principal) {
    if (answers.type_vmc_principal === 'simple_flux') prixUniteCentrale = 400;
    else if (answers.type_vmc_principal === 'simple_flux_hygroreglable') prixUniteCentrale = 600;
    else if (answers.type_vmc_principal === 'double_flux') prixUniteCentrale = 1200;
    else if (answers.type_vmc_principal === 'double_flux_thermodynamique') prixUniteCentrale = 2000;
    else if (answers.type_vmc_principal === 'hybride') prixUniteCentrale = 1500;

    details.push({ label: 'Unité centrale VMC', quantity: 1, unitPrice: prixUniteCentrale, total: prixUniteCentrale });
    totalHT += prixUniteCentrale;
  }

  const nbBouchesExtraction = parseFloat(answers.nombre_bouches_extraction) || 0;
  if (nbBouchesExtraction > 0) {
    let prixBouche = 50;
    if (answers.type_bouches_extraction === 'hygroreglable') prixBouche = 80;
    else if (answers.type_bouches_extraction === 'thermostatique') prixBouche = 100;

    const prix = nbBouchesExtraction * prixBouche;
    details.push({ label: 'Bouches d\'extraction', quantity: nbBouchesExtraction, unitPrice: prixBouche, total: prix });
    totalHT += prix;
  }

  const nbEntreesAir = parseFloat(answers.nombre_entrees_air) || 0;
  if (nbEntreesAir > 0) {
    let prixEntree = 40;
    if (answers.type_entrees_air === 'hygroreglable') prixEntree = 70;
    else if (answers.type_entrees_air === 'acoustique') prixEntree = 60;

    const prix = nbEntreesAir * prixEntree;
    details.push({ label: 'Entrées d\'air', quantity: nbEntreesAir, unitPrice: prixEntree, total: prix });
    totalHT += prix;
  }

  const longueurGaines = parseFloat(answers.longueur_gaines) || 0;
  if (longueurGaines > 0) {
    let tarifGaines = 15;
    if (answers.type_gaines === 'rigides') tarifGaines = 20;
    else if (answers.type_gaines === 'souples') tarifGaines = 12;

    if (answers.isolation_gaines === 'oui') tarifGaines += 5;

    const prix = longueurGaines * tarifGaines;
    details.push({ label: 'Gaines', quantity: longueurGaines, unitPrice: tarifGaines, total: prix });
    totalHT += prix;
  }

  const longueurEvacuation = parseFloat(answers.longueur_evacuation) || 0;
  if (longueurEvacuation > 0) {
    let tarifEvacuation = 18;
    if (answers.type_evacuation === 'facade') tarifEvacuation = 20;
    else if (answers.type_evacuation === 'toiture') tarifEvacuation = 25;
    else if (answers.type_evacuation === 'conduit_existant') tarifEvacuation = 10;

    const prix = longueurEvacuation * tarifEvacuation;
    details.push({ label: 'Conduit d\'évacuation', quantity: longueurEvacuation, unitPrice: tarifEvacuation, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_thermostat) {
    let prixControle = 0;
    if (answers.besoin_thermostat === 'simple') prixControle = 100;
    else if (answers.besoin_thermostat === 'programmable') prixControle = 250;
    else if (answers.besoin_thermostat === 'connecte') prixControle = 400;

    if (prixControle > 0) {
      details.push({ label: 'Thermostat/Contrôle', quantity: 1, unitPrice: prixControle, total: prixControle });
      totalHT += prixControle;
    }
  }

  if (answers.besoin_detecteur_humidite === 'oui') {
    const prix = 150;
    details.push({ label: 'Détecteur d\'humidité', quantity: 1, unitPrice: 150, total: 150 });
    totalHT += prix;
  }

  if (answers.besoin_detecteur_presence === 'oui') {
    const prix = 120;
    details.push({ label: 'Détecteur de présence', quantity: 1, unitPrice: 120, total: 120 });
    totalHT += prix;
  }

  if (answers.besoin_filtration) {
    let prixFiltration = 0;
    if (answers.besoin_filtration === 'simple') prixFiltration = 100;
    else if (answers.besoin_filtration === 'haute_performance') prixFiltration = 250;

    if (prixFiltration > 0) {
      details.push({ label: 'Filtration', quantity: 1, unitPrice: prixFiltration, total: prixFiltration });
      totalHT += prixFiltration;
    }
  }

  if (answers.acces_difficile_vmc === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const prixInstallation = Math.max(400, totalHT * 0.1);
  details.push({ label: 'Mise en place et installation', quantity: 1, unitPrice: prixInstallation, total: prixInstallation });
  totalHT += prixInstallation;

  const tva = parseFloat(answers.tva_vmc) || 20;
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

export default calculateVmcNew;
