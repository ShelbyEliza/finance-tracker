import { createContext, useEffect, useReducer } from "react";
import { auth } from "../firebase/config";

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// mirrors what firebase already is doing
// so that we have a local state that matches firebase
export const authReducer = (state, action) => {
  const checkIfVerified = (user) => {
    let isUserVerified = false;
    if (user !== null) {
      if (user.emailVerified) {
        isUserVerified = true;
      } else {
        isUserVerified = false;
      }
    } else {
      isUserVerified = false;
    }
    return isUserVerified;
  };

  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        user: action.payload,
        isUserVerified: checkIfVerified(action.payload),
      };
    case "LOGOUT":
      return { ...state, user: null, isUserVerified: false };
    case "AUTH_IS_READY":
      return {
        ...state,
        user: action.payload,
        authIsReady: true,
        isUserVerified: checkIfVerified(action.payload),
      };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
    isUserVerified: false,
  });

  // listens for changes on the AuthState from firebase
  // fire if there is a change
  // user is null if logout happens
  // initial run, firebase will either return a user or null
  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (user) => {
      dispatch({ type: "AUTH_IS_READY", payload: user });
      unsub();
    });
  }, []);

  return (
    <AuthContext.Provider value={{ ...state, dispatch }}>
      {children}
    </AuthContext.Provider>
  );
};
