import { useState, useEffect } from "react";
import { auth } from "../firebase/config";
import { useAuthContext } from "./useAuthContext";
import { signOut } from "firebase/auth";

export const useLogout = () => {
  const [isCancelled, setIsCancelled] = useState(false);
  const [error, setError] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const { dispatch } = useAuthContext();

  // you don't necessarily want to logout the user when this hook is called
  // so here is a function to call:

  const logout = async () => {
    setError(null);
    setIsPending(true);

    // sign user out:
    try {
      await signOut(auth);

      // dispatch logout action:
      // don't need second argument because user becomes null
      dispatch({ type: "LOGOUT" });

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

  // clean up function, in case a user navigates away from the page before hook is finished
  // fires once initially - returns cleanup function - doesn't run it unless unmounted
  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { logout, error, isPending };
};
