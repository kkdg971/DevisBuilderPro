# Démarrage rapide - Génération de descriptions IA

## 5 minutes pour commencer

### 1. Configurer la clé API

Copier `.env.example` en `.env` et ajouter votre clé OpenAI :

```bash
cp .env.example .env
# Éditer .env et ajouter votre clé OpenAI
```

Contenu du `.env` :
```env
OPENAI_API_KEY=sk-your-api-key-here
```

### 2. Installer et lancer

```bash
pnpm install
pnpm dev
```

### 3. Utiliser dans un composant

```tsx
import { AiDescriptionGenerator } from "@/components/AiDescriptionGenerator";

export function DevisPage() {
  return <AiDescriptionGenerator />;
}
```

## Utilisation avancée

### Hook personnalisé

```tsx
import { useAiDescription } from "@/_core/hooks/useAiDescription";

export function MyForm() {
  const { generate, isLoading, error } = useAiDescription();

  const handleClick = async () => {
    const description = await generate("Rénovation salle de bain");
    console.log(description);
  };

  return (
    <button onClick={handleClick} disabled={isLoading}>
      {isLoading ? "..." : "Générer"}
    </button>
  );
}
```

## Points clés de sécurité

✅ **Clé API côté serveur uniquement**
✅ **Authentification requise (utilisateur connecté)**
✅ **Validation des entrées (10-2000 caractères)**
✅ **Gestion d'erreurs sécurisée**
✅ **.env ignoré par git**

## Fichiers modifiés

```
Backend:
  server/_core/aiDescription.ts (nouveau)
  server/_core/env.ts (modifié)
  server/routers.ts (modifié)

Frontend:
  client/src/_core/hooks/useAiDescription.ts (nouveau)
  client/src/lib/aiApi.ts (nouveau)
  client/src/components/AiDescriptionGenerator.tsx (nouveau)
```

## Endpoint tRPC

```typescript
// Appel depuis un composant React
const { generate } = useAiDescription();
const description = await generate("Votre prompt ici");
```

## Dépannage

| Erreur | Solution |
|--------|----------|
| `OPENAI_API_KEY is not configured` | Ajouter la clé au `.env` |
| `Unauthorized` | L'utilisateur doit être connecté |
| `Prompt is too long` | Limiter à 2000 caractères |
| `Failed to generate description` | Vérifier la clé API et la connexion |

## Prêt pour la production ✅

La fonctionnalité est complète et sécurisée. Avant le déploiement :

1. Configurer `OPENAI_API_KEY` sur le serveur de production
2. Tester avec une clé valide
3. Vérifier que `.env` n'est pas commité

---

**Documentation complète** : Voir `AI_DESCRIPTION_SETUP.md`
