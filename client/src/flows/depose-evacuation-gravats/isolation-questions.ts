/**
 * Questions - Dépose Isolation
 * Localisation: client/src/flows/depose-evacuation-gravats/isolation-questions.ts
 */

export const deposeIsolationQuestions = [
  {
    id: 'type_isolation',
    label: 'Type d\'isolation',
    type: 'select',
    options: [
      { value: 'laine_verre', label: 'Laine de verre' },
      { value: 'laine_roche', label: 'Laine de roche' },
      { value: 'laine_bois', label: 'Laine de bois' },
      { value: 'polystyrene', label: 'Polystyrène (expansé, extrudé)' },
      { value: 'polyurethane', label: 'Polyuréthane' },
      { value: 'liege', label: 'Liège' },
      { value: 'cellulose', label: 'Cellulose' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'zone_isolation',
    label: 'Zone d\'isolation',
    type: 'select',
    options: [
      { value: 'combles', label: 'Combles' },
      { value: 'toiture', label: 'Toiture/Rampants' },
      { value: 'murs', label: 'Murs' },
      { value: 'sol', label: 'Sol/Plancher' },
      { value: 'cave', label: 'Sous-sol/Cave' },
      { value: 'complete', label: 'Complète (toutes zones)' }
    ],
    required: true
  },
  {
    id: 'surface_isolation',
    label: 'Surface d\'isolation à dépouiller (m²)',
    type: 'number',
    min: 1,
    max: 5000,
    step: 1,
    required: true
  },
  {
    id: 'epaisseur_isolation',
    label: 'Épaisseur de l\'isolation',
    type: 'select',
    options: [
      { value: 'fine', label: 'Fine (< 50mm)' },
      { value: 'standard', label: 'Standard (50-150mm)' },
      { value: 'epaisse', label: 'Épaisse (150-300mm)' },
      { value: 'tres_epaisse', label: 'Très épaisse (> 300mm)' }
    ],
    required: true
  },
  {
    id: 'type_support_isolation',
    label: 'Type de support',
    type: 'select',
    options: [
      { value: 'bois', label: 'Bois (charpente)' },
      { value: 'beton', label: 'Béton' },
      { value: 'metal', label: 'Métal (ossature)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'presence_pare_vapeur',
    label: 'Présence de pare-vapeur/frein',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'papier', label: 'Oui - Papier kraft' },
      { value: 'film', label: 'Oui - Film plastique' },
      { value: 'membrane', label: 'Oui - Membrane spécialisée' }
    ],
    required: true
  },
  {
    id: 'presence_pare_pluie',
    label: 'Présence de pare-pluie (toiture)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'papier', label: 'Oui - Papier bitumé' },
      { value: 'film', label: 'Oui - Film synthétique' },
      { value: 'membrane', label: 'Oui - Membrane HPV' }
    ],
    required: false
  },
  {
    id: 'presence_amiante_isolation',
    label: 'Suspicion d\'amiante',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1990)' },
      { value: 'probable', label: 'Probable (laine ancienne)' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'presence_fibre_verre',
    label: 'Risque de fibre de verre',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'faible', label: 'Faible' },
      { value: 'moyen', label: 'Moyen' },
      { value: 'eleve', label: 'Élevé (laine ancienne)' }
    ],
    required: true
  },
  {
    id: 'acces_difficile_isolation',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'combles', label: 'Oui - Combles bas/exigus' },
      { value: 'toiture', label: 'Oui - Toiture/Rampants' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'etat_isolation',
    label: 'État de l\'isolation',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Facile à enlever' },
      { value: 'moyen', label: 'Moyen - Quelques dégâts' },
      { value: 'mauvais', label: 'Mauvais - Très endommagé' },
      { value: 'humide', label: 'Humide/Pourri' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_isolation',
    label: 'Évacuation des débris',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À charge du client' },
      { value: 'oui_dechetterie', label: 'Oui - Mise en déchetterie' },
      { value: 'oui_benne', label: 'Oui - Location benne' },
      { value: 'recyclage', label: 'Oui - Recyclage' }
    ],
    required: true
  },
  {
    id: 'volume_debris_isolation',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 200,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_isolation',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
