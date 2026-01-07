import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE CHAUFFAGE - ULTRA-COMPLET
 * Créé par un chauffagiste artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 * Marques françaises : Viessmann, Bosch, Chaffoteaux, etc.
 */

export const chauffageFlow: QuestionFlow = {
  id: 'chauffage',
  name: 'Chauffage',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_chauffage',
      question: 'Type de projet chauffage',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'remplacement_chaudiere', label: 'Remplacement chaudière' },
        { value: 'extension', label: 'Extension' },
        { value: 'amelioration', label: 'Amélioration/Optimisation' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_chauffage',
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

    // ===== SECTION 3: SURFACE =====
    {
      id: 'surface_chauffer',
      question: 'Surface totale à chauffer (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_etages',
      question: 'Nombre d\'étages',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_pieces',
      question: 'Nombre de pièces',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: SYSTÈME ACTUEL =====
    {
      id: 'type_chauffage_actuel',
      question: 'Type de chauffage actuel',
      type: 'select',
      options: [
        { value: 'aucun', label: 'Aucun (création neuve)' },
        { value: 'chaudiere_gaz', label: 'Chaudière gaz' },
        { value: 'chaudiere_fioul', label: 'Chaudière fioul' },
        { value: 'chaudiere_bois', label: 'Chaudière bois' },
        { value: 'radiateurs_electriques', label: 'Radiateurs électriques' },
        { value: 'pompe_chaleur', label: 'Pompe à chaleur' },
        { value: 'chauffage_sol', label: 'Chauffage au sol' },
      ],
      required: false,
    },

    {
      id: 'age_chaudiere_actuelle',
      question: 'Âge de la chaudière actuelle (ans)',
      type: 'number',
      required: false,
    },

    {
      id: 'etat_chaudiere_actuelle',
      question: 'État de la chaudière actuelle',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état' },
        { value: 'panne', label: 'En panne' },
      ],
      required: false,
    },

    // ===== SECTION 5: CHAUFFAGE PRINCIPAL SOUHAITÉ =====
    {
      id: 'type_chauffage_principal',
      question: 'Type de chauffage principal souhaité',
      type: 'select',
      options: [
        { value: 'chaudiere_gaz', label: 'Chaudière gaz' },
        { value: 'chaudiere_gaz_condensation', label: 'Chaudière gaz condensation' },
        { value: 'chaudiere_fioul', label: 'Chaudière fioul' },
        { value: 'chaudiere_bois', label: 'Chaudière bois' },
        { value: 'pompe_chaleur_air_air', label: 'Pompe à chaleur air-air' },
        { value: 'pompe_chaleur_air_eau', label: 'Pompe à chaleur air-eau' },
        { value: 'pompe_chaleur_geothermie', label: 'Pompe à chaleur géothermie' },
        { value: 'radiateurs_electriques', label: 'Radiateurs électriques' },
        { value: 'chauffage_sol', label: 'Chauffage au sol' },
        { value: 'chauffage_mural', label: 'Chauffage mural' },
      ],
      required: false,
    },

    // ===== SECTION 6: CHAUDIÈRE =====
    {
      id: 'puissance_chaudiere',
      question: 'Puissance de chaudière souhaitée (kW)',
      type: 'select',
      options: [
        { value: '15', label: '15 kW' },
        { value: '20', label: '20 kW' },
        { value: '25', label: '25 kW' },
        { value: '30', label: '30 kW' },
        { value: '35', label: '35 kW' },
        { value: '40', label: '40 kW' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'marque_chaudiere_preferee',
      question: 'Marque de chaudière préférée',
      type: 'select',
      options: [
        { value: 'viessmann', label: 'Viessmann' },
        { value: 'bosch', label: 'Bosch' },
        { value: 'chaffoteaux', label: 'Chaffoteaux' },
        { value: 'saunier_duval', label: 'Saunier Duval' },
        { value: 'buderus', label: 'Buderus' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'besoin_ballon_eau_chaude',
      question: 'Besoin de ballon d\'eau chaude',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'capacite_ballon',
      question: 'Capacité du ballon d\'eau chaude (litres)',
      type: 'select',
      options: [
        { value: '100', label: '100L' },
        { value: '150', label: '150L' },
        { value: '200', label: '200L' },
        { value: '250', label: '250L' },
        { value: '300', label: '300L' },
        { value: '400', label: '400L' },
      ],
      required: false,
    },

    // ===== SECTION 7: RADIATEURS =====
    {
      id: 'nombre_radiateurs',
      question: 'Nombre de radiateurs',
      type: 'number',
      required: false,
    },

    {
      id: 'type_radiateurs',
      question: 'Type de radiateurs',
      type: 'select',
      options: [
        { value: 'fonte', label: 'Fonte' },
        { value: 'acier', label: 'Acier' },
        { value: 'aluminium', label: 'Aluminium' },
        { value: 'design', label: 'Design/Sèche-serviettes' },
      ],
      required: false,
    },

    {
      id: 'puissance_moyenne_radiateurs',
      question: 'Puissance moyenne des radiateurs (W)',
      type: 'select',
      options: [
        { value: '500', label: '500W' },
        { value: '750', label: '750W' },
        { value: '1000', label: '1000W' },
        { value: '1500', label: '1500W' },
        { value: '2000', label: '2000W' },
      ],
      required: false,
    },

    {
      id: 'besoin_remplacement_radiateurs',
      question: 'Besoin de remplacement des radiateurs',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 8: CHAUFFAGE AU SOL =====
    {
      id: 'besoin_chauffage_sol_chauffage',
      question: 'Besoin de chauffage au sol',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_chauffage_sol',
      question: 'Surface de chauffage au sol (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_chauffage_sol',
      question: 'Type de chauffage au sol',
      type: 'select',
      options: [
        { value: 'eau_chaude', label: 'Eau chaude' },
        { value: 'electrique', label: 'Électrique' },
      ],
      required: false,
    },

    // ===== SECTION 9: TUYAUTERIE =====
    {
      id: 'longueur_tuyauterie_chauffage',
      question: 'Longueur totale de tuyauterie (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_tuyauterie_chauffage',
      question: 'Type de tuyauterie',
      type: 'select',
      options: [
        { value: 'cuivre', label: 'Cuivre' },
        { value: 'pvc', label: 'PVC' },
        { value: 'multicouche', label: 'Multicouche' },
        { value: 'pex', label: 'PEX' },
      ],
      required: false,
    },

    {
      id: 'diametre_tuyauterie_chauffage',
      question: 'Diamètre standard de tuyauterie',
      type: 'select',
      options: [
        { value: '10mm', label: '10 mm' },
        { value: '12mm', label: '12 mm' },
        { value: '14mm', label: '14 mm' },
        { value: '16mm', label: '16 mm' },
        { value: '20mm', label: '20 mm' },
      ],
      required: false,
    },

    // ===== SECTION 10: THERMOSTAT ET CONTRÔLE =====
    {
      id: 'besoin_thermostat',
      question: 'Besoin de thermostat',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'simple', label: 'Simple' },
        { value: 'programmable', label: 'Programmable' },
        { value: 'connecte', label: 'Connecté/Smart' },
      ],
      required: false,
    },

    {
      id: 'besoin_vannes_thermostatiques',
      question: 'Besoin de vannes thermostatiques',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    {
      id: 'besoin_circulateur',
      question: 'Besoin de circulateur',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 11: ÉNERGIE RENOUVELABLE =====
    {
      id: 'besoin_panneaux_solaires',
      question: 'Besoin de panneaux solaires thermiques',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'surface_panneaux_solaires',
      question: 'Surface de panneaux solaires (m²)',
      type: 'number',
      required: false,
    },

    // ===== SECTION 12: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_chauffage',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'emplacement_chaudiere',
      question: 'Emplacement prévu pour la chaudière',
      type: 'select',
      options: [
        { value: 'cuisine', label: 'Cuisine' },
        { value: 'garage', label: 'Garage' },
        { value: 'cave', label: 'Cave' },
        { value: 'buanderie', label: 'Buanderie' },
        { value: 'chaufferie', label: 'Chaufferie' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'presence_conduit_cheminee',
      question: 'Présence d\'un conduit de cheminée',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 13: AIDES ET CERTIFICATIONS =====
    {
      id: 'eligibilite_aides_chauffage',
      question: 'Éligibilité aux aides (MaPrimeRénov, etc.)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'possible', label: 'Possible' },
      ],
      required: false,
    },

    {
      id: 'besoin_certification_rge_chauffage',
      question: 'Besoin de certification RGE',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 14: DÉLAIS =====
    {
      id: 'urgence_chauffage',
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
      id: 'tva_chauffage',
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
      id: 'notes_supplementaires_chauffage',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
