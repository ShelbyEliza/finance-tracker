import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { initializeAppCheck, ReCaptchaV3Provider } from "firebase/app-check";

const firebaseConfig = {
  apiKey: "AIzaSyBBvdFWneQ84VRlMlC3cSOCbDaizA53IoQ",
  authDomain: "financetracker-59806.firebaseapp.com",
  projectId: "financetracker-59806",
  storageBucket: "financetracker-59806.appspot.com",
  messagingSenderId: "1003013089641",
  appId: "1:1003013089641:web:55e7eb0412f8712bd635f8",
  siteKey: "6LfJCMUkAAAAAL8k75c8vVgUDze4if0S5-YZDs7l",
};

// init firebase
initializeApp(firebaseConfig);

// Initialize Firebase
const app = initializeApp(firebaseConfig);
initializeAppCheck(app, {
  provider: new ReCaptchaV3Provider(firebaseConfig.siteKey),

  // Optional argument. If true, the SDK automatically refreshes App Check
  // tokens as needed.
  isTokenAutoRefreshEnabled: true,
});

// init service
const db = getFirestore();
const auth = getAuth();

export { db, auth };
