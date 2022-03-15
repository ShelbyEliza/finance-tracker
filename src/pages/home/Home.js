import styles from "./Home.module.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

export default function Home() {
  const { user } = useAuthContext();
  // second argument is actually three arguments
  // to be spread out in the useCollection hook
  // since it's an array, must use useCallback or useRef
  const { documents, error } = useCollection(
    "transactions",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>

      <div className={styles.sidebar}>
        <TransactionForm uid={user.uid} />
      </div>
    </div>
  );
}
