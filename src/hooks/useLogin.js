import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";

// firebase imports:
// ADD VERIFICATION:
import {
  signInWithEmailAndPassword,
  // sendEmailVerification,
} from "firebase/auth";

export const useLogin = (email, password) => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const login = async (email, password) => {
    setError(null);
    setIsPending(true);

    try {
      // returns a response obj with a user property
      const res = await signInWithEmailAndPassword(auth, email, password);

      dispatch({ type: "LOGIN", payload: res.user });

      // update state:
      if (!isCancelled) {
        setIsPending(false);
        setError(null);
      }
    } catch (err) {
      if (!isCancelled) {
        console.log(err.message);
        setError(err.message);
        setIsPending(false);
      }
    }
  };
  // ADD VERIFICATION:
  // const sendVerificationEmail = () => {
  //   sendEmailVerification(auth.currentUser).then(() => {
  //     // email verification sent
  //     // redirect to temp page until email is verified
  //     return "Message sent! Please check your email to verify your account!";
  //   });
  // };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { login, error, isPending };
  // ADD VERIFICATION:
  // return { login, sendVerificationEmail, error, isPending };
};
