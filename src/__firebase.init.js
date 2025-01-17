// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD85YgwY1MSrCNDTaVVkCU24MH27HNvMN0",
  authDomain: "assignment-12-db862.firebaseapp.com",
  projectId: "assignment-12-db862",
  storageBucket: "assignment-12-db862.firebasestorage.app",
  messagingSenderId: "320668895181",
  appId: "1:320668895181:web:9219bc8b4903822dffe684"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app)