import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE ISOLATION - ULTRA-COMPLET
 * Créé par un isolant artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const isolationFlow: QuestionFlow = {
  id: 'isolation',
  name: 'Isolation',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_isolation',
      question: 'Type de projet isolation',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'amelioration', label: 'Amélioration thermique' },
        { value: 'extension', label: 'Extension' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_isolation',
      question: 'Nature du bâtiment',
      type: 'select',
      options: [
        { value: 'appartement_ancien', label: 'Appartement ancien (avant 1980)' },
        { value: 'appartement_recent', label: 'Appartement récent (après 1980)' },
        { value: 'maison_ancienne', label: 'Maison ancienne (avant 1980)' },
        { value: 'maison_recente', label: 'Maison récente (après 1980)' },
        { value: 'villa', label: 'Villa' },
        { value: 'commerce', label: 'Commerce/Boutique' },
        { value: 'bureau', label: 'Bureau/Professionnel' },
      ],
      required: false,
    },

    // ===== SECTION 3: SURFACE TOTALE =====
    {
      id: 'surface_isolation',
      question: 'Surface totale à isoler (m²)',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: TYPE D'ISOLATION =====
    {
      id: 'type_isolation',
      question: 'Type d\'isolation',
      type: 'multi-select',
      options: [
        { value: 'combles', label: 'Combles' },
        { value: 'toiture', label: 'Toiture' },
        { value: 'murs_interieurs', label: 'Murs intérieurs' },
        { value: 'murs_exterieurs', label: 'Murs extérieurs' },
        { value: 'sol', label: 'Sol' },
        { value: 'cave', label: 'Cave/Sous-sol' },
        { value: 'portes_fenetres', label: 'Portes/Fenêtres' },
      ],
      required: false,
    },

    // ===== SECTION 5: COMBLES =====
    {
      id: 'besoin_isolation_combles',
      question: 'Besoin d\'isolation des combles',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_combles',
      question: 'Surface des combles (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_combles',
      question: 'Type de combles',
      type: 'select',
      options: [
        { value: 'amenageables', label: 'Aménageables' },
        { value: 'non_amenageables', label: 'Non aménageables' },
      ],
      required: false,
    },

    {
      id: 'acces_combles',
      question: 'Accès aux combles',
      type: 'select',
      options: [
        { value: 'facile', label: 'Facile' },
        { value: 'difficile', label: 'Difficile' },
      ],
      required: false,
    },

    // ===== SECTION 6: TOITURE =====
    {
      id: 'besoin_isolation_toiture',
      question: 'Besoin d\'isolation de la toiture',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_toiture',
      question: 'Surface de toiture (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_toiture',
      question: 'Type de toiture',
      type: 'select',
      options: [
        { value: 'pente', label: 'Pente' },
        { value: 'terrasse', label: 'Terrasse' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    {
      id: 'couverture_toiture',
      question: 'Couverture de toiture',
      type: 'select',
      options: [
        { value: 'tuiles', label: 'Tuiles' },
        { value: 'ardoise', label: 'Ardoise' },
        { value: 'zinc', label: 'Zinc' },
        { value: 'bac_acier', label: 'Bac acier' },
      ],
      required: false,
    },

    // ===== SECTION 7: MURS INTÉRIEURS =====
    {
      id: 'besoin_isolation_murs_int',
      question: 'Besoin d\'isolation des murs intérieurs',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_murs_int',
      question: 'Surface des murs intérieurs (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_murs_int',
      question: 'Type de murs intérieurs',
      type: 'select',
      options: [
        { value: 'pierre', label: 'Pierre' },
        { value: 'brique', label: 'Brique' },
        { value: 'beton', label: 'Béton' },
        { value: 'parpaing', label: 'Parpaing' },
      ],
      required: false,
    },

    {
      id: 'etat_murs_int',
      question: 'État des murs intérieurs',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état' },
      ],
      required: false,
    },

    // ===== SECTION 8: MURS EXTÉRIEURS =====
    {
      id: 'besoin_isolation_murs_ext',
      question: 'Besoin d\'isolation des murs extérieurs',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_murs_ext',
      question: 'Surface des murs extérieurs (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_isolation_ext',
      question: 'Type d\'isolation extérieure',
      type: 'select',
      options: [
        { value: 'ite_polystyrene', label: 'ITE polystyrène' },
        { value: 'ite_laine_roche', label: 'ITE laine de roche' },
        { value: 'ite_liege', label: 'ITE liège' },
        { value: 'ite_bois', label: 'ITE bois' },
      ],
      required: false,
    },

    // ===== SECTION 9: SOL =====
    {
      id: 'besoin_isolation_sol',
      question: 'Besoin d\'isolation du sol',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_sol',
      question: 'Surface du sol (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_sol',
      question: 'Type de sol',
      type: 'select',
      options: [
        { value: 'beton', label: 'Béton' },
        { value: 'terre', label: 'Terre' },
        { value: 'carrelage', label: 'Carrelage' },
      ],
      required: false,
    },

    // ===== SECTION 10: CAVE/SOUS-SOL =====
    {
      id: 'besoin_isolation_cave',
      question: 'Besoin d\'isolation cave/sous-sol',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_cave',
      question: 'Surface cave/sous-sol (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_cave',
      question: 'Type de cave/sous-sol',
      type: 'select',
      options: [
        { value: 'cave_humide', label: 'Cave humide' },
        { value: 'cave_seche', label: 'Cave sèche' },
        { value: 'sous_sol_amenage', label: 'Sous-sol aménagé' },
      ],
      required: false,
    },

    {
      id: 'presence_humidite_cave',
      question: 'Présence d\'humidité',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legere', label: 'Légère' },
        { value: 'importante', label: 'Importante' },
      ],
      required: false,
    },

    // ===== SECTION 11: MATÉRIAUX D'ISOLATION =====
    {
      id: 'type_materiau_isolation',
      question: 'Type de matériau d\'isolation',
      type: 'select',
      options: [
        { value: 'laine_verre', label: 'Laine de verre' },
        { value: 'laine_roche', label: 'Laine de roche' },
        { value: 'polystyrene', label: 'Polystyrène' },
        { value: 'polyurethane', label: 'Polyuréthane' },
        { value: 'liege', label: 'Liège' },
        { value: 'bois', label: 'Bois' },
        { value: 'chanvre', label: 'Chanvre' },
        { value: 'cellulose', label: 'Cellulose' },
      ],
      required: false,
    },

    {
      id: 'epaisseur_isolation',
      question: 'Épaisseur d\'isolation',
      type: 'select',
      options: [
        { value: '50mm', label: '50 mm' },
        { value: '80mm', label: '80 mm' },
        { value: '100mm', label: '100 mm' },
        { value: '120mm', label: '120 mm' },
        { value: '150mm', label: '150 mm' },
        { value: '200mm', label: '200 mm' },
      ],
      required: false,
    },

    {
      id: 'r_value_target',
      question: 'Résistance thermique cible (R-value)',
      type: 'select',
      options: [
        { value: '2', label: 'R ≥ 2' },
        { value: '3', label: 'R ≥ 3' },
        { value: '4', label: 'R ≥ 4' },
        { value: '5', label: 'R ≥ 5' },
        { value: '6', label: 'R ≥ 6' },
        { value: '7', label: 'R ≥ 7' },
      ],
      required: false,
    },

    // ===== SECTION 12: PARE-VAPEUR ET PARE-AIR =====
    {
      id: 'besoin_pare_vapeur',
      question: 'Besoin de pare-vapeur',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_pare_air',
      question: 'Besoin de pare-air',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 13: ISOLATION ACOUSTIQUE =====
    {
      id: 'besoin_isolation_acoustique',
      question: 'Besoin d\'isolation acoustique',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legere', label: 'Légère' },
        { value: 'importante', label: 'Importante' },
      ],
      required: false,
    },

    // ===== SECTION 14: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_isolation',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'presence_amiante',
      question: 'Présence probable d\'amiante',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'possible', label: 'Possible' },
        { value: 'probable', label: 'Probable' },
      ],
      required: false,
    },

    // ===== SECTION 15: AIDES ET CERTIFICATIONS =====
    {
      id: 'eligibilite_aides',
      question: 'Éligibilité aux aides (MaPrimeRénov, etc.)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'possible', label: 'Possible' },
      ],
      required: false,
    },

    {
      id: 'besoin_certification_rge',
      question: 'Besoin de certification RGE',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 16: DÉLAIS =====
    {
      id: 'urgence_isolation',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 17: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_isolation',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 18: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires_isolation',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
