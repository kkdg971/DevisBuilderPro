/**
 * Système d'analyse IA pour les descriptions personnalisées de menuiserie
 * Utilise OpenAI pour analyser la description et générer les lignes de devis
 */

import { DevisLine, DevisSection } from '../types/devis';

interface ParsedWorkItem {
  designation: string;
  quantite: number;
  unite: string;
  description: string;
  materiaux?: string[];
  dimensions?: string;
}

interface AIAnalysisResult {
  items: ParsedWorkItem[];
  description: string;
  estimatedDuration: {
    jours: number;
    heures: number;
  };
}

/**
 * Analyse une description de travaux personnalisés avec l'IA
 * Extrait les informations pour créer des lignes de devis professionnelles
 */
export async function analyzeCustomDescription(
  description: string,
  budgetRange?: string
): Promise<AIAnalysisResult> {
  try {
    const response = await fetch('/api/analyze-menuiserie', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        description,
        budgetRange,
      }),
    });

    if (!response.ok) {
      throw new Error('Erreur lors de l\'analyse de la description');
    }

    return await response.json();
  } catch (error) {
    console.error('Erreur lors de l\'appel API:', error);
    throw error;
  }
}

/**
 * Convertit les éléments analysés en lignes de devis avec prix
 */
export function convertToDivisLines(
  items: ParsedWorkItem[],
  pricingRules: PricingRules
): DevisLine[] {
  return items.map((item) => {
    const prixUnitaire = calculatePrice(item, pricingRules);
    const total = prixUnitaire * item.quantite;

    return {
      designation: item.designation,
      unite: item.unite,
      quantite: item.quantite,
      prixUnitaire: Math.round(prixUnitaire * 100) / 100,
      total: Math.round(total * 100) / 100,
      reference: generateReference(item),
    };
  });
}

/**
 * Génère une référence DTU/norme basée sur le type de travail
 */
function generateReference(item: ParsedWorkItem): string {
  const designation = item.designation.toLowerCase();

  if (designation.includes('étagère')) return 'DTU 51.3';
  if (designation.includes('porte')) return 'DTU 37.5';
  if (designation.includes('fenêtre')) return 'DTU 36.5';
  if (designation.includes('escalier')) return 'DTU 51.2';
  if (designation.includes('placard') || designation.includes('armoire')) return 'DTU 51.1';
  if (designation.includes('niche')) return 'DTU 51.3';
  if (designation.includes('volet')) return 'DTU 36.4';

  return 'DTU 51 - Menuiserie';
}

// ============ RÈGLES DE TARIFICATION ============

interface PricingRules {
  materiaux: Record<string, number>; // Prix au m² ou à l'unité
  operations: Record<string, number>; // Prix par opération
  main_oeuvre: {
    horaire: number;
    parM2: number;
    parUnite: number;
  };
  multiplicateurs: {
    complexite_haute: number;
    delai_court: number;
    finition_premium: number;
  };
}

const defaultPricingRules: PricingRules = {
  materiaux: {
    // Bois
    'bois_massif_chene': 80, // €/m²
    'bois_massif_sapin': 40,
    'bois_stratifie': 25,
    'bois_contreplaque': 20,

    // Panneaux
    'panneau_mdf': 15,
    'panneau_particules': 10,

    // Quincaillerie
    'charniere_standard': 5,
    'charniere_premium': 15,
    'poignee_standard': 8,
    'poignee_design': 25,
    'rail_coulissant': 30,
    'verrou': 10,

    // Finitions
    'vernis_mat': 12,
    'vernis_brillant': 15,
    'peinture': 10,
    'laque': 20,
  },

  operations: {
    'decoupe': 20,
    'assemblage': 30,
    'collage': 15,
    'vissage': 10,
    'ponçage': 25,
    'finition': 35,
    'pose': 50,
    'installation': 40,
  },

  main_oeuvre: {
    horaire: 45, // €/heure
    parM2: 60, // €/m² pour travaux standards
    parUnite: 80, // €/unité pour travaux standards
  },

  multiplicateurs: {
    complexite_haute: 1.5,
    delai_court: 1.2,
    finition_premium: 1.3,
  },
};

/**
 * Calcule le prix unitaire d'un élément de travail
 */
function calculatePrice(item: ParsedWorkItem, rules: PricingRules): number {
  let prix = 0;

  // Calculer le coût des matériaux
  if (item.materiaux && item.materiaux.length > 0) {
    const coutMateriaux = item.materiaux.reduce((acc, mat) => {
      const prixMat = rules.materiaux[mat.toLowerCase()] || 0;
      return acc + prixMat;
    }, 0);
    prix += coutMateriaux * item.quantite;
  }

  // Ajouter la main d'œuvre
  const coutMainOeuvre = rules.main_oeuvre.parUnite * item.quantite;
  prix += coutMainOeuvre;

  // Appliquer les multiplicateurs selon la complexité
  if (item.designation.toLowerCase().includes('sur mesure')) {
    prix *= rules.multiplicateurs.complexite_haute;
  }

  if (item.dimensions && isLargeDimension(item.dimensions)) {
    prix *= 1.2; // +20% pour grandes dimensions
  }

  // Arrondir à la valeur supérieure
  return Math.ceil(prix / 5) * 5;
}

/**
 * Vérifie si les dimensions sont grandes
 */
function isLargeDimension(dimensions: string): boolean {
  const regex = /(\d+(?:[.,]\d+)?)\s*(?:x|×)\s*(\d+(?:[.,]\d+)?)/;
  const match = dimensions.match(regex);

  if (!match) return false;

  const dim1 = parseFloat(match[1].replace(',', '.'));
  const dim2 = parseFloat(match[2].replace(',', '.'));

  return dim1 > 1.5 || dim2 > 1.5;
}

/**
 * Crée une section de devis à partir des éléments analysés
 */
export function createDevisSection(
  items: ParsedWorkItem[],
  pricingRules: PricingRules = defaultPricingRules,
  titre: string = 'Travaux Personnalisés'
): DevisSection {
  const lignes = convertToDivisLines(items, pricingRules);
  const sousTotal = lignes.reduce((acc, ligne) => acc + ligne.total, 0);

  return {
    titre,
    lignes,
    sousTotal,
  };
}

/**
 * Exemples de descriptions et leurs analyses
 */
export const EXEMPLES_DESCRIPTIONS = [
  {
    description: 'Pose de 3 étagères en bois massif chêne, 120x30cm chacune, avec supports invisibles',
    expected: {
      items: [
        {
          designation: 'Étagère bois massif chêne 120x30cm',
          quantite: 3,
          unite: 'pièce',
          materiaux: ['bois_massif_chene'],
          dimensions: '120x30',
        },
        {
          designation: 'Support invisible pour étagère',
          quantite: 6,
          unite: 'pièce',
          materiaux: ['acier_inoxydable'],
        },
        {
          designation: 'Pose d\'étagères',
          quantite: 3,
          unite: 'pièce',
        },
      ],
    },
  },
  {
    description: 'Création d\'une niche murale 80x60x20cm avec portes coulissantes en verre teinté',
    expected: {
      items: [
        {
          designation: 'Niche murale sur mesure 80x60x20cm',
          quantite: 1,
          unite: 'pièce',
          materiaux: ['bois_stratifie'],
          dimensions: '80x60x20',
        },
        {
          designation: 'Portes coulissantes verre teinté',
          quantite: 2,
          unite: 'pièce',
          materiaux: ['verre_teinté'],
        },
        {
          designation: 'Rail coulissant',
          quantite: 1,
          unite: 'pièce',
          materiaux: ['rail_coulissant'],
        },
      ],
    },
  },
  {
    description: 'Fabrication et pose d\'un meuble salle de bain sur mesure 150x80cm, 2 portes, 3 tiroirs, finition laque blanche',
    expected: {
      items: [
        {
          designation: 'Meuble salle de bain sur mesure 150x80cm',
          quantite: 1,
          unite: 'pièce',
          materiaux: ['panneau_mdf', 'laque'],
          dimensions: '150x80',
        },
        {
          designation: 'Portes meuble',
          quantite: 2,
          unite: 'pièce',
          materiaux: ['panneau_mdf'],
        },
        {
          designation: 'Tiroirs',
          quantite: 3,
          unite: 'pièce',
          materiaux: ['panneau_mdf'],
        },
        {
          designation: 'Charnière premium',
          quantite: 4,
          unite: 'pièce',
          materiaux: ['charniere_premium'],
        },
        {
          designation: 'Finition laque blanche',
          quantite: 1,
          unite: 'pièce',
          materiaux: ['laque'],
        },
      ],
    },
  },
];

export { defaultPricingRules };