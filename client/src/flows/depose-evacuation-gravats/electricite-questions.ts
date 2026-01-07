/**
 * Questions - Dépose Électricité
 * Localisation: client/src/flows/depose-evacuation-gravats/electricite-questions.ts
 */

export const deposeElectriciteQuestions = [
  {
    id: 'scope_depose_elec',
    label: 'Scope de la dépose électrique',
    type: 'select',
    options: [
      { value: 'partielle', label: 'Partielle (quelques circuits)' },
      { value: 'sectorielle', label: 'Sectorielle (une ou plusieurs pièces)' },
      { value: 'complete', label: 'Complète (toute l\'installation)' },
      { value: 'tableau_seul', label: 'Tableau électrique uniquement' }
    ],
    required: true
  },
  {
    id: 'type_installation_elec',
    label: 'Type d\'installation existante',
    type: 'select',
    options: [
      { value: 'ancienne', label: 'Ancienne (avant 1970) - Risque amiante' },
      { value: 'standard', label: 'Standard (1970-2000)' },
      { value: 'recente', label: 'Récente (après 2000)' },
      { value: 'tres_recente', label: 'Très récente (après 2015)' }
    ],
    required: true
  },
  {
    id: 'type_cablage_elec',
    label: 'Type de câblage',
    type: 'select',
    options: [
      { value: 'apparent', label: 'Apparent (goulotte, chemin de câbles)' },
      { value: 'encastre', label: 'Encastré (dans les murs)' },
      { value: 'combles', label: 'En combles/faux plafond' },
      { value: 'mixte', label: 'Mixte (plusieurs types)' }
    ],
    required: true
  },
  {
    id: 'longueur_cablage_elec',
    label: 'Longueur de câblage à dépouiller (ml)',
    type: 'number',
    min: 10,
    max: 2000,
    step: 10,
    required: true
  },
  {
    id: 'nombre_circuits_elec',
    label: 'Nombre de circuits à dépouiller',
    type: 'number',
    min: 1,
    max: 50,
    step: 1,
    required: true
  },
  {
    id: 'nombre_prises_elec',
    label: 'Nombre de prises/interrupteurs à enlever',
    type: 'number',
    min: 0,
    max: 200,
    step: 1,
    required: false
  },
  {
    id: 'tableau_present_elec',
    label: 'Tableau électrique présent',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui_ancien', label: 'Oui - Ancien (fusibles)' },
      { value: 'oui_standard', label: 'Oui - Standard (disjoncteurs)' },
      { value: 'oui_recent', label: 'Oui - Récent (différentiel)' }
    ],
    required: true
  },
  {
    id: 'depose_tableau_elec',
    label: 'Dépose du tableau',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - Dépose complète' },
      { value: 'partielle', label: 'Partielle - Modules seulement' }
    ],
    required: false
  },
  {
    id: 'presence_amiante_elec',
    label: 'Suspicion d\'amiante',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (bâtiment ancien)' },
      { value: 'probable', label: 'Probable (gaines isolantes)' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'acces_difficile_elec',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'etages', label: 'Oui - Étages multiples' },
      { value: 'combles', label: 'Oui - Combles/toiture' },
      { value: 'souterrain', label: 'Oui - Sous-sol/souterrain' },
      { value: 'tres_difficile', label: 'Très difficile - Accès limité' }
    ],
    required: true
  },
  {
    id: 'protection_existante_elec',
    label: 'Protection existante',
    type: 'select',
    options: [
      { value: 'aucune', label: 'Aucune' },
      { value: 'disjoncteur', label: 'Disjoncteur' },
      { value: 'fusible', label: 'Fusible' },
      { value: 'differentiel', label: 'Différentiel' }
    ],
    required: false
  },
  {
    id: 'mise_en_securite_elec',
    label: 'Mise en sécurité avant dépose',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - À faire' },
      { value: 'partielle', label: 'Partielle - À compléter' },
      { value: 'complete', label: 'Complète - Déjà faite' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_elec',
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
    id: 'volume_debris_elec',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 50,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_elec',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
