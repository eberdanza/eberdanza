import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyBnTiuQc5hGG9W32f2e4PJus8z546_LM7c",
  authDomain: "eberdanzaok.firebaseapp.com",
  databaseURL: "https://eberdanzaok-default-rtdb.firebaseio.com",
  projectId: "eberdanzaok",
  storageBucket: "eberdanzaok.firebasestorage.app",
  messagingSenderId: "33650472381",
  appId: "1:33650472381:web:fd1c4a6b41b00c556d0ed4",
  measurementId: "G-KRETZNFT5M"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

const googleProvider = new GoogleAuthProvider();


// REGISTRO
export function register(email, password) {
  return createUserWithEmailAndPassword(auth, email, password);
}

// LOGIN EMAIL
export function login(email, password) {
  return signInWithEmailAndPassword(auth, email, password);
}

// LOGIN GOOGLE
export function loginGoogle() {
  return signInWithPopup(auth, googleProvider);
}

// LOGOUT
export function logout() {
  return signOut(auth);
}

// OBSERVER
export function observeAuth(callback) {
  return onAuthStateChanged(auth, callback);
}
