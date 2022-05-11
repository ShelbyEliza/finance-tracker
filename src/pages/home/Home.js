import "./Home.css";
import TransactionForm from "./TransactionForm";
import TransactionList from "./TransactionList";
import { useAuthContext } from "../../hooks/useAuthContext";
// import { useCollection } from "../../hooks/useCollection";

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
  // const { documents, error } = useCollection("2022_budgets", [
  //   "uid",
  //   "==",
  //   user.uid,
  // ]);

  return (
    <div className="container">
      <div className="content">
        {/* {error && <p>{error}</p>}
        {documents && } */}
        <TransactionList user={user} />
      </div>

      <div className="sidebar">
        <TransactionForm uid={user.uid} monthList={monthList} />
      </div>
    </div>
  );
}
