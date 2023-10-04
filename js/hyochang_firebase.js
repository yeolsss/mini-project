// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-analytics.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCDoIsoQs_4OxWK_Cg_UubTWvC1zelxKBw",
  authDomain: "mini-project-a57c8.firebaseapp.com",
  projectId: "mini-project-a57c8",
  storageBucket: "mini-project-a57c8.appspot.com",
  messagingSenderId: "412025138302",
  appId: "1:412025138302:web:3cf9822f2b58f00477bc2f",
  measurementId: "G-EC4Q446X6P"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);