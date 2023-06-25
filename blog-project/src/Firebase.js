// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA9DABSuzsxrNZ3Lhcrdzac8QzjO6hcEKs",
  authDomain: "blog-project-c238f.firebaseapp.com",
  projectId: "blog-project-c238f",
  storageBucket: "blog-project-c238f.appspot.com",
  messagingSenderId: "923206238443",
  appId: "1:923206238443:web:f13d07e1b12f11c4b27eae",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
export const postzCollection = collection(db, "posts");
