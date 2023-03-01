import { useReducer, useEffect, useState } from "react";
import { projectFirestore } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";
// firebase imports:
import {
  collection,
  doc,
  addDoc,
  setDoc,
  deleteDoc,
  updateDoc,
  Timestamp,
} from "firebase/firestore";

// defined outside function because they only need to be built once:
let initialState = {
  isPending: false,
  document: null,
  error: null,
  success: null,
};

const firestoreReducer = (state, action) => {
  switch (action.type) {
    case "IS_PENDING":
      return { isPending: true, document: null, error: null, success: false };
    case "ADDED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "SET_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    case "DELETED_DOCUMENT":
      return {
        isPending: false,
        document: null,
        error: null,
        success: true,
      };
    case "ERROR":
      return {
        isPending: false,
        document: null,
        success: false,
        error: action.payload,
      };
    case "EDITED_DOCUMENT":
      return {
        isPending: false,
        document: action.payload,
        success: true,
        error: null,
      };
    default:
      return state;
  }
};

export const useFirestore = (coll) => {
  const { user } = useAuthContext();
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  let ref = doc(projectFirestore, "users", user.uid);
  ref = collection(ref, coll);
  // const ref = collection(projectFirestore, coll);

  // only dispatch if not cancelled:
  const dispatchIfNotCancelled = (action) => {
    if (!isCancelled) {
      dispatch(action);
    }
  };

  // add new document:
  const addDocument = async (doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const createdAt = Timestamp.now();
      // add function returns a document reference
      const addedDocument = await addDoc(ref, { ...doc, createdAt });
      dispatchIfNotCancelled({
        type: "ADDED_DOCUMENT",
        payload: addedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };
  // set new document:
  const setDocument = async (docName, doc) => {
    dispatch({ type: "IS_PENDING" });

    try {
      const lastEditedAt = Timestamp.now();
      const newSetDocument = await setDoc(
        doc(ref, docName),
        { ...doc, lastEditedAt },
        { merge: true }
      );
      dispatchIfNotCancelled({
        type: "SET_DOCUMENT",
        payload: newSetDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const editDocument = async (docName, data) => {
    dispatch({ type: "IS_PENDING" });
    console.log(docName, data);

    try {
      // const lastEditedAt = timestamp.fromDate(new Date());
      const editedDocument = await updateDoc(doc(ref, docName), {
        transactions: data,
      });

      dispatchIfNotCancelled({
        type: "EDITED_DOCUMENT",
        payload: editedDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  // delete a document:
  const deleteDocument = async (id) => {
    dispatch({ type: "IS_PENDING" });

    try {
      // CHECK: Not sure about DeleteDoc config
      await deleteDoc(doc(ref, id));
      dispatchIfNotCancelled({ type: "DELETED_DOCUMENT" });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: "Could not delete." });
    }
  };

  useEffect(() => {
    return () => setIsCancelled(true);
  }, []);

  return { addDocument, setDocument, deleteDocument, editDocument, response };
};
