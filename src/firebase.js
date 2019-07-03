import firebase from "firebase";
import "@firebase/firestore";

if(!firebase.apps.length){
  firebase.initializeApp({
    apiKey: "AIzaSyBkCxRqmYLXkznasnf-MRTROWVJcORIGcw",
    appId: "1:503391985374:web:133f3378b45a0be2",
    authDomain: "taxiapp-sinewave.firebaseapp.com",
    databaseURL: "https://taxiapp-sinewave.firebaseio.com",
    projectId: "taxiapp-sinewave",
    storageBucket: "taxiapp-sinewave.appspot.com",
    messagingSenderId: "503391985374",
  });
}
export default firebase;