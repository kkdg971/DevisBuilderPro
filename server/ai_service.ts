import { OpenAI } from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const MODEL = 'gpt-4.1-mini'; // Utiliser un modèle rapide et efficace

/**
 * Génère une description détaillée pour une ligne de devis spécifique.
 * @param lineItem - L'objet de la ligne de devis (désignation, quantité, unité, prix).
 * @param context - Le contexte général du devis (type de travaux, type de projet).
 * @returns Une description professionnelle générée par l'IA.
 */
export async function generateLineItemDescription(
  lineItem: { designation: string; quantite: number; unite: string; prixUnitaire: number },
  context: { poste: string; projet: string }
): Promise<string> {
  const systemPrompt = `Tu es un expert rédacteur de devis dans le BTP en France.
Ta mission est de créer une description détaillée et valorisante pour une ligne de devis, destinée au client final.

Règles:
- Rédige une description de 2-3 phrases.
- Mets en avant la qualité des matériaux et le soin apporté à l'exécution.
- Justifie le travail à réaliser de manière claire et professionnelle.
- N'invente pas d'informations, base-toi sur la ligne de devis.
- Ne mentionne JAMAIS le prix.
- Le ton doit être rassurant et expert.`;

  const userPrompt = `Génère la description pour la ligne de devis suivante:
- Désignation: ${lineItem.designation}
- Quantité: ${lineItem.quantite} ${lineItem.unite}
- Contexte: Travaux de ${context.poste} pour un projet de ${context.projet}.`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 150,
    });
    return response.choices[0]?.message?.content?.trim() || '';
  } catch (error) {
    console.error('Erreur de génération de description IA:', error);
    return ''; // Retourner une chaîne vide en cas d'erreur
  }
}

/**
 * Analyse les réponses d'un questionnaire et fournit des recommandations.
 * @param answers - Les réponses du questionnaire.
 * @param poste - Le poste de travaux concerné.
 * @returns Un objet avec des suggestions et des alertes.
 */
export async function analyzeQuestionnaire(
  answers: any,
  poste: string
): Promise<{ suggestions: string[]; alertes: string[] }> {
  const systemPrompt = `Tu es un maître d'œuvre expert dans le BTP français, spécialisé en ${poste}.
Tu analyses les réponses d'un client à un questionnaire de devis pour identifier des optimisations, des risques et des suggestions pertinentes.

Règles:
- Fournis 2 à 4 suggestions pertinentes et concises.
- Identifie 1 à 2 alertes ou points de vigilance importants.
- Les suggestions doivent apporter une plus-value (ex: matériaux, techniques, aides financières).
- Les alertes doivent pointer des risques potentiels (ex: complexité, oublis, normes).
- Réponds UNIQUEMENT en JSON avec la structure: {
suggestions": string[], "alertes": string[]}.`;

  const userPrompt = `Analyse les réponses suivantes pour un devis de ${poste}:
${JSON.stringify(answers, null, 2)}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.6,
      max_tokens: 400,
      response_format: { type: 'json_object' },
    });

    const result = response.choices[0]?.message?.content;
    if (result) {
      return JSON.parse(result);
    }
    return { suggestions: [], alertes: [] };
  } catch (error) {
    console.error('Erreur d\'analyse IA du questionnaire:', error);
    return { suggestions: [], alertes: [] };
  }
}

/**
 * Génère un résumé exécutif et des notes pour le devis complet.
 * @param devisData - Les données complètes du devis calculé.
 * @returns Un objet avec un résumé et des notes.
 */
export async function generateDevisSummary(
  devisData: any
): Promise<{ resume: string; notes: string }> {
  const systemPrompt = `Tu es un économiste de la construction et expert en relation client pour une entreprise du BTP.
Ta mission est de rédiger un résumé exécutif et des notes importantes pour un devis qui sera présenté à un client.

Règles pour le résumé:
- Commence par "Ce devis couvre les travaux de..."
- Sois concis (3-4 phrases) et mets en avant la valeur globale du projet.
- Confirme que le devis est basé sur les informations fournies par le client.

Règles pour les notes:
- Rédige 2 à 3 points clés sous forme de liste.
- Mentionne la durée de validité de l'offre (ex: 30 jours).
- Précise les conditions de paiement (ex: acompte de 30% à la signature).
- Ajoute une note sur la flexibilité ou les ajustements possibles.
- Le ton doit être professionnel, clair et transparent.`;

  // Simplifier les données du devis pour le prompt
  const devisContext = {
    poste: devisData.poste,
    totalTTC: devisData.totalTTC,
    lignes: devisData.lignes.map((l: any) => l.designation).join(', '),
  };

  const userPrompt = `Génère un résumé et des notes pour le devis suivant:
${JSON.stringify(devisContext, null, 2)}`;

  try {
    const response = await openai.chat.completions.create({
      model: MODEL,
      messages: [
        { role: 'system', content: systemPrompt },
        { role: 'user', content: userPrompt },
      ],
      temperature: 0.5,
      max_tokens: 500,
    });

    const content = response.choices[0]?.message?.content || '';
    // Extraire le résumé et les notes (simple parsing)
    const resumeMatch = content.match(/Résumé:(.*?)Notes:/s);
    const notesMatch = content.match(/Notes:(.*)/s);

    const resume = resumeMatch ? resumeMatch[1].trim() : content;
    const notes = notesMatch ? notesMatch[1].trim() : '';

    return { resume, notes };

  } catch (error) {
    console.error('Erreur de génération du résumé IA:', error);
    return { resume: '', notes: '' };
  }
}
