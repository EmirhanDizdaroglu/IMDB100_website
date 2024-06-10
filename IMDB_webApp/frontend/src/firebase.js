import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyCsz4M7cU_iqVIkdoZRs3e920EtpAnqS4E",
  authDomain: "web-final-imdb.firebaseapp.com",
  projectId: "web-final-imdb",
  storageBucket: "web-final-imdb.appspot.com",
  messagingSenderId: "745107312460",
  appId: "1:745107312460:web:de2c6a9a433e12ca4f49e9",
  measurementId: "G-K2BHM92BS8"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider };
