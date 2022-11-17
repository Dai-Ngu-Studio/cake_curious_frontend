import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyA6r8q4sabqUqLBKxt1Oq8cRfWaLJwq3ko",
  authDomain: "cake-curious.firebaseapp.com",
  projectId: "cake-curious",
  storageBucket: "cake-curious.appspot.com",
  messagingSenderId: "828650455071",
  appId: "1:828650455071:web:b5e41f0bff83958197152a",
  measurementId: "G-BPE6M05WDW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
auth.languageCode = "it";
const storage = getStorage();
const db = getFirestore(app);

export { app, auth, storage, db };
