/**
 * Questions - Dépose Peinture
 * Localisation: client/src/flows/depose-evacuation-gravats/peinture-questions.ts
 */

export const deposePeintureQuestions = [
  {
    id: 'type_depose_peinture',
    label: 'Type de dépose peinture',
    type: 'select',
    options: [
      { value: 'decapage', label: 'Décapage (enlèvement peinture)' },
      { value: 'papier_peint', label: 'Enlèvement papier peint' },
      { value: 'revetement_mural', label: 'Enlèvement revêtement mural' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'surface_peinture',
    label: 'Surface à traiter (m²)',
    type: 'number',
    min: 1,
    max: 5000,
    step: 1,
    required: true
  },
  {
    id: 'type_support_peinture',
    label: 'Type de support',
    type: 'select',
    options: [
      { value: 'bois', label: 'Bois' },
      { value: 'metal', label: 'Métal' },
      { value: 'beton', label: 'Béton/Ciment' },
      { value: 'platre', label: 'Plâtre/Cloison' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'nombre_couches_peinture',
    label: 'Nombre de couches de peinture',
    type: 'select',
    options: [
      { value: '1', label: '1 couche' },
      { value: '2-3', label: '2-3 couches' },
      { value: '4-5', label: '4-5 couches' },
      { value: '6+', label: '6+ couches' }
    ],
    required: true
  },
  {
    id: 'type_peinture',
    label: 'Type de peinture',
    type: 'select',
    options: [
      { value: 'acrylique', label: 'Acrylique (eau)' },
      { value: 'glycero', label: 'Glycéro (huile)' },
      { value: 'epoxy', label: 'Époxy' },
      { value: 'polyurethane', label: 'Polyuréthane' },
      { value: 'mixte', label: 'Mixte' }
    ],
    required: true
  },
  {
    id: 'etat_peinture',
    label: 'État de la peinture',
    type: 'select',
    options: [
      { value: 'bon', label: 'Bon - Adhérente' },
      { value: 'moyen', label: 'Moyen - Quelques défauts' },
      { value: 'mauvais', label: 'Mauvais - Écaillée' },
      { value: 'tres_mauvais', label: 'Très mauvais - Très écaillée' }
    ],
    required: true
  },
  {
    id: 'presence_plomb_peinture',
    label: 'Suspicion de plomb',
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
    id: 'presence_amiante_peinture',
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
    id: 'type_papier_peint',
    label: 'Type de papier peint',
    type: 'select',
    options: [
      { value: 'papier', label: 'Papier simple' },
      { value: 'vinyle', label: 'Vinyle' },
      { value: 'fibre_verre', label: 'Fibre de verre' },
      { value: 'textile', label: 'Textile' },
      { value: 'inconnu', label: 'Inconnu' }
    ],
    required: false
  },
  {
    id: 'colle_papier_peint',
    label: 'Type de colle',
    type: 'select',
    options: [
      { value: 'standard', label: 'Standard (facile)' },
      { value: 'forte', label: 'Forte (difficile)' },
      { value: 'tres_forte', label: 'Très forte (très difficile)' },
      { value: 'inconnue', label: 'Inconnue' }
    ],
    required: false
  },
  {
    id: 'acces_difficile_peinture',
    label: 'Accès difficile',
    type: 'select',
    options: [
      { value: 'non', label: 'Non - Accès facile' },
      { value: 'hauteur', label: 'Oui - Hauteur (plafond, murs hauts)' },
      { value: 'etroit', label: 'Oui - Passage étroit' },
      { value: 'tres_difficile', label: 'Très difficile' }
    ],
    required: true
  },
  {
    id: 'etat_support_peinture',
    label: 'État du support (après décapage)',
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
    id: 'evacuation_debris_peinture',
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
    id: 'volume_debris_peinture',
    label: 'Volume de débris estimé (m³)',
    type: 'number',
    min: 0.5,
    max: 50,
    step: 0.5,
    required: false
  },
  {
    id: 'notes_depose_peinture',
    label: 'Notes supplémentaires',
    type: 'text',
    required: false
  }
];
