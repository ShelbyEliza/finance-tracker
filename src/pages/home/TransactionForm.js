import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import styles from "./Home.module.css";

export default function TransactionForm({ uid }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  // transaction = collection. generated if not already
  const { addDocument, response } = useFirestore("transactions");

  const handleSubmit = (e) => {
    e.preventDefault();

    addDocument({
      uid,
      name,
      amount,
      type,
    });
  };

  // reset form after successfully adding transaction
  useEffect(() => {
    if (response.success) {
      setName("");
      setAmount("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Transaction Name:</span>
          <input
            type="text"
            required
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
        </label>
        <label>
          <span>Amount ($):</span>
          <input
            type="number"
            required
            onChange={(e) => setAmount(e.target.value)}
            value={amount}
          />
        </label>
        <label className={styles["type-label"]}>Type:</label>
        <div className={styles.type}>
          <>
            <input
              type="radio"
              required
              name="type"
              id="type"
              onChange={(e) => setType(e.target.value)}
              value="Expense"
            />
            <label htmlFor="type">Expense</label>
          </>

          <>
            <input
              type="radio"
              required
              name="type"
              id="type"
              onChange={(e) => setType(e.target.value)}
              value="Income"
            />
            <label htmlFor="type">Income</label>
          </>
        </div>
        <button className={styles["add-btn"]}>Add Transaction</button>
      </form>
    </>
  );
}
