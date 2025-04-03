// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics"; 

import { getAuth } from "firebase/auth"; 
import { getFirestore } from "firebase/firestore"; 

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyChx6CH--5OrdXsD4TCGkt2k7YhQwkHn6E",
  authDomain: "prepwise-90226.firebaseapp.com",
  projectId: "prepwise-90226",
  storageBucket: "prepwise-90226.firebasestorage.app",
  messagingSenderId: "352718115661",
  appId: "1:352718115661:web:d53e42beda14ca7e605d04",
  measurementId: "G-7D401FYDX0"
};

// Initialize Firebase
const app = !getApps.length ?  initializeApp(firebaseConfig) : getApp() ; 
export const auth = getAuth(app); 
export const db = getFirestore(app); 

// const analytics = getAnalytics(app); 