import { initializeApp } from "firebase/app";
import { getFirestore, collection } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyD2a8voRwpl3HMN6zpLGbpw0hSTF4UUe5o",
  authDomain: "may23-c1bea.firebaseapp.com",
  projectId: "may23-c1bea",
  storageBucket: "may23-c1bea.appspot.com",
  messagingSenderId: "633641348380",
  appId: "1:633641348380:web:60b41213c7e2ee423fded9",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const userzCollection = collection(db, "userz");
