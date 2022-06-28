// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getStorage } from "firebase/storage"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDcKkFda2jYBZhG334jCBxRSwJaEYGn_1s",
  authDomain: "insta-clone-e3734.firebaseapp.com",
  projectId: "insta-clone-e3734",
  storageBucket: "insta-clone-e3734.appspot.com",
  messagingSenderId: "471085799181",
  appId: "1:471085799181:web:b93f312c3ff722b9718244",
  measurementId: "G-7QB9HR5C61"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const storage = getStorage();

export {app, db, storage };