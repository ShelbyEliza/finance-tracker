import { useState, useEffect } from "react";
import styles from "./ManageBudget.module.css";
import BudgetDetails from "./BudgetDetails";
import BudgetForm from "./BudgetForm";
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

export default function ManageBudget() {
  const [openMonth, setOpenMonth] = useState(null);
  const [selectedBudget, setSelectedBudget] = useState(null);
  const [editMode, setEditMode] = useState(false);

  const { user } = useAuthContext();
  const { documents, error } = useCollection("budget_2022_test", [
    "uid",
    "==",
    user.uid,
  ]);

  const toggleEditMode = (set) => {
    setEditMode(set);
  };

  useEffect(() => {
    if (openMonth) {
      setSelectedBudget(documents.find((budget) => budget.month === openMonth));
    }
    setEditMode(false);
  }, [openMonth, documents]);

  return (
    <div className={styles.container}>
      <div className={styles.sidebar}>
        <h3>2022</h3>
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
            <BudgetDetails
              selectedBudget={selectedBudget}
              openMonth={openMonth}
              editMode={editMode}
            />
            {selectedBudget && !editMode && (
              <button onClick={() => toggleEditMode(true)} className="btn">
                Edit
              </button>
            )}
            {editMode && (
              <BudgetForm
                selectedBudget={selectedBudget}
                toggleEditMode={toggleEditMode}
                month={openMonth}
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
}
