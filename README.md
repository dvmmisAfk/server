# Assignment 6 - Node.js Web Server

**Name:** Divyam

---

## What is this

A basic web server built with Node.js that serves 3 HTML pages for a fake laundry business (LaundryLux). No Express, no npm packages — just the built-in `http`, `fs`, and `path` modules.

---

## How to run

```
node server.js
```

Then open `http://localhost:3000/home` in your browser. Press `Ctrl+C` to stop.

---

## Pages

| URL | Page |
|-----|------|
| `/home` | Home page |
| `/about` | About page |
| `/contact` | Contact form |
| anything else | 404 |

---

## How server.js works

It imports the 3 modules, sets port 3000, then creates a server with `http.createServer()`. Every time a request comes in, it checks `req.url` using if-else and reads the matching HTML file using `fs.readFile()`. If the file loads fine it sends status 200, if something goes wrong it sends 500, and if the URL doesn't match anything it sends a 404.
