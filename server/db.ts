import { eq, and, inArray, desc, sql } from "drizzle-orm";
import { drizzle } from "drizzle-orm/mysql2";
import { InsertUser, users, artisans, InsertArtisan, devis, InsertDevis, reponses, InsertReponse, notifications, InsertNotification } from "../drizzle/schema";
import { ENV } from './_core/env';

let _db: ReturnType<typeof drizzle> | null = null;

// Lazily create the drizzle instance so local tooling can run without a DB.
export async function getDb() {
  if (!_db && process.env.DATABASE_URL) {
    try {
      _db = drizzle(process.env.DATABASE_URL);
    } catch (error) {
      console.warn("[Database] Failed to connect:", error);
      _db = null;
    }
  }
  return _db;
}

export async function upsertUser(user: InsertUser): Promise<void> {
  if (!user.openId) {
    throw new Error("User openId is required for upsert");
  }

  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot upsert user: database not available");
    return;
  }

  try {
    const values: InsertUser = {
      openId: user.openId,
    };
    const updateSet: Record<string, unknown> = {};

    const textFields = ["name", "email", "loginMethod"] as const;
    type TextField = (typeof textFields)[number];

    const assignNullable = (field: TextField) => {
      const value = user[field];
      if (value === undefined) return;
      const normalized = value ?? null;
      values[field] = normalized;
      updateSet[field] = normalized;
    };

    textFields.forEach(assignNullable);

    if (user.lastSignedIn !== undefined) {
      values.lastSignedIn = user.lastSignedIn;
      updateSet.lastSignedIn = user.lastSignedIn;
    }
    if (user.role !== undefined) {
      values.role = user.role;
      updateSet.role = user.role;
    } else if (user.openId === ENV.ownerOpenId) {
      values.role = 'admin';
      updateSet.role = 'admin';
    }

    if (!values.lastSignedIn) {
      values.lastSignedIn = new Date();
    }

    if (Object.keys(updateSet).length === 0) {
      updateSet.lastSignedIn = new Date();
    }

    await db.insert(users).values(values).onDuplicateKeyUpdate({
      set: updateSet,
    });
  } catch (error) {
    console.error("[Database] Failed to upsert user:", error);
    throw error;
  }
}

export async function getUserByOpenId(openId: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.openId, openId)).limit(1);

  return result.length > 0 ? result[0] : undefined;
}

export async function getUserById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(users).where(eq(users.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// NOUVEAU: Récupérer un utilisateur par email
export async function getUserByEmail(email: string) {
  const db = await getDb();
  if (!db) {
    console.warn("[Database] Cannot get user: database not available");
    return undefined;
  }

  const result = await db.select().from(users).where(eq(users.email, email)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

// NOUVEAU: Créer un nouvel utilisateur
export async function createUser(userData: {
  openId: string;
  name?: string;
  email?: string;
  loginMethod?: string;
  role?: "particulier" | "artisan" | "admin";
}) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  try {
    const [result] = await db.insert(users).values({
      openId: userData.openId,
      name: userData.name,
      email: userData.email,
      loginMethod: userData.loginMethod || "local",
      role: userData.role || "particulier",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    });

    // Récupérer l'utilisateur créé
    const newUser = await getUserByOpenId(userData.openId);
    return newUser;
  } catch (error) {
    console.error("[Database] Failed to create user:", error);
    throw error;
  }
}

// ============ ARTISANS ============

export async function createArtisan(artisan: InsertArtisan) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(artisans).values(artisan);
  return result.insertId as number;
}

export async function getArtisanByUserId(userId: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(artisans).where(eq(artisans.userId, userId)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function updateArtisan(id: number, data: Partial<InsertArtisan>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(artisans).set(data).where(eq(artisans.id, id));
}

export async function getArtisansByMetiers(metiers: string[]) {
  const db = await getDb();
  if (!db) return [];

  // Recherche d'artisans dont au moins un métier correspond
  const result = await db.select().from(artisans).where(
    sql`JSON_OVERLAPS(${artisans.metiers}, ${JSON.stringify(metiers)})`
  );
  
  return result;
}

// ============ DEVIS ============

export async function createDevis(devisData: InsertDevis) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(devis).values(devisData);
  return result.insertId as number;
}

export async function getDevisById(id: number) {
  const db = await getDb();
  if (!db) return undefined;

  const result = await db.select().from(devis).where(eq(devis.id, id)).limit(1);
  return result.length > 0 ? result[0] : undefined;
}

export async function getDevisByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(devis)
    .where(eq(devis.userId, userId))
    .orderBy(desc(devis.createdAt));
  
  return result;
}

export async function getDevisPublies() {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(devis)
    .where(eq(devis.statut, "publie"))
    .orderBy(desc(devis.datePublication));
  
  return result;
}

export async function getDevisForArtisan(artisanMetiers: string[], codePostal?: string) {
  const db = await getDb();
  if (!db) return [];

  // Recherche de devis publiés correspondant aux métiers de l'artisan
  let query = db.select().from(devis)
    .where(
      and(
        eq(devis.statut, "publie"),
        sql`JSON_OVERLAPS(${devis.corpsDeMetier}, ${JSON.stringify(artisanMetiers)})`
      )
    )
    .orderBy(desc(devis.datePublication));
  
  return await query;
}

export async function updateDevis(id: number, data: Partial<InsertDevis>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(devis).set(data).where(eq(devis.id, id));
}

// ============ REPONSES ============

export async function createReponse(reponseData: InsertReponse) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(reponses).values(reponseData);
  return result.insertId as number;
}

export async function getReponsesByDevisId(devisId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(reponses)
    .where(eq(reponses.devisId, devisId))
    .orderBy(desc(reponses.createdAt));
  
  return result;
}

export async function getReponsesByArtisanId(artisanId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(reponses)
    .where(eq(reponses.artisanId, artisanId))
    .orderBy(desc(reponses.createdAt));
  
  return result;
}

export async function updateReponse(id: number, data: Partial<InsertReponse>) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(reponses).set(data).where(eq(reponses.id, id));
}

// ============ NOTIFICATIONS ============

export async function createNotification(notif: InsertNotification) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  const [result] = await db.insert(notifications).values(notif);
  return result.insertId as number;
}

export async function getNotificationsByUserId(userId: number) {
  const db = await getDb();
  if (!db) return [];

  const result = await db.select().from(notifications)
    .where(eq(notifications.userId, userId))
    .orderBy(desc(notifications.createdAt));
  
  return result;
}

export async function markNotificationAsRead(id: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(notifications).set({ lue: true }).where(eq(notifications.id, id));
}

export async function markAllNotificationsAsRead(userId: number) {
  const db = await getDb();
  if (!db) throw new Error("Database not available");

  await db.update(notifications).set({ lue: true }).where(eq(notifications.userId, userId));
}