import { ENV } from "./env";
import { invokeLLM } from "./llm";

/**
 * Génère une description professionnelle pour un devis BTP via l'API OpenAI
 * @param prompt - Le prompt utilisateur décrivant les travaux
 * @returns La description générée
 */
export async function generateDescription(prompt: string): Promise<string> {
  if (!ENV.openaiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  if (!prompt || prompt.trim().length === 0) {
    throw new Error("Prompt cannot be empty");
  }

  // Limiter la longueur du prompt pour éviter les abus
  if (prompt.length > 2000) {
    throw new Error("Prompt is too long (max 2000 characters)");
  }

  const systemPrompt = `Tu es un expert en rédaction de devis pour les travaux de bâtiment et rénovation (BTP).
Ton rôle est de générer des descriptions professionnelles, claires et précises pour les travaux.

Règles à respecter:
- Tonalité professionnelle et formelle
- Langage clair et exploitable dans un devis commercial
- Description concise mais détaillée
- Pas de jargon excessif, accessible au client
- Format: paragraphes structurés
- Pas de promesses ou garanties non justifiées
- Pas de prix ou de délai (sauf si mentionné dans le prompt)
- Pas de markdown, texte brut uniquement
- Longueur: 150-500 mots`;

  try {
    const result = await invokeLLM({
      messages: [
        {
          role: "system",
          content: systemPrompt,
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      maxTokens: 1024,
    });

    // Extraire le texte généré
    const generatedText = result.choices[0]?.message?.content;

    if (typeof generatedText !== "string" || !generatedText.trim()) {
      throw new Error("Failed to generate description: empty response");
    }

    return generatedText.trim();
  } catch (error) {
    // Ne pas exposer les détails d'erreur sensibles au client
    if (error instanceof Error) {
      console.error("AI description generation error:", error.message);
      // Vérifier si c'est une erreur d'authentification API
      if (error.message.includes("unauthorized") || error.message.includes("401")) {
        throw new Error("API authentication failed");
      }
      if (error.message.includes("rate limit")) {
        throw new Error("Too many requests, please try again later");
      }
    }
    throw new Error("Failed to generate description");
  }
}
