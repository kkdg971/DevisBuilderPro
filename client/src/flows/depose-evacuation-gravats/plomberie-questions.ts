/**
 * Questions - Dépose Plomberie
 * Localisation: client/src/flows/depose-evacuation-gravats/plomberie-questions.ts
 */

export const deposePlomberieQuestions = [
  {
    id: 'scope_depose_plomb',
    label: 'Scope de la dépose plomberie',
    type: 'select',
    options: [
      { value: 'tuyauterie_seule', label: 'Tuyauterie uniquement' },
      { value: 'sanitaires_seuls', label: 'Sanitaires uniquement' },
      { value: 'complete', label: 'Complète (tuyauterie + sanitaires)' },
      { value: 'chauffage', label: 'Chauffage uniquement' },
      { value: 'gaz', label: 'Gaz uniquement' }
    ],
    required: true
  },
  {
    id: 'type_tuyauterie_plomb',
    label: 'Type de tuyauterie',
    type: 'select',
    options: [
      { value: 'cuivre', label: 'Cuivre (brasé)' },
      { value: 'acier', label: 'Acier (fileté)' },
      { value: 'pvc', label: 'PVC (collé)' },
      { value: 'multicouche', label: 'Multicouche (clipsé)' },
      { value: 'mixte', label: 'Mixte (plusieurs types)' }
    ],
    required: true
  },
  {
    id: 'longueur_tuyauterie_plomb',
    label: 'Longueur de tuyauterie à dépouiller (ml)',
    type: 'number',
    min: 5,
    max: 1000,
    step: 5,
    required: true
  },
  {
    id: 'diametre_tuyauterie_plomb',
    label: 'Diamètre moyen de la tuyauterie',
    type: 'select',
    options: [
      { value: '10-16', label: '10-16 mm (petit diamètre)' },
      { value: '20-32', label: '20-32 mm (moyen)' },
      { value: '40+', label: '40 mm+ (gros diamètre)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'nombre_sanitaires_plomb',
    label: 'Nombre de sanitaires à enlever',
    type: 'number',
    min: 0,
    max: 20,
    step: 1,
    required: false
  },
  {
    id: 'type_sanitaires_plomb',
    label: 'Type de sanitaires',
    type: 'select',
    options: [
      { value: 'wc', label: 'WC/Toilettes' },
      { value: 'lavabo', label: 'Lavabo/Vasque' },
      { value: 'baignoire', label: 'Baignoire' },
      { value: 'douche', label: 'Douche/Receveur' },
      { value: 'evier', label: 'Évier' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'fixation_sanitaires_plomb',
    label: 'Type de fixation des sanitaires',
    type: 'select',
    options: [
      { value: 'suspendu', label: 'Suspendu (mural)' },
      { value: 'sol', label: 'Au sol (posé)' },
      { value: 'encastre', label: 'Encastré (dans meuble)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: false
  },
  {
    id: 'presence_plomb_tuyaux',
    label: 'Présence de tuyaux en plomb',
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
    id: 'presence_amiante_plomb',
    label: 'Présence d\'amiante (joints, isolants)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible' },
      { value: 'probable', label: 'Probable' },
      { value: 'confirmee', label: 'Confirmée' }
    ],
    required: true
  },
  {
    id: 'acces_difficile_plomb',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'encastre', label: 'Oui - Tuyauterie encastrée' },
      { value: 'combles', label: 'Oui - Combles/faux plafond' },
      { value: 'souterrain', label: 'Oui - Sous-sol' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'vidange_tuyauterie_plomb',
    label: 'Vidange de la tuyauterie',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À faire' },
      { value: 'partielle', label: 'Partielle - À compléter' },
      { value: 'complete', label: 'Complète - Déjà faite' }
    ],
    required: true
  },
  {
    id: 'deconnexion_compteur_plomb',
    label: 'Déconnexion du compteur d\'eau',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À faire' },
      { value: 'oui', label: 'Oui - Déjà faite' },
      { value: 'autre', label: 'Autre - Préciser' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_plomb',
    label: 'Évacuation des débris',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À charge du client' },
      { value: 'oui_dechetterie', label: 'Oui - Mise en déchetterie' },
      { value: 'oui_benne', label: 'Oui - Location benne' },
      { value: 'recyclage', label: 'Oui - Recyclage cuivre/métaux' }
    ],
    required: true
  },
  {
    id: 'volume_debris_plomb',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 50,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_plomb',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
