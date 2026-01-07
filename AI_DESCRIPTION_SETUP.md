# Génération de Description IA - Guide d'Intégration

## Vue d'ensemble

Cette fonctionnalité permet de générer automatiquement des descriptions professionnelles pour les devis BTP via une API IA. L'implémentation garantit la sécurité en gardant la clé API côté serveur.

## Architecture

### Backend (Node.js/TypeScript)

**Fichiers créés/modifiés :**
- `server/_core/aiDescription.ts` - Service de génération IA
- `server/_core/env.ts` - Configuration des variables d'environnement (modifié)
- `server/routers.ts` - Endpoint tRPC (modifié)

**Endpoint tRPC :**
```
ai.generateDescription (mutation protégée)
```

### Frontend (React/TypeScript)

**Fichiers créés :**
- `client/src/_core/hooks/useAiDescription.ts` - Hook React pour l'API IA
- `client/src/lib/aiApi.ts` - Utilitaires et types pour l'API IA
- `client/src/components/AiDescriptionGenerator.tsx` - Composant exemple

## Configuration

### 1. Variable d'environnement

Ajouter la clé API OpenAI au fichier `.env` (à la racine du projet) :

```env
OPENAI_API_KEY=sk-your-api-key-here
```

**Important :**
- Le fichier `.env` est déjà ignoré par git (voir `.gitignore`)
- La clé API n'est JAMAIS exposée au frontend
- Ne jamais commiter le fichier `.env`

### 2. Lancer le serveur en développement

```bash
pnpm dev
```

Le serveur démarre sur `http://localhost:3000`

### 3. Vérifier la compilation

```bash
pnpm check
```

## Utilisation

### Option 1 : Utiliser le composant exemple

```tsx
import { AiDescriptionGenerator } from "@/components/AiDescriptionGenerator";

export function MyPage() {
  return (
    <div>
      <AiDescriptionGenerator />
    </div>
  );
}
```

### Option 2 : Utiliser le hook dans un composant personnalisé

```tsx
import { useAiDescription } from "@/_core/hooks/useAiDescription";
import { useState } from "react";

export function MyCustomComponent() {
  const [prompt, setPrompt] = useState("");
  const { generate, isLoading, error } = useAiDescription();

  const handleGenerate = async () => {
    const description = await generate(prompt);
    if (description) {
      console.log("Description générée:", description);
    }
  };

  return (
    <div>
      <textarea
        value={prompt}
        onChange={(e) => setPrompt(e.target.value)}
        placeholder="Décrivez les travaux..."
      />
      <button onClick={handleGenerate} disabled={isLoading}>
        {isLoading ? "Génération..." : "Générer"}
      </button>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
```

## Sécurité

### ✅ Mesures de sécurité implémentées

1. **Clé API côté serveur uniquement**
   - La clé est lue depuis `process.env.OPENAI_API_KEY`
   - Jamais exposée au frontend
   - Jamais loggée ou affichée

2. **Authentification requise**
   - L'endpoint utilise `protectedProcedure` (tRPC)
   - Seuls les utilisateurs connectés peuvent générer des descriptions

3. **Validation des entrées**
   - Longueur minimale : 10 caractères
   - Longueur maximale : 2000 caractères
   - Validation côté client ET serveur

4. **Gestion des erreurs sécurisée**
   - Les erreurs sensibles (clé API, détails d'authentification) ne sont jamais exposées
   - Messages d'erreur génériques pour l'utilisateur

5. **Variables d'environnement**
   - `.env` est ignoré par git
   - `.env.local`, `.env.production.local` sont aussi ignorés

## Flux de requête

```
Client (React)
    ↓
Hook useAiDescription
    ↓
tRPC Client (ai.generateDescription)
    ↓
Backend (tRPC Router)
    ↓
Service aiDescription
    ↓
invokeLLM (API OpenAI)
    ↓
Réponse (description générée)
    ↓
Client (affichage)
```

## Prompt système

Le service utilise un prompt système optimisé pour les devis BTP :

```
Tu es un expert en rédaction de devis pour les travaux de bâtiment et rénovation (BTP).
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
- Longueur: 150-500 mots
```

## Tests

### Test manuel de l'endpoint

```bash
# 1. Lancer le serveur
pnpm dev

# 2. Ouvrir la console du navigateur (F12)

# 3. Appeler l'endpoint via tRPC
const result = await trpc.ai.generateDescription.mutate({
  prompt: "Rénovation complète d'une salle de bain avec carrelage et plomberie"
});
console.log(result);
```

### Cas d'erreur testés

1. **Prompt vide** → Erreur : "Le prompt ne peut pas être vide"
2. **Prompt trop court** → Erreur : "Le prompt doit contenir au moins 10 caractères"
3. **Prompt trop long** → Erreur : "Le prompt ne peut pas dépasser 2000 caractères"
4. **Utilisateur non authentifié** → Erreur tRPC : "Unauthorized"
5. **Clé API manquante** → Erreur serveur : "OPENAI_API_KEY is not configured"

## Déploiement en production

### Checklist avant GO PROD

- [ ] Variable `OPENAI_API_KEY` configurée sur le serveur de production
- [ ] `.env` n'est PAS commité dans git
- [ ] Tests manuels effectués avec une clé API valide
- [ ] Logs de production ne contiennent pas la clé API
- [ ] Rate limiting configuré si nécessaire (optionnel)
- [ ] Monitoring des erreurs d'API en place

### Variables d'environnement en production

```bash
export OPENAI_API_KEY=sk-your-production-key
export NODE_ENV=production
```

## Limitations et considérations

1. **Quota API** : Vérifier le quota OpenAI et configurer les alertes
2. **Latence** : Les appels API peuvent prendre 2-5 secondes
3. **Coût** : Chaque appel à l'API OpenAI génère un coût
4. **Modèle** : Actuellement utilise `gemini-2.5-flash` via le proxy Manus
5. **Tokens** : Limité à 1024 tokens de sortie

## Dépannage

### "OPENAI_API_KEY is not configured"

**Cause** : La variable d'environnement n'est pas définie
**Solution** : Ajouter `OPENAI_API_KEY=...` au fichier `.env`

### "Failed to generate description"

**Cause** : Erreur lors de l'appel à l'API
**Solutions** :
- Vérifier la validité de la clé API
- Vérifier la connexion Internet
- Vérifier les quotas API OpenAI

### Erreur TypeScript lors de la compilation

**Cause** : Types tRPC non synchronisés
**Solution** : Relancer le serveur de développement avec `pnpm dev`

## Fichiers modifiés

```
server/
  ├── _core/
  │   ├── aiDescription.ts (CRÉÉ)
  │   └── env.ts (MODIFIÉ)
  └── routers.ts (MODIFIÉ)

client/
  └── src/
      ├── _core/hooks/
      │   └── useAiDescription.ts (CRÉÉ)
      ├── lib/
      │   └── aiApi.ts (CRÉÉ)
      └── components/
          └── AiDescriptionGenerator.tsx (CRÉÉ)
```

## Support et améliorations futures

- [ ] Ajouter un système de cache pour les prompts similaires
- [ ] Implémenter un rate limiting par utilisateur
- [ ] Ajouter des templates de prompts prédéfinis
- [ ] Intégrer l'historique des descriptions générées
- [ ] Ajouter des options de personnalisation (tonalité, longueur, etc.)

---

**Date de création** : Janvier 2026
**Version** : 1.0.0
**Status** : ✅ Prêt pour la production
