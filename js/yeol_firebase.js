// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAu2oDqpOTOvhQEUhwPselV48jrhwrJ2QY",
  authDomain: "team-member-bbfce.firebaseapp.com",
  projectId: "team-member-bbfce",
  storageBucket: "team-member-bbfce.appspot.com",
  messagingSenderId: "860279786151",
  appId: "1:860279786151:web:89e526a1c81feaf378a982",
  measurementId: "G-RBE3VJ6RKR",
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
