// src/firebase.js
import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Use existing app if already initialized
const firebaseConfig = {
  apiKey: "AIzaSyA4CCi7k5S2DmysE1s453v8r_U14dkXioM",
  authDomain: "itinerary-app-926c9.firebaseapp.com",
  projectId: "itinerary-app-926c9",
  storageBucket: "itinerary-app-926c9.appspot.com",
  messagingSenderId: "576261592025",
  appId: "1:576261592025:web:b2f8909765622a7e7dffc8",
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);
const db = getFirestore(app);

export { auth, db };
