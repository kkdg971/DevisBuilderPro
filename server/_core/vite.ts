import express, { type Express } from "express";
import fs from "fs";
import { type Server } from "http";
import { nanoid } from "nanoid";
import path from "path";
import { createServer as createViteServer } from "vite";
import viteConfig from "../../vite.config";

export async function setupVite(app: Express, server: Server) {
  const serverOptions = {
    middlewareMode: true,
    hmr: { server },
    allowedHosts: true as const,
  };

  const vite = await createViteServer({
    ...viteConfig,
    configFile: false,
    server: serverOptions,
    appType: "custom",
  });

  app.use(vite.middlewares);
  app.use("*", async (req, res, next) => {
    const url = req.originalUrl;

    try {
      // En développement, cherche client/index.html
      // En production, ce chemin n'existe pas et setupVite échoue
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../../client",
        "index.html"
      );

      // Check if file exists before trying to read it
      if (!fs.existsSync(clientTemplate)) {
        console.warn(`Client template not found at ${clientTemplate}`);
        throw new Error(`Client template not found at ${clientTemplate}`);
      }

      // always reload the index.html file from disk incase it changes
      let template = await fs.promises.readFile(clientTemplate, "utf-8");
      template = template.replace(
        `src="/src/main.tsx"`,
        `src="/src/main.tsx?v=${nanoid()}"`
      );
      const page = await vite.transformIndexHtml(url, template);
      res.status(200).set({ "Content-Type": "text/html" }).end(page);
    } catch (e) {
      vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });
}

export function serveStatic(app: Express) {
  // Always use dist/public for static files
  const distPath = path.resolve(import.meta.dirname, "../../dist/public");
  
  console.log(`[DEBUG] Serving static files from: ${distPath}`);
  
  if (!fs.existsSync(distPath)) {
    console.error(
      `Could not find the build directory: ${distPath}, make sure to build the client first`
    );
  }

  app.use(express.static(distPath));

  // fall through to index.html if the file doesn't exist
  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    console.log(`[DEBUG] Serving index.html from: ${indexPath}`);
    
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html not found at ${indexPath}`);
      return res.status(500).send("index.html not found");
    }
    
    res.sendFile(indexPath);
  });
}