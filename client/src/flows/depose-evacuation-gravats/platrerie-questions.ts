/**
 * Questions - Dépose Plâtrerie
 * Localisation: client/src/flows/depose-evacuation-gravats/platrerie-questions.ts
 */

export const deposePlatrerieQuestions = [
  {
    id: 'type_depose_platrerie',
    label: 'Type de dépose plâtrerie',
    type: 'select',
    options: [
      { value: 'cloisons', label: 'Cloisons' },
      { value: 'plafonds', label: 'Faux plafonds' },
      { value: 'doublage', label: 'Doublage murs' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'surface_platrerie',
    label: 'Surface à dépouiller (m²)',
    type: 'number',
    min: 1,
    max: 5000,
    step: 1,
    required: true
  },
  {
    id: 'type_platrerie',
    label: 'Type de plâtrerie',
    type: 'select',
    options: [
      { value: 'plaques_platre', label: 'Plaques de plâtre (BA13, BA15)' },
      { value: 'carreaux_platre', label: 'Carreaux de plâtre' },
      { value: 'enduit', label: 'Enduit sur structure' },
      { value: 'ancien', label: 'Ancien (plâtre massif)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'structure_platrerie',
    label: 'Type de structure',
    type: 'select',
    options: [
      { value: 'bois', label: 'Bois (ossature)' },
      { value: 'metal', label: 'Métal (rails, montants)' },
      { value: 'beton', label: 'Béton (collé)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'presence_isolant_platrerie',
    label: 'Présence d\'isolant derrière',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À enlever aussi' }
    ],
    required: true
  },
  {
    id: 'presence_revetement_platrerie',
    label: 'Présence de revêtement (peinture, papier)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Plâtre brut' },
      { value: 'peinture', label: 'Oui - Peinture' },
      { value: 'papier', label: 'Oui - Papier peint' },
      { value: 'carrelage', label: 'Oui - Carrelage' }
    ],
    required: true
  },
  {
    id: 'presence_amiante_platrerie',
    label: 'Suspicion d\'amiante',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1990)' },
      { value: 'probable', label: 'Probable (ancien plâtre)' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'nombre_cloisons_platrerie',
    label: 'Nombre de cloisons à dépouiller',
    type: 'number',
    min: 0,
    max: 100,
    step: 1,
    required: false
  },
  {
    id: 'hauteur_plafonds_platrerie',
    label: 'Hauteur des plafonds',
    type: 'select',
    options: [
      { value: 'standard', label: 'Standard (2.5-2.8m)' },
      { value: 'haut', label: 'Haut (2.8-3.5m)' },
      { value: 'tres_haut', label: 'Très haut (> 3.5m)' },
      { value: 'bas', label: 'Bas (< 2.5m)' }
    ],
    required: false
  },
  {
    id: 'presence_passages_platrerie',
    label: 'Présence de passages (gaines, tuyauterie)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À préserver' },
      { value: 'oui_enlever', label: 'Oui - À enlever aussi' }
    ],
    required: false
  },
  {
    id: 'etat_platrerie',
    label: 'État de la plâtrerie',
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
    id: 'acces_difficile_platrerie',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'hauteur', label: 'Oui - Hauteur' },
      { value: 'etroit', label: 'Oui - Passage étroit' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_platrerie',
    label: 'Évacuation des débris',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À charge du client' },
      { value: 'oui_dechetterie', label: 'Oui - Mise en déchetterie' },
      { value: 'oui_benne', label: 'Oui - Location benne' }
    ],
    required: true
  },
  {
    id: 'volume_debris_platrerie',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 200,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_platrerie',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
