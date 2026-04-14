# Assignment 6 - Node.js Web Server

**Name:** Divyam  

---

## What is this

This is a basic web server made using Node.js for Assignment 6. It serves HTML pages for a fake laundry business called LaundryLux. No Express or any npm packages are used — just the built-in `http`, `fs`, and `path` modules.

---

## How to Run

Make sure you have Node.js installed first.

1. Open terminal in the `assignment6` folder
2. Run this command:

```
node server.js
```

3. Open your browser and go to `http://localhost:3000`

To stop the server just press `Ctrl + C` in the terminal.

---

## Prerequisites

- Node.js (any recent version should work, I used v18)
- No npm install needed

---

## Available Routes

| URL | Page |
|-----|------|
| `/` or `/home` | Home page |
| `/about` | About page |
| `/contact` | Contact page |
| `/services` | Services page |
| anything else | 404 page |

---

## Folder Structure

```
assignment6/
  server.js       <- main server file
  pages/
    home.html
    about.html
    contact.html
    services.html
    404.html
  README.md
```

---

## Notes

The home page has color boxes that change color when you click them and a name input that updates the greeting — those are the DOM manipulation parts of the assignment. The services page has a price calculator. The contact page has a form with basic validation.
