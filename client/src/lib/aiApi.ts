/**
 * Module d'API pour la génération de descriptions IA
 * 
 * IMPORTANT: Utiliser le hook useAiDescription() dans les composants React
 * pour générer des descriptions via l'API IA.
 * 
 * Ce fichier contient les types et utilitaires pour l'API IA.
 */

/**
 * Type pour la réponse de l'API de génération de description
 */
export interface AiDescriptionResponse {
  success: boolean;
  description: string;
}

/**
 * Type pour les paramètres de génération de description
 */
export interface AiDescriptionParams {
  prompt: string;
}

/**
 * Valide un prompt avant l'envoi à l'API
 * @param prompt - Le prompt à valider
 * @throws Error si le prompt est invalide
 */
export function validateAiPrompt(prompt: string): void {
  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Le prompt ne peut pas être vide");
  }

  if (prompt.length < 10) {
    throw new Error("Le prompt doit contenir au moins 10 caractères");
  }

  if (prompt.length > 2000) {
    throw new Error("Le prompt ne peut pas dépasser 2000 caractères");
  }
}

/**
 * Constantes pour l'API IA
 */
export const AI_API_CONFIG = {
  MIN_PROMPT_LENGTH: 10,
  MAX_PROMPT_LENGTH: 2000,
  ENDPOINT: "ai.generateDescription",
} as const;
