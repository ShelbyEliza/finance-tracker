import { useState } from "react";
import { useAuthContext } from "./useAuthContext";
import { auth, db } from "../firebase/config";
import { useNavigate } from "react-router-dom";

// firebase imports:
import { doc, setDoc } from "firebase/firestore";
import {
  createUserWithEmailAndPassword,
  updateProfile,
  sendEmailVerification,
} from "firebase/auth";

export const useSignup = () => {
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  // const [isCancelled, setIsCancelled] = useState(false);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    createUserWithEmailAndPassword(auth, email, password)
      .then((res) => {
        updateProfile(res.user, { displayName }).then(() => {
          let ref = doc(db, "users", res.user.uid);
          setDoc(ref, { displayName });
        });
        return res;
      })
      .then((res) => {
        setIsPending(false);
        if (auth.currentUser !== null) {
        }
        dispatch({ type: "LOGIN", payload: res.user });
      })
      .then((res) => {
        sendEmailVerification(auth.currentUser).then(() => {
          // email verification sent
          // redirect to login page until email is verified
          navigate("/login");
        });
      })
      .catch((err) => {
        setError(err.message);
      });
  };

  // clean up function
  // useEffect(() => {
  //   return () => setIsCancelled(true);
  // }, []);

  return { error, isPending, signup };
};
