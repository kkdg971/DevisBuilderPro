/**
 * Index des flows - Questionnaires par corps de métier et dépose
 * Localisation: client/src/flows/index.ts
 */

import { QuestionFlow } from '@/types/questionnaire';

// Import des flows de corps de métier (directement dans flows/)
import { electriciteFlowDTU as electriciteFlow } from './electricite';
import { peintureFlow } from './peinture';
import { plomberieFlow } from './plomberie';
import { menuiserieFlow } from './menuiserie';
import { solsFlow } from './sols';
import { isolationFlow } from './isolation';
import { platrerieFlow } from './platrerie';
import { chauffageFlow } from './chauffage';
import { vmcFlow } from './vmc';

// Registre unique des flows par corps de métier
export const postesFlows: Record<string, QuestionFlow> = {
  // Métiers existants
  electricite: electriciteFlow,
  peinture: peintureFlow,
  plomberie: plomberieFlow,
  menuiserie: menuiserieFlow,
  sols: solsFlow,
  isolation: isolationFlow,
  platrerie: platrerieFlow,
  chauffage: chauffageFlow,
  vmc: vmcFlow,
};

export type PostesKey = keyof typeof postesFlows;

export default postesFlows;
