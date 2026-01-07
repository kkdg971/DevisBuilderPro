import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE PEINTURE - ULTRA-COMPLET
 * Créé par un peintre artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const peintureFlow: QuestionFlow = {
  id: 'peinture',
  name: 'Peinture',
  questions: [
    // ===== SECTION 1: TYPE DE TRAVAUX =====
    {
      id: 'type_travaux',
      question: 'Type de travaux',
      type: 'select',
      options: [
        { value: 'interieur', label: 'Intérieur' },
        { value: 'exterieur', label: 'Extérieur' },
        { value: 'mixte', label: 'Mixte (intérieur + extérieur)' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment',
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

    // ===== SECTION 3: SURFACES À PEINDRE =====
    {
      id: 'surface_murs',
      question: 'Surface totale des murs à peindre (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'surface_plafonds',
      question: 'Surface totale des plafonds à peindre (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'surface_boiseries',
      question: 'Surface totale des boiseries à peindre (m²)',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: ÉTAT DES SURFACES =====
    {
      id: 'etat_surface',
      question: 'État général des surfaces',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état (peu de préparation)' },
        { value: 'etat_moyen', label: 'État moyen (préparation normale)' },
        { value: 'mauvais_etat', label: 'Mauvais état (préparation importante)' },
        { value: 'tres_mauvais_etat', label: 'Très mauvais état (travaux importants)' },
      ],
      required: false,
    },

    {
      id: 'presence_humidite',
      question: 'Présence d\'humidité ou de moisissures',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legere', label: 'Légère' },
        { value: 'importante', label: 'Importante' },
      ],
      required: false,
    },

    {
      id: 'presence_fissures',
      question: 'Présence de fissures',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legeres', label: 'Légères' },
        { value: 'importantes', label: 'Importantes' },
      ],
      required: false,
    },

    // ===== SECTION 5: PRÉPARATION DES SURFACES =====
    {
      id: 'besoin_decapage',
      question: 'Besoin de décapage de peinture ancienne',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    {
      id: 'besoin_rebouchage',
      question: 'Besoin de rebouchage/enduit',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'leger', label: 'Léger' },
        { value: 'important', label: 'Important' },
      ],
      required: false,
    },

    {
      id: 'besoin_ponçage',
      question: 'Besoin de ponçage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'leger', label: 'Léger' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    {
      id: 'besoin_nettoyage',
      question: 'Besoin de nettoyage/dégraissage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 6: TYPE DE PEINTURE =====
    {
      id: 'type_peinture',
      question: 'Type de peinture souhaité',
      type: 'select',
      options: [
        { value: 'peinture_acrylique', label: 'Peinture acrylique (standard)' },
        { value: 'peinture_glycero', label: 'Peinture glycéro' },
        { value: 'peinture_epoxy', label: 'Peinture époxy' },
        { value: 'peinture_polyurethane', label: 'Peinture polyuréthane' },
        { value: 'peinture_speciale', label: 'Peinture spéciale (anti-humidité, etc.)' },
      ],
      required: false,
    },

    {
      id: 'marque_peinture',
      question: 'Marque de peinture préférée',
      type: 'select',
      options: [
        { value: 'dulux_valentine', label: 'Dulux Valentine' },
        { value: 'tollens', label: 'Tollens' },
        { value: 'ripolin', label: 'Ripolin' },
        { value: 'leroy_merlin', label: 'Leroy Merlin' },
        { value: 'seigneurie', label: 'Seigneurie' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    // ===== SECTION 7: FINITION =====
    {
      id: 'finition_murs',
      question: 'Finition des murs',
      type: 'select',
      options: [
        { value: 'mate', label: 'Mate' },
        { value: 'satinee', label: 'Satinée' },
        { value: 'brillante', label: 'Brillante' },
        { value: 'velours', label: 'Velours' },
      ],
      required: false,
    },

    {
      id: 'finition_plafonds',
      question: 'Finition des plafonds',
      type: 'select',
      options: [
        { value: 'mate', label: 'Mate' },
        { value: 'satinee', label: 'Satinée' },
        { value: 'brillante', label: 'Brillante' },
      ],
      required: false,
    },

    // ===== SECTION 8: COULEURS =====
    {
      id: 'nombre_couleurs',
      question: 'Nombre de couleurs différentes',
      type: 'number',
      required: false,
    },

    {
      id: 'couleurs_sombres',
      question: 'Présence de couleurs sombres ou spéciales',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 9: NOMBRE DE COUCHES =====
    {
      id: 'nombre_couches',
      question: 'Nombre de couches de peinture',
      type: 'select',
      options: [
        { value: 'une_couche', label: '1 couche' },
        { value: 'deux_couches', label: '2 couches' },
        { value: 'trois_couches', label: '3 couches' },
        { value: 'plus_trois', label: 'Plus de 3 couches' },
      ],
      required: false,
    },

    {
      id: 'besoin_sous_couche',
      question: 'Besoin de sous-couche/apprêt',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 10: ACCÈS ET CONDITIONS =====
    {
      id: 'hauteur_plafonds',
      question: 'Hauteur des plafonds',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard (2.5m)' },
        { value: 'haut', label: 'Haut (3-4m)' },
        { value: 'tres_haut', label: 'Très haut (>4m)' },
      ],
      required: false,
    },

    {
      id: 'acces_difficile',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_echafaudage',
      question: 'Besoin d\'échafaudage ou de matériel spécial',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'protection_mobilier',
      question: 'Protection du mobilier/aménagement',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 11: DÉLAIS =====
    {
      id: 'urgence',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 12: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_peinture',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 13: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
