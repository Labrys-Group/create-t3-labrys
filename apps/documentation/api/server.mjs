import path from "path";
import { fileURLToPath } from "url";
import { clerkMiddleware, requireAuth } from "@clerk/express";
import express from "express";

import "dotenv/config";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Serve the static Docusaurus build
// In Vercel serverless functions, process.cwd() points to /var/task
// We need to use a relative path from the server.js file to the build directory
const docusaurusBuildDir = path.join(__dirname, "..", "build");

// if a clerk key is set, we need to serve the login and logout pages
if (process.env.CLERK_SECRET_KEY) {
  app.use(clerkMiddleware());

  app.get("/login", (req, res) => {
    res.sendFile(path.join(docusaurusBuildDir, "login.html"));
  });

  app.get("/logout", (req, res) => {
    res.sendFile(path.join(docusaurusBuildDir, "logout.html"));
  });

  app.use(
    requireAuth({ signInUrl: "/login" }),
    express.static(docusaurusBuildDir),
  );

  // For SPA routing, serve index.html for all non-file requests
  app.get("*", requireAuth({ signInUrl: "/login" }), (req, res) => {
    res.sendFile(path.join(docusaurusBuildDir, "index.html"));
  });
} else {
  // if no clerk key is set, we just serve the static files publicly
  app.use(express.static(docusaurusBuildDir));

  // For SPA routing, serve index.html for all non-file requests
  app.get("*", (req, res) => {
    res.sendFile(path.join(docusaurusBuildDir, "index.html"));
  });
}

// For local development
if (import.meta.url === `file://${process.argv[1]}`) {
  const PORT = process.env.PORT ?? 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
