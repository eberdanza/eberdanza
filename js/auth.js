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
  apiKey: "AIzaSyDZU_RioqPL9BBByP58r5VaXNa8tJAwhxc",
  authDomain: "eberdanza.firebaseapp.com",
  projectId: "eberdanza",
  storageBucket: "eberdanza.firebasestorage.app",
  messagingSenderId: "509362704874",
  appId: "1:509362704874:web:e21bb25a341ac7e6c2e293",
  measurementId: "G-PTDSS0TXJV"
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
