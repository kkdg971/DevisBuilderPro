import React, { useMemo } from 'react';
import { DevisCalculeAvecTVA } from '../calculators/index';

interface DevisViewProps {
  devisData: DevisCalculeAvecTVA | any;
}

export const DevisView: React.FC<DevisViewProps> = ({ devisData }) => {
  // Déterminer si c'est un format simple (un métier) ou complexe (plusieurs métiers)
  const isSimpleFormat = devisData?.poste && devisData?.lignes;

  const totalsByMetier = useMemo(() => {
    if (isSimpleFormat) {
      return null;
    }

    const totals: Record<string, any> = {};
    if (devisData?.postes) {
      devisData.postes.forEach((poste: any) => {
        totals[poste] = devisData.answers?.[poste]?.total || 0;
      });
    }
    return totals;
  }, [devisData, isSimpleFormat]);

  if (isSimpleFormat) {
    // Format simple : un seul métier
    const { poste, lignes, totalHT, montantTVA, totalTTC, tauxTVA } = devisData;

    return (
      <div className="w-full bg-white rounded-lg shadow-lg p-8">
        {/* En-tête */}
        <div className="mb-8 border-b-2 border-blue-600 pb-4">
          <h1 className="text-3xl font-bold text-gray-800">DEVIS</h1>
          <p className="text-lg text-blue-600 font-semibold mt-2">{poste}</p>
        </div>

        {/* Tableau des lignes */}
        <div className="mb-8 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-gray-100 border-b-2 border-gray-300">
                <th className="border border-gray-300 px-4 py-3 text-left font-semibold text-gray-700">
                  Désignation
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                  Quantité
                </th>
                <th className="border border-gray-300 px-4 py-3 text-center font-semibold text-gray-700">
                  Unité
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">
                  Prix Unitaire
                </th>
                <th className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-700">
                  Montant HT
                </th>
              </tr>
            </thead>
            <tbody>
              {lignes && lignes.length > 0 ? (
                lignes.map((ligne: any, index: number) => (
                  <tr key={index} className="border-b border-gray-200 hover:bg-gray-50">
                    <td className="border border-gray-300 px-4 py-3 text-gray-800">{ligne.designation}</td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">
                      {typeof ligne.quantite === 'number' ? ligne.quantite.toFixed(2) : ligne.quantite}
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-center text-gray-800">{ligne.unite}</td>
                    <td className="border border-gray-300 px-4 py-3 text-right text-gray-800">
                      {typeof ligne.prixUnitaire === 'number' ? ligne.prixUnitaire.toFixed(2) : ligne.prixUnitaire} €
                    </td>
                    <td className="border border-gray-300 px-4 py-3 text-right font-semibold text-gray-800">
                      {typeof ligne.montantHT === 'number' ? ligne.montantHT.toFixed(2) : ligne.montantHT} €
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="border border-gray-300 px-4 py-3 text-center text-gray-500">
                    Aucune ligne de devis
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totaux */}
        <div className="flex justify-end mb-8">
          <div className="w-full max-w-md">
            {/* Total HT */}
            <div className="flex justify-between items-center py-3 border-b border-gray-300">
              <span className="text-gray-700 font-semibold">Total HT :</span>
              <span className="text-gray-800 font-semibold text-lg">{totalHT?.toFixed(2) || '0.00'} €</span>
            </div>

            {/* TVA */}
            <div className="flex justify-between items-center py-3 border-b border-gray-300">
              <span className="text-gray-700 font-semibold">
                TVA ({tauxTVA || 20}%) :
              </span>
              <span className="text-gray-800 font-semibold text-lg">{montantTVA?.toFixed(2) || '0.00'} €</span>
            </div>

            {/* Total TTC */}
            <div className="flex justify-between items-center py-4 bg-blue-50 px-4 rounded-lg">
              <span className="text-blue-900 font-bold text-lg">Total TTC :</span>
              <span className="text-blue-900 font-bold text-2xl">{totalTTC?.toFixed(2) || '0.00'} €</span>
            </div>
          </div>
        </div>

        {/* Conditions */}
        <div className="bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
          <p className="font-semibold text-gray-700 mb-2">Conditions générales :</p>
          <ul className="list-disc list-inside space-y-1">
            <li>Devis valable 30 jours</li>
            <li>Acompte de 30% à la commande</li>
            <li>Solde à la livraison</li>
            <li>Délai de réalisation : à convenir</li>
          </ul>
        </div>
      </div>
    );
  }

  // Format complexe : plusieurs métiers
  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-8">
      <div className="mb-8 border-b-2 border-blue-600 pb-4">
        <h1 className="text-3xl font-bold text-gray-800">DEVIS COMPLET</h1>
        <p className="text-gray-600 mt-2">Plusieurs corps de métier</p>
      </div>

      <div className="space-y-8">
        {devisData?.postes?.map((poste: string, index: number) => (
          <div key={index} className="border-l-4 border-blue-600 pl-6">
            <h2 className="text-xl font-bold text-gray-800 mb-4">{poste}</h2>
            <p className="text-gray-600">
              Total : {totalsByMetier?.[poste]?.toFixed(2) || '0.00'} €
            </p>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg text-sm text-gray-600">
        <p className="font-semibold text-gray-700 mb-2">Conditions générales :</p>
        <ul className="list-disc list-inside space-y-1">
          <li>Devis valable 30 jours</li>
          <li>Acompte de 30% à la commande</li>
          <li>Solde à la livraison</li>
          <li>Délai de réalisation : à convenir</li>
        </ul>
      </div>
    </div>
  );
};

export default DevisView;