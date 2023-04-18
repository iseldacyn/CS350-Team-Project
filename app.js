const express = require("express");
const app = express();

app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

app.post("/", (req, res) => {
    var recipe = req.body;
    const data = {
        Title: recipe.name,
        RecipeTags: null,
        Description: recipe.description,
        AvgRating: null,
        IngredientList: null,
        Instructions: recipe.directions,
        Notes: recipe.notes
    };
    pushRecipe(data);
    res.sendFile(__dirname + "/pages/index.html");
})

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
    console.log("Server..... Is...\n ....Buzzinnn....");
});

const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');


var serviceAccount = require(__dirname + "/Key.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://recipe-buddy-d17da-default-rtdb.firebaseio.com"
});


function pushRecipe(data) {

    const db = getFirestore();
    const res = db.collection('Recipes').doc(data.Title).set(data);
    console.log(res);
}


