
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import { getAuth, GoogleAuthProvider } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-firestore.js";


const firebaseConfig = {
  apiKey: "AIzaSyDmB2w4sqGgIZD10V21IiPEkWlexMgsXhU",
  authDomain: "sistema-academico-61c9d.firebaseapp.com",
  projectId: "sistema-academico-61c9d",
  storageBucket: "sistema-academico-61c9d.firebasestorage.app",
  messagingSenderId: "498636317407",
  appId: "1:498636317407:web:4a147a590608aa515f3f6a"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();
