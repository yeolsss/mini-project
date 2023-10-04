// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyActEysnyuxsK5nCih4iIsSDzilp9NHTdo",
  authDomain: "mini-project-3897a.firebaseapp.com",
  projectId: "mini-project-3897a",
  storageBucket: "mini-project-3897a.appspot.com",
  messagingSenderId: "668936823609",
  appId: "1:668936823609:web:8e5f8c40e547c2a5e07ee8",
  measurementId: "G-6Y77SP3M5P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);