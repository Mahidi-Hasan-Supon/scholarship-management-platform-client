// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzpn81tp5AZ1wbIxbBdu0DyWXn2XcVSto",
  authDomain: "student-scholarship-63d16.firebaseapp.com",
  projectId: "student-scholarship-63d16",
  storageBucket: "student-scholarship-63d16.firebasestorage.app",
  messagingSenderId: "589513585140",
  
  appId: "1:589513585140:web:b3d21427a832ca5a5a89a1"

};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);