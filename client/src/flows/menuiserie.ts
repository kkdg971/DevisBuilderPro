import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE MENUISERIE - ULTRA-COMPLET
 * Créé par un menuisier artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const menuiserieFlow: QuestionFlow = {
  id: 'menuiserie',
  name: 'Menuiserie',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_menu',
      question: 'Type de projet menuiserie',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'remplacement_partiel', label: 'Remplacement partiel' },
        { value: 'extension', label: 'Extension' },
        { value: 'amelioration', label: 'Amélioration/Modernisation' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_menu',
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

    // ===== SECTION 3: PORTES INTÉRIEURES =====
    {
      id: 'besoin_portes_interieures',
      question: 'Avez-vous besoin de portes intérieures ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'nombre_portes_interieures',
      question: 'Nombre total de portes intérieures',
      type: 'number',
      required: false,
    },

    {
      id: 'type_portes_interieures',
      question: 'Type de portes intérieures',
      type: 'multi-select',
      options: [
        { value: 'battante_simple', label: 'Battante simple' },
        { value: 'battante_double', label: 'Battante double' },
        { value: 'coulissante_simple', label: 'Coulissante simple' },
        { value: 'coulissante_double', label: 'Coulissante double' },
        { value: 'pliante', label: 'Pliante' },
        { value: 'pivot', label: 'Pivot' },
        { value: 'accordeon', label: 'Accordéon' },
        { value: 'galandage', label: 'Galandage' },
      ],
      required: false,
    },

    {
      id: 'materiau_portes_interieures',
      question: 'Matériau des portes intérieures',
      type: 'select',
      options: [
        { value: 'bois_massif_chene', label: 'Bois massif - Chêne' },
        { value: 'bois_massif_sapin', label: 'Bois massif - Sapin' },
        { value: 'bois_plaque_chene', label: 'Bois plaqué - Chêne' },
        { value: 'mdf_standard', label: 'MDF standard' },
        { value: 'mdf_premium', label: 'MDF premium' },
        { value: 'composite', label: 'Composite/Stratifié' },
        { value: 'verre_partiel', label: 'Verre partiel' },
        { value: 'aluminium', label: 'Aluminium' },
      ],
      required: false,
    },

    {
      id: 'finition_portes_interieures',
      question: 'Finition des portes intérieures',
      type: 'select',
      options: [
        { value: 'brut', label: 'Brut (à peindre)' },
        { value: 'vernis_mat', label: 'Vernis mat' },
        { value: 'vernis_satin', label: 'Vernis satiné' },
        { value: 'vernis_brillant', label: 'Vernis brillant' },
        { value: 'peinture_mate', label: 'Peinture mate' },
        { value: 'peinture_satinee', label: 'Peinture satinée' },
        { value: 'laque_brillante', label: 'Laque brillante' },
        { value: 'stratifie', label: 'Stratifié' },
      ],
      required: false,
    },

    {
      id: 'besoin_poignees_portes',
      question: 'Besoin de poignées/serrures pour portes',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'simple', label: 'Simple' },
        { value: 'securisee', label: 'Sécurisée' },
      ],
      required: false,
    },

    // ===== SECTION 4: FENÊTRES =====
    {
      id: 'besoin_fenetres',
      question: 'Avez-vous besoin de fenêtres ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'nombre_fenetres',
      question: 'Nombre total de fenêtres',
      type: 'number',
      required: false,
    },

    {
      id: 'taille_fenetres_principale',
      question: 'Taille principale des fenêtres',
      type: 'select',
      options: [
        { value: 'petite', label: 'Petite (< 1m²)' },
        { value: 'standard', label: 'Standard (1-2m²)' },
        { value: 'grande', label: 'Grande (2-4m²)' },
        { value: 'tres_grande', label: 'Très grande (> 4m²)' },
      ],
      required: false,
    },

    {
      id: 'materiau_fenetres',
      question: 'Matériau des fenêtres',
      type: 'select',
      options: [
        { value: 'bois', label: 'Bois' },
        { value: 'aluminium', label: 'Aluminium' },
        { value: 'pvc', label: 'PVC' },
        { value: 'mixte_bois_alu', label: 'Mixte (bois + aluminium)' },
      ],
      required: false,
    },

    {
      id: 'type_vitrage',
      question: 'Type de vitrage',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple vitrage' },
        { value: 'double', label: 'Double vitrage' },
        { value: 'triple', label: 'Triple vitrage' },
      ],
      required: false,
    },

    {
      id: 'type_ouverture_fenetres',
      question: 'Type d\'ouverture des fenêtres',
      type: 'select',
      options: [
        { value: 'battante', label: 'Battante' },
        { value: 'coulissante', label: 'Coulissante' },
        { value: 'oscillo_battante', label: 'Oscillo-battante' },
        { value: 'fixe', label: 'Fixe' },
      ],
      required: false,
    },

    {
      id: 'besoin_volets_fenetres',
      question: 'Besoin de volets pour les fenêtres',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 5: VOLETS =====
    {
      id: 'nombre_volets',
      question: 'Nombre de volets',
      type: 'number',
      required: false,
    },

    {
      id: 'type_volets',
      question: 'Type de volets',
      type: 'select',
      options: [
        { value: 'battants_bois', label: 'Battants bois' },
        { value: 'battants_alu', label: 'Battants aluminium' },
        { value: 'coulissants', label: 'Coulissants' },
        { value: 'roulants', label: 'Roulants' },
        { value: 'accordeon', label: 'Accordéon' },
      ],
      required: false,
    },

    {
      id: 'motorisation_volets',
      question: 'Motorisation des volets',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'manuelle', label: 'Manuelle' },
        { value: 'electrique', label: 'Électrique' },
        { value: 'domotique', label: 'Domotique' },
      ],
      required: false,
    },

    // ===== SECTION 6: PORTES EXTÉRIEURES =====
    {
      id: 'besoin_portes_exterieures',
      question: 'Avez-vous besoin de portes extérieures ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'nombre_portes_exterieures',
      question: 'Nombre de portes extérieures',
      type: 'number',
      required: false,
    },

    {
      id: 'type_portes_exterieures',
      question: 'Type de portes extérieures',
      type: 'select',
      options: [
        { value: 'battante', label: 'Battante' },
        { value: 'coulissante', label: 'Coulissante' },
        { value: 'pliante', label: 'Pliante' },
        { value: 'accordeon', label: 'Accordéon' },
      ],
      required: false,
    },

    {
      id: 'materiau_portes_exterieures',
      question: 'Matériau des portes extérieures',
      type: 'select',
      options: [
        { value: 'bois', label: 'Bois' },
        { value: 'aluminium', label: 'Aluminium' },
        { value: 'pvc', label: 'PVC' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    // ===== SECTION 7: ESCALIERS =====
    {
      id: 'besoin_escaliers',
      question: 'Avez-vous besoin d\'escaliers ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'type_escaliers',
      question: 'Type d\'escaliers',
      type: 'select',
      options: [
        { value: 'droit', label: 'Droit' },
        { value: 'tournant', label: 'Tournant' },
        { value: 'helicoidal', label: 'Hélicoïdal' },
        { value: 'suspendu', label: 'Suspendu' },
      ],
      required: false,
    },

    {
      id: 'materiau_escaliers',
      question: 'Matériau des escaliers',
      type: 'select',
      options: [
        { value: 'bois', label: 'Bois' },
        { value: 'metal', label: 'Métal' },
        { value: 'beton', label: 'Béton' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    // ===== SECTION 8: PLACARDS ET DRESSING =====
    {
      id: 'besoin_placards',
      question: 'Avez-vous besoin de placards/dressing ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'surface_placards',
      question: 'Surface totale placards/dressing (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_placards',
      question: 'Type de placards',
      type: 'select',
      options: [
        { value: 'battants', label: 'Battants' },
        { value: 'coulissants', label: 'Coulissants' },
        { value: 'accordeon', label: 'Accordéon' },
        { value: 'sur_mesure', label: 'Sur mesure' },
      ],
      required: false,
    },

    {
      id: 'amenagement_placards',
      question: 'Aménagement intérieur des placards',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple (étagères)' },
        { value: 'standard', label: 'Standard (penderie + étagères)' },
        { value: 'complet', label: 'Complet (multi-rangements)' },
      ],
      required: false,
    },

    // ===== SECTION 9: CUISINE =====
    {
      id: 'besoin_cuisine',
      question: 'Avez-vous besoin de menuiserie cuisine ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'type_cuisine',
      question: 'Type de cuisine',
      type: 'select',
      options: [
        { value: 'lineaire', label: 'Linéaire' },
        { value: 'en_l', label: 'En L' },
        { value: 'en_u', label: 'En U' },
        { value: 'ilot', label: 'Avec îlot' },
      ],
      required: false,
    },

    {
      id: 'materiau_cuisine',
      question: 'Matériau de la cuisine',
      type: 'select',
      options: [
        { value: 'bois', label: 'Bois' },
        { value: 'laque', label: 'Laque' },
        { value: 'stratifie', label: 'Stratifié' },
        { value: 'composite', label: 'Composite' },
      ],
      required: false,
    },

    // ===== SECTION 10: TERRASSE/PERGOLA =====
    {
      id: 'besoin_terrasse',
      question: 'Avez-vous besoin de terrasse/pergola ?',
      type: 'select',
      options: [
        { value: 'oui', label: 'Oui' },
        { value: 'non', label: 'Non' },
      ],
      required: false,
    },

    {
      id: 'surface_terrasse',
      question: 'Surface de terrasse (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_terrasse',
      question: 'Type de terrasse',
      type: 'select',
      options: [
        { value: 'bois', label: 'Bois' },
        { value: 'composite', label: 'Composite' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    // ===== SECTION 11: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_menu',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 12: DÉLAIS =====
    {
      id: 'urgence_menu',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 13: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_menuiserie',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 14: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires_menu',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
