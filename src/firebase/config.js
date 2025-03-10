// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyAGz1GzMzoCKWyfle9hEDidmyT5lJj-ll0",
  authDomain: "graphical-password-ea1ba.firebaseapp.com",
  projectId: "graphical-password-ea1ba",
  storageBucket: "graphical-password-ea1ba.appspot.com",
  messagingSenderId: "1055099433642",
  appId: "1:1055099433642:web:1ba87f8b52ac32c01c16d3",
  measurementId: "G-VB3YD9Y0MY"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

export {app,auth};