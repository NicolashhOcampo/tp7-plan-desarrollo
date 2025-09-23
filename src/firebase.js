// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyAvfYgzFXKH9z7NQkz73IDGr47khvmOPxg",
    authDomain: "prueba-90cd0.firebaseapp.com",
    projectId: "prueba-90cd0",
    storageBucket: "prueba-90cd0.firebasestorage.app",
    messagingSenderId: "579945849992",
    appId: "1:579945849992:web:ff1991532ce1ddd2afab3d",
    measurementId: "G-HRC1H7YPQC"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);