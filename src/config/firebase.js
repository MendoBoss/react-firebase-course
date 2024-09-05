import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from'firebase/firestore';
import { getStorage } from "firebase/storage";
// import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyBsOkuFPVzvAR9Vxk7DT4de7sOohlEY6Ps",
  authDomain: "fir-course-bfa36.firebaseapp.com",
  projectId: "fir-course-bfa36",
  storageBucket: "fir-course-bfa36.appspot.com",
  messagingSenderId: "837788887434",
  appId: "1:837788887434:web:3071e2f5e58b816f860073",
  measurementId: "G-DWC2S1FJW8"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
// const analytics = getAnalytics(app);