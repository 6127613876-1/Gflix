// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase, ref } from 'firebase/database'
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDXg3AKBNRYTnmwt3F6aflYGXPU4a_Thyg",
  authDomain: "cloud-ba3f6.firebaseapp.com",
  databaseURL: "https://cloud-ba3f6-default-rtdb.firebaseio.com",
  projectId: "cloud-ba3f6",
  storageBucket: "cloud-ba3f6.appspot.com",
  messagingSenderId: "436721807147",
  appId: "1:436721807147:web:d71c1408813d3bae1c9f6e",
  measurementId: "G-81SD9K2X1H"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getDatabase(app)
export const dbRef = (path) => ref(db, path)
const auth = getAuth(app)
const googleProvider  = new GoogleAuthProvider();

export { auth, googleProvider , signInWithPopup, signOut };
