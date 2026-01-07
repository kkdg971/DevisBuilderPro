# TODO - Mon Assistant Devis Travaux

## Phase 1 : Upgrade vers full-stack
- [x] Upgrader le projet avec webdev_add_feature (web-db-user)
- [x] Définir le schéma de base de données

## Phase 2 : Branding et structure
- [x] Renommer l'application en "Mon Assistant Devis Travaux"
- [x] Mettre à jour le titre, logo et descriptions
- [x] Créer les tables de base de données (users, devis, artisans, reponses)
- [x] Définir les migrations Drizzle
- [x] Créer les helpers de base de données
- [x] Créer les routers tRPC

## Phase 3 : Authentification
- [x] Intégrer Manus OAuth pour l'authentification
- [x] Créer le système de rôles (particulier / artisan / admin)
- [x] Implémenter la page de sélection de rôle après inscription
- [x] Créer le profil artisan (métiers, zone géographique, etc.)
- [ ] Intégrer les pages d'authentification dans le flow

## Phase 4 : Publication de devis
- [ ] Ajouter un bouton "Publier aux artisans" après génération du devis
- [ ] Créer la page de publication avec sélection des métiers
- [ ] Sauvegarder les devis en base de données
- [ ] Système de notification pour les artisans concernés

## Phase 5 : Tableau de bord artisan
- [ ] Créer la page dashboard artisan
- [ ] Afficher les devis correspondant aux métiers de l'artisan
- [ ] Filtres par métier, localisation, date
- [ ] Vue détaillée d'un devis

## Phase 6 : Système de réponse
- [ ] Formulaire de réponse artisan (message, prix proposé, délai)
- [ ] Tableau de bord particulier pour voir les réponses reçues
- [ ] Système de comparaison des offres
- [ ] Statuts des devis (publié, en cours, accepté, refusé)

## Phase 7 : Tests
- [ ] Tester le parcours complet particulier
- [ ] Tester le parcours complet artisan
- [ ] Vérifier les notifications
- [ ] Tests de sécurité et permissions

## Phase 8 : Livraison
- [ ] Créer le checkpoint final
- [ ] Documentation utilisateur
- [ ] Livrer la plateforme


## Phase 8 : Enrichissement des questionnaires (DTU)
- [x] Enrichir le questionnaire Peinture avec questions techniques DTU 59.1
- [x] Enrichir le questionnaire Électricité avec questions techniques NF C 15-100
- [x] Enrichir le questionnaire Plomberie avec questions techniques DTU 60.1
- [ ] Enrichir le questionnaire Menuiserie avec questions techniques DTU 36.5
- [ ] Enrichir le questionnaire Sols avec questions techniques DTU 53
- [ ] Enrichir le questionnaire Isolation avec questions techniques DTU 45
- [ ] Enrichir le questionnaire Plâtrerie avec questions techniques DTU 25.1
- [ ] Enrichir le questionnaire Chauffage avec questions techniques DTU 65
- [ ] Enrichir le questionnaire VMC avec questions techniques DTU 68.3
- [ ] Enrichir les questionnaires des projets de rénovation
- [ ] Mettre à jour les calculateurs avec descriptions de postes normalisées
- [ ] Ajouter les références DTU dans les devis générés


## Phase 9 : Enrichissement des moteurs de calcul avec descriptions DTU
- [x] Enrichir le calculateur Électricité avec descriptions de postes détaillées NF C 15-100
- [ ] Enrichir le calculateur Peinture avec descriptions de postes détaillées DTU 59.1
- [ ] Enrichir le calculateur Plomberie avec descriptions de postes détaillées DTU 60.1
- [ ] Tester la génération de devis avec descriptions complètes


## Phase 10 : Transformation en outil professionnel pour artisans
- [x] Restructurer le format de devis avec titres et sous-titres hiérarchiques
- [x] Ajouter section "Phase préparatoire" (coltinage, stationnement, approvisionnement)
- [x] Ajouter section "Phase finale" (nettoyage de fin de chantier)
- [x] Implémenter le calcul de durée des travaux (jours/heures)
- [x] Ajouter le système de TVA française (20%, 10%, 5.5%)
- [x] Créer l'interface de modification des tarifs dans le devis
- [x] Ajouter le dropdown de sélection de marques électricité (Legrand, Schneider, Hager, etc.)
- [x] Créer la base de données de prix par marque
- [x] Ajouter les options prises doubles/triples
- [x] Ajouter les options interrupteurs doubles
- [ ] Finaliser l'intégration du nouveau calculateur dans le système
- [ ] Supprimer le système particuliers/artisans
- [ ] Simplifier l'interface pour orientation PRO uniquement
- [ ] Retirer les pages RoleSelection et ArtisanProfile
- [ ] Retirer les tables et routers liés aux particuliers
- [ ] Tester le nouveau format de devis complet


## Phase 11 : Finalisation de l'intégration pour génération de devis
- [x] Modifier QuestionnaireModal pour gérer le nouveau format électricité
- [x] Adapter le flux de données entre questionnaire et affichage devis
- [x] Tester l'ouverture du questionnaire électricité enrichi
- [x] Vérifier la sélection de marque (Legrand)
- [ ] Tester la génération complète d'un devis électricité (à faire par l'utilisateur)
- [ ] Vérifier l'affichage avec DevisViewNew
- [ ] Valider le mode édition des tarifs


## Phase 12 : Mode Description Libre avec IA
- [x] Créer l'interface de sélection de mode (Questionnaire structuré vs Description libre)
- [x] Développer le composant FreeDescriptionModal avec champ texte enrichi
- [x] Intégrer l'API Manus Forge pour l'analyse IA
- [x] Créer le prompt système pour l'IA (extraction postes, quantités, descriptions DTU)
- [x] Implémenter la génération de devis structuré à partir de la description
- [x] Ajouter la validation et l'édition du devis généré par IA
- [x] Tester l'ouverture du modal et l'interface
- [x] Intégrer pour tous les 9 métiers (fonctionne automatiquement)
- [ ] Tester la génération complète avec l'IA (à faire par l'utilisateur)
