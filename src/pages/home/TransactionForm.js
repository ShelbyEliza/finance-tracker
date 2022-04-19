import { useState, useEffect, useRef } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import "./Home.css";

export default function TransactionForm({ uid, monthList }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const formRef = useRef(null);
  // transaction = collection. generated if not already
  const { addDocument, response } = useFirestore("transactions");

  console.log(name, amount, type, month);
  const handleSubmit = (e) => {
    e.preventDefault();
    addDocument({
      uid,
      name,
      amount,
      type,
      month,
    });
  };

  // reset form after successfully adding transaction
  console.log(response.success);
  useEffect(() => {
    if (response.success) {
      formRef.current.reset();
      setName("");
      setAmount("");
      setType("");
      setMonth("");
    }
  }, [response.success]);

  return (
    <>
      <h3>Add a Transaction</h3>
      <form onSubmit={handleSubmit} ref={formRef}>
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
        <label className="type-label">Type:</label>

        <div className="type">
          <>
            <input
              name="type"
              type="radio"
              id={type}
              onChange={(e) => setType(e.target.value)}
              value="expense"
              required
            />
            <label htmlFor="expense">Expense</label>
          </>

          <>
            <input
              name="type"
              type="radio"
              id={type}
              onChange={(e) => {
                console.log(e.target.value);
                setType(e.target.value);
              }}
              value="income"
              required
            />
            <label htmlFor="income">Income</label>
          </>
        </div>
        <div className="month">
          <label>
            <span>Month:</span>
            <select
              required
              name="month"
              onChange={(e) => setMonth(e.target.value)}
            >
              <option value="">Pick a Month</option>
              {monthList.map((monthItem) => {
                return (
                  <option key={monthItem} value={monthItem}>
                    {monthItem}
                  </option>
                );
              })}
            </select>
          </label>
        </div>
        <button className="add-btn">Add Transaction</button>
      </form>
    </>
  );
}
