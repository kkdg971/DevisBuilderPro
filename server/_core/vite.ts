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
      const clientTemplate = path.resolve(
        import.meta.dirname,
        "../../client",
        "index.html"
      );

      if (!fs.existsSync(clientTemplate)) {
        throw new Error(`Client template not found at ${clientTemplate}`);
      }

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
  // Chemins possibles pour dist/public sur Render
  const possiblePaths = [
    path.resolve(import.meta.dirname, "../../dist/public"),
    path.resolve(process.cwd(), "dist/public"),
    path.resolve(process.cwd(), "src/dist/public"),
    "/opt/render/project/src/dist/public",
    "/opt/render/project/dist/public"
  ];

  let distPath = "";
  for (const p of possiblePaths) {
    if (fs.existsSync(p) && fs.existsSync(path.resolve(p, "index.html"))) {
      distPath = p;
      break;
    }
  }

  if (!distPath) {
    console.error("Could not find dist/public directory in any of the expected locations:");
    possiblePaths.forEach(p => console.error(` - ${p}`));
    // Fallback to the first one anyway
    distPath = possiblePaths[0];
  }

  console.log(`[DEBUG] Serving static files from: ${distPath}`);
  app.use(express.static(distPath));

  app.use("*", (_req, res) => {
    const indexPath = path.resolve(distPath, "index.html");
    if (!fs.existsSync(indexPath)) {
      console.error(`index.html not found at ${indexPath}`);
      return res.status(500).send(`index.html not found at ${indexPath}`);
    }
    res.sendFile(indexPath);
  });
}