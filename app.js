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

    // Putting off photo implementation until search and home page are
    // functional
    /*
    if (img) {
        const bucket = getStorage.bucket();
        console.log("******Bucket*****", bucket);
    }
    */

    const db = getFirestore();
    const res = db.collection('Recipes').doc(data.Title).set(data);
    console.log("Done");
    console.log(res);
}


async function getRecipe(title) {

    const db = getFirestore();
    const recipeRef = db.collection('Recipes');

    const snapshot = await recipeRef.where('Title', '==', title).get();
    if (snapshot.empty) {
        console.log("No matching documents.");
        return;
    }

    recipes = [];

    snapshot.forEach(doc => {
        recipes.push(doc.data());
    })

    recipe = {
        name: recipes[0].Title,
        desc: recipes[0].Description,
        rating: recipes[0].AvgRating,
        ilist: recipes[0].IngredientList,
        instruct: recipes[0].Instructions,
        notes: recipes[0].Notes
    };

    return recipe;
}


// Returns an array containing every recipe within the database
async function getRecipes() {

    const db = getFirestore();
    const recipeRef = db.collection('Recipes');
    const snapshot = await recipeRef.get();

    recipes = [];

    // Creating a recipe object and storing object in array
    // for every recipe in the database.
    snapshot.forEach(doc => {
        
        recipe = {
            name: doc.data().Title,
            desc: doc.data().Description,
            rating: doc.data().AvgRating,
            ilist: doc.data().IngredientList,
            instruct: doc.data().Instructions,
            notes: doc.data().Notes
        };
        recipes.push(recipe);
    });

   return recipes 
}



// Create Express server to host application, and handle back
// end functionality.
const express = require("express");
const multipart = require("connect-multiparty")
const app = express();

var mp = multipart();

app.set('view engine', 'ejs');

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

    // Creates an easily parsible string to store in the database
    for (let i = 0; i < names.length; i++) {
        let str = units[i].concat(".", quantities[i].toString(), ".", names[i]);
        data.IngredientList.push(str)
    }

    // Stores recipe in db
    pushRecipe(data);

    res.sendFile(__dirname + "/pages/index.html");
});

app.get("/", function (req, res) {
    res.sendFile(__dirname + "/pages/index.html");
});

app.get("/create", function (req, res) {
    res.sendFile(__dirname + "/pages/create.html");
});

app.get("/search", async function (req, res) {

    var recipes = await getRecipes();
    res.render("search", {recipes: recipes});
});

app.get("/login", function (req, res) {
    res.sendFile(__dirname + "/pages/login.html");
});

app.get("/contact", function (req, res) {
    res.sendFile(__dirname + "/pages/contactus.html");
});

app.get("/edit/:name", async function (req, res) {
    var recipeName = String(req.params.name);
    var recipe = await getRecipe(recipeName);
    console.log(recipe);

    var ilist = recipe.ilist;

    
    res.render("edit", {
        recipe: recipe,
        ilist: ilist
    });
});
app.get("/use/:name", async function (req, res) {
    var recipeName = String(req.params.name);
    var recipe = await getRecipe(recipeName);
    var newInstr = await parseInstr(recipe.instruct);
    recipe.instruct = newInstr;
    console.log(recipe);

    var ilist = recipe.ilist;

    
    res.render("use", {
        recipe: recipe,
        ilist: ilist
    });
})

// Start the server
app.listen(3000, function () {
    console.log("Server..... Is...\n ....Buzzinnn....");
});

function parseInstr(instr) {
    res = instr.replaceAll(/\r\n/g,"<br>");
    console.log(res);

    return res;
}

// delete recipes to firestore db
function deleteRecipe(data) {
    const db = getFirestore();
    db.collection('Recipes').doc(data).delete();
}