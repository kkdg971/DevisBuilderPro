import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { z } from "zod";
import { nanoid } from "nanoid";
import * as db from "./db";
import { generateDescription } from "./_core/aiDescription";
import { 
  generateLineItemDescription,
  analyzeQuestionnaire,
  generateDevisSummary
} from "./ai_service"; // Importer les nouveaux services IA

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return {
        success: true,
      } as const;
    }),
  }),

  // ... (autres routers existants)

  // ============ IA - SERVICES AVANCÉS ============
  
  ai: router({
    // ANCIENNE ROUTE (gardée pour compatibilité)
    generateDescription: protectedProcedure
      .input(z.object({
        prompt: z.string().min(10).max(2000),
      }))
      .mutation(async ({ input }) => {
        try {
          const description = await generateDescription(input.prompt);
          return {
            success: true,
            description,
          };
        } catch (error) {
          const message = error instanceof Error ? error.message : "Unknown error";
          throw new Error(message);
        }
      }),

    // NOUVELLE ROUTE: Générer la description pour une ligne de devis
    generateLineDescription: protectedProcedure
      .input(z.object({
        lineItem: z.object({
          designation: z.string(),
          quantite: z.number(),
          unite: z.string(),
          prixUnitaire: z.number(),
        }),
        context: z.object({
          poste: z.string(),
          projet: z.string(),
        }),
      }))
      .mutation(async ({ input }) => {
        const description = await generateLineItemDescription(input.lineItem, input.context);
        return { success: true, description };
      }),

    // NOUVELLE ROUTE: Analyser les réponses du questionnaire
    analyzeAnswers: protectedProcedure
      .input(z.object({
        answers: z.any(),
        poste: z.string(),
      }))
      .mutation(async ({ input }) => {
        const analysis = await analyzeQuestionnaire(input.answers, input.poste);
        return { success: true, analysis };
      }),

    // NOUVELLE ROUTE: Générer le résumé du devis
    generateSummary: protectedProcedure
      .input(z.object({
        devisData: z.any(),
      }))
      .mutation(async ({ input }) => {
        const summary = await generateDevisSummary(input.devisData);
        return { success: true, summary };
      }),
  }),

  // ... (autres routers comme menuiserie, etc.)
});