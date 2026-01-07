import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE PLÂTRERIE - ULTRA-COMPLET
 * Créé par un plâtrier artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const platrerieFlow: QuestionFlow = {
  id: 'platerie',
  name: 'Plâtrerie',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_platerie',
      question: 'Type de projet plâtrerie',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'reparation', label: 'Réparation/Rebouchage' },
        { value: 'extension', label: 'Extension' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_platerie',
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
      id: 'surface_platerie',
      question: 'Surface totale à traiter (m²)',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: TYPE DE TRAVAUX =====
    {
      id: 'type_travaux_platerie',
      question: 'Type de travaux',
      type: 'multi-select',
      options: [
        { value: 'cloisons', label: 'Cloisons' },
        { value: 'faux_plafond', label: 'Faux plafond' },
        { value: 'enduit', label: 'Enduit' },
        { value: 'rebouchage', label: 'Rebouchage' },
        { value: 'joints', label: 'Joints' },
        { value: 'isolation_acoustique', label: 'Isolation acoustique' },
      ],
      required: false,
    },

    // ===== SECTION 5: CLOISONS =====
    {
      id: 'besoin_cloisons',
      question: 'Besoin de cloisons',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_cloisons',
      question: 'Surface de cloisons (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_cloisons',
      question: 'Type de cloisons',
      type: 'select',
      options: [
        { value: 'placoplatre', label: 'Placoplatre (BA13)' },
        { value: 'placoplatre_renforce', label: 'Placoplatre renforcé (BA15)' },
        { value: 'brique', label: 'Brique' },
        { value: 'brique_creuse', label: 'Brique creuse' },
        { value: 'parpaing', label: 'Parpaing' },
        { value: 'carreaux_platre', label: 'Carreaux de plâtre' },
      ],
      required: false,
    },

    {
      id: 'hauteur_cloisons',
      question: 'Hauteur des cloisons',
      type: 'select',
      options: [
        { value: 'standard', label: 'Standard (2.5m)' },
        { value: 'haut', label: 'Haut (3-4m)' },
        { value: 'tres_haut', label: 'Très haut (>4m)' },
      ],
      required: false,
    },

    {
      id: 'besoin_isolation_cloisons',
      question: 'Besoin d\'isolation des cloisons',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'acoustique', label: 'Acoustique' },
        { value: 'thermique', label: 'Thermique' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    // ===== SECTION 6: FAUX PLAFOND =====
    {
      id: 'besoin_faux_plafond',
      question: 'Besoin de faux plafond',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_faux_plafond',
      question: 'Surface de faux plafond (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_faux_plafond',
      question: 'Type de faux plafond',
      type: 'select',
      options: [
        { value: 'placoplatre', label: 'Placoplatre' },
        { value: 'dalles_acoustiques', label: 'Dalles acoustiques' },
        { value: 'lambris', label: 'Lambris' },
        { value: 'bois', label: 'Bois' },
      ],
      required: false,
    },

    {
      id: 'hauteur_faux_plafond',
      question: 'Hauteur de chute du faux plafond',
      type: 'select',
      options: [
        { value: '10cm', label: '10 cm' },
        { value: '20cm', label: '20 cm' },
        { value: '30cm', label: '30 cm' },
        { value: '50cm', label: '50 cm' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'presence_spots_faux_plafond',
      question: 'Présence de spots/éclairage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'nombre_spots_faux_plafond',
      question: 'Nombre de spots',
      type: 'number',
      required: false,
    },

    {
      id: 'presence_gaines_faux_plafond',
      question: 'Présence de gaines/conduits',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 7: ENDUIT =====
    {
      id: 'besoin_enduit',
      question: 'Besoin d\'enduit',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_enduit',
      question: 'Surface à enduire (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_enduit',
      question: 'Type d\'enduit',
      type: 'select',
      options: [
        { value: 'enduit_platre', label: 'Enduit plâtre' },
        { value: 'enduit_ciment', label: 'Enduit ciment' },
        { value: 'enduit_chaux', label: 'Enduit chaux' },
        { value: 'enduit_decoratif', label: 'Enduit décoratif' },
        { value: 'enduit_monocouche', label: 'Enduit monocouche' },
      ],
      required: false,
    },

    {
      id: 'finition_enduit',
      question: 'Finition de l\'enduit',
      type: 'select',
      options: [
        { value: 'lisse', label: 'Lisse' },
        { value: 'gratté', label: 'Gratté' },
        { value: 'taloché', label: 'Taloché' },
        { value: 'brossé', label: 'Brossé' },
      ],
      required: false,
    },

    {
      id: 'nombre_couches_enduit',
      question: 'Nombre de couches d\'enduit',
      type: 'select',
      options: [
        { value: 'une_couche', label: '1 couche' },
        { value: 'deux_couches', label: '2 couches' },
        { value: 'trois_couches', label: '3 couches' },
      ],
      required: false,
    },

    // ===== SECTION 8: REBOUCHAGE =====
    {
      id: 'besoin_rebouchage',
      question: 'Besoin de rebouchage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'leger', label: 'Léger' },
        { value: 'important', label: 'Important' },
      ],
      required: false,
    },

    {
      id: 'type_defauts',
      question: 'Type de défauts à reboucher',
      type: 'multi-select',
      options: [
        { value: 'trous_petits', label: 'Petits trous' },
        { value: 'trous_moyens', label: 'Trous moyens' },
        { value: 'trous_grands', label: 'Grands trous' },
        { value: 'fissures', label: 'Fissures' },
        { value: 'traces_chevilles', label: 'Traces de chevilles' },
      ],
      required: false,
    },

    // ===== SECTION 9: JOINTS =====
    {
      id: 'besoin_joints',
      question: 'Besoin de joints',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'longueur_joints',
      question: 'Longueur totale de joints (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_joints',
      question: 'Type de joints',
      type: 'select',
      options: [
        { value: 'joints_placoplatre', label: 'Joints placoplatre' },
        { value: 'joints_carrelage', label: 'Joints carrelage' },
        { value: 'joints_dilatation', label: 'Joints de dilatation' },
      ],
      required: false,
    },

    // ===== SECTION 10: ÉTAT DES SURFACES =====
    {
      id: 'etat_surface_platerie',
      question: 'État général des surfaces',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état' },
      ],
      required: false,
    },

    {
      id: 'presence_humidite_platerie',
      question: 'Présence d\'humidité',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legere', label: 'Légère' },
        { value: 'importante', label: 'Importante' },
      ],
      required: false,
    },

    {
      id: 'presence_moisissures',
      question: 'Présence de moisissures',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 11: PRÉPARATION =====
    {
      id: 'besoin_decapage_platerie',
      question: 'Besoin de décapage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    {
      id: 'besoin_nettoyage_platerie',
      question: 'Besoin de nettoyage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 12: PIÈCES SPÉCIALES =====
    {
      id: 'presence_salle_eau_platerie',
      question: 'Présence de salle d\'eau (salle de bain, cuisine)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_placoplatre_hydrofuge',
      question: 'Besoin de placoplatre hydrofuge',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 13: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_platerie',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_protection_mobilier_platerie',
      question: 'Protection du mobilier/aménagement',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 14: DÉLAIS =====
    {
      id: 'urgence_platerie',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 15: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_platerie',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 16: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires_platerie',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
