// Assignment 6 - Simple Node.js Web Server
// Name: Divyam 

const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3000;

// map of urls to html files
const pages = {
    "/": "home.html",
    "/home": "home.html",
    "/about": "about.html",
    "/contact": "contact.html",
    "/services": "services.html"
};

// not sure if i need path.join here but keeping it
const pagesDir = path.join(__dirname, "pages");

const server = http.createServer(function(req, res) {

    console.log("request came in:", req.url);

    var url = req.url;

    // check if url exists in our pages map
    if (pages[url]) {

        var file = path.join(pagesDir, pages[url]);

        fs.readFile(file, function(err, data) {
            if (err) {
                console.log("error reading file:", err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }
            console.log("sending file:", pages[url]);
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });

    } else {

        // send 404 page
        // i tried just sending a string first but decided to use the html file
        var notFoundFile = path.join(pagesDir, "404.html");

        fs.readFile(notFoundFile, function(err, data) {
            if (err) {
                res.writeHead(404, { "Content-Type": "text/plain" });
                res.end("404 - Page Not Found");
                return;
            }
            res.writeHead(404, { "Content-Type": "text/html" });
            res.end(data);
        });
    }

});

server.listen(PORT, function() {
    console.log("server started at http://localhost:" + PORT);
    console.log("ctrl+c to stop");
});
