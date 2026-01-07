/**
 * Questions - Dépose VMC
 * Localisation: client/src/flows/depose-evacuation-gravats/vmc-questions.ts
 */

export const deposeVmcQuestions = [
  {
    id: 'type_depose_vmc',
    label: 'Type de dépose VMC',
    type: 'select',
    options: [
      { value: 'groupe_seul', label: 'Groupe VMC uniquement' },
      { value: 'gaines_seules', label: 'Gaines uniquement' },
      { value: 'bouches_seules', label: 'Bouches d\'extraction uniquement' },
      { value: 'complete', label: 'Complète (groupe + gaines + bouches)' }
    ],
    required: true
  },
  {
    id: 'type_vmc',
    label: 'Type de VMC',
    type: 'select',
    options: [
      { value: 'simple', label: 'Simple flux' },
      { value: 'double', label: 'Double flux' },
      { value: 'hygroreglable', label: 'Hygroréglable' },
      { value: 'autre', label: 'Autre' }
    ],
    required: true
  },
  {
    id: 'localisation_groupe_vmc',
    label: 'Localisation du groupe VMC',
    type: 'select',
    options: [
      { value: 'combles', label: 'Combles' },
      { value: 'cave', label: 'Cave/Sous-sol' },
      { value: 'cuisine', label: 'Cuisine' },
      { value: 'garage', label: 'Garage' },
      { value: 'autre', label: 'Autre' }
    ],
    required: true
  },
  {
    id: 'longueur_gaines_vmc',
    label: 'Longueur totale de gaines (ml)',
    type: 'number',
    min: 5,
    max: 500,
    step: 5,
    required: true
  },
  {
    id: 'diametre_gaines_vmc',
    label: 'Diamètre des gaines',
    type: 'select',
    options: [
      { value: '80', label: '80 mm' },
      { value: '100', label: '100 mm' },
      { value: '125', label: '125 mm' },
      { value: '150', label: '150 mm' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'type_gaines_vmc',
    label: 'Type de gaines',
    type: 'select',
    options: [
      { value: 'plastique_rigide', label: 'Plastique rigide' },
      { value: 'plastique_souple', label: 'Plastique souple' },
      { value: 'metal', label: 'Métal (aluminium, acier)' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'nombre_bouches_vmc',
    label: 'Nombre de bouches d\'extraction',
    type: 'number',
    min: 1,
    max: 20,
    step: 1,
    required: true
  },
  {
    id: 'type_bouches_vmc',
    label: 'Type de bouches',
    type: 'select',
    options: [
      { value: 'simple', label: 'Simple (grille)' },
      { value: 'hygroreglable', label: 'Hygroréglable' },
      { value: 'motorisee', label: 'Motorisée' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'localisation_bouches_vmc',
    label: 'Localisation des bouches',
    type: 'select',
    options: [
      { value: 'salle_bain', label: 'Salle de bain' },
      { value: 'cuisine', label: 'Cuisine' },
      { value: 'wc', label: 'WC' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'fixation_bouches_vmc',
    label: 'Fixation des bouches',
    type: 'select',
    options: [
      { value: 'plafond', label: 'Plafond' },
      { value: 'mur', label: 'Mur' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'presence_clapet_vmc',
    label: 'Présence de clapet anti-retour',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À enlever aussi' }
    ],
    required: false
  },
  {
    id: 'presence_isolant_gaines_vmc',
    label: 'Isolant sur les gaines',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'oui', label: 'Oui - À enlever aussi' }
    ],
    required: false
  },
  {
    id: 'etat_vmc',
    label: 'État de la VMC',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Facile à enlever' },
      { value: 'moyen', label: 'Moyen - Quelques dégâts' },
      { value: 'mauvais', label: 'Mauvais - Très endommagé' },
      { value: 'encrassee', label: 'Encrassée (poussière, graisse)' }
    ],
    required: true
  },
  {
    id: 'acces_difficile_vmc',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'combles', label: 'Oui - Combles exigus' },
      { value: 'hauteur', label: 'Oui - Hauteur' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'presence_amiante_vmc',
    label: 'Suspicion d\'amiante (isolant gaines)',
    type: 'select',
    options: [
      { value: 'non', label: 'Non' },
      { value: 'possible', label: 'Possible (avant 1990)' },
      { value: 'probable', label: 'Probable' },
      { value: 'confirmee', label: 'Confirmée (diagnostic)' }
    ],
    required: true
  },
  {
    id: 'evacuation_debris_vmc',
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
    id: 'volume_debris_vmc',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 50,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_vmc',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
