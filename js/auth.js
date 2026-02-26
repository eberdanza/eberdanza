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
  apiKey: "TU API KEY",
  authDomain: "eberdanza.firebaseapp.com",
  projectId: "eberdanza",
  appId: "TU APP ID"
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
