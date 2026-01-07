import { QuestionFlow } from '../types';

/**
 * Questionnaire : Dépose et Évacuation des Gravats
 * 
 * Terme exact utilisé en France :
 * - "Dépose" = Enlèvement de l'élément existant
 * - "Évacuation des gravats" = Transport et élimination des déchets
 * - "Mise en déchetterie" = Dépôt en déchetterie
 * 
 * Terme professionnel complet : "Dépose et Évacuation des Gravats"
 */

export const deposeEvacuationGravatsFlow: QuestionFlow = {
  id: 'depose_evacuation_gravats',
  name: 'Dépose et Évacuation des Gravats',
  questions: [
    // ===== SÉLECTION DU CORPS DE MÉTIER =====
    {
      id: 'poste_depose',
      label: 'Postes concerné par la dépose',
      type: 'select',
      options: [
        { value: 'electricite', label: '⚡ Électricité' },
        { value: 'plomberie', label: '🚰 Plomberie' },
        { value: 'sols', label: '📐 Sols (carrelage, parquet, etc.)' },
        { value: 'menuiserie', label: '🪟 Menuiserie (portes, fenêtres)' },
        { value: 'isolation', label: '🧱 Isolation' },
        { value: 'chauffage', label: '🔥 Chauffage' },
        { value: 'peinture', label: '🎨 Peinture' },
        { value: 'platrerie', label: '🔨 Plâtrerie (cloisons, plafonds)' },
        { value: 'vmc', label: '💨 VMC' }
      ],
      required: false,
      description: 'Sélectionnez le métier pour lequel vous avez besoin d\'une dépose'
    },

    // ===== QUESTIONS CONDITIONNELLES PAR MÉTIER =====

    // ===== ÉLECTRICITÉ =====
    {
      id: 'depose_electricite_type',
      label: 'Type de dépose électricité',
      type: 'select',
      options: [
        { value: 'partielle', label: 'Partielle (quelques circuits)' },
        { value: 'complete', label: 'Complète (toute l\'installation)' },
        { value: 'tableau_seul', label: 'Tableau électrique uniquement' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'electricite'
    },

    {
      id: 'depose_electricite_surface',
      label: 'Longueur de câblage à dépouiller (ml)',
      type: 'number',
      min: 10,
      max: 1000,
      step: 10,
      required: false,
      when: (answers) => answers.poste_depose === 'electricite'
    },

    // ===== PLOMBERIE =====
    {
      id: 'depose_plomberie_type',
      label: 'Type de dépose plomberie',
      type: 'select',
      options: [
        { value: 'tuyauterie', label: 'Tuyauterie uniquement' },
        { value: 'sanitaires', label: 'Sanitaires (WC, lavabo, etc.)' },
        { value: 'complete', label: 'Complète (tuyauterie + sanitaires)' },
        { value: 'baignoire_douche', label: 'Baignoire/Douche uniquement' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'plomberie'
    },

    {
      id: 'depose_plomberie_longueur',
      label: 'Longueur de tuyauterie à dépouiller (ml)',
      type: 'number',
      min: 5,
      max: 500,
      step: 5,
      required: false,
      when: (answers) => answers.poste_depose === 'plomberie'
    },

    // ===== SOLS =====
    {
      id: 'depose_sols_type',
      label: 'Type de revêtement à dépouiller',
      type: 'select',
      options: [
        { value: 'carrelage', label: 'Carrelage' },
        { value: 'parquet', label: 'Parquet' },
        { value: 'vinyle', label: 'Vinyle/Linoléum' },
        { value: 'moquette', label: 'Moquette' },
        { value: 'mixte', label: 'Mixte (plusieurs types)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'sols'
    },

    {
      id: 'depose_sols_surface',
      label: 'Surface à dépouiller (m²)',
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'sols'
    },

    {
      id: 'depose_sols_difficulte',
      label: 'Difficulté de dépose',
      type: 'select',
      options: [
        { value: 'facile', label: 'Facile (clipsé, flottant)' },
        { value: 'moyen', label: 'Moyen (collé)' },
        { value: 'difficile', label: 'Difficile (scellé, ancien)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'sols'
    },

    // ===== MENUISERIE =====
    {
      id: 'depose_menuiserie_type',
      label: 'Type de menuiserie à dépouiller',
      type: 'select',
      options: [
        { value: 'portes', label: 'Portes' },
        { value: 'fenetres', label: 'Fenêtres' },
        { value: 'volets', label: 'Volets' },
        { value: 'mixte', label: 'Mixte (portes + fenêtres)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'menuiserie'
    },

    {
      id: 'depose_menuiserie_quantite',
      label: 'Nombre d\'éléments à dépouiller',
      type: 'number',
      min: 1,
      max: 50,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'menuiserie'
    },

    // ===== ISOLATION =====
    {
      id: 'depose_isolation_type',
      label: 'Type d\'isolation à dépouiller',
      type: 'select',
      options: [
        { value: 'combles', label: 'Combles' },
        { value: 'murs', label: 'Murs' },
        { value: 'toiture', label: 'Toiture' },
        { value: 'complete', label: 'Complète' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'isolation'
    },

    {
      id: 'depose_isolation_surface',
      label: 'Surface à dépouiller (m²)',
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'isolation'
    },

    // ===== CHAUFFAGE =====
    {
      id: 'depose_chauffage_type',
      label: 'Type de chauffage à dépouiller',
      type: 'select',
      options: [
        { value: 'radiateurs', label: 'Radiateurs' },
        { value: 'chaudiere', label: 'Chaudière' },
        { value: 'tuyauterie', label: 'Tuyauterie de chauffage' },
        { value: 'complete', label: 'Complète (radiateurs + chaudière + tuyauterie)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'chauffage'
    },

    {
      id: 'depose_chauffage_quantite',
      label: 'Nombre de radiateurs à dépouiller',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'chauffage'
    },

    // ===== PEINTURE =====
    {
      id: 'depose_peinture_type',
      label: 'Type de dépose peinture',
      type: 'select',
      options: [
        { value: 'decapage', label: 'Décapage (enlèvement peinture)' },
        { value: 'papier_peint', label: 'Enlèvement papier peint' },
        { value: 'mixte', label: 'Mixte (peinture + papier peint)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'peinture'
    },

    {
      id: 'depose_peinture_surface',
      label: 'Surface à traiter (m²)',
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'peinture'
    },

    // ===== PLÂTRERIE =====
    {
      id: 'depose_platrerie_type',
      label: 'Type de dépose plâtrerie',
      type: 'select',
      options: [
        { value: 'cloisons', label: 'Cloisons' },
        { value: 'plafonds', label: 'Faux plafonds' },
        { value: 'mixte', label: 'Mixte (cloisons + plafonds)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'platrerie'
    },

    {
      id: 'depose_platrerie_surface',
      label: 'Surface à dépouiller (m²)',
      type: 'number',
      min: 1,
      max: 1000,
      step: 1,
      required: false,
      when: (answers) => answers.poste_depose === 'platrerie'
    },

    // ===== VMC =====
    {
      id: 'depose_vmc_type',
      label: 'Type de dépose VMC',
      type: 'select',
      options: [
        { value: 'groupe', label: 'Groupe VMC uniquement' },
        { value: 'gaines', label: 'Gaines uniquement' },
        { value: 'bouches', label: 'Bouches d\'extraction' },
        { value: 'complete', label: 'Complète (groupe + gaines + bouches)' }
      ],
      required: false,
      when: (answers) => answers.poste_depose === 'vmc'
    },

    {
      id: 'depose_vmc_longueur',
      label: 'Longueur de gaines à dépouiller (ml)',
      type: 'number',
      min: 5,
      max: 500,
      step: 5,
      required: false,
      when: (answers) => answers.poste_depose === 'vmc'
    },

    // ===== QUESTIONS COMMUNES À TOUS LES MÉTIERS =====

    {
      id: 'difficulte_depose_generale',
      label: 'Difficulté générale de dépose',
      type: 'select',
      options: [
        { value: 'facile', label: 'Facile (dépose simple, peu de débris)' },
        { value: 'moyen', label: 'Moyen (dépose standard)' },
        { value: 'difficile', label: 'Difficile (collé, scellé, ancien)' },
        { value: 'tres_difficile', label: 'Très difficile (amiante, plomb, etc.)' }
      ],
      required: false,
      description: 'Évaluez la difficulté globale de la dépose'
    },

    {
      id: 'evacuation_dechets',
      label: 'Évacuation des gravats',
      type: 'select',
      options: [
        { value: 'non', label: 'Non (à charge du client)' },
        { value: 'oui', label: 'Oui (à charge de l\'artisan - mise en déchetterie)' },
        { value: 'location_benne', label: 'Oui (location benne de chantier)' }
      ],
      required: false,
      description: 'Qui prend en charge l\'évacuation des gravats ?'
    },

    {
      id: 'volume_gravats_estime',
      label: 'Volume de gravats estimé (m³)',
      type: 'number',
      min: 0.5,
      max: 100,
      step: 0.5,
      required: false,
      description: 'Estimation du volume total des gravats à évacuer'
    },

    {
      id: 'acces_difficile_depose',
      label: 'Accès difficile pour l\'évacuation',
      type: 'select',
      options: [
        { value: 'non', label: 'Non (accès facile)' },
        { value: 'oui', label: 'Oui (étages, escaliers, combles, etc.)' }
      ],
      required: false
    },

    {
      id: 'urgence_depose',
      label: 'Urgence de la dépose',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (quelques jours)' }
      ],
      required: false
    },

    {
      id: 'notes_depose',
      label: 'Notes supplémentaires',
      type: 'text',
      required: false,
      description: 'Précisions sur la dépose (matériaux spéciaux, contraintes, etc.)'
    }
  ]
};
