/**
 * Questions - Dépose Sols
 * Localisation: client/src/flows/depose-evacuation-gravats/sols-questions.ts
 */

export const deposeSolsQuestions = [
  {
    id: 'type_revetement_sols',
    label: 'Type de revêtement',
    type: 'select',
    options: [
      { value: 'carrelage', label: 'Carrelage (céramique, grès, porcelaine)' },
      { value: 'parquet', label: 'Parquet (massif, contrecollé)' },
      { value: 'stratifie', label: 'Stratifié' },
      { value: 'vinyle', label: 'Vinyle/Linoléum' },
      { value: 'moquette', label: 'Moquette' },
      { value: 'beton', label: 'Béton (poli, ciré)' },
      { value: 'pierre', label: 'Pierre naturelle' },
      { value: 'mixte', label: 'Mixte (plusieurs types)' }
    ],
    required: true
  },
  {
    id: 'surface_sols',
    label: 'Surface totale à dépouiller (m²)',
    type: 'number',
    min: 1,
    max: 5000,
    step: 1,
    required: true
  },
  {
    id: 'type_pose_sols',
    label: 'Type de pose',
    type: 'select',
    options: [
      { value: 'colle', label: 'Collé (mortier, colle)' },
      { value: 'clipse', label: 'Clipsé (flottant)' },
      { value: 'cloue', label: 'Cloué (parquet)' },
      { value: 'scelle', label: 'Scellé (ciment, béton)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'etat_revetement_sols',
    label: 'État du revêtement',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Facile à enlever' },
      { value: 'moyen', label: 'Moyen - Quelques dégâts' },
      { value: 'mauvais', label: 'Mauvais - Très endommagé' },
      { value: 'tres_ancien', label: 'Très ancien - Friable' }
    ],
    required: true
  },
  {
    id: 'sous_couche_sols',
    label: 'Présence de sous-couche/isolant',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'fine', label: 'Oui - Fine (papier, feutre)' },
      { value: 'epaisse', label: 'Oui - Épaisse (mousse, liège)' },
      { value: 'inconnue', label: 'Inconnue' }
    ],
    required: true
  },
  {
    id: 'presence_amiante_sols',
    label: 'Suspicion d\'amiante',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1990)' },
      { value: 'probable', label: 'Probable (mastic, colle)' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'presence_plomb_sols',
    label: 'Suspicion de plomb (peinture)',
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
    id: 'support_sols',
    label: 'État du support (après dépose)',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Réutilisable' },
      { value: 'moyen', label: 'Moyen - À réparer' },
      { value: 'mauvais', label: 'Mauvais - À refaire' },
      { value: 'inconnue', label: 'Inconnue' }
    ],
    required: true
  },
  {
    id: 'presence_joints_sols',
    label: 'Présence de joints (carrelage)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'fin', label: 'Oui - Fin (< 3mm)' },
      { value: 'epais', label: 'Oui - Épais (> 3mm)' },
      { value: 'silicone', label: 'Oui - Silicone' }
    ],
    required: false
  },
  {
    id: 'acces_difficile_sols',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'escaliers', label: 'Oui - Escaliers' },
      { value: 'etroit', label: 'Oui - Passage étroit' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_sols',
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
    id: 'volume_debris_sols',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 100,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_sols',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
