import "./Home.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";

const monthList = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

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
    <div className="container">
      <div className="content">
        {error && <p>{error}</p>}
        {documents && <TransactionList transactions={documents} />}
      </div>

      <div className="sidebar">
        <TransactionForm uid={user.uid} monthList={monthList} />
      </div>
    </div>
  );
}
