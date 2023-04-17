
var admin = require("firebase-admin");

var serviceAccount = require("./Key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://recipe-buddy-d17da-default-rtdb.firebaseio.com"
});

const db = admin.firestore();

let recipesRef = db.collection("Recipes");

recipesRef.get().then((querySnapshot) => {
  querySnapshot.forEach(document => {
    console.log(document.data());
  })
})


