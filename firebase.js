// Import the necessary Firebase modules
import { initializeApp } from "firebase/app";
import { getFirestore, collection, addDoc, getDocs } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAK01IkTqSen9ZiZa4jKAeoLXBmE4e5LZY",
  authDomain: "assignmentstracker-1c90a.firebaseapp.com",
  projectId: "assignmentstracker-1c90a",
  storageBucket: "assignmentstracker-1c90a.firebasestorage.app",
  messagingSenderId: "858819682268",
  appId: "1:858819682268:web:e3aa4258f8d19d5d11f919"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firestore database
const db = getFirestore(app);

// Export Firestore functions
export { db, collection, addDoc, getDocs };
