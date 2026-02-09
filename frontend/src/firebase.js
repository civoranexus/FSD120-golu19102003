// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  TwitterAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup 
} from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBdm42lEZGC-ljst62Af4ZhNgKYyBF1gd8",
  authDomain: "society360-64ab7.firebaseapp.com",
  projectId: "society360-64ab7",
  storageBucket: "society360-64ab7.firebasestorage.app",
  messagingSenderId: "419263064968",
  appId: "1:419263064968:web:aecb6b3afd68da191d283d",
  measurementId: "G-DC26TLG4Y9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);

// Export auth and providers
export { 
  auth, 
  GoogleAuthProvider, 
  TwitterAuthProvider, 
  GithubAuthProvider, 
  signInWithPopup 
};

export default app;
