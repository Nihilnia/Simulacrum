// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyALvV6VlYTwhOFGbgpAnhSJ4-14wIlHXQQ",
  authDomain: "todo-app-77539.firebaseapp.com",
  projectId: "todo-app-77539",
  storageBucket: "todo-app-77539.appspot.com",
  messagingSenderId: "67065755225",
  appId: "1:67065755225:web:dc277672df9dc033b32348",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
