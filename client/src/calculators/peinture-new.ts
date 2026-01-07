export function calculatePeintureNew(answers: any) {
  let totalHT = 0;
  const details: Array<{ label: string; quantity: number; unitPrice: number; total: number }> = [];

  const surfaceMurs = parseFloat(answers.surface_murs) || 0;
  const surfacePlafonds = parseFloat(answers.surface_plafonds) || 0;
  const surfaceBoiseries = parseFloat(answers.surface_boiseries) || 0;
  const totalSurface = surfaceMurs + surfacePlafonds + surfaceBoiseries;

  let tarifBase = 15;
  if (answers.etat_surface === 'bon_etat') tarifBase = 12;
  else if (answers.etat_surface === 'etat_moyen') tarifBase = 15;
  else if (answers.etat_surface === 'mauvais_etat') tarifBase = 20;
  else if (answers.etat_surface === 'tres_mauvais_etat') tarifBase = 25;

  if (surfaceMurs > 0) {
    const prixMurs = surfaceMurs * tarifBase;
    details.push({ label: 'Peinture murs', quantity: surfaceMurs, unitPrice: tarifBase, total: prixMurs });
    totalHT += prixMurs;
  }

  if (surfacePlafonds > 0) {
    const tarifPlafonds = tarifBase * 1.3;
    const prixPlafonds = surfacePlafonds * tarifPlafonds;
    details.push({ label: 'Peinture plafonds', quantity: surfacePlafonds, unitPrice: tarifPlafonds, total: prixPlafonds });
    totalHT += prixPlafonds;
  }

  if (surfaceBoiseries > 0) {
    const tarifBoiseries = tarifBase * 1.5;
    const prixBoiseries = surfaceBoiseries * tarifBoiseries;
    details.push({ label: 'Peinture boiseries', quantity: surfaceBoiseries, unitPrice: tarifBoiseries, total: prixBoiseries });
    totalHT += prixBoiseries;
  }

  if (answers.besoin_decapage === 'partiel') {
    const prixDecapage = totalSurface * 5;
    details.push({ label: 'Décapage partiel', quantity: totalSurface, unitPrice: 5, total: prixDecapage });
    totalHT += prixDecapage;
  } else if (answers.besoin_decapage === 'complet') {
    const prixDecapage = totalSurface * 8;
    details.push({ label: 'Décapage complet', quantity: totalSurface, unitPrice: 8, total: prixDecapage });
    totalHT += prixDecapage;
  }

  if (answers.besoin_rebouchage === 'leger') {
    const prixRebouchage = totalSurface * 3;
    details.push({ label: 'Rebouchage léger', quantity: totalSurface, unitPrice: 3, total: prixRebouchage });
    totalHT += prixRebouchage;
  } else if (answers.besoin_rebouchage === 'important') {
    const prixRebouchage = totalSurface * 6;
    details.push({ label: 'Rebouchage important', quantity: totalSurface, unitPrice: 6, total: prixRebouchage });
    totalHT += prixRebouchage;
  }

  if (answers.besoin_ponçage === 'leger') {
    const prixPoncage = totalSurface * 2;
    details.push({ label: 'Ponçage léger', quantity: totalSurface, unitPrice: 2, total: prixPoncage });
    totalHT += prixPoncage;
  } else if (answers.besoin_ponçage === 'complet') {
    const prixPoncage = totalSurface * 5;
    details.push({ label: 'Ponçage complet', quantity: totalSurface, unitPrice: 5, total: prixPoncage });
    totalHT += prixPoncage;
  }

  if (answers.besoin_nettoyage === 'oui') {
    const prixNettoyage = totalSurface * 2;
    details.push({ label: 'Nettoyage/Dégraissage', quantity: totalSurface, unitPrice: 2, total: prixNettoyage });
    totalHT += prixNettoyage;
  }

  if (answers.besoin_sous_couche === 'partiel') {
    const prixSousCouche = totalSurface * 0.5 * 5;
    details.push({ label: 'Sous-couche partielle', quantity: totalSurface * 0.5, unitPrice: 5, total: prixSousCouche });
    totalHT += prixSousCouche;
  } else if (answers.besoin_sous_couche === 'complet') {
    const prixSousCouche = totalSurface * 5;
    details.push({ label: 'Sous-couche complète', quantity: totalSurface, unitPrice: 5, total: prixSousCouche });
    totalHT += prixSousCouche;
  }

  if (answers.acces_difficile === 'oui') {
    const prixAcces = totalHT * 0.15;
    details.push({ label: 'Surcoût accès difficile (15%)', quantity: 1, unitPrice: prixAcces, total: prixAcces });
    totalHT += prixAcces;
  }

  if (answers.besoin_echafaudage === 'oui') {
    const prixEchafaudage = 500;
    details.push({ label: 'Échafaudage/Matériel spécial', quantity: 1, unitPrice: 500, total: 500 });
    totalHT += prixEchafaudage;
  }

  const tva = parseFloat(answers.tva_peinture) || 20;
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

export default calculatePeintureNew;
