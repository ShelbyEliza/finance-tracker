import { useState, useEffect, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./ManageBudget.module.css";

export default function BudgetForm({ selectedBudget, toggleEditMode, month }) {
  const budgetRef = useRef(selectedBudget).current;
  const [income, setIncome] = useState(selectedBudget.income);
  const [expenses, setExpenses] = useState(selectedBudget.expenses);
  const { editDocument, response } = useFirestore("budget_2022_test");
  const uid = selectedBudget.uid;

  const handleSubmit = (e) => {
    e.preventDefault();

    if (budgetRef.income !== income || budgetRef.expenses !== expenses) {
      editDocument(month, {
        uid,
        month,
        income,
        expenses,
      });
    } else {
      console.log("hey");
      toggleEditMode(false);
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
          onChange={(e) => setIncome(e.target.value)}
          value={income}
        />

        <label className={styles.expenses}>Expenses:</label>
        <input
          type="number"
          required
          onChange={(e) => setExpenses(e.target.value)}
          value={expenses}
        />

        <button className="btn">Add Budget</button>
      </form>
    </>
  );
}
