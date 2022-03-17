import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";

export default function BudgetForm({ uid }) {
  const thisMonth = new Date().getMonth();
  // console.log(thisMonth);

  const [income, setIncome] = useState(0);
  const [bills, setBills] = useState(0);
  const [month, setMonth] = useState("");

  const { editDocument, response } = useFirestore("budget_2022_test");

  const handleSubmit = (e) => {
    e.preventDefault();

    editDocument(month, {
      uid,
      month,
      income,
      bills,
    });
  };

  useEffect(() => {
    if (response.success) {
      setIncome(0);
      setBills(0);
      setMonth("");
      console.log("You've successfully added budget info.");
    }
  }, [response.success]);

  return (
    <>
      <h3>Edit Your Budget</h3>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Month:</span>
          <input
            type="text"
            required
            onChange={(e) => setMonth(e.target.value)}
            value={month}
          />
        </label>
        <label>
          <span>Income:</span>
          <input
            type="number"
            required
            onChange={(e) => setIncome(e.target.value)}
            value={income}
          />
        </label>
        <label>
          <span>Bills:</span>
          <input
            type="number"
            required
            onChange={(e) => setBills(e.target.value)}
            value={bills}
          />
        </label>
        <button>Add Budget</button>
      </form>
    </>
  );
}
