var http = require("http");
var fs = require("fs");
var path = require("path");

var PORT = 3000;
var pagesFolder = path.join(__dirname, "pages");

var server = http.createServer(function(req, res) {

    console.log("got request: " + req.url);

    var url = req.url;

    if (url == "/" || url == "/home") {

        var filePath = path.join(pagesFolder, "home.html");

        fs.readFile(filePath, function(err, data) {
            if (err) {
                console.log("couldnt read home.html - " + err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
            console.log("home page sent");
        });

    } else if (url == "/about") {

        console.log("loading about page");
        var filePath = path.join(pagesFolder, "about.html");

        fs.readFile(filePath, function(err, data) {

            if (err) {
                console.log("file read error: " + err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }

            console.log("about page sent");
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });

    } else if (url == "/contact") {

        var filePath = path.join(pagesFolder, "contact.html");

        fs.readFile(filePath, function(err, data) {
            if (err) {
                console.log("error: " + err.message);
                res.writeHead(500, { "Content-Type": "text/plain" });
                res.end("500 - Internal Server Error");
                return;
            }
            res.writeHead(200, { "Content-Type": "text/html" });
            res.end(data);
        });

        console.log("contact route hit");

    } else {
        console.log("404 for: " + url);
        res.writeHead(404, { "Content-Type": "text/html" });
        res.end("<h2>404 - Page Not Found</h2><p>That page does not exist.</p><a href='/home'>Go back to Home</a>");
    }

});

server.listen(PORT, function() {
    console.log("server running at http://localhost:" + PORT);
    console.log("ctrl+c to stop");
});
