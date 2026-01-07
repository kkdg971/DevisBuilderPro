/**
 * Questions - Dépose Menuiserie
 * Localisation: client/src/flows/depose-evacuation-gravats/menuiserie-questions.ts
 */

export const deposeMenuiserieQuestions = [
  {
    id: 'type_menuiserie',
    label: 'Type de menuiserie',
    type: 'select',
    options: [
      { value: 'portes', label: 'Portes (intérieures, extérieures)' },
      { value: 'fenetres', label: 'Fenêtres' },
      { value: 'volets', label: 'Volets' },
      { value: 'escaliers', label: 'Escaliers' },
      { value: 'placards', label: 'Placards/Armoires' },
      { value: 'boiseries', label: 'Boiseries/Lambris' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'nombre_elements_menuiserie',
    label: 'Nombre d\'éléments à dépouiller',
    type: 'number',
    min: 1,
    max: 100,
    step: 1,
    required: true
  },
  {
    id: 'materiau_menuiserie',
    label: 'Matériau',
    type: 'select',
    options: [
      { value: 'bois_massif', label: 'Bois massif' },
      { value: 'bois_agglomere', label: 'Bois aggloméré/MDF' },
      { value: 'aluminium', label: 'Aluminium' },
      { value: 'pvc', label: 'PVC' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'type_fixation_menuiserie',
    label: 'Type de fixation',
    type: 'select',
    options: [
      { value: 'clou', label: 'Clou' },
      { value: 'vis', label: 'Vis' },
      { value: 'colle', label: 'Colle' },
      { value: 'scellement', label: 'Scellement (béton)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'etat_menuiserie',
    label: 'État de la menuiserie',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Facile à enlever' },
      { value: 'moyen', label: 'Moyen - Quelques dégâts' },
      { value: 'mauvais', label: 'Mauvais - Très endommagé' },
      { value: 'pourri', label: 'Pourri/Humide' }
    ],
    required: true
  },
  {
    id: 'presence_peinture_menuiserie',
    label: 'Présence de peinture',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Naturel' },
      { value: 'recente', label: 'Oui - Récente' },
      { value: 'ancienne', label: 'Oui - Ancienne' },
      { value: 'multiple', label: 'Oui - Plusieurs couches' }
    ],
    required: true
  },
  {
    id: 'presence_plomb_menuiserie',
    label: 'Suspicion de plomb (peinture ancienne)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1980)' },
      { value: 'probable', label: 'Probable (très ancien)' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'presence_amiante_menuiserie',
    label: 'Suspicion d\'amiante',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1990)' },
      { value: 'probable', label: 'Probable' },
      { value: 'confirmee', label: 'Confirmée' }
    ],
    required: true
  },
  {
    id: 'presence_vitrage_menuiserie',
    label: 'Présence de vitrage',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'simple', label: 'Oui - Simple vitrage' },
      { value: 'double', label: 'Oui - Double vitrage' },
      { value: 'triple', label: 'Oui - Triple vitrage' }
    ],
    required: false
  },
  {
    id: 'acces_difficile_menuiserie',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'etages', label: 'Oui - Étages multiples' },
      { value: 'facade', label: 'Oui - Façade externe' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'revetement_autour_menuiserie',
    label: 'Revêtement autour de la menuiserie',
    type: 'select',
    options: [
      { value: 'aucun', label: 'Aucun' },
      { value: 'peinture', label: 'Peinture' },
      { value: 'papier_peint', label: 'Papier peint' },
      { value: 'carrelage', label: 'Carrelage' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'evacuation_debris_menuiserie',
    label: 'Évacuation des débris',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À charge du client' },
      { value: 'oui_dechetterie', label: 'Oui - Mise en déchetterie' },
      { value: 'oui_benne', label: 'Oui - Location benne' },
      { value: 'compostage', label: 'Oui - Compostage (bois)' }
    ],
    required: true
  },
  {
    id: 'volume_debris_menuiserie',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 100,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_menuiserie',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
