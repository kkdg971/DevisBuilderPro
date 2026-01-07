import { QuestionFlow } from '../types';

/**
 * Questionnaire Électricité - Conforme DTU 15.100 & NFC 15-100
 * Modifié avec : Petit travaux, Dépannage, Marques tableau, Types de prises
 */

export const electriciteFlowDTU: QuestionFlow = {
  id: 'electricite',
  name: 'Électricité',
  questions: [
    {
      id: 'type_travaux_electricite',
      label: 'Type de travaux',
      type: 'select',
      options: [
        { value: 'installation_neuve', label: 'Installation neuve' },
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'renovation_partielle', label: 'Rénovation partielle' },
        { value: 'mise_aux_normes', label: 'Mise aux normes' },
        { value: 'extension', label: 'Extension' },
        { value: 'petit_travaux', label: 'Petit travaux' },
        { value: 'depannage', label: 'Dépannage' }
      ],
      required: false
    },

    {
      id: 'nature_batiment',
      label: 'Nature du bâtiment',
      type: 'select',
      options: [
        { value: 'habitation', label: 'Habitation (maison/appartement)' },
        { value: 'petit_commerce', label: 'Petit commerce' },
        { value: 'bureau', label: 'Bureau' },
        { value: 'atelier', label: 'Atelier/Garage' }
      ],
      required: false
    },

    {
      id: 'surface_totale',
      label: 'Surface totale (m²)',
      type: 'number',
      min: 10,
      max: 10000,
      step: 1,
      required: false
    },

    {
      id: 'nombre_pieces',
      label: 'Nombre de pièces',
      type: 'number',
      min: 1,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'tableau_electrique_existant',
      label: 'Tableau électrique existant',
      type: 'select',
      options: [
        { value: 'absent', label: 'Absent - À créer' },
        { value: 'ancien', label: 'Ancien (à remplacer)' },
        { value: 'recent_ok', label: 'Récent et conforme' },
        { value: 'recent_non_conforme', label: 'Récent mais non conforme' }
      ],
      required: false
    },

    {
      id: 'marque_tableau_electrique',
      label: 'Marque du tableau électrique',
      type: 'select',
      options: [
        { value: 'legrand', label: 'Legrand' },
        { value: 'schneider', label: 'Schneider Electric' },
        { value: 'hager', label: 'Hager' },
        { value: 'abb', label: 'ABB' },
        { value: 'siemens', label: 'Siemens' },
        { value: 'autre', label: 'Autre' }
      ],
      required: false,
      when: (answers) => answers.tableau_electrique_existant === 'absent' || answers.tableau_electrique_existant === 'ancien'
    },

    {
      id: 'amperage_disjoncteur_principal',
      label: 'Ampérage du disjoncteur principal souhaité',
      type: 'select',
      options: [
        { value: '30A', label: '30A (petit logement)' },
        { value: '45A', label: '45A (logement standard)' },
        { value: '60A', label: '60A (logement confortable)' },
        { value: '90A', label: '90A (logement grand/chauffage électrique)' },
        { value: '120A', label: '120A (logement très grand)' }
      ],
      required: false
    },

    {
      id: 'type_installation',
      label: 'Type d\'installation',
      type: 'select',
      options: [
        { value: 'monophase', label: 'Monophasé (230V)' },
        { value: 'triphase', label: 'Triphasé (400V)' }
      ],
      required: false
    },

    {
      id: 'circuits_specialises',
      label: 'Circuits spécialisés nécessaires',
      type: 'multi-select',
      options: [
        { value: 'cuisine', label: 'Cuisine (circuits dédiés)' },
        { value: 'salle_eau', label: 'Salle d\'eau (circuits dédiés)' },
        { value: 'chauffage', label: 'Chauffage électrique' },
        { value: 'climatisation', label: 'Climatisation' },
        { value: 'borne_recharge_ev', label: 'Borne de recharge VE' },
        { value: 'chauffe_eau', label: 'Chauffe-eau électrique' },
        { value: 'pompe_chaleur', label: 'Pompe à chaleur' }
      ],
      required: false
    },

    {
      id: 'prises_simples_16A',
      label: 'Prises simples 16A (1 prise)',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'prises_doubles_16A',
      label: 'Prises doubles 16A (2 prises)',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'prises_triples_16A',
      label: 'Prises triples 16A (3 prises)',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'prises_quadruples_16A',
      label: 'Prises quadruples 16A (4 prises)',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'prises_courant_32A',
      label: 'Prises 32A (cuisine, atelier)',
      type: 'number',
      min: 0,
      max: 20,
      step: 1,
      required: false
    },

    {
      id: 'interrupteurs_simples',
      label: 'Interrupteurs simples',
      type: 'number',
      min: 0,
      max: 50,
      step: 1,
      required: false
    },

    {
      id: 'interrupteurs_doubles',
      label: 'Interrupteurs doubles',
      type: 'number',
      min: 0,
      max: 30,
      step: 1,
      required: false
    },

    {
      id: 'interrupteurs_va_et_vient',
      label: 'Interrupteurs va-et-vient',
      type: 'number',
      min: 0,
      max: 30,
      step: 1,
      required: false
    },

    {
      id: 'interrupteurs_differentiels',
      label: 'Interrupteurs différentiels (30mA)',
      type: 'number',
      min: 0,
      max: 10,
      step: 1,
      description: 'Pour circuits salle d\'eau, extérieur, etc.',
      required: false
    },

    {
      id: 'points_eclairage_interieur',
      label: 'Points d\'éclairage intérieur',
      type: 'number',
      min: 0,
      max: 100,
      step: 1,
      description: 'Plafonniers, appliques, spots',
      required: false
    },

    {
      id: 'points_eclairage_exterieur',
      label: 'Points d\'éclairage extérieur',
      type: 'number',
      min: 0,
      max: 20,
      step: 1,
      required: false
    },

    {
      id: 'eclairage_led_domotique',
      label: 'Éclairage LED/domotique',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel (quelques pièces)' },
        { value: 'complet', label: 'Complet (tout le bâtiment)' }
      ],
      required: false
    },

    {
      id: 'cablage_type',
      label: 'Type de câblage',
      type: 'select',
      options: [
        { value: 'apparent', label: 'Apparent (goulotte/moulure)' },
        { value: 'encastre', label: 'Encastré (dans les murs)' },
        { value: 'mixte', label: 'Mixte' }
      ],
      required: false
    },

    {
      id: 'longueur_cablage_total',
      label: 'Longueur totale de câblage estimée (ml)',
      type: 'number',
      min: 10,
      max: 1000,
      step: 10,
      description: 'Estimation pour tous les circuits',
      required: false
    },

    {
      id: 'section_cable_principale',
      label: 'Section du câble principal',
      type: 'select',
      options: [
        { value: '6', label: '6 mm² (30A)' },
        { value: '10', label: '10 mm² (45A)' },
        { value: '16', label: '16 mm² (60A)' },
        { value: '25', label: '25 mm² (90A)' },
        { value: '35', label: '35 mm² (120A)' }
      ],
      required: false
    },

    {
      id: 'gaines_protection',
      label: 'Gaines de protection',
      type: 'select',
      options: [
        { value: 'pvc', label: 'PVC standard' },
        { value: 'icta', label: 'ICTA renforcée' },
        { value: 'acier', label: 'Acier (zones humides)' }
      ],
      required: false
    },

    {
      id: 'mise_a_la_terre',
      label: 'Mise à la terre',
      type: 'select',
      options: [
        { value: 'absent', label: 'Absent - À créer' },
        { value: 'existant_ok', label: 'Existant et conforme' },
        { value: 'existant_non_conforme', label: 'Existant mais non conforme' }
      ],
      required: false
    },

    {
      id: 'parafoudre',
      label: 'Parafoudre',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui (zone orageuse)' }
      ],
      required: false
    },

    {
      id: 'compteur_type',
      label: 'Type de compteur',
      type: 'select',
      options: [
        { value: 'ancien', label: 'Ancien (à remplacer)' },
        { value: 'linky', label: 'Linky (existant)' },
        { value: 'neuf', label: 'Nouveau Linky (à installer)' }
      ],
      required: false
    },

    {
      id: 'domotique_securite',
      label: 'Domotique/Sécurité',
      type: 'multi-select',
      options: [
        { value: 'alarme', label: 'Alarme' },
        { value: 'videosurveillance', label: 'Vidéosurveillance' },
        { value: 'interphone', label: 'Interphone' },
        { value: 'controle_acces', label: 'Contrôle d\'accès' },
        { value: 'detecteurs_mouvement', label: 'Détecteurs de mouvement' }
      ],
      required: false
    },

    {
      id: 'conformite_norme',
      label: 'Conformité aux normes',
      type: 'select',
      options: [
        { value: 'nfc15_100', label: 'NFC 15-100 (France)' },
        { value: 'dtu_15_100', label: 'DTU 15.100 (DTU complet)' },
        { value: 'norme_ee', label: 'Norme EE (Bâtiment Basse Énergie)' }
      ],
      required: false
    },

    {
      id: 'etat_existant',
      label: 'État de l\'installation existante',
      type: 'select',
      options: [
        { value: 'neuf', label: 'Neuf (aucune installation)' },
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'moyen', label: 'État moyen' },
        { value: 'mauvais', label: 'Mauvais état (risques)' },
        { value: 'dangereux', label: 'Dangereux (intervention urgente)' }
      ],
      required: false
    },

    {
      id: 'acces_difficile_elec',
      label: 'Accès difficile',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui (étages, combles, etc.)' }
      ],
      required: false
    },

    {
      id: 'urgence_intervention',
      label: 'Urgence de l\'intervention',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (quelques jours)' }
      ],
      required: false
    },

    {
      id: 'tva_electricite',
      label: 'TVA (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5.5% (Rénovation)' },
        { value: '10', label: '10% (Travaux)' },
        { value: '20', label: '20% (Standard)' }
      ],
      required: true
    },

    {
      id: 'notes_electricite',
      label: 'Notes supplémentaires',
      type: 'textarea',
      required: false
    }
  ]
};
