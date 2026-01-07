/**
 * Index complet - Dépose et Évacuation des Gravats
 * Localisation: client/src/flows/depose-evacuation-gravats/index.ts
 */

import { QuestionFlow } from '@/types/questionnaire';

// Import des questions pour chaque métier
import { deposeElectriciteQuestions } from './electricite-questions';
import { deposePlomberieQuestions } from './plomberie-questions';
import { deposeSolsQuestions } from './sols-questions';
import { deposeMenuiserieQuestions } from './menuiserie-questions';
import { deposeIsolationQuestions } from './isolation-questions';
import { deposeChauffageQuestions } from './chauffage-questions';
import { deposePeintureQuestions } from './peinture-questions';
import { deposePlatrerieQuestions } from './platrerie-questions';
import { deposeVmcQuestions } from './vmc-questions';

// ===== FLOWS DE DÉPOSE =====

export const deposeElectriciteFlow: QuestionFlow = {
  id: 'depose_electricite',
  name: 'Dépose Électricité',
  questions: deposeElectriciteQuestions
};

export const deposePlomberieFlow: QuestionFlow = {
  id: 'depose_plomberie',
  name: 'Dépose Plomberie',
  questions: deposePlomberieQuestions
};

export const deposeSolsFlow: QuestionFlow = {
  id: 'depose_sols',
  name: 'Dépose Sols',
  questions: deposeSolsQuestions
};

export const deposeMenuiserieFlow: QuestionFlow = {
  id: 'depose_menuiserie',
  name: 'Dépose Menuiserie',
  questions: deposeMenuiserieQuestions
};

export const deposeIsolationFlow: QuestionFlow = {
  id: 'depose_isolation',
  name: 'Dépose Isolation',
  questions: deposeIsolationQuestions
};

export const deposeChauffageFlow: QuestionFlow = {
  id: 'depose_chauffage',
  name: 'Dépose Chauffage',
  questions: deposeChauffageQuestions
};

export const deposePeintureFlow: QuestionFlow = {
  id: 'depose_peinture',
  name: 'Dépose Peinture',
  questions: deposePeintureQuestions
};

export const deposePlatrerieFlow: QuestionFlow = {
  id: 'depose_platrerie',
  name: 'Dépose Plâtrerie',
  questions: deposePlatrerieQuestions
};

export const deposeVmcFlow: QuestionFlow = {
  id: 'depose_vmc',
  name: 'Dépose VMC',
  questions: deposeVmcQuestions
};

// ===== OBJET REGROUPANT TOUS LES FLOWS DE DÉPOSE =====

export const deposeFlows = {
  depose_electricite: deposeElectriciteFlow,
  depose_plomberie: deposePlomberieFlow,
  depose_sols: deposeSolsFlow,
  depose_menuiserie: deposeMenuiserieFlow,
  depose_isolation: deposeIsolationFlow,
  depose_chauffage: deposeChauffageFlow,
  depose_peinture: deposePeintureFlow,
  depose_platrerie: deposePlatrerieFlow,
  depose_vmc: deposeVmcFlow
};

// ===== EXPORT PAR DÉFAUT =====

export default deposeFlows;
