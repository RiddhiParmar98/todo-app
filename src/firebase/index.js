// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA51caErAGk5c6X7NZNyrjI-ffQA4zXvAo",
  authDomain: "to-do-app-be5b4.firebaseapp.com",
  projectId: "to-do-app-be5b4",
  storageBucket: "to-do-app-be5b4.appspot.com",
  messagingSenderId: "647115062882",
  appId: "1:647115062882:web:80a91d9bbb027ca843db3b",
  measurementId: "G-9M0MF24Q9X",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export const db = getFirestore(app);
