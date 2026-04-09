/**
 * ============================================================
 *  Assignment 6 — Simple Web Server with Node.js
 *  Student : Divyam | Reg No : 24BCE11150 | VIT Bhopal
 * ============================================================
 *
 *  How it works:
 *  -------------
 *  1. We use Node's built-in `http` module — no Express, no npm install.
 *  2. A ROUTES object maps URL paths to HTML filenames in /pages/.
 *  3. Every incoming request is handled by `requestHandler`, which:
 *       a. Looks up the URL in ROUTES.
 *       b. If found  → reads the file asynchronously and sends 200 OK.
 *       c. If missing → reads 404.html and sends 404 Not Found.
 *  4. File reading uses a Promise wrapper so we can use async/await.
 *  5. The server listens on PORT 3000.
 */

const http = require("http");   // Built-in HTTP module
const fs   = require("fs");     // Built-in File System module
const path = require("path");   // Built-in Path module

// ── Configuration ─────────────────────────────────────────────────────────────
const PORT      = 3000;
const PAGES_DIR = path.join(__dirname, "pages"); // Absolute path to /pages folder

// ── Route Map ─────────────────────────────────────────────────────────────────
// Maps each URL path to the corresponding HTML file in /pages/
const ROUTES = {
  "/":         "home.html",      // Default route → Home
  "/home":     "home.html",      // /home route
  "/about":    "about.html",     // /about route
  "/contact":  "contact.html",   // /contact route
  "/services": "services.html",  // /services route (bonus)
};

// ── Async File Reader (Modular Helper) ────────────────────────────────────────
/**
 * Wraps fs.readFile in a Promise so we can use async/await.
 * @param {string} filePath - Full path to the file to read
 * @returns {Promise<Buffer>}
 */
function readFileAsync(filePath) {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, (err, data) => {
      if (err) reject(err);
      else resolve(data);
    });
  });
}

// ── Request Handler ───────────────────────────────────────────────────────────
/**
 * Handles every incoming HTTP request.
 * Uses async/await for non-blocking file reads.
 */
async function requestHandler(req, res) {
  // Strip query strings (e.g. /home?foo=bar → /home)
  const urlPath = req.url.split("?")[0];

  // Log each request to the console with a timestamp
  console.log(`[${new Date().toLocaleTimeString()}]  ${req.method}  ${urlPath}`);

  // Check if the requested path exists in our route map
  const fileName = ROUTES[urlPath];

  if (fileName) {
    // ── Matched Route: serve the HTML file ──────────────────────────────────
    const filePath = path.join(PAGES_DIR, fileName);

    try {
      const content = await readFileAsync(filePath);
      res.writeHead(200, { "Content-Type": "text/html; charset=utf-8" });
      res.end(content);
    } catch (err) {
      // File unexpectedly missing on disk → 500 Internal Server Error
      console.error("  ERROR reading file:", err.message);
      res.writeHead(500, { "Content-Type": "text/html" });
      res.end("<h2>500 — Internal Server Error</h2>");
    }

  } else {
    // ── No Match: serve the custom 404 page ─────────────────────────────────
    const notFoundPath = path.join(PAGES_DIR, "404.html");

    try {
      const content = await readFileAsync(notFoundPath);
      res.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
      res.end(content);
    } catch {
      // Fallback plain-text 404 if 404.html itself is missing
      res.writeHead(404, { "Content-Type": "text/plain" });
      res.end("404 — Page Not Found");
    }
  }
}

// ── Create & Start Server ─────────────────────────────────────────────────────
const server = http.createServer(requestHandler);

server.listen(PORT, () => {
  console.log("===========================================");
  console.log("  LaundryLux Node.js Server — Assignment 6");
  console.log("===========================================");
  console.log(`  Listening on : http://localhost:${PORT}`);
  console.log("  Routes       :");
  Object.keys(ROUTES).forEach(r => console.log(`    GET ${r}`));
  console.log("===========================================");
});

// ── Graceful Shutdown ─────────────────────────────────────────────────────────
// Closes the server cleanly when user presses CTRL+C
process.on("SIGINT", () => {
  console.log("\n  Shutting down server...");
  server.close(() => {
    console.log("  Server stopped. Goodbye!");
    process.exit(0);
  });
});
