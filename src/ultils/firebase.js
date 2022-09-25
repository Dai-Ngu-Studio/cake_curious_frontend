import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

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
const auth = getAuth(app);

export { app, auth };
