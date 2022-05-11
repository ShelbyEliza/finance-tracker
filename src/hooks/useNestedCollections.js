import { useState, useEffect, useRef } from "react";
import { projectFirestore } from "../firebase/config";

/**
 * @param {array} collection
 * @param {array} _query
 * @returns documents, error
 */
export const useNestedCollections = (
  collection1,
  doc1,
  collection2,
  doc2,
  _query
) => {
  const [documents, setDocuments] = useState(null);
  const [error, setError] = useState(null);
  const query = useRef(_query).current;

  console.log(collection1, doc1, collection2);

  useEffect(() => {
    let ref = projectFirestore
      .collection(collection1)
      .doc(doc1)
      .collection(collection2)
      .doc(doc2);
    console.log(ref.doc());

    if (query) {
      ref = ref.where(...query);
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
  }, [collection1, doc1, collection2, doc2, query]);

  return { documents, error };
};
