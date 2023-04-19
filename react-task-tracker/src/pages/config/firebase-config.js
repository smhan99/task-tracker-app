// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCmZba-04OYpfReZWG5eGake3sT2F52II4",
  authDomain: "lighthall-projects.firebaseapp.com",
  projectId: "lighthall-projects",
  storageBucket: "lighthall-projects.appspot.com",
  messagingSenderId: "611470732429",
  appId: "1:611470732429:web:f22dadab2b2db8010246c4",
  measurementId: "G-WMBQD3TZ4V"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { 
  db,
  auth,
};