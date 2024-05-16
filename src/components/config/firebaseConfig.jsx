import { initializeApp } from "firebase/app";
import { getFirestore } from "@firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyAus9WDcAng-YlbGyqjW0N_TrhRasaoO-8",
  authDomain: "app-firebase-jueves-jzv.firebaseapp.com",
  projectId: "app-firebase-jueves-jzv",
  storageBucket: "app-firebase-jueves-jzv.appspot.com",
  messagingSenderId: "250083699806",
  appId: "1:250083699806:web:3a3b5ed1ac3b936f2a18cf",
};
const app = initializeApp(firebaseConfig);
export const connDatabase = getFirestore(app);
