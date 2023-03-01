import { useState, useEffect, useRef } from "react";
import { db } from "../firebase/config";

// firebase imports:
import {
  orderBy,
  collection,
  query,
  where,
  onSnapshot,
} from "firebase/firestore";

export const useCollections = (coll, _query, _orderBy) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);

  const q = useRef(_query).current;
  const orderedBy = useRef(_orderBy).current;

  useEffect(() => {
    // let ref = db.collection(coll);
    // CHECK: not sure if collection is the right import
    let ref = collection(db, coll);

    if (q) {
      // ref = ref.where(...q);
      ref = query(ref, where(...q));
    }
    if (orderedBy) {
      // ref = ref.orderBy(...orderedBy);
      // CHECK: not sure about orderBy config for firebase v9
      ref = orderBy(ref, ...orderedBy);
    }

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

  if (documents) {
    console.log(documents);
  }

  return { documents, error };
};
