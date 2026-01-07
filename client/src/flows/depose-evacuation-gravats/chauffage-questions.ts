/**
 * Questions - Dépose Chauffage
 * Localisation: client/src/flows/depose-evacuation-gravats/chauffage-questions.ts
 */

export const deposeChauffageQuestions = [
  {
    id: 'type_chauffage',
    label: 'Type de chauffage',
    type: 'select',
    options: [
      { value: 'radiateurs', label: 'Radiateurs (fonte, acier, alu)' },
      { value: 'chaudiere', label: 'Chaudière (gaz, fioul, bois)' },
      { value: 'convecteurs', label: 'Convecteurs électriques' },
      { value: 'plancher_chauffant', label: 'Plancher chauffant' },
      { value: 'pompe_chaleur', label: 'Pompe à chaleur' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'nombre_radiateurs',
    label: 'Nombre de radiateurs à dépouiller',
    type: 'number',
    min: 0,
    max: 100,
    step: 1,
    required: false
  },
  {
    id: 'type_radiateurs',
    label: 'Type de radiateurs',
    type: 'select',
    options: [
      { value: 'fonte', label: 'Fonte (lourd)' },
      { value: 'acier', label: 'Acier (moyen)' },
      { value: 'aluminium', label: 'Aluminium (léger)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'fixation_radiateurs',
    label: 'Fixation des radiateurs',
    type: 'select',
    options: [
      { value: 'mural', label: 'Mural (console)' },
      { value: 'sol', label: 'Au sol (pieds)' },
      { value: 'encastre', label: 'Encastré (niche)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'depose_chaudiere',
    label: 'Dépose de la chaudière',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - Complète' },
      { value: 'partielle', label: 'Partielle - Démontage seulement' }
    ],
    required: true
  },
  {
    id: 'type_chaudiere',
    label: 'Type de chaudière',
    type: 'select',
    options: [
      { value: 'gaz', label: 'Gaz (naturel, propane)' },
      { value: 'fioul', label: 'Fioul' },
      { value: 'bois', label: 'Bois' },
      { value: 'electrique', label: 'Électrique' },
      { value: 'autre', label: 'Autre' }
    ],
    required: false
  },
  {
    id: 'presence_ballon_eau_chaude',
    label: 'Présence de ballon d\'eau chaude',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui_integre', label: 'Oui - Intégré à la chaudière' },
      { value: 'oui_separe', label: 'Oui - Séparé' }
    ],
    required: true
  },
  {
    id: 'longueur_tuyauterie_chauffage',
    label: 'Longueur de tuyauterie à dépouiller (ml)',
    type: 'number',
    min: 0,
    max: 500,
    step: 5,
    required: false
  },
  {
    id: 'type_tuyauterie_chauffage',
    label: 'Type de tuyauterie',
    type: 'select',
    options: [
      { value: 'cuivre', label: 'Cuivre (brasé)' },
      { value: 'acier', label: 'Acier (fileté)' },
      { value: 'pvc', label: 'PVC' },
      { value: 'multicouche', label: 'Multicouche' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'presence_circulateur',
    label: 'Présence de circulateur/pompe',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À dépouiller' }
    ],
    required: false
  },
  {
    id: 'presence_vase_expansion',
    label: 'Présence de vase d\'expansion',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À dépouiller' }
    ],
    required: false
  },
  {
    id: 'vidange_circuit_chauffage',
    label: 'Vidange du circuit de chauffage',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À faire' },
      { value: 'partielle', label: 'Partielle - À compléter' },
      { value: 'complete', label: 'Complète - Déjà faite' }
    ],
    required: true
  },
  {
    id: 'acces_difficile_chauffage',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'cave', label: 'Oui - En cave/sous-sol' },
      { value: 'combles', label: 'Oui - En combles' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'presence_amiante_chauffage',
    label: 'Suspicion d\'amiante (isolant tuyauterie)',
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
    id: 'evacuation_debris_chauffage',
    label: 'Évacuation des débris',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À charge du client' },
      { value: 'oui_dechetterie', label: 'Oui - Mise en déchetterie' },
      { value: 'oui_benne', label: 'Oui - Location benne' },
      { value: 'recyclage', label: 'Oui - Recyclage métaux' }
    ],
    required: true
  },
  {
    id: 'volume_debris_chauffage',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 100,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_chauffage',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
