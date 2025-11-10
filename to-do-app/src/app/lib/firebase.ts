// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDU2zMwV_pmHJn_3ehXINZqMhJ4PrijZw8",
  authDomain: "next-js-to-do-app.firebaseapp.com",
  projectId: "next-js-to-do-app",
  storageBucket: "next-js-to-do-app.firebasestorage.app",
  messagingSenderId: "627956377423",
  appId: "1:627956377423:web:e30d54a6f154f72113473a",
  measurementId: "G-FNPV3WYTP6"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
