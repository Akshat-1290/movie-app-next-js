import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyBz_SBf93_-N6K33YNV2N4JwKeFYlMIr6M",
  authDomain: "advanced-internship-2e5fa.firebaseapp.com",
  projectId: "advanced-internship-2e5fa",
  storageBucket: "advanced-internship-2e5fa.appspot.com",
  messagingSenderId: "865463458360",
  appId: "1:865463458360:web:52217bf5c2f79b827364cd"
};


const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
