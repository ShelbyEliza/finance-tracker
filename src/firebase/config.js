import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBBvdFWneQ84VRlMlC3cSOCbDaizA53IoQ",
  authDomain: "financetracker-59806.firebaseapp.com",
  projectId: "financetracker-59806",
  storageBucket: "financetracker-59806.appspot.com",
  messagingSenderId: "1003013089641",
  appId: "1:1003013089641:web:55e7eb0412f8712bd635f8",
};

// init firebase
firebase.initializeApp(firebaseConfig);

// init service
const projectFirestore = firebase.firestore();
const projectAuth = firebase.auth();

// timestamp:
const timestamp = firebase.firestore.Timestamp;

export { projectFirestore, projectAuth, timestamp };
