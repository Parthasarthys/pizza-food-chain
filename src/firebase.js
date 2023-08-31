// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBByYd3WCFMKpablw7XJB2w0_pvNcLLPCM",
  authDomain: "pizza-food-chain.firebaseapp.com",
  projectId: "pizza-food-chain",
  storageBucket: "pizza-food-chain.appspot.com",
  messagingSenderId: "293336717144",
  appId: "1:293336717144:web:d7dd413a3f1731dab9372d"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export default app;