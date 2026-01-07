import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE SOLS - ULTRA-COMPLET
 * Créé par un carreleur/poseur de sol artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const solsFlow: QuestionFlow = {
  id: 'sols',
  name: 'Sols',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_sols',
      question: 'Type de projet sols',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'remplacement_partiel', label: 'Remplacement partiel' },
        { value: 'extension', label: 'Extension' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_sols',
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

    // ===== SECTION 3: SURFACES =====
    {
      id: 'surface_sols',
      question: 'Surface totale à couvrir (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_pieces',
      question: 'Nombre de pièces',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: TYPE DE REVÊTEMENT =====
    {
      id: 'type_revetement',
      question: 'Type de revêtement',
      type: 'select',
      options: [
        { value: 'carrelage', label: 'Carrelage' },
        { value: 'parquet_massif', label: 'Parquet massif' },
        { value: 'parquet_stratifie', label: 'Parquet stratifié' },
        { value: 'vinyle', label: 'Vinyle' },
        { value: 'liege', label: 'Liège' },
        { value: 'pierre_naturelle', label: 'Pierre naturelle' },
        { value: 'beton_cire', label: 'Béton ciré' },
        { value: 'resine', label: 'Résine' },
        { value: 'moquette', label: 'Moquette' },
        { value: 'lino', label: 'Linoléum' },
      ],
      required: false,
    },

    // ===== SECTION 5: CARRELAGE =====
    {
      id: 'type_carrelage',
      question: 'Type de carrelage',
      type: 'select',
      options: [
        { value: 'ceramique', label: 'Céramique' },
        { value: 'gres', label: 'Grès' },
        { value: 'gres_cerame', label: 'Grès cérame' },
        { value: 'porcelaine', label: 'Porcelaine' },
        { value: 'mosaique', label: 'Mosaïque' },
      ],
      required: false,
    },

    {
      id: 'format_carrelage',
      question: 'Format de carrelage',
      type: 'select',
      options: [
        { value: 'petit', label: 'Petit (10x10 à 20x20 cm)' },
        { value: 'standard', label: 'Standard (30x30 à 40x40 cm)' },
        { value: 'grand', label: 'Grand (50x50 à 60x60 cm)' },
        { value: 'tres_grand', label: 'Très grand (> 60 cm)' },
      ],
      required: false,
    },

    {
      id: 'finition_carrelage',
      question: 'Finition du carrelage',
      type: 'select',
      options: [
        { value: 'brillant', label: 'Brillant' },
        { value: 'satin', label: 'Satiné' },
        { value: 'mat', label: 'Mat' },
        { value: 'antiderapant', label: 'Antidérapant' },
      ],
      required: false,
    },

    {
      id: 'couleur_carrelage',
      question: 'Couleur/Style du carrelage',
      type: 'select',
      options: [
        { value: 'clair', label: 'Clair' },
        { value: 'moyen', label: 'Moyen' },
        { value: 'fonce', label: 'Foncé' },
        { value: 'motif', label: 'Motif/Décor' },
      ],
      required: false,
    },

    // ===== SECTION 6: PARQUET =====
    {
      id: 'type_parquet',
      question: 'Type de parquet',
      type: 'select',
      options: [
        { value: 'massif_chene', label: 'Massif - Chêne' },
        { value: 'massif_hetre', label: 'Massif - Hêtre' },
        { value: 'massif_bouleau', label: 'Massif - Bouleau' },
        { value: 'massif_exotique', label: 'Massif - Bois exotique' },
        { value: 'contrecolle_chene', label: 'Contrecollé - Chêne' },
        { value: 'contrecolle_hetre', label: 'Contrecollé - Hêtre' },
      ],
      required: false,
    },

    {
      id: 'format_parquet',
      question: 'Format de parquet',
      type: 'select',
      options: [
        { value: 'lames_etroites', label: 'Lames étroites (< 100 mm)' },
        { value: 'lames_standard', label: 'Lames standard (100-150 mm)' },
        { value: 'lames_larges', label: 'Lames larges (> 150 mm)' },
      ],
      required: false,
    },

    {
      id: 'finition_parquet',
      question: 'Finition du parquet',
      type: 'select',
      options: [
        { value: 'brut', label: 'Brut (à finir sur place)' },
        { value: 'vernis_mat', label: 'Vernis mat' },
        { value: 'vernis_satin', label: 'Vernis satiné' },
        { value: 'vernis_brillant', label: 'Vernis brillant' },
        { value: 'huile', label: 'Huile' },
      ],
      required: false,
    },

    // ===== SECTION 7: VINYLE =====
    {
      id: 'type_vinyle',
      question: 'Type de vinyle',
      type: 'select',
      options: [
        { value: 'lames_pvc', label: 'Lames PVC (LVT)' },
        { value: 'rouleaux_pvc', label: 'Rouleaux PVC' },
        { value: 'vinyle_luxe', label: 'Vinyle de luxe (SPC)' },
      ],
      required: false,
    },

    // ===== SECTION 8: PIERRE NATURELLE =====
    {
      id: 'type_pierre',
      question: 'Type de pierre naturelle',
      type: 'select',
      options: [
        { value: 'marbre', label: 'Marbre' },
        { value: 'granit', label: 'Granit' },
        { value: 'travertin', label: 'Travertin' },
        { value: 'ardoise', label: 'Ardoise' },
        { value: 'calcaire', label: 'Calcaire' },
      ],
      required: false,
    },

    // ===== SECTION 9: BÉTON CIRÉ =====
    {
      id: 'epaisseur_beton_cire',
      question: 'Épaisseur du béton ciré',
      type: 'select',
      options: [
        { value: '2cm', label: '2 cm' },
        { value: '3cm', label: '3 cm' },
        { value: '4cm', label: '4 cm' },
      ],
      required: false,
    },

    {
      id: 'finition_beton_cire',
      question: 'Finition du béton ciré',
      type: 'select',
      options: [
        { value: 'brut', label: 'Brut' },
        { value: 'poli', label: 'Poli' },
        { value: 'brillant', label: 'Brillant' },
        { value: 'mat', label: 'Mat' },
      ],
      required: false,
    },

    // ===== SECTION 10: PRÉPARATION DU SOL =====
    {
      id: 'etat_sol_existant',
      question: 'État du sol existant',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état' },
        { value: 'tres_mauvais_etat', label: 'Très mauvais état' },
      ],
      required: false,
    },

    {
      id: 'besoin_enlever_ancien_revetement',
      question: 'Besoin d\'enlever l\'ancien revêtement',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_nivellement',
      question: 'Besoin de nivellement/ragréage',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'leger', label: 'Léger' },
        { value: 'important', label: 'Important' },
      ],
      required: false,
    },

    {
      id: 'besoin_sous_couche',
      question: 'Besoin de sous-couche/isolant',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'acoustique', label: 'Acoustique' },
        { value: 'thermique', label: 'Thermique' },
        { value: 'humidite', label: 'Anti-humidité' },
      ],
      required: false,
    },

    {
      id: 'presence_humidite_sol',
      question: 'Présence d\'humidité',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legere', label: 'Légère' },
        { value: 'importante', label: 'Importante' },
      ],
      required: false,
    },

    // ===== SECTION 11: CHAUFFAGE AU SOL =====
    {
      id: 'besoin_chauffage_sol',
      question: 'Besoin de chauffage au sol',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 12: JOINTS ET FINITIONS =====
    {
      id: 'type_joint',
      question: 'Type de joint (pour carrelage)',
      type: 'select',
      options: [
        { value: 'ciment', label: 'Ciment' },
        { value: 'epoxy', label: 'Époxy' },
        { value: 'polyester', label: 'Polyester' },
      ],
      required: false,
    },

    {
      id: 'couleur_joint',
      question: 'Couleur du joint',
      type: 'select',
      options: [
        { value: 'blanc', label: 'Blanc' },
        { value: 'gris', label: 'Gris' },
        { value: 'noir', label: 'Noir' },
        { value: 'couleur', label: 'Couleur' },
      ],
      required: false,
    },

    {
      id: 'besoin_baguette_finition',
      question: 'Besoin de baguette de finition',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 13: PIÈCES SPÉCIALES =====
    {
      id: 'presence_salle_eau',
      question: 'Présence de salle d\'eau (salle de bain, cuisine)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'presence_escaliers',
      question: 'Présence d\'escaliers',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 14: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_sols',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_protection_mobilier_sols',
      question: 'Protection du mobilier/aménagement',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 15: DÉLAIS =====
    {
      id: 'urgence_sols',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 16: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_sols',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 17: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires_sols',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
