/**
 * Endpoint backend pour analyser les descriptions avec OpenAI
 */

import { publicProcedure, router } from '../trpc';
import { z } from 'zod';
import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = 'gpt-4.1-mini'; // Utiliser le modèle gpt-4.1-mini

// Schéma de validation pour l'analyse
const analyzeDescriptionSchema = z.object({
  description: z.string().min(10, 'La description doit contenir au moins 10 caractères'),
  budgetRange: z.string().optional(),
});

/**
 * Prompt système pour l'IA
 */
const SYSTEM_PROMPT = `Tu es un expert en BTP. Tu dois analyser les descriptions de travaux et les convertir en lignes de devis professionnelles.

Pour chaque description, tu dois extraire:
1. Les éléments de travail (étagères, portes, niches, etc.)
2. La quantité de chaque élément
3. Les matériaux utilisés
4. Les dimensions
5. Les opérations nécessaires (pose, finition, etc.)

Réponds UNIQUEMENT en JSON avec la structure suivante:
{
  "items": [
    {
      "designation": "Nom professionnel du produit/travail",
      "quantite": "nombre",
      "unite": "pièce|m|m²|ml|kg",
      "description": "Description détaillée",
      "materiaux": ["matériau1", "matériau2"],
      "dimensions": "LxlxH ou autre format"
    }
  ],
  "estimatedDuration": {
    "jours": "nombre",
    "heures": "nombre"
  },
  "notes": "Notes importantes pour le devis"
}

Utilise des désignations professionnelles conformes aux normes DTU.
Sois précis dans les quantités et les matériaux.`;

/**
 * Analyse une description avec OpenAI
 */
async function analyzeDescription(
  description: string,
  budgetRange?: string
) {
  try {
    const userPrompt = `Analyse cette demande de travaux:\n\"${description}\"\n${budgetRange ? `Budget estimé: ${budgetRange}` : ''}\n\nGénère les lignes de devis correspondantes en JSON.`;

    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: SYSTEM_PROMPT },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 1024,
      response_format: { type: 'json_object' }, // Spécifier le format de réponse JSON
    });

    const resultText = response.choices[0]?.message?.content;
    if (!resultText) {
      throw new Error('Aucune réponse de l\'IA ou contenu vide.');
    }

    const result = JSON.parse(resultText);

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error('Erreur lors de l\'analyse IA:', error);
    throw new Error('Erreur lors de l\'analyse de la description');
  }
}

/**
 * Calcule les prix basés sur les éléments analysés
 */
function calculatePrices(items: any[]) {
  const pricingRules = {
    materiaux: {
      'bois_massif_chene': 80,
      'bois_massif_sapin': 40,
      'bois_stratifie': 25,
      'bois_contreplaque': 20,
      'panneau_mdf': 15,
      'panneau_particules': 10,
      'charniere_standard': 5,
      'charniere_premium': 15,
      'poignee_standard': 8,
      'poignee_design': 25,
      'rail_coulissant': 30,
      'verrou': 10,
      'vernis_mat': 12,
      'vernis_brillant': 15,
      'peinture': 10,
      'laque': 20,
    },
    main_oeuvre_horaire: 45,
    main_oeuvre_unite: 80,
  };

  return items.map((item: any) => {
    let prixUnitaire = 0;

    // Coût des matériaux
    if (item.materiaux && Array.isArray(item.materiaux)) {
      const coutMateriaux = item.materiaux.reduce((acc: number, mat: string) => {
        const prix = pricingRules.materiaux[mat as keyof typeof pricingRules.materiaux] || 0;
        return acc + prix;
      }, 0);
      prixUnitaire += coutMateriaux;
    }

    // Main d'œuvre
    prixUnitaire += pricingRules.main_oeuvre_unite;

    // Multiplicateurs
    if (item.designation.toLowerCase().includes('sur mesure')) {
      prixUnitaire *= 1.5;
    }

    // Arrondir
    prixUnitaire = Math.ceil(prixUnitaire / 5) * 5;

    return {
      ...item,
      prixUnitaire,
      total: item.quantite ? prixUnitaire * item.quantite : prixUnitaire,
    };
  });
}

/**
 * Routeur pour l'analyse IA générale
 */
export const aiRouter = router({
  generateDescription: publicProcedure
    .input(analyzeDescriptionSchema)
    .mutation(async ({ input }) => {
      const { description, budgetRange } = input;

      // Analyser avec l'IA
      const analysis = await analyzeDescription(description, budgetRange);

      if (!analysis.success) {
        throw new Error('Erreur lors de l\'analyse');
      }

      // Calculer les prix
      const itemsWithPrices = calculatePrices(analysis.data.items);

      // Calculer les totaux
      const sousTotal = itemsWithPrices.reduce((acc: number, item: any) => acc + item.total, 0);
      const tauxTVA = 20; // TVA 20% par défaut
      const montantTVA = Math.round((sousTotal * tauxTVA) / 100 * 100) / 100;
      const totalTTC = Math.round((sousTotal + montantTVA) * 100) / 100;

      return {
        items: itemsWithPrices,
        estimatedDuration: analysis.data.estimatedDuration,
        notes: analysis.data.notes,
        sousTotal: Math.round(sousTotal * 100) / 100,
        tauxTVA,
        montantTVA,
        totalTTC,
      };
    }),
});
