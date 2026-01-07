import type { QuestionFlow } from '../types';

/**
 * QUESTIONNAIRE VMC - ULTRA-COMPLET
 * Créé par un installateur VMC artisan avec 30+ ans d'expérience
 * Toutes les questions nécessaires pour un devis précis
 * Marques françaises : Aldes, Helios, Unelvent, etc.
 */

export const vmcFlow: QuestionFlow = {
  id: 'vmc',
  name: 'VMC',
  questions: [
    // ===== SECTION 1: TYPE DE PROJET =====
    {
      id: 'type_projet_vmc',
      question: 'Type de projet VMC',
      type: 'select',
      options: [
        { value: 'renovation_complete', label: 'Rénovation complète' },
        { value: 'creation_neuve', label: 'Création neuve' },
        { value: 'remplacement_vmc', label: 'Remplacement VMC existante' },
        { value: 'extension', label: 'Extension' },
      ],
      required: false,
    },

    // ===== SECTION 2: NATURE DU BÂTIMENT =====
    {
      id: 'nature_batiment_vmc',
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
      id: 'surface_ventiler',
      question: 'Surface totale à ventiler (m²)',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_pieces',
      question: 'Nombre de pièces',
      type: 'number',
      required: false,
    },

    {
      id: 'nombre_salles_eau',
      question: 'Nombre de salles d\'eau (salle de bain, cuisine)',
      type: 'number',
      required: false,
    },

    // ===== SECTION 4: SYSTÈME ACTUEL =====
    {
      id: 'type_vmc_actuelle',
      question: 'Type de VMC actuelle',
      type: 'select',
      options: [
        { value: 'aucune', label: 'Aucune (création neuve)' },
        { value: 'simple_flux', label: 'Simple flux' },
        { value: 'double_flux', label: 'Double flux' },
        { value: 'hygroreglable', label: 'Hygroréglable' },
        { value: 'hybride', label: 'Hybride' },
      ],
      required: false,
    },

    {
      id: 'age_vmc_actuelle',
      question: 'Âge de la VMC actuelle (ans)',
      type: 'number',
      required: false,
    },

    {
      id: 'etat_vmc_actuelle',
      question: 'État de la VMC actuelle',
      type: 'select',
      options: [
        { value: 'bon_etat', label: 'Bon état' },
        { value: 'etat_moyen', label: 'État moyen' },
        { value: 'mauvais_etat', label: 'Mauvais état' },
        { value: 'ne_fonctionne_pas', label: 'Ne fonctionne pas' },
      ],
      required: false,
    },

    // ===== SECTION 5: TYPE DE VMC PRINCIPAL =====
    {
      id: 'type_vmc_principal',
      question: 'Type de VMC souhaité',
      type: 'select',
      options: [
        { value: 'simple_flux', label: 'Simple flux' },
        { value: 'simple_flux_hygroreglable', label: 'Simple flux hygroréglable' },
        { value: 'double_flux', label: 'Double flux' },
        { value: 'double_flux_thermodynamique', label: 'Double flux thermodynamique' },
        { value: 'hybride', label: 'Hybride' },
      ],
      required: false,
    },

    // ===== SECTION 6: SIMPLE FLUX =====
    {
      id: 'besoin_simple_flux',
      question: 'Besoin de simple flux',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'marque_simple_flux',
      question: 'Marque de simple flux préférée',
      type: 'select',
      options: [
        { value: 'aldes', label: 'Aldes' },
        { value: 'helios', label: 'Helios' },
        { value: 'unelvent', label: 'Unelvent' },
        { value: 'atlantic', label: 'Atlantic' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'debit_simple_flux',
      question: 'Débit souhaité simple flux (m³/h)',
      type: 'select',
      options: [
        { value: '100', label: '100 m³/h' },
        { value: '150', label: '150 m³/h' },
        { value: '200', label: '200 m³/h' },
        { value: '250', label: '250 m³/h' },
        { value: '300', label: '300 m³/h' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    // ===== SECTION 7: DOUBLE FLUX =====
    {
      id: 'besoin_double_flux',
      question: 'Besoin de double flux',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'marque_double_flux',
      question: 'Marque de double flux préférée',
      type: 'select',
      options: [
        { value: 'aldes', label: 'Aldes' },
        { value: 'helios', label: 'Helios' },
        { value: 'unelvent', label: 'Unelvent' },
        { value: 'zehnder', label: 'Zehnder' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'debit_double_flux',
      question: 'Débit souhaité double flux (m³/h)',
      type: 'select',
      options: [
        { value: '150', label: '150 m³/h' },
        { value: '200', label: '200 m³/h' },
        { value: '250', label: '250 m³/h' },
        { value: '300', label: '300 m³/h' },
        { value: '350', label: '350 m³/h' },
        { value: '400', label: '400 m³/h' },
      ],
      required: false,
    },

    {
      id: 'rendement_echangeur',
      question: 'Rendement d\'échangeur souhaité',
      type: 'select',
      options: [
        { value: '75', label: '75%' },
        { value: '80', label: '80%' },
        { value: '85', label: '85%' },
        { value: '90', label: '90%' },
      ],
      required: false,
    },

    // ===== SECTION 8: HYGRORÉGLABLE =====
    {
      id: 'besoin_hygroreglable',
      question: 'Besoin de hygroréglable',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'type_hygroreglable',
      question: 'Type de hygroréglable',
      type: 'select',
      options: [
        { value: 'simple_flux', label: 'Simple flux hygroréglable' },
        { value: 'double_flux', label: 'Double flux hygroréglable' },
      ],
      required: false,
    },

    // ===== SECTION 9: BOUCHES D'EXTRACTION =====
    {
      id: 'nombre_bouches_extraction',
      question: 'Nombre de bouches d\'extraction',
      type: 'number',
      required: false,
    },

    {
      id: 'type_bouches_extraction',
      question: 'Type de bouches d\'extraction',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'hygroreglable', label: 'Hygroréglable' },
        { value: 'thermostatique', label: 'Thermostatique' },
      ],
      required: false,
    },

    {
      id: 'localisation_bouches',
      question: 'Localisation des bouches',
      type: 'multi-select',
      options: [
        { value: 'cuisine', label: 'Cuisine' },
        { value: 'salle_bain', label: 'Salle de bain' },
        { value: 'wc', label: 'WC' },
        { value: 'buanderie', label: 'Buanderie' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    // ===== SECTION 10: BOUCHES D'ENTRÉE D'AIR =====
    {
      id: 'nombre_entrees_air',
      question: 'Nombre d\'entrées d\'air',
      type: 'number',
      required: false,
    },

    {
      id: 'type_entrees_air',
      question: 'Type d\'entrées d\'air',
      type: 'select',
      options: [
        { value: 'simple', label: 'Simple' },
        { value: 'hygroreglable', label: 'Hygroréglable' },
        { value: 'acoustique', label: 'Acoustique' },
      ],
      required: false,
    },

    {
      id: 'localisation_entrees_air',
      question: 'Localisation des entrées d\'air',
      type: 'multi-select',
      options: [
        { value: 'salon', label: 'Salon' },
        { value: 'chambre', label: 'Chambre' },
        { value: 'bureau', label: 'Bureau' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    // ===== SECTION 11: DUCTWORK =====
    {
      id: 'longueur_gaines',
      question: 'Longueur totale de gaines (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_gaines',
      question: 'Type de gaines',
      type: 'select',
      options: [
        { value: 'rigides', label: 'Rigides' },
        { value: 'souples', label: 'Souples' },
        { value: 'mixte', label: 'Mixte' },
      ],
      required: false,
    },

    {
      id: 'diametre_gaines',
      question: 'Diamètre des gaines',
      type: 'select',
      options: [
        { value: '80mm', label: '80 mm' },
        { value: '100mm', label: '100 mm' },
        { value: '125mm', label: '125 mm' },
        { value: '160mm', label: '160 mm' },
        { value: '200mm', label: '200 mm' },
      ],
      required: false,
    },

    {
      id: 'isolation_gaines',
      question: 'Isolation des gaines',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 12: CONDUITS D'ÉVACUATION =====
    {
      id: 'longueur_evacuation',
      question: 'Longueur d\'évacuation (ml)',
      type: 'number',
      required: false,
    },

    {
      id: 'type_evacuation',
      question: 'Type d\'évacuation',
      type: 'select',
      options: [
        { value: 'facade', label: 'Façade' },
        { value: 'toiture', label: 'Toiture' },
        { value: 'conduit_existant', label: 'Conduit existant' },
      ],
      required: false,
    },

    // ===== SECTION 13: CONTRÔLE ET AUTOMATISATION =====
    {
      id: 'besoin_thermostat',
      question: 'Besoin de thermostat/contrôle',
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
      id: 'besoin_detecteur_humidite',
      question: 'Besoin de détecteur d\'humidité',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'besoin_detecteur_presence',
      question: 'Besoin de détecteur de présence',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 14: UNITÉ CENTRALE =====
    {
      id: 'emplacement_unite_centrale',
      question: 'Emplacement prévu pour l\'unité centrale',
      type: 'select',
      options: [
        { value: 'combles', label: 'Combles' },
        { value: 'cave', label: 'Cave' },
        { value: 'garage', label: 'Garage' },
        { value: 'buanderie', label: 'Buanderie' },
        { value: 'placard', label: 'Placard' },
        { value: 'autre', label: 'Autre' },
      ],
      required: false,
    },

    {
      id: 'acces_unite_centrale',
      question: 'Accès à l\'unité centrale',
      type: 'select',
      options: [
        { value: 'facile', label: 'Facile' },
        { value: 'difficile', label: 'Difficile' },
      ],
      required: false,
    },

    // ===== SECTION 15: FILTRATION =====
    {
      id: 'besoin_filtration',
      question: 'Besoin de filtration',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'simple', label: 'Simple' },
        { value: 'haute_performance', label: 'Haute performance' },
      ],
      required: false,
    },

    // ===== SECTION 16: ACCÈS ET CONDITIONS =====
    {
      id: 'acces_difficile_vmc',
      question: 'Accès difficile (escaliers étroits, étages élevés)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    {
      id: 'presence_conduit_existant',
      question: 'Présence de conduit existant utilisable',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'partiel', label: 'Partiel' },
        { value: 'complet', label: 'Complet' },
      ],
      required: false,
    },

    // ===== SECTION 17: AIDES ET CERTIFICATIONS =====
    {
      id: 'eligibilite_aides_vmc',
      question: 'Éligibilité aux aides (MaPrimeRénov, etc.)',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'possible', label: 'Possible' },
      ],
      required: false,
    },

    {
      id: 'besoin_certification_rge_vmc',
      question: 'Besoin de certification RGE',
      type: 'select',
      options: [
        { value: 'non', label: 'Non' },
        { value: 'oui', label: 'Oui' },
      ],
      required: false,
    },

    // ===== SECTION 18: DÉLAIS =====
    {
      id: 'urgence_vmc',
      question: 'Délai souhaité',
      type: 'select',
      options: [
        { value: 'normal', label: 'Normal' },
        { value: 'rapide', label: 'Rapide (1-2 semaines)' },
        { value: 'urgent', label: 'Urgent (moins d\'une semaine)' },
      ],
      required: false,
    },

    // ===== SECTION 19: TVA (OBLIGATOIRE) =====
    {
      id: 'tva_vmc',
      question: 'Taux de TVA applicable (%)',
      type: 'select',
      options: [
        { value: '5.5', label: '5,5% (travaux de rénovation)' },
        { value: '10', label: '10% (travaux spécifiques)' },
        { value: '20', label: '20% (taux normal)' },
      ],
      required: true,
    },

    // ===== SECTION 20: NOTES SUPPLÉMENTAIRES =====
    {
      id: 'notes_supplementaires_vmc',
      question: 'Notes supplémentaires ou demandes spéciales',
      type: 'textarea',
      required: false,
    },
  ],
};
