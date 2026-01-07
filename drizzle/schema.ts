import { int, mysqlEnum, mysqlTable, text, timestamp, varchar, decimal, json, boolean } from "drizzle-orm/mysql-core";

/**
 * Core user table backing auth flow.
 * Extend this file with additional tables as your product grows.
 * Columns use camelCase to match both database fields and generated types.
 */
export const users = mysqlTable("users", {
  /**
   * Surrogate primary key. Auto-incremented numeric value managed by the database.
   * Use this for relations between tables.
   */
  id: int("id").autoincrement().primaryKey(),
  /** Manus OAuth identifier (openId) returned from the OAuth callback. Unique per user. */
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["particulier", "artisan", "admin"]).default("particulier").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

/**
 * Table des profils artisans
 * Informations complémentaires pour les utilisateurs avec le rôle "artisan"
 */
export const artisans = mysqlTable("artisans", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Référence à users.id
  entreprise: varchar("entreprise", { length: 255 }),
  siret: varchar("siret", { length: 14 }),
  telephone: varchar("telephone", { length: 20 }),
  adresse: text("adresse"),
  codePostal: varchar("codePostal", { length: 10 }),
  ville: varchar("ville", { length: 100 }),
  // Métiers de l'artisan (JSON array)
  metiers: json("metiers").$type<string[]>().notNull(),
  // Zone géographique d'intervention (JSON array de codes postaux ou départements)
  zoneIntervention: json("zoneIntervention").$type<string[]>(),
  description: text("description"),
  siteWeb: varchar("siteWeb", { length: 255 }),
  verified: boolean("verified").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Artisan = typeof artisans.$inferSelect;
export type InsertArtisan = typeof artisans.$inferInsert;

/**
 * Table des devis générés
 * Stocke tous les devis créés par les particuliers
 */
export const devis = mysqlTable("devis", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Référence à users.id (particulier)
  reference: varchar("reference", { length: 50 }).notNull().unique(),
  
  // Type de demande
  type: mysqlEnum("type", ["corps-metier", "projet"]).notNull(),
  // Corps de métier sélectionnés (JSON array) ou projet de rénovation
  corpsDeMetier: json("corpsDeMetier").$type<string[]>(),
  projetRenovation: varchar("projetRenovation", { length: 50 }),
  
  // Données du questionnaire (JSON)
  answers: json("answers").notNull(),
  
  // Résultat du calcul
  devisCalcule: json("devisCalcule").notNull(),
  totalHT: decimal("totalHT", { precision: 10, scale: 2 }).notNull(),
  totalTTC: decimal("totalTTC", { precision: 10, scale: 2 }).notNull(),
  
  // Statut du devis
  statut: mysqlEnum("statut", ["brouillon", "publie", "en-cours", "accepte", "refuse", "archive"]).default("brouillon").notNull(),
  
  // Informations de localisation du chantier
  adresseChantier: text("adresseChantier"),
  codePostalChantier: varchar("codePostalChantier", { length: 10 }),
  villeChantier: varchar("villeChantier", { length: 100 }),
  
  // Dates
  datePublication: timestamp("datePublication"),
  dateExpiration: timestamp("dateExpiration"),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Devis = typeof devis.$inferSelect;
export type InsertDevis = typeof devis.$inferInsert;

/**
 * Table des réponses des artisans aux devis
 */
export const reponses = mysqlTable("reponses", {
  id: int("id").autoincrement().primaryKey(),
  devisId: int("devisId").notNull(), // Référence à devis.id
  artisanId: int("artisanId").notNull(), // Référence à artisans.id
  
  // Proposition de l'artisan
  message: text("message").notNull(),
  prixPropose: decimal("prixPropose", { precision: 10, scale: 2 }).notNull(),
  delaiPropose: varchar("delaiPropose", { length: 100 }), // ex: "2-3 semaines"
  
  // Détails supplémentaires (JSON)
  detailsSupplementaires: json("detailsSupplementaires"),
  
  // Statut de la réponse
  statut: mysqlEnum("statut", ["envoyee", "vue", "acceptee", "refusee"]).default("envoyee").notNull(),
  
  // Dates
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
});

export type Reponse = typeof reponses.$inferSelect;
export type InsertReponse = typeof reponses.$inferInsert;

/**
 * Table des notifications
 * Pour notifier les utilisateurs des événements importants
 */
export const notifications = mysqlTable("notifications", {
  id: int("id").autoincrement().primaryKey(),
  userId: int("userId").notNull(), // Référence à users.id
  
  type: mysqlEnum("type", ["nouveau-devis", "nouvelle-reponse", "reponse-acceptee", "reponse-refusee", "systeme"]).notNull(),
  titre: varchar("titre", { length: 255 }).notNull(),
  message: text("message").notNull(),
  
  // Lien vers la ressource concernée
  lienDevis: int("lienDevis"),
  lienReponse: int("lienReponse"),
  
  lue: boolean("lue").default(false).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type Notification = typeof notifications.$inferSelect;
export type InsertNotification = typeof notifications.$inferInsert;