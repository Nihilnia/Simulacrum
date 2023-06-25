// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDIxgx1ho_cQI7wBGk6y3RSEZhsWAPJqTE",
  authDomain: "spotifyv2-da1d0.firebaseapp.com",
  projectId: "spotifyv2-da1d0",
  storageBucket: "spotifyv2-da1d0.appspot.com",
  messagingSenderId: "1050444576970",
  appId: "1:1050444576970:web:3b91c4c6ae69a22b6d1c33",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
