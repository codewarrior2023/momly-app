import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyANDD3PdS5vqXweE_zjMefO2SJIYj_gCek",
  authDomain: "project-06-f62cd.firebaseapp.com",
  projectId: "project-06-f62cd",
  storageBucket: "project-06-f62cd.appspot.com",
  messagingSenderId: "861743544209",
  appId: "1:861743544209:web:7ac29efa81af7a6a870c30"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);