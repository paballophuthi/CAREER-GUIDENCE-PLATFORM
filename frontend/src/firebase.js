// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDw4oJc6Qckr8a4YJchfeiWwenx-H37vZY",
  authDomain: "careerguidanceplatform-cc422.firebaseapp.com",
  projectId: "careerguidanceplatform-cc422",
  storageBucket: "careerguidanceplatform-cc422.firebasestorage.app",
  messagingSenderId: "607032471015",
  appId: "1:607032471015:web:11da8df7734f19b2a0a142",
  measurementId: "G-C0Z0R97BPD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;
