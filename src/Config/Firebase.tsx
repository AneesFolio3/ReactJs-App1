// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getAuth, GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBxV5UGxjBe96biqkcV7vxsEBqRh8MAMdk",
  authDomain: "react-course-42e5e.firebaseapp.com",
  projectId: "react-course-42e5e",
  storageBucket: "react-course-42e5e.appspot.com",
  messagingSenderId: "265595781574",
  appId: "1:265595781574:web:145e53ba349b656e7db2c7",
  measurementId: "G-9CXRZHPKBS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const provider = new GoogleAuthProvider()
export const db = getFirestore(app)
const analytics = getAnalytics(app);