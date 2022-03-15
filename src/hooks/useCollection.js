import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

export const useCollection = (collection, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // useRef allows a reference type variable to be used in a useEffect hook
  // won't see the variable as "different" each use, preventing the infinite loop
  const query = useRef(_query).current;
  const orderBy = useRef(_orderBy).current;

  // using a useEffect because this should run as soon as this hook is called
  useEffect(() => {
    let ref = projectFirestore.collection(collection);

    if (query) {
      // ref = ref.where( "uid", "==", user.uid)
      // user.uid is a string
      ref = ref.where(...query);
    }
    // orderBy() is a function itself
    // takes a property string and a second string either desc or asc
    if (orderBy) {
      ref = ref.orderBy(...orderBy);
    }

    const unsubscribe = ref.onSnapshot(
      (snapshot) => {
        let results = [];
        snapshot.docs.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });

        // update state
        setDocuments(results);
        setError(null);
      },
      (error) => {
        console.log(error);
        setError("Could not fetch the data.");
      }
    );

    // unsubscribe on unmount
    return () => unsubscribe();
  }, [collection, query, orderBy]);

  return { documents, error };
};
