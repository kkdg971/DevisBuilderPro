# Brainstorming Design — Application Devis Travaux Automatique

## Contexte
Application web professionnelle destinée aux artisans et économistes du bâtiment pour générer automatiquement des devis détaillés. L'interface doit inspirer confiance, précision et expertise métier.

---

<response>
<text>
**Design Movement**: Brutalisme Fonctionnel

**Core Principles**:
- Honnêteté structurelle : chaque élément révèle sa fonction sans ornement superflu
- Hiérarchie typographique brutale : contrastes de taille extrêmes entre titres et corps de texte
- Grilles asymétriques : mise en page décalée qui guide l'œil de manière intentionnelle
- Matérialité numérique : textures concrètes (grain, bruit) évoquant les matériaux de construction

**Color Philosophy**:
Palette monolithique inspirée du béton brut et de l'acier industriel. Fond gris anthracite (oklch(0.25 0.01 260)) avec accents orange vif (oklch(0.68 0.19 45)) pour les actions critiques. Le contraste élevé reflète la rigueur du secteur du bâtiment. Les couleurs secondaires empruntent aux matériaux : terre cuite, zinc patiné, bois brut.

**Layout Paradigm**:
Grille modulaire brisée — sections qui se chevauchent légèrement, créant des zones de collision visuelles. Les questionnaires se déploient en colonnes décalées plutôt qu'en flux vertical uniforme. Les cartes de corps de métier utilisent des proportions non-standard (3:2, 5:3) au lieu du classique 16:9.

**Signature Elements**:
- Bordures épaisses (4-6px) sur les éléments interactifs, rappelant les joints de coffrage
- Typographie monospace pour les chiffres et données techniques
- Icônes géométriques minimalistes en trait épais (3px stroke)

**Interaction Philosophy**:
Réponses tactiles et immédiates. Les clics produisent des micro-animations de "compression" (scale 0.98). Les transitions sont rapides (150ms) et linéaires, évitant les courbes d'accélération douces. Le feedback est visuel et franc : pas de subtilité, mais de la clarté.

**Animation**:
Entrées par translation brutale (translateY de 20px sans ease). Les éléments apparaissent par blocs plutôt qu'en cascade fluide. Les états de chargement utilisent des barres de progression rectangulaires, pas de spinners circulaires.

**Typography System**:
- Display : **Space Grotesk** (700) pour les titres — géométrique et industriel
- Body : **IBM Plex Sans** (400, 500) pour le texte courant — lisible et technique
- Mono : **JetBrains Mono** (500) pour les valeurs numériques et prix
Hiérarchie : H1 à 48px, body à 16px, créant un ratio de 3:1
</text>
<probability>0.07</probability>
</response>

<response>
<text>
**Design Movement**: Néo-Modernisme Suisse

**Core Principles**:
- Clarté absolue : chaque information trouve sa place dans un système rigoureux
- Rythme vertical : espacement mathématique basé sur une échelle modulaire (8px base)
- Neutralité expressive : le design s'efface devant le contenu sans être invisible
- Précision millimétrique : alignements parfaits et proportions harmoniques

**Color Philosophy**:
Palette désaturée inspirée des nuanciers RAL professionnels. Fond blanc cassé (oklch(0.98 0.005 90)) avec typographie gris foncé (oklch(0.20 0.01 260)). Accent primaire en bleu cobalt profond (oklch(0.45 0.15 250)) évoquant les plans techniques. Les états actifs utilisent un rouge vermillon (oklch(0.55 0.22 25)) pour signaler l'action en cours. Pas de dégradés, uniquement des aplats purs.

**Layout Paradigm**:
Système de colonnes strict basé sur une grille 12 colonnes avec gouttières de 24px. Les questionnaires se déploient en deux colonnes : questions à gauche (8 cols), contexte/aide à droite (4 cols). Les cartes de sélection s'organisent en grille régulière mais respirante, avec des marges généreuses (32px minimum).

**Signature Elements**:
- Lignes de séparation ultra-fines (1px) en gris 20% pour structurer sans alourdir
- Badges de statut circulaires (8px diamètre) avec couleurs codifiées (vert validé, orange en cours, gris inactif)
- Numérotation systématique des étapes en fonte tabulaire

**Interaction Philosophy**:
Transitions douces et prévisibles. Les changements d'état utilisent des animations de 250ms avec courbe ease-out. Les survols révèlent des informations contextuelles par apparition progressive (opacity 0 → 1). Pas de surprise : chaque action est précédée d'un état intermédiaire visible.

**Animation**:
Entrées par fondu progressif (fade-in) combiné à une légère translation verticale (8px). Les listes d'éléments apparaissent avec un délai échelonné de 50ms entre chaque item. Les transitions de page utilisent un crossfade de 300ms.

**Typography System**:
- Display : **Inter** (600) pour les titres — neutre et universel
- Body : **Inter** (400, 500) pour tout le texte — cohérence totale
- Mono : **IBM Plex Mono** (400) pour les références techniques
Hiérarchie : H1 à 32px, H2 à 24px, body à 15px, échelle harmonique 1.33 (quarte parfaite)
</text>
<probability>0.09</probability>
</response>

<response>
<text>
**Design Movement**: Expressionnisme Technique

**Core Principles**:
- Dynamisme angulaire : formes diagonales et trapézoïdales évoquant les plans de coupe architecturaux
- Superposition intentionnelle : éléments qui se chevauchent créant de la profondeur
- Contraste dramatique : jeu entre zones denses et espaces vides
- Matérialité tactile : textures subtiles suggérant papier technique et calque

**Color Philosophy**:
Palette inspirée des chantiers au crépuscule. Fond bleu nuit profond (oklch(0.18 0.04 250)) avec éléments en blanc pur (oklch(1 0 0)) pour un contraste maximal. Accents en jaune sécurité (oklch(0.85 0.15 95)) pour les actions principales et orange construction (oklch(0.65 0.18 50)) pour les états actifs. Les surfaces secondaires utilisent un bleu-gris ardoise (oklch(0.30 0.03 245)) créant une profondeur atmosphérique.

**Layout Paradigm**:
Composition diagonale avec sections découpées par des clip-path polygonaux. Les questionnaires se déploient en Z-pattern : titre en haut à gauche, questions en escalier diagonal, récapitulatif en bas à droite. Les cartes de métiers utilisent des formes trapézoïdales (transform: skewY(-2deg)) créant un effet de perspective isométrique.

**Signature Elements**:
- Dividers diagonaux entre sections (clip-path avec angles de 8-12 degrés)
- Ombres portées prononcées (0 8px 24px rgba(0,0,0,0.4)) créant une hiérarchie spatiale
- Icônes en ligne épaisse (2.5px) avec coins coupés à 45 degrés

**Interaction Philosophy**:
Mouvements expressifs et énergiques. Les clics déclenchent des animations de "déploiement" (scale + rotate légère). Les survols révèlent des sous-éléments par glissement latéral. Les transitions utilisent des courbes custom (cubic-bezier(0.34, 1.56, 0.64, 1)) pour un effet de rebond subtil.

**Animation**:
Entrées par glissement diagonal (translateX + translateY simultanés) avec rotation légère (2-3 degrés). Les éléments de liste apparaissent en cascade avec un effet de "chute" (translateY de 40px + rotation). Les changements d'état utilisent des morphing de forme (border-radius animé).

**Typography System**:
- Display : **Rajdhani** (700) pour les titres — anguleux et technique
- Body : **Work Sans** (400, 500) pour le texte — géométrique mais lisible
- Mono : **Roboto Mono** (500) pour les données chiffrées
Hiérarchie : H1 à 56px avec letter-spacing -0.02em, body à 16px, créant une tension visuelle forte
</text>
<probability>0.06</probability>
</response>

---

## Approche Sélectionnée

**Expressionnisme Technique** — Cette approche capture parfaitement l'essence du secteur du bâtiment : dynamique, technique, et visuellement distinctif. Les formes angulaires évoquent les plans architecturaux, la palette sombre avec accents vifs rappelle les chantiers, et les animations expressives donnent vie à une application métier qui pourrait autrement sembler austère.

Cette direction permet de créer une identité visuelle forte et mémorable tout en maintenant la clarté fonctionnelle nécessaire pour un outil professionnel.
