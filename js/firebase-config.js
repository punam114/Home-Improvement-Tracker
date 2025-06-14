import { initializeApp } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/11.9.1/firebase-firestore.js";



  const firebaseConfig = {
    apiKey: "AIzaSyCqUgk70cFi_-IM6n0uhuJXpgsZ5FIv7T0",
    authDomain: "home-improvement-tracker-fb992.firebaseapp.com",
    projectId: "home-improvement-tracker-fb992",
    storageBucket: "home-improvement-tracker-fb992.firebasestorage.app",
    messagingSenderId: "85590787702",
    appId: "1:85590787702:web:41a515a6b937050c704157",
    measurementId: "G-JP9XFGBGED"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app);
  export const db = getFirestore(app); 
