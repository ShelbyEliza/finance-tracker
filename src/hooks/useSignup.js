import { useState, useEffect } from "react";
import { projectAuth } from "../firebase/config";
// ADD VERIFICATION:
// import { projectAuth, projectFirestore } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";
// import { useNavigate } from "react-router-dom";

// firebase imports:
import {
  createUserWithEmailAndPassword,
  updateProfile,
  // sendEmailVerification,
} from "firebase/auth";
// ADD VERIFICATION:
// import { doc, setDoc } from "firebase/firestore";

export const useSignup = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();
  // const navigate = useNavigate();

  const signup = async (email, password, displayName) => {
    setError(null);
    setIsPending(true);

    try {
      // signup user
      const res = await createUserWithEmailAndPassword(
        projectAuth,
        email,
        password
      );

      if (!res) {
        throw new Error("Could not complete signup.");
      }

      // add display name to user
      // accepted ({ displayName })
      await updateProfile(res.user, { displayName: displayName });

      // dispatch login action (locally, firebase does so automatically):
      dispatch({ type: "LOGIN", payload: res.user });

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
    /////  ADD VERIFICATION:

    // setError(null);
    // setIsPending(true);

    // createUserWithEmailAndPassword(projectAuth, email, password)
    //   .then((res) => {
    //     updateProfile(res.user, { displayName }).then(() => {
    //       let ref = doc(projectFirestore, "users", res.user.uid);
    //       setDoc(ref, { displayName });
    //     });
    //     return res;
    //   })
    //   .then((res) => {
    //     setIsPending(false);
    //     if (projectAuth.currentUser !== null) {
    //     }
    //     dispatch({ type: "LOGIN", payload: res.user });
    //   })
    //   .then((res) => {
    //     sendEmailVerification(projectAuth.currentUser).then(() => {
    //       // email verification sent
    //       // redirect to login page until email is verified
    //       navigate("/login");
    //     });
    //   })
    //   .catch((err) => {
    //     setError(err.message);
    //   });
  };

  // clean up function
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { error, isPending, signup };
};
