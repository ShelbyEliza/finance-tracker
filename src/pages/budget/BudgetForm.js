import { useState, useEffect } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./ManageBudget.module.css";

export default function BudgetForm({ selectedBudget, toggleEditMode, month }) {
  const { user } = useAuthContext();
  const { editDocument, setDocument, response } =
    useFirestore("budget_2022_test");

  const [budget, setBudget] = useState({
    uid: user.uid,
    month: month,
    income: 0,
    expenses: 0,
  });
  const docName = month + "-" + user.uid;
  // const [transactionList, setTransactionList] = useState(null)

  useEffect(() => {
    if (selectedBudget) {
      setBudget({
        uid: user.uid,
        month: month,
        income: selectedBudget.income,
        expenses: selectedBudget.expenses,
      });
    }
  }, [selectedBudget, month, user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const docData = {
      uid: budget.uid,
      month,
      income: budget.income,
      expenses: budget.expenses,
    };

    if (selectedBudget) {
      editDocument(docName, docData);
    } else {
      setDocument(docName, docData);
    }
  };

  useEffect(() => {
    if (response.success) {
      toggleEditMode(false);

      console.log("You've successfully added budget info.");
    }
  }, [response.success, selectedBudget, toggleEditMode]);

  return (
    <>
      <h3>Edit Your Budget</h3>
      <form onSubmit={handleSubmit} className={styles.budget}>
        <label className={styles.income}>Income:</label>
        <input
          type="number"
          required
          onChange={(e) => setBudget({ ...budget, income: e.target.value })}
          value={budget.income}
        />

        <label className={styles.expenses}>Expenses:</label>
        <input
          type="number"
          required
          onChange={(e) => setBudget({ ...budget, expenses: e.target.value })}
          value={budget.expenses}
        />

        <button className="btn">Add Budget</button>
      </form>
    </>
  );
}
