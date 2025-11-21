import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getFunctions } from 'firebase/functions';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLDMlO7bGDByw29NMjvXkP-k4ASs3kX_Q",
  authDomain: "carolinesnails-216b3.firebaseapp.com",
  projectId: "carolinesnails-216b3",
  storageBucket: "carolinesnails-216b3.firebasestorage.app",
  messagingSenderId: "711679270374",
  appId: "1:711679270374:web:56fe2ea2829febff94ca27",
  measurementId: "G-P907F1TMFN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const functions = getFunctions(app);
export default app;
