const express = require("express");
const app = express();

app.use(express.static("public"));

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});

app.get("/create", function (req, res) {
    res.sendFile(__dirname + "/pages/create.html");
})

app.get("/search", function (req, res) {
    res.sendFile(__dirname + "/pages/search.html");
})

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/pages/login.html");
})

app.get("/contact", function (req, res) {
    res.sendFile(__dirname + "/pages/contactus.html");
})

app.listen(3000, function () {
    console.log("Server is running on localhost3000");
});