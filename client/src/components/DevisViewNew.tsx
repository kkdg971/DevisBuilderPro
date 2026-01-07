import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Pencil, Save, X, Download, Clock, AlertCircle, RotateCcw, ChevronLeft, ChevronRight } from "lucide-react";
import type { DevisStructure, DevisPhase, DevisSection, DevisLine } from "../types/devis";

interface DevisViewNewProps {
  devis: DevisStructure;
  poste: string;
  onClose: () => void;
}

export default function DevisViewNew({ devis, poste, onClose }: DevisViewNewProps) {
  const [editMode, setEditMode] = useState(false);
  const [editedDevis, setEditedDevis] = useState<DevisStructure>(devis);
  const [modifiedPrices, setModifiedPrices] = useState<Set<string>>(new Set());
  const [currentPage, setCurrentPage] = useState(0);

  // Diviser le contenu en pages
  const pages = generatePages(editedDevis);
  const totalPages = pages.length;

  const handlePrixChange = (
    phaseIndex: number,
    sectionIndex: number,
    ligneIndex: number,
    newPrix: number
  ) => {
    const newDevis = { ...editedDevis };
    const ligne = newDevis.phases[phaseIndex].sections[sectionIndex].lignes[ligneIndex];
    const originalPrix = devis.phases[phaseIndex].sections[sectionIndex].lignes[ligneIndex].prixUnitaire;
    
    ligne.prixUnitaire = newPrix;
    ligne.total = newPrix * ligne.quantite;

    const priceKey = `${phaseIndex}-${sectionIndex}-${ligneIndex}`;
    const newModifiedPrices = new Set(modifiedPrices);
    if (newPrix !== originalPrix) {
      newModifiedPrices.add(priceKey);
    } else {
      newModifiedPrices.delete(priceKey);
    }
    setModifiedPrices(newModifiedPrices);

    const section = newDevis.phases[phaseIndex].sections[sectionIndex];
    section.sousTotal = section.lignes.reduce((sum, l) => sum + l.total, 0);

    const phase = newDevis.phases[phaseIndex];
    phase.total = phase.sections.reduce((sum, s) => sum + s.sousTotal, 0);

    newDevis.sousTotal = newDevis.phases.reduce((sum, p) => sum + p.total, 0);
    newDevis.montantTVA = (newDevis.sousTotal * newDevis.tauxTVA) / 100;
    newDevis.totalTTC = newDevis.sousTotal + newDevis.montantTVA;

    setEditedDevis(newDevis);
  };

  const handleSave = () => {
    setEditMode(false);
  };

  const handleCancel = () => {
    setEditedDevis(devis);
    setEditMode(false);
  };

  const formatEuro = (montant: number) => {
    return new Intl.NumberFormat('fr-FR', {
      style: 'currency',
      currency: 'EUR'
    }).format(montant);
  };

  const nextPage = () => {
    if (currentPage < totalPages - 1) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-5xl bg-background p-8 h-[90vh] flex flex-col">
        
        {/* Contenu de la page */}
        <div className="flex-1 overflow-y-auto">
          {currentPage === 0 ? (
            // Page 1 : En-tête et première phase
            <>

              
              {/* En-tête */}
              <div className="flex justify-between items-start mb-8">
                <div>
                  <h1 className="text-3xl font-bold mb-2">DEVIS - {poste.toUpperCase()}</h1>
                  <p className="text-muted-foreground">
                    Référence: DEV-{Date.now().toString().slice(-8)}
                  </p>
                  <div className="flex items-center gap-2 mt-2 text-sm text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>
                      Durée estimée : {editedDevis.dureeEstimee.jours} jour{editedDevis.dureeEstimee.jours > 1 ? 's' : ''} 
                      {' '}({editedDevis.dureeEstimee.heures}h)
                    </span>
                  </div>
                </div>
                <div className="flex gap-2">
                  {!editMode ? (
                    <>
                      <Button variant="outline" size="sm" onClick={onClose}>
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Modifier mes réponses
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => setEditMode(true)}>
                        <Pencil className="w-4 h-4 mr-2" />
                        Modifier les tarifs
                      </Button>
                      <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Télécharger PDF
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button variant="outline" size="sm" onClick={handleCancel}>
                        <X className="w-4 h-4 mr-2" />
                        Annuler
                      </Button>
                      <Button size="sm" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        Enregistrer
                      </Button>
                    </>
                  )}
                  <Button variant="ghost" size="sm" onClick={onClose}>
                    <X className="w-4 h-4" />
                  </Button>
                </div>
              </div>

              {/* Première phase */}
              {editedDevis.phases.length > 0 && (
                <div className="border-l-4 border-primary pl-4">
                  <h2 className="text-2xl font-bold mb-4 text-primary">{editedDevis.phases[0].titre}</h2>

                  {editedDevis.phases[0].sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-foreground/90">{section.titre}</h3>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-3 font-medium">Désignation</th>
                              <th className="text-center p-3 font-medium w-20">Qté</th>
                              <th className="text-center p-3 font-medium w-20">Unité</th>
                              <th className="text-right p-3 font-medium w-32">P.U. HT</th>
                              <th className="text-right p-3 font-medium w-32">Total HT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.lignes.map((ligne, ligneIndex) => (
                              <tr key={ligneIndex} className="border-t">
                                <td className="p-3">
                                  <div>
                                    <div className="font-medium text-xs">{ligne.designation}</div>
                                    {ligne.reference && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        Réf: {ligne.reference}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center p-3">{ligne.quantite}</td>
                                <td className="text-center p-3">{ligne.unite}</td>
                                <td className="text-right p-3">
                                  {editMode ? (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={ligne.prixUnitaire}
                                      onChange={(e) =>
                                        handlePrixChange(0, sectionIndex, ligneIndex, parseFloat(e.target.value) || 0)
                                      }
                                      className="w-28 text-right text-xs"
                                    />
                                  ) : (
                                    formatEuro(ligne.prixUnitaire)
                                  )}
                                </td>
                                <td className="text-right p-3 font-medium">{formatEuro(ligne.total)}</td>
                              </tr>
                            ))}
                            <tr className="border-t bg-muted/50">
                              <td colSpan={4} className="text-right p-3 font-semibold">
                                Sous-total
                              </td>
                              <td className="text-right p-3 font-semibold">
                                {formatEuro(section.sousTotal)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end mt-4">
                    <div className="bg-primary/10 px-6 py-3 rounded-lg">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total {editedDevis.phases[0].titre}</div>
                        <div className="text-2xl font-bold text-primary">
                          {formatEuro(editedDevis.phases[0].total)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </>
          ) : currentPage === 1 ? (
            // Page 2 : Phases restantes
            <div className="space-y-8">
              {editedDevis.phases.slice(1).map((phase, phaseIndex) => (
                <div key={phaseIndex + 1} className="border-l-4 border-primary pl-4">
                  <h2 className="text-2xl font-bold mb-4 text-primary">{phase.titre}</h2>

                  {phase.sections.map((section, sectionIndex) => (
                    <div key={sectionIndex} className="mb-6">
                      <h3 className="text-lg font-semibold mb-3 text-foreground/90">{section.titre}</h3>

                      <div className="border rounded-lg overflow-hidden">
                        <table className="w-full text-sm">
                          <thead className="bg-muted">
                            <tr>
                              <th className="text-left p-3 font-medium">Désignation</th>
                              <th className="text-center p-3 font-medium w-20">Qté</th>
                              <th className="text-center p-3 font-medium w-20">Unité</th>
                              <th className="text-right p-3 font-medium w-32">P.U. HT</th>
                              <th className="text-right p-3 font-medium w-32">Total HT</th>
                            </tr>
                          </thead>
                          <tbody>
                            {section.lignes.map((ligne, ligneIndex) => (
                              <tr key={ligneIndex} className="border-t">
                                <td className="p-3">
                                  <div>
                                    <div className="font-medium text-xs">{ligne.designation}</div>
                                    {ligne.reference && (
                                      <div className="text-xs text-muted-foreground mt-1">
                                        Réf: {ligne.reference}
                                      </div>
                                    )}
                                  </div>
                                </td>
                                <td className="text-center p-3">{ligne.quantite}</td>
                                <td className="text-center p-3">{ligne.unite}</td>
                                <td className="text-right p-3">
                                  {editMode ? (
                                    <Input
                                      type="number"
                                      step="0.01"
                                      value={ligne.prixUnitaire}
                                      onChange={(e) =>
                                        handlePrixChange(phaseIndex + 1, sectionIndex, ligneIndex, parseFloat(e.target.value) || 0)
                                      }
                                      className="w-28 text-right text-xs"
                                    />
                                  ) : (
                                    formatEuro(ligne.prixUnitaire)
                                  )}
                                </td>
                                <td className="text-right p-3 font-medium">{formatEuro(ligne.total)}</td>
                              </tr>
                            ))}
                            <tr className="border-t bg-muted/50">
                              <td colSpan={4} className="text-right p-3 font-semibold">
                                Sous-total
                              </td>
                              <td className="text-right p-3 font-semibold">
                                {formatEuro(section.sousTotal)}
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </div>
                    </div>
                  ))}

                  <div className="flex justify-end mt-4 mb-6">
                    <div className="bg-primary/10 px-6 py-3 rounded-lg">
                      <div className="text-right">
                        <div className="text-sm text-muted-foreground">Total {phase.titre}</div>
                        <div className="text-2xl font-bold text-primary">
                          {formatEuro(phase.total)}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Page 3 : Totaux et mentions légales
            <>
              {/* Totaux généraux */}
              <div className="mb-8 border-b-2 pb-6">
                <div className="flex justify-end">
                  <div className="w-96 space-y-3">
                    <div className="flex justify-between text-lg">
                      <span>Total HT</span>
                      <span className="font-semibold">{formatEuro(editedDevis.sousTotal)}</span>
                    </div>
                    <div className="flex justify-between text-lg">
                      <span>TVA ({editedDevis.tauxTVA}%)</span>
                      <span className="font-semibold">{formatEuro(editedDevis.montantTVA)}</span>
                    </div>
                    <div className="flex justify-between text-2xl font-bold border-t-2 pt-3">
                      <span>Total TTC</span>
                      <span className="text-primary">{formatEuro(editedDevis.totalTTC)}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Wording sur les prix modifiables */}
              <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
                <p className="text-sm text-foreground/80">
                  <strong className="text-blue-500">Tarifs personnalisables :</strong> Les prix proposés sont des bases de calcul. 
                  Vous pouvez les ajuster selon vos coûts réels, votre zone d'intervention et les spécificités du chantier.
                </p>
              </div>

              {/* Mentions légales */}
              <div className="pt-4 border-t text-sm text-muted-foreground space-y-2">
                <p>
                  <strong>Conditions de paiement :</strong> 30% à la commande, 40% en cours de chantier, 30% à la réception des travaux
                </p>
                <p>
                  <strong>Validité du devis :</strong> 30 jours à compter de la date d'émission
                </p>
                <p>
                  <strong>Garanties :</strong> Garantie décennale, garantie de parfait achèvement (1 an), garantie biennale
                </p>
                <p className="text-xs mt-4">
                  Devis généré par Mon Assistant Devis Travaux
                </p>
              </div>
            </>
          )}
        </div>

        {/* Navigation pages */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <Button
            variant="outline"
            size="sm"
            onClick={prevPage}
            disabled={currentPage === 0}
          >
            <ChevronLeft className="w-4 h-4 mr-2" />
            Précédent
          </Button>

          <div className="text-sm text-muted-foreground">
            Page {currentPage + 1} / {totalPages}
          </div>

          <Button
            variant="outline"
            size="sm"
            onClick={nextPage}
            disabled={currentPage === totalPages - 1}
          >
            Suivant
            <ChevronRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

// Fonction pour générer les pages
function generatePages(devis: DevisStructure): any[] {
  return [
    { type: 'header' },
    { type: 'phases', phases: devis.phases.slice(1) },
    { type: 'totals' }
  ];
}