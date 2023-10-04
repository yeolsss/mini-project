// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDOC3bnhB1mOptlWAOLUYVPEa9AcX5pcSo",
  authDomain: "kang-member-page.firebaseapp.com",
  projectId: "kang-member-page",
  storageBucket: "kang-member-page.appspot.com",
  messagingSenderId: "207488522988",
  appId: "1:207488522988:web:7012c12602382a0610a3c9",
  measurementId: "G-PRZ8W04EQ4"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);