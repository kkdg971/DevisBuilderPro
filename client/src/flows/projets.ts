/**
 * Flows pour les types de projets de rénovation
 * Localisation: client/src/flows/projets.ts
 */

import { QuestionFlow } from '@/types/questionnaire';

export const projetsRenovationFlows: Record<string, QuestionFlow> = {
  appartement: {
    id: 'appartement',
    name: 'Rénovation d\'appartement',
    questions: []
  },

  maison: {
    id: 'maison',
    name: 'Rénovation de maison',
    questions: []
  },

  studio: {
    id: 'studio',
    name: 'Rénovation de studio',
    questions: []
  },

  'salle-de-bain': {
    id: 'salle-de-bain',
    name: 'Rénovation de salle de bain',
    questions: []
  },

  cuisine: {
    id: 'cuisine',
    name: 'Rénovation de cuisine',
    questions: []
  },

  extension: {
    id: 'extension',
    name: 'Extension',
    questions: []
  },

  surelevation: {
    id: 'surelevation',
    name: 'Surélévation',
    questions: []
  },

  bureaux: {
    id: 'bureaux',
    name: 'Aménagement de bureaux',
    questions: []
  },

  commerce: {
    id: 'commerce',
    name: 'Bar / Restaurant / Commerce',
    questions: []
  },
};

export default projetsRenovationFlows;
