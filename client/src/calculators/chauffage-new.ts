export function calculateChauffageNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  let prixChaudiere = 0;
  if (answers.type_chauffage_principal) {
    if (answers.type_chauffage_principal === 'chaudiere_gaz') prixChaudiere = 1200;
    else if (answers.type_chauffage_principal === 'chaudiere_gaz_condensation') prixChaudiere = 2000;
    else if (answers.type_chauffage_principal === 'chaudiere_fioul') prixChaudiere = 1500;
    else if (answers.type_chauffage_principal === 'chaudiere_bois') prixChaudiere = 2500;
    else if (answers.type_chauffage_principal === 'pompe_chaleur_air_air') prixChaudiere = 3000;
    else if (answers.type_chauffage_principal === 'pompe_chaleur_air_eau') prixChaudiere = 4000;
    else if (answers.type_chauffage_principal === 'pompe_chaleur_geothermie') prixChaudiere = 6000;
    else if (answers.type_chauffage_principal === 'radiateurs_electriques') prixChaudiere = 500;
    else if (answers.type_chauffage_principal === 'chauffage_sol') prixChaudiere = 2000;
    else if (answers.type_chauffage_principal === 'chauffage_mural') prixChaudiere = 1500;

    details.push({ label: 'Chaudière/Système principal', quantity: 1, unitPrice: prixChaudiere, total: prixChaudiere });
    totalHT += prixChaudiere;
  }

  if (answers.besoin_ballon_eau_chaude === 'oui') {
    let prixBallon = 600;
    if (answers.capacite_ballon === '100') prixBallon = 400;
    else if (answers.capacite_ballon === '150') prixBallon = 500;
    else if (answers.capacite_ballon === '200') prixBallon = 600;
    else if (answers.capacite_ballon === '250') prixBallon = 750;
    else if (answers.capacite_ballon === '300') prixBallon = 900;
    else if (answers.capacite_ballon === '400') prixBallon = 1200;

    details.push({ label: 'Ballon d\'eau chaude', quantity: 1, unitPrice: prixBallon, total: prixBallon });
    totalHT += prixBallon;
  }

  const nbRadiateurs = parseFloat(answers.nombre_radiateurs) || 0;
  if (nbRadiateurs > 0) {
    let prixRadiateur = 250;
    if (answers.type_radiateurs === 'fonte') prixRadiateur = 300;
    else if (answers.type_radiateurs === 'acier') prixRadiateur = 250;
    else if (answers.type_radiateurs === 'aluminium') prixRadiateur = 200;
    else if (answers.type_radiateurs === 'design') prixRadiateur = 400;

    const prix = nbRadiateurs * prixRadiateur;
    details.push({ label: 'Radiateurs', quantity: nbRadiateurs, unitPrice: prixRadiateur, total: prix });
    totalHT += prix;
  }

  const surfaceChauffageSol = parseFloat(answers.surface_chauffage_sol) || 0;
  if (surfaceChauffageSol > 0) {
    let tarifSol = 80;
    if (answers.type_chauffage_sol === 'eau_chaude') tarifSol = 80;
    else if (answers.type_chauffage_sol === 'electrique') tarifSol = 60;

    const prix = surfaceChauffageSol * tarifSol;
    details.push({ label: 'Chauffage au sol', quantity: surfaceChauffageSol, unitPrice: tarifSol, total: prix });
    totalHT += prix;
  }

  const longueurTuyauterie = parseFloat(answers.longueur_tuyauterie_chauffage) || 0;
  if (longueurTuyauterie > 0) {
    let tarifTuyauterie = 25;
    if (answers.type_tuyauterie_chauffage === 'cuivre') tarifTuyauterie = 35;
    else if (answers.type_tuyauterie_chauffage === 'pvc') tarifTuyauterie = 15;
    else if (answers.type_tuyauterie_chauffage === 'multicouche') tarifTuyauterie = 25;
    else if (answers.type_tuyauterie_chauffage === 'pex') tarifTuyauterie = 20;

    const prix = longueurTuyauterie * tarifTuyauterie;
    details.push({ label: 'Tuyauterie chauffage', quantity: longueurTuyauterie, unitPrice: tarifTuyauterie, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_thermostat) {
    let prixThermostat = 0;
    if (answers.besoin_thermostat === 'simple') prixThermostat = 150;
    else if (answers.besoin_thermostat === 'programmable') prixThermostat = 300;
    else if (answers.besoin_thermostat === 'connecte') prixThermostat = 500;

    if (prixThermostat > 0) {
      details.push({ label: 'Thermostat', quantity: 1, unitPrice: prixThermostat, total: prixThermostat });
      totalHT += prixThermostat;
    }
  }

  if (answers.besoin_vannes_thermostatiques === 'partiel') {
    const prix = nbRadiateurs * 0.5 * 40;
    details.push({ label: 'Vannes thermostatiques (partielles)', quantity: nbRadiateurs * 0.5, unitPrice: 40, total: prix });
    totalHT += prix;
  } else if (answers.besoin_vannes_thermostatiques === 'complet') {
    const prix = nbRadiateurs * 40;
    details.push({ label: 'Vannes thermostatiques (complètes)', quantity: nbRadiateurs, unitPrice: 40, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_circulateur === 'oui') {
    const prix = 400;
    details.push({ label: 'Circulateur', quantity: 1, unitPrice: 400, total: 400 });
    totalHT += prix;
  }

  const surfacePanneaux = parseFloat(answers.surface_panneaux_solaires) || 0;
  if (surfacePanneaux > 0) {
    const prix = surfacePanneaux * 800;
    details.push({ label: 'Panneaux solaires thermiques', quantity: surfacePanneaux, unitPrice: 800, total: prix });
    totalHT += prix;
  }

  if (answers.acces_difficile_chauffage === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const prixInstallation = Math.max(500, totalHT * 0.1);
  details.push({ label: 'Mise en place et installation', quantity: 1, unitPrice: prixInstallation, total: prixInstallation });
  totalHT += prixInstallation;

  const tva = parseFloat(answers.tva_chauffage) || 20;
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

export default calculateChauffageNew;
