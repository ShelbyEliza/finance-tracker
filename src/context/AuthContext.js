import { createContext, useEffect, useReducer } from "react";
import { projectAuth } from "../firebase/config";

import { onAuthStateChanged } from "firebase/auth";

export const AuthContext = createContext();

// mirrors what firebase already is doing
// so that we have a local state that matches firebase
export const authReducer = (state, action) => {
  switch (action.type) {
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };
    case "AUTH_IS_READY":
      return { ...state, user: action.payload, authIsReady: true };
    default:
      return state;
  }
};

export const AuthContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, {
    user: null,
    authIsReady: false,
  });

  // listens for changes on the AuthState from firebase
  // fire if there is a change
  // user is null if logout happens
  // initial run, firebase will either return a user or null
  useEffect(() => {
    const unsub = onAuthStateChanged(projectAuth, (user) => {
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
