import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE PLOMBERIE - ULTRA-COMPLET
 * Créé par un plombier artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 */

export const plomberieFlow: QuestionFlow = {
  id: 'plomberie',
  name: 'Plomberie',
  questions: [
    // ===== SECTION 1: TYPE DE TRAVAUX =====
    {
      id: 'type_travaux_plomb',
      question: 'Type de travaux de plomberie',
      type: 'select',
      options: [
        { value: 'installation_neuve', label: 'Installation neuve' },
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'remplacement', label: 'Remplacement partiel' },
        { value: 'extension', label: 'Extension' },
        { value: 'reparation', label: 'Réparation/Dépannage' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_plomb',
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

    // ===== SECTION 3: SANITAIRES - EAU CHAUDE/FROIDE =====
    {
      id: 'nombre_baignoires',
      question: 'Nombre de baignoires',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_douches',
      question: 'Nombre de douches',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_lavabos',
      question: 'Nombre de lavabos',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_wc',
      question: 'Nombre de WC',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_bidets',
      question: 'Nombre de bidets',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_eviers',
      question: 'Nombre d\'éviers (cuisine)',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_robinets_exterieurs',
      question: 'Nombre de robinets extérieurs',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: TUYAUTERIE =====
    {
      id: 'longueur_tuyauterie_eau_froide',
      question: 'Longueur de tuyauterie eau froide (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'longueur_tuyauterie_eau_chaude',
      question: 'Longueur de tuyauterie eau chaude (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'longueur_evacuation',
      question: 'Longueur d\'évacuation/évents (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_tuyauterie',
      question: 'Type de tuyauterie souhaité',
      type: 'select',
      options: [
        { value: 'cuivre', label: 'Cuivre' },
        { value: 'pvc', label: 'PVC' },
        { value: 'multicouche', label: 'Multicouche' },
        { value: 'pex', label: 'PEX (tube réticulé)' },
        { value: 'acier_galvanise', label: 'Acier galvanisé' },
      ],
      required: false,
    },

    {
      id: 'diametre_tuyauterie',
      question: 'Diamètre standard de tuyauterie',
      type: 'select',
      options: [
        { value: '10mm', label: '10 mm' },
        { value: '12mm', label: '12 mm' },
        { value: '14mm', label: '14 mm' },
        { value: '16mm', label: '16 mm' },
        { value: '20mm', label: '20 mm' },
        { value: '25mm', label: '25 mm' },
      ],
      required: false,
    },

    // ===== SECTION 5: CHAUFFE-EAU =====
    {
      id: 'besoin_chauffe_eau',
      question: 'Besoin d\'un chauffe-eau',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'type_chauffe_eau',
      question: 'Type de chauffe-eau souhaité',
      type: 'select',
      options: [
        { value: 'electrique', label: 'Électrique' },
        { value: 'gaz', label: 'Gaz' },
        { value: 'thermodynamique', label: 'Thermodynamique' },
        { value: 'solaire', label: 'Solaire' },
        { value: 'pompe_chaleur', label: 'Pompe à chaleur' },
      ],
      required: false,
    },

    {
      id: 'capacite_chauffe_eau',
      question: 'Capacité du chauffe-eau (litres)',
      type: 'select',
      options: [
        { value: '100', label: '100L' },
        { value: '150', label: '150L' },
        { value: '200', label: '200L' },
        { value: '250', label: '250L' },
        { value: '300', label: '300L' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    // ===== SECTION 6: APPAREILS ÉLECTROMÉNAGERS =====
    {
      id: 'besoin_lave_vaisselle',
      question: 'Besoin de raccordement lave-vaisselle',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_lave_linge',
      question: 'Besoin de raccordement lave-linge',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_seche_linge',
      question: 'Besoin de raccordement sèche-linge',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 7: ROBINETTERIE =====
    {
      id: 'marque_robinetterie',
      question: 'Marque de robinetterie préférée',
      type: 'select',
      options: [
        { value: 'grohe', label: 'Grohe' },
        { value: 'hansgrohe', label: 'Hansgrohe' },
        { value: 'kohler', label: 'Kohler' },
        { value: 'jacob_delafon', label: 'Jacob Delafon' },
        { value: 'ideal_standard', label: 'Ideal Standard' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'type_robinetterie',
      question: 'Type de robinetterie',
      type: 'select',
      options: [
        { value: 'classique', label: 'Classique' },
        { value: 'mitigeur', label: 'Mitigeur' },
        { value: 'thermostatique', label: 'Thermostatique' },
        { value: 'design', label: 'Design' },
      ],
      required: false,
    },

    // ===== SECTION 8: BAIGNOIRES ET DOUCHES =====
    {
      id: 'type_baignoire',
      question: 'Type de baignoire',
      type: 'select',
      options: [
        { value: 'acrylique', label: 'Acrylique' },
        { value: 'fonte_email', label: 'Fonte émaillée' },
        { value: 'acier_email', label: 'Acier émaillé' },
        { value: 'pierre', label: 'Pierre naturelle' },
      ],
      required: false,
    },

    {
      id: 'type_douche',
      question: 'Type de douche',
      type: 'select',
      options: [
        { value: 'cabine_complete', label: 'Cabine complète' },
        { value: 'paroi_verre', label: 'Paroi de verre' },
        { value: 'receveur_simple', label: 'Receveur simple' },
        { value: 'douche_italienne', label: 'Douche à l\'italienne' },
      ],
      required: false,
    },

    // ===== SECTION 9: WC =====
    {
      id: 'type_wc',
      question: 'Type de WC',
      type: 'select',
      options: [
        { value: 'suspendu', label: 'Suspendu' },
        { value: 'sol', label: 'Au sol' },
        { value: 'compact', label: 'Compact' },
      ],
      required: false,
    },

    {
      id: 'besoin_wc_japonais',
      question: 'Besoin de WC japonais/bidet électronique',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 10: TUYAUTERIE - ÉTAT EXISTANT =====
    {
      id: 'etat_tuyauterie_existante',
      question: 'État de la tuyauterie existante',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état (remplacement nécessaire)' },
      ],
      required: false,
    },

    {
      id: 'presence_fuites',
      question: 'Présence de fuites',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'legeres', label: 'Légères' },
        { value: 'importantes', label: 'Importantes' },
      ],
      required: false,
    },

    // ===== SECTION 11: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_plomb',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_coupure_eau',
      question: 'Besoin de coupure d\'eau pendant les travaux',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 12: DÉLAIS =====
    {
      id: 'urgence_plomb',
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
      id: 'tva_plomberie',
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
      id: 'notes_supplementaires_plomb',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
