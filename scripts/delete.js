/*
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyAxBaS7uNtYEl1klUezNXVw22-Odt8w2ZY",
  authDomain: "recipe-buddy-d17da.firebaseapp.com",
  databaseURL: "https://recipe-buddy-d17da-default-rtdb.firebaseio.com",
  projectId: "recipe-buddy-d17da",
  storageBucket: "recipe-buddy-d17da.appspot.com",
  messagingSenderId: "896861726820",
  appId: "1:896861726820:web:1271e83a342b23018a1771",
  measurementId: "G-SWR1Y3XV4B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
*/
var admin = require("firebase-admin");

var serviceAccount = require("../Key.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

db.collection('Recipes').doc('cake').delete();