# Guide d'intégration - Mon Assistant Devis Travaux

## État actuel du projet

### ✅ Fonctionnalités implémentées

#### 1. Questionnaire Électricité enrichi
**Fichier:** `client/src/flows/electricite.ts`

- ✅ Sélection de marque (Legrand, Schneider Electric, Hager, Siemens, ABB, Debflex, Arnould)
- ✅ Prises simples, doubles et triples séparées
- ✅ Interrupteurs simples, doubles et va-et-vient
- ✅ Sélection du taux de TVA (20%, 10%, 5.5%)
- ✅ 50+ questions techniques conformes NF C 15-100

#### 2. Nouveau calculateur Électricité
**Fichier:** `client/src/calculators/electricite-new.ts`

- ✅ Base de données de prix par marque (7 marques)
- ✅ Structure hiérarchique (Phases > Sections > Lignes)
- ✅ 3 phases : Préparation, Travaux, Finitions
- ✅ Calcul automatique de la durée des travaux
- ✅ Descriptions détaillées conformes NF C 15-100
- ✅ Références DTU sur chaque ligne
- ✅ Calcul TVA configurable

#### 3. Nouveau composant DevisView
**Fichier:** `client/src/components/DevisViewNew.tsx`

- ✅ Affichage hiérarchique du devis
- ✅ Mode édition des tarifs avec recalcul automatique
- ✅ Affichage de la durée estimée
- ✅ Totaux par section, par phase et généraux
- ✅ Design professionnel avec références DTU

#### 4. Types et utilitaires
**Fichiers:**
- `client/src/types/devis.ts` - Types pour la nouvelle structure
- `client/src/utils/devis-wrapper.ts` - Wrapper pour gérer les deux formats

### ⏳ Intégration à finaliser

#### Étape 1 : Connecter le nouveau calculateur

**Fichier à modifier:** `client/src/calculators/index.ts`

```typescript
// Ajouter en haut du fichier
import { calculateElectriciteNew } from './electricite-new';
import type { DevisStructure } from '../types/devis';

// Modifier la fonction calculateElectricite
export function calculateElectricite(answers: QuestionnaireAnswers): DevisStructure {
  return calculateElectriciteNew(answers);
}
```

**Note:** Le type de retour change de `DevisCalcule` à `DevisStructure`. Il faudra gérer cette transition.

#### Étape 2 : Adapter QuestionnaireModal

**Fichier à modifier:** `client/src/components/QuestionnaireModal.tsx`

Modifier la fonction `handleComplete` pour utiliser le nouveau format :

```typescript
const handleComplete = () => {
  const finalAnswers = {
    ...allAnswers,
    [currentFlow.id]: answers,
  };

  // Pour l'électricité, calculer directement le devis
  if (currentFlow.id === 'electricite') {
    const devis = calculateElectriciteNew(answers);
    onComplete({
      metier: 'Électricité',
      devis: devis,
    });
  } else {
    // Format ancien pour les autres métiers
    const devisData: DevisData = {
      projetRenovation: selectedProjet || undefined,
      corpsDeMetier: selectedMetiers,
      answers: finalAnswers,
    };
    onComplete(devisData);
  }
};
```

#### Étape 3 : Simplifier l'application (orientation PRO uniquement)

**Fichiers à supprimer/modifier:**

1. **Supprimer les pages inutiles:**
   - `client/src/pages/RoleSelection.tsx`
   - `client/src/pages/ArtisanProfile.tsx`

2. **Nettoyer les routes dans App.tsx:**
   ```typescript
   // Supprimer les routes /role-selection et /artisan-profile
   ```

3. **Retirer l'authentification de Home.tsx:**
   ```typescript
   // Supprimer les imports et l'utilisation de useAuth
   // L'application devient accessible sans connexion
   ```

4. **Nettoyer le backend (optionnel):**
   - Supprimer les tables `artisan_profiles`, `devis_publies`, `reponses_artisan`
   - Supprimer les routers tRPC correspondants

#### Étape 4 : Enrichir les autres métiers

**Pour chaque métier (Peinture, Plomberie, etc.):**

1. Enrichir le questionnaire avec questions techniques DTU
2. Créer un nouveau calculateur avec structure hiérarchique
3. Ajouter les marques et prix différenciés (si applicable)
4. Intégrer dans le système

**Ordre recommandé:**
1. Peinture (DTU 59.1)
2. Plomberie (DTU 60.1)
3. Menuiserie (DTU 36.5)
4. Sols (DTU 53)
5. Isolation (DTU 45)
6. Plâtrerie (DTU 25.1)
7. Chauffage (DTU 65)
8. VMC (DTU 68.3)

#### Étape 5 : Fonctionnalités avancées

**Export PDF:**
```bash
pnpm add jspdf jspdf-autotable
```

Créer une fonction d'export dans `DevisViewNew.tsx` :
```typescript
const handleExportPDF = () => {
  const doc = new jsPDF();
  // Générer le PDF avec les données du devis
  doc.save(`devis-${Date.now()}.pdf`);
};
```

**Sauvegarde locale:**
```typescript
// Utiliser localStorage pour sauvegarder les devis
const saveDevis = (devis: DevisStructure) => {
  const saved = JSON.parse(localStorage.getItem('devis') || '[]');
  saved.push({ ...devis, id: Date.now() });
  localStorage.setItem('devis', JSON.stringify(saved));
};
```

## Structure des fichiers

```
client/src/
├── calculators/
│   ├── index.ts                    # Ancien système (à migrer)
│   ├── electricite.ts              # Ancien calculateur électricité
│   └── electricite-new.ts          # ✅ Nouveau calculateur (implémenté)
├── components/
│   ├── DevisView.tsx               # Ancien composant devis
│   └── DevisViewNew.tsx            # ✅ Nouveau composant (implémenté)
├── flows/
│   ├── electricite.ts              # ✅ Questionnaire enrichi
│   ├── peinture.ts                 # ✅ Questionnaire enrichi
│   ├── plomberie.ts                # ✅ Questionnaire enrichi
│   └── index.ts                    # ⏳ À enrichir (6 métiers restants)
├── types/
│   ├── questionnaire.ts            # Types anciens
│   └── devis.ts                    # ✅ Nouveaux types (implémenté)
└── utils/
    └── devis-wrapper.ts            # ✅ Wrapper de transition (implémenté)
```

## Commandes utiles

```bash
# Développement
pnpm dev

# Vérifier les erreurs TypeScript
pnpm check

# Redémarrer le serveur
# Via webdev_restart_server

# Créer un checkpoint
# Via webdev_save_checkpoint
```

## Notes importantes

1. **Gestion des deux formats:** Le système actuel supporte les deux formats (ancien et nouveau) grâce au wrapper. Cela permet une migration progressive.

2. **TVA française:** Les taux sont maintenant configurables (20%, 10%, 5.5%) selon la nature des travaux.

3. **Marques électricité:** Les prix varient selon la marque choisie. Les prix sont des estimations réalistes basées sur le marché français.

4. **Durée des travaux:** Le calcul est automatique basé sur le nombre de points et la complexité.

5. **Descriptions DTU:** Chaque ligne de devis inclut une description professionnelle avec référence normative.

## Prochaines actions recommandées

1. **Court terme (1-2h):**
   - Finaliser l'intégration du calculateur électricité
   - Tester le nouveau format de devis
   - Simplifier l'application (retirer l'aspect particuliers/artisans)

2. **Moyen terme (1 journée):**
   - Enrichir les 2 autres métiers déjà commencés (Peinture, Plomberie)
   - Ajouter l'export PDF
   - Implémenter la sauvegarde locale

3. **Long terme (2-3 jours):**
   - Enrichir les 6 métiers restants
   - Ajouter un système de templates de devis
   - Créer un historique des devis générés
   - Ajouter des statistiques (CA prévisionnel, etc.)

## Support

Pour toute question ou problème, référez-vous à :
- Documentation NF C 15-100 pour l'électricité
- Documents DTU pour chaque métier
- Code existant dans `electricite-new.ts` comme référence
