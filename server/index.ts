import express from "express";
import { createServer } from "http";
import path from "path";
import { fileURLToPath } from "url";
import session from "express-session";
import { registerOAuthRoutes } from "./_core/oauth";
import { createContext } from "./_core/trpc";
import { appRouter } from "./routers";
import * as trpcExpress from "@trpc/server/adapters/express";

const __filename = fileURLToPath(import.meta.url );
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const server = createServer(app);

  // Trust proxy for Render deployment
  app.set("trust proxy", 1);

  // Configure express-session
  app.use(
    session({
      secret: process.env.SESSION_SECRET || "supersecret", // Use a strong secret from environment variables
      resave: false,
      saveUninitialized: false,
      cookie: {
        secure: true, // Always use secure cookies as Render forces HTTPS
        httpOnly: true,
        sameSite: "none", // Required for cross-site cookies with secure: true
        maxAge: 1000 * 60 * 60 * 24 * 7, // 1 week
        domain: ".onrender.com", // Explicitly set domain for Render
      },
    } )
  );

  console.log("[DEBUG] Express-session cookie config:", {
    secure: true,
    httpOnly: true,
    sameSite: "none",
    maxAge: 1000 * 60 * 60 * 24 * 7,
    domain: ".onrender.com",
  } );

  // Register OAuth routes
  registerOAuthRoutes(app);

  // tRPC middleware
  app.use(
    "/api/trpc",
    trpcExpress.createExpressMiddleware({
      router: appRouter,
      createContext,
    })
  );

  // Serve static files from dist/public
  const staticPath = path.resolve(__dirname, "..", "dist", "public");
  console.log(`[DEBUG] __dirname: ${__dirname}`);
  console.log(`[DEBUG] staticPath: ${staticPath}`);

  app.use(express.static(staticPath));

  // Handle client-side routing - serve index.html for all routes
  app.get("*", (_req, res) => {
    res.sendFile(path.join(staticPath, "index.html"));
  });

  const port = process.env.PORT || 3000;

  server.listen(port, () => {
    console.log(`Server running on http://localhost:${port}/` );
  });
}

startServer().catch(console.error);
