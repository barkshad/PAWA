import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// Config provided by user
const firebaseConfig = {
  apiKey: "AIzaSyD4bqqwOpMAdFzIUkrwwAn1SNCQSIVhBJw",
  authDomain: "survey-879cd.firebaseapp.com",
  projectId: "survey-879cd",
  storageBucket: "survey-879cd.firebasestorage.app",
  messagingSenderId: "337941720832",
  appId: "1:337941720832:web:336526afc9d19d69bf0de5",
  measurementId: "G-BY2CC7D4H8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
