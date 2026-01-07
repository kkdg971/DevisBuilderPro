import "dotenv/config";
import express from "express";
import { createServer } from "http";
import net from "net";
import session from "express-session";
import FileStoreFactory from "session-file-store";
import { createExpressMiddleware } from "@trpc/server/adapters/express";

import { appRouter } from "../routers";
import { createContext } from "./context";
import { registerOAuthRoutes } from "./oauth";
import { serveStatic, setupVite } from "./vite";

// ─────────────────────────────────────────────
// Security check
// ─────────────────────────────────────────────
if (!process.env.SESSION_SECRET) {
  throw new Error("❌ SESSION_SECRET is missing in environment variables");
}

// ─────────────────────────────────────────────
// Utils
// ─────────────────────────────────────────────
function isPortAvailable(port: number): Promise<boolean> {
  return new Promise(resolve => {
    const server = net.createServer();
    server.listen(port, () => {
      server.close(() => resolve(true));
    });
    server.on("error", () => resolve(false));
  });
}

async function findAvailablePort(startPort = 3000): Promise<number> {
  for (let port = startPort; port < startPort + 20; port++) {
    if (await isPortAvailable(port)) {
      return port;
    }
  }
  throw new Error(`No available port found starting from ${startPort}`);
}

// ─────────────────────────────────────────────
// Server
// ─────────────────────────────────────────────
async function startServer() {
  const app = express();
  app.set("trust proxy", 1);

  const server = createServer(app);

  // Body parsers
  app.use(express.json({ limit: "50mb" }));
  app.use(express.urlencoded({ extended: true, limit: "50mb" }));

  // ─────────────────────────────────────────────
  // Session store (NO MemoryStore in prod)
  // ─────────────────────────────────────────────
  const FileStore = FileStoreFactory(session);

  app.use(
    session({
      name: "devisia.sid",
      store: new FileStore({
        path: "./sessions",
        retries: 1,
      }),
      secret: process.env.SESSION_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        maxAge: 24 * 60 * 60 * 1000, // 24h
      },
    })
  );

  // ─────────────────────────────────────────────
  // OAuth routes
  // ─────────────────────────────────────────────
  registerOAuthRoutes(app);

  // ─────────────────────────────────────────────
  // tRPC
  // ─────────────────────────────────────────────
  app.use(
    "/api/trpc",
    createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // ─────────────────────────────────────────────
  // Frontend (Vite / static)
  // ─────────────────────────────────────────────
  if (process.env.NODE_ENV === "production") {
    console.log("🚀 Production mode — serving static files");
    serveStatic(app);
  } else {
    try {
      console.log("🧪 Dev mode — starting Vite");
      await setupVite(app, server);
    } catch (err) {
      console.warn("⚠️ Vite failed — fallback to static");
      serveStatic(app);
    }
  }

  // ─────────────────────────────────────────────
  // Start server
  // ─────────────────────────────────────────────
  const preferredPort = Number(process.env.PORT) || 3000;
  const port = await findAvailablePort(preferredPort);

  if (port !== preferredPort) {
    console.log(`⚠️ Port ${preferredPort} busy → using ${port}`);
  }

  server.listen(port, () => {
    console.log(`✅ Server running on http://localhost:${port}`);
  });
}

startServer().catch(err => {
  console.error("❌ Server failed to start:", err);
});
