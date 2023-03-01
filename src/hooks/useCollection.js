import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

import { useAuthContext } from "./useAuthContext";

// firebase imports:
import {
  doc,
  collection,
  query,
  where,
  onSnapshot,
  orderBy,
} from "firebase/firestore";

export const useCollection = (coll, _query, _orderBy) => {
  const { user } = useAuthContext();
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  // useRef allows a reference type variable to be used in a useEffect hook
  // won't see the variable as "different" each use, preventing the infinite loop
  const q = useRef(_query).current;
  const orderedBy = useRef(_orderBy).current;

  useEffect(() => {
    // let ref = db.collection(collection);
    // CHECK: not sure if collection is the right import
    let ref = doc(db, "users", user.uid);
    ref = collection(ref, coll);

    if (q) {
      // ref = ref.where(...query);
      ref = query(ref, where(...q));
    }
    if (orderedBy) {
      // ref = ref.orderBy(...orderBy);
      // CHECK: not sure about orderBy config for firebase v9
      ref = orderBy(ref, ...orderedBy);
    }

    // console.log(ref);
    //   const unsubscribe = ref.onSnapshot(
    //     (snapshot) => {
    //       let results = [];
    //       snapshot.docs.forEach((doc) => {
    //         results.push({ ...doc.data(), id: doc.id });
    //       });

    //       // update state
    //       setDocuments(results);
    //       setError(null);
    //     },
    //     (error) => {
    //       console.log(error);
    //       setError("Could not fetch the data.");
    //     }
    //   );

    //   // unsubscribe on unmount
    //   return () => unsubscribe();
    // }, [collection, query, orderBy]);

    const unsubscribe = onSnapshot(
      ref,
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
  }, [coll, q, orderedBy]);

  // if (documents) {
  //   console.log(documents);
  // }

  return { documents, error };
};
