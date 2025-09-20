// Import the functions you need from the SDKs you need
import { initializeApp, getApps, getApp, FirebaseApp } from "firebase/app";
import { getAuth, Auth } from "firebase/auth";
import { getFirestore, Firestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC8aU7ciWBkEsERxqNhPpuBkY_Mrjd0TmA",
  authDomain: "satya-hackathon-project.firebaseapp.com",
  projectId: "satya-hackathon-project",
  storageBucket: "satya-hackathon-project.appspot.com",
  messagingSenderId: "654171032154",
  appId: "1:654171032154:web:067fcdb097ab0bd48c6663",
  measurementId: "G-T025S720LG"
};

// Initialize Firebase app using singleton pattern to prevent re-initialization on hot reloads
const app: FirebaseApp = !getApps().length ? initializeApp(firebaseConfig) : getApp();

// Initialize Firebase Authentication service
const auth: Auth = getAuth(app);

// Initialize Firestore service
const db: Firestore = getFirestore(app);

// Export the initialized services for use throughout the application
export { app, auth, db };