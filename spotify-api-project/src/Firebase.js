// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDEoyJJa_SpTdMG83bOGton-8JYBOiL8z0",
  authDomain: "spotifyapiproject-c3a9c.firebaseapp.com",
  projectId: "spotifyapiproject-c3a9c",
  storageBucket: "spotifyapiproject-c3a9c.appspot.com",
  messagingSenderId: "376315242849",
  appId: "1:376315242849:web:372bb09761db7afc6c3d20",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
export const followingArtistzCollection = collection(db, "followingArtistz");
