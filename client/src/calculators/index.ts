// ✅ FICHIER CALCULATORS/INDEX.TS - À COPIER DANS client/src/calculators/index.ts

import { calculateElectriciteNew } from "./electricite-new";
import { calculatePeintureNew } from "./peinture-new";
import { calculatePlomberieNew } from "./plomberie-new";
import { calculateMenuiserieNew } from "./menuiserie-new";
import { calculateSolsNew } from "./sols-new";
import { calculateIsolationNew } from "./isolation-new";
import { calculatePlatrerieNew } from "./platerie-new";
import { calculateChauffageNew } from "./chauffage-new";
import { calculateVmcNew } from "./vmc-new";
import { calculateDeposeEvacuationGravats } from "./depose_evacuation_gravats_calculator";

// Export tous les calculators dans un objet
export const calculators = {
  electricite: calculateElectriciteNew,
  peinture: calculatePeintureNew,
  plomberie: calculatePlomberieNew,
  menuiserie: calculateMenuiserieNew,
  sols: calculateSolsNew,
  isolation: calculateIsolationNew,
  platerie: calculatePlatrerieNew,
  chauffage: calculateChauffageNew,
  vmc: calculateVmcNew,
  depose_evacuation_gravats: calculateDeposeEvacuationGravats,
};

// Export les fonctions individuellement aussi
export {
  calculateElectriciteNew,
  calculatePeintureNew,
  calculatePlomberieNew,
  calculateMenuiserieNew,
  calculateSolsNew,
  calculateIsolationNew,
  calculatePlatrerieNew,
  calculateChauffageNew,
  calculateVmcNew,
  calculateDeposeEvacuationGravats,
};

// Export par défaut
export default calculators;