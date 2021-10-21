import firebase from "firebase";
import "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_KEY_DEMO,
  authDomain: process.env.REACT_APP_FIREBASE_DOMAIN_DEMO,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID_DEMO,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET_DEMO,
  messagingSenderId: process.env.REACT_APP_FIREBASE_SENDER_ID_DEMO,
  appId: process.env.REACT_APP_FIREBASE_APP_ID_DEMO,
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();
export const auth = firebase.auth();
export default db;
