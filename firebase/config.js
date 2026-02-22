// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDZU_RioqPL9BBByP58r5VaXNa8tJAwhxc",
  authDomain: "eberdanza.firebaseapp.com",
  projectId: "eberdanza",
  storageBucket: "eberdanza.firebasestorage.app",
  messagingSenderId: "509362704874",
  appId: "1:509362704874:web:e21bb25a341ac7e6c2e293",
  measurementId: "G-PTDSS0TXJV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
