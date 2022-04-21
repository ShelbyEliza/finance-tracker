import { useReducer, useEffect, useState } from "react";
import { projectFirestore, timestamp } from "../firebase/config";
import firebase from "firebase/app";

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

export const useFirestore = (collection) => {
  const [response, dispatch] = useReducer(firestoreReducer, initialState);
  const [isCancelled, setIsCancelled] = useState(false);

  // collection ref
  const ref = projectFirestore.collection(collection);

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
      const createdAt = timestamp.fromDate(new Date());
      // add function returns a document reference
      const addedDocument = await ref.add({ ...doc, createdAt });
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
      const lastEditedAt = timestamp.fromDate(new Date());
      const newSetDocument = await ref
        .doc(docName)
        .set({ ...doc, lastEditedAt }, { merge: true });
      dispatchIfNotCancelled({
        type: "SET_DOCUMENT",
        payload: newSetDocument,
      });
    } catch (err) {
      dispatchIfNotCancelled({ type: "ERROR", payload: err.message });
    }
  };

  const editDocument = async (docName, type, data) => {
    dispatch({ type: "IS_PENDING" });
    let editedDocument;
    console.log(docName, type, data);

    try {
      const lastEditedAt = timestamp.fromDate(new Date());

      if (type === "income") {
        console.log("Income to add.");
        editedDocument = await ref.doc(docName).update({
          plus: firebase.firestore.FieldValue.arrayUnion(data),
        });
      }
      if (type === "expense") {
        console.log("Expense to add.");
        editedDocument = await ref.doc(docName).update({
          minus: firebase.firestore.FieldValue.arrayUnion(data),
        });
      } else {
        dispatchIfNotCancelled({
          type: "ERROR",
          payload: "No type selected. Couldn't add transaction to budget.",
        });
      }
      // .update({ ...data, lastEditedAt });

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
      await ref.doc(id).delete();
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
