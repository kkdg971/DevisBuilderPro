import { useState } from "react";
import { trpc } from "../../lib/trpc";
import { validateAiPrompt } from "../../lib/aiApi";

/**
 * Hook pour générer une description via l'API IA
 * Gère le loading, les erreurs et la réussite
 */
export function useAiDescription() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const generateMutation = trpc.ai.generateDescription.useMutation();

  const generate = async (prompt: string): Promise<string | null> => {
    // Réinitialiser l'état
    setError(null);
    setIsLoading(true);

    try {
      // Validation côté client
      validateAiPrompt(prompt);

      // Appeler l'API via tRPC
      const result = await generateMutation.mutateAsync({
        prompt: prompt.trim(),
      });

      if (result.success && result.description) {
        return result.description;
      }

      throw new Error("Erreur lors de la génération de la description");
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : "Une erreur est survenue";
      setError(errorMessage);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    generate,
    isLoading: isLoading || generateMutation.isPending,
    error: error || generateMutation.error?.message || null,
    isError: !!error || generateMutation.isError,
  };
}
