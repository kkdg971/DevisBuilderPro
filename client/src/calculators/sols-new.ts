export function calculateSolsNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const surfaceSols = parseFloat(answers.surface_sols) || 0;

  if (surfaceSols === 0) {
    return { details: [], totalHT: 0, tva: 20, montantTVA: 0, totalTTC: 0 };
  }

  let tarifBase = 50;
  let label = 'Revêtement de sol';

  if (answers.type_revetement === 'carrelage') {
    tarifBase = 60;
    label = 'Carrelage';
    if (answers.format_carrelage === 'petit') tarifBase = 55;
    else if (answers.format_carrelage === 'grand') tarifBase = 65;
    else if (answers.format_carrelage === 'tres_grand') tarifBase = 75;
  } else if (answers.type_revetement === 'parquet_massif') {
    tarifBase = 80;
    label = 'Parquet massif';
  } else if (answers.type_revetement === 'parquet_stratifie') {
    tarifBase = 50;
    label = 'Parquet stratifié';
  } else if (answers.type_revetement === 'vinyle') {
    tarifBase = 45;
    label = 'Vinyle';
  } else if (answers.type_revetement === 'liege') {
    tarifBase = 70;
    label = 'Liège';
  } else if (answers.type_revetement === 'pierre_naturelle') {
    tarifBase = 90;
    label = 'Pierre naturelle';
  } else if (answers.type_revetement === 'beton_cire') {
    tarifBase = 100;
    label = 'Béton ciré';
  } else if (answers.type_revetement === 'resine') {
    tarifBase = 110;
    label = 'Résine';
  } else if (answers.type_revetement === 'moquette') {
    tarifBase = 40;
    label = 'Moquette';
  } else if (answers.type_revetement === 'lino') {
    tarifBase = 35;
    label = 'Linoléum';
  }

  const prixRevêtement = surfaceSols * tarifBase;
  details.push({ label, quantity: surfaceSols, unitPrice: tarifBase, total: prixRevêtement });
  totalHT += prixRevêtement;

  if (answers.besoin_enlever_ancien_revetement === 'oui') {
    const prix = surfaceSols * 15;
    details.push({ label: 'Enlèvement ancien revêtement', quantity: surfaceSols, unitPrice: 15, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_nivellement === 'leger') {
    const prix = surfaceSols * 10;
    details.push({ label: 'Nivellement léger', quantity: surfaceSols, unitPrice: 10, total: prix });
    totalHT += prix;
  } else if (answers.besoin_nivellement === 'important') {
    const prix = surfaceSols * 25;
    details.push({ label: 'Nivellement important', quantity: surfaceSols, unitPrice: 25, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_sous_couche === 'acoustique') {
    const prix = surfaceSols * 12;
    details.push({ label: 'Sous-couche acoustique', quantity: surfaceSols, unitPrice: 12, total: prix });
    totalHT += prix;
  } else if (answers.besoin_sous_couche === 'thermique') {
    const prix = surfaceSols * 15;
    details.push({ label: 'Sous-couche thermique', quantity: surfaceSols, unitPrice: 15, total: prix });
    totalHT += prix;
  } else if (answers.besoin_sous_couche === 'humidite') {
    const prix = surfaceSols * 18;
    details.push({ label: 'Sous-couche anti-humidité', quantity: surfaceSols, unitPrice: 18, total: prix });
    totalHT += prix;
  }

  if (answers.type_revetement === 'carrelage' && answers.besoin_sous_couche) {
    const prixJoints = surfaceSols * 8;
    details.push({ label: 'Joints carrelage', quantity: surfaceSols, unitPrice: 8, total: prixJoints });
    totalHT += prixJoints;
  }

  if (answers.besoin_baguette_finition === 'oui') {
    const longueurBaguette = (parseFloat(answers.nombre_pieces) || 1) * 10;
    const prix = longueurBaguette * 5;
    details.push({ label: 'Baguette de finition', quantity: longueurBaguette, unitPrice: 5, total: prix });
    totalHT += prix;
  }

  if (answers.besoin_chauffage_sol === 'oui') {
    const prix = surfaceSols * 80;
    details.push({ label: 'Chauffage au sol', quantity: surfaceSols, unitPrice: 80, total: prix });
    totalHT += prix;
  }

  if (answers.acces_difficile_sols === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  const tva = parseFloat(answers.tva_sols) || 20;
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

export default calculateSolsNew;
