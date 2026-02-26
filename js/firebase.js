import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getDatabase } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-database.js";

const firebaseConfig = {

  apiKey: "AIzaSyBnTiuQc5hGG9W32f2e4PJus8z546_LM7c",
  authDomain: "eberdanzaok.firebaseapp.com",
  databaseURL:"https://eberdanzaok-default-rtdb.firebaseio.com",
  projectId: "eberdanzaok",
  storageBucket:"eberdanzaok.firebasestorage.app",
  messagingSenderId: "33650472381",
  appId:"1:33650472381:web:1eb11f30434270a26d0ed4"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);
export { db };