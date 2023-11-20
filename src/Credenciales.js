// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAi68yivlXc7l4p5x3QMqNWfdRApz1-Isg",
  authDomain: "proyecto-final-react-76ba0.firebaseapp.com",
  projectId: "proyecto-final-react-76ba0",
  storageBucket: "proyecto-final-react-76ba0.appspot.com",
  messagingSenderId: "397983172771",
  appId: "1:397983172771:web:c719d3f0813274f2885716"
};

// Initialize Firebase
const appfirebase = initializeApp(firebaseConfig);
export default appfirebase;