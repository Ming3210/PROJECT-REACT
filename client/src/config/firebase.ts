// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import store from "../store/store";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDpkEXvYbZyvA2HkwqMHyHMGyMqI3U-vKE",
  authDomain: "react-32712.firebaseapp.com",
  projectId: "react-32712",
  storageBucket: "react-32712.appspot.com",
  messagingSenderId: "975110847835",
  appId: "1:975110847835:web:eea8608290ab032287ae7e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);