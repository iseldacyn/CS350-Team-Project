// First initialize firebase connection
const { initializeApp, applicationDefault, cert } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');
const { getStorage } = require('firebase-admin/storage');
const serviceAccount = require(__dirname + "/Key.json");

initializeApp({
  credential: cert(serviceAccount),
  databaseURL: "https://recipe-buddy-d17da-default-rtdb.firebaseio.com",
  storageBucket: 'recipe-buddy-d17da.appspot.com'
});

// Pushes recipes to firestore db
function pushRecipe(data, img = null) {

    /*
    if (img) {
        const bucket = getStorage.bucket();
        console.log("******Bucket*****", bucket);
    }
    */

    //console.log(data);
    const db = getFirestore();
    const res = db.collection('Recipes').doc(data.Title).set(data);
    console.log("Done");
    console.log(res);
}

// Create Express server to host application, and handle back
// end functionality.
const express = require("express");
const multipart = require("connect-multiparty")
const app = express();

var mp = multipart();

// Give client access to public folder (i.e. css/js/images)
app.use(express.static("public"));
app.use(express.urlencoded({ extended: false }));

// Handle post request for root route
app.post("/", (req, res) => {
    const recipe = req.body;
    const data = {
        Title: recipe.name,
        RecipeTags: [],
        Description: recipe.description,
        AvgRating: null,
        IngredientList: [],
        Instructions: recipe.directions,
        Notes: recipe.notes
    };

    // Obtaining lists from recipe
    names = Array.from(recipe.iname);
    quantities = Array.from(recipe.quantity);
    units = Array.from(recipe.unit);

    for (let i = 0; i < names.length; i++) {

        let str = units[i].concat(".", quantities[i].toString(), ".", names[i]);
        data.IngredientList.push(str)
    }

    pushRecipe(data);
    res.
    res.sendFile(__dirname + "/pages/index.html");
})

app.get("/", function (req, res) {
    res.cookie('foo', 'bar');
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

app.get("/edit", function (req, res) {
    res.sendFile(__dirname + "/pages/edit.html");
})

// Start the server
app.listen(3000, function () {
    console.log("Server..... Is...\n ....Buzzinnn....");
});


// delete recipes to firestore db
function deleteRecipe(data) {
    const db = getFirestore();
    db.collection('Recipes').doc(data).delete();
}