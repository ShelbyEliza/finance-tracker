//styles:
import styles from "./Home.module.css";

import { useState, useEffect } from "react";
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
  const { documents, error } = useCollection("transactions", [
    "uid",
    "==",
    user.uid,
  ]);

  const [openMonth, setOpenMonth] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [selectedIncome, setSelectedIncome] = useState(null);
  const [selectedExpense, setSelectedExpense] = useState(null);

  useEffect(() => {
    if (openMonth) {
      let incomeTrans = [];
      let expenseTrans = [];

      let selectedTrans = documents.filter((doc) => {
        let result;
        if (doc.month === openMonth) {
          result = doc;
          if (doc.type === "income") {
            incomeTrans.push(doc);
          } else if (doc.type === "expense") {
            expenseTrans.push(doc);
          }
        }
        return result;
      });

      setSelectedBudget(selectedTrans);
      setSelectedIncome(incomeTrans);
      setSelectedExpense(expenseTrans);
    }
  }, [openMonth, documents]);

  if (selectedBudget) {
    console.log(selectedBudget);
  }

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>2023</h3>
        <ul>
          {monthList.map((month) => (
            <li key={month} onClick={() => setOpenMonth(month)}>
              {month}
            </li>
          ))}
        </ul>
      </div>
      <div className={styles.content}>
        <h3 className={styles.title}>{openMonth} Budget</h3>
        {error && <p>{error}</p>}
        {openMonth && (
          <div className={styles["budget-box"]}>
            <TransactionList
              selectedBudget={selectedBudget}
              openMonth={openMonth}
              selectedIncome={selectedIncome}
              selectedExpense={selectedExpense}
            />
          </div>
        )}
      </div>
      <div className={styles.right}>
        <TransactionForm uid={user.uid} monthList={monthList} />
      </div>
    </div>
  );
}
