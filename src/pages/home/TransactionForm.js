import { useState, useEffect, useRef } from "react";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import { useFirestore } from "../../hooks/useFirestore";
import "./Home.css";

export default function TransactionForm({ uid, monthList }) {
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const [month, setMonth] = useState("");
  const formRef = useRef(null);
  const [docName, setDocName] = useState("");
  // transaction = collection. generated if not already
  const { user } = useAuthContext();
  // const { addDocument, response } = useFirestore("transactions");
  const { editDocument, response } = useFirestore("budget_2022_test");
  const { documents, error } = useCollection(
    "budget_2022_test",
    ["uid", "==", user.uid],
    ["createdAt", "desc"]
  );

  const handleSubmit = (e) => {
    e.preventDefault();
    const transaction = {
      uid,
      name,
      amount,
      type,
      month,
    };
    // addDocument(transaction);
    editDocument(docName, type, transaction);
  };

  useEffect(() => {
    if (month) {
      setDocName(month + "-" + user.uid);
    }
  }, [month, user]);

  // reset form after successfully adding transaction
  useEffect(() => {
    if (response.success) {
      console.log("Form Submit Success!");
      console.log(documents);
      formRef.current.reset();
      setName("");
      setAmount("");
      setType("");
      setMonth("");
    }
  }, [response, documents]);

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
              onClick={(e) => {
                // console.log(type);
                setType(e.target.value);
              }}
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
              onClick={(e) => {
                // console.log(type);

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
