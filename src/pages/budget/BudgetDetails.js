import { useState, useEffect } from "react";
import { useFirestore } from "../../hooks/useFirestore";
import MonthDetails from "./MonthDetails";

import styles from "./ManageBudget.module.css";

export default function BudgetDetails({ budgets }) {
  const [openedPanel, setOpenedPanel] = useState(null);
  const [toggleHidden, setToggleHidden] = useState("revealed");

  const openDetails = (month) => {
    setOpenedPanel(month);
    setToggleHidden("hidden");
    console.log(month);
  };

  const closePanel = () => {
    setOpenedPanel(null);
  };

  useEffect(() => {
    if (!openedPanel) {
      setToggleHidden("revealed");
    }
    if (openedPanel) {
      setToggleHidden("hidden");
    }
  }, [openedPanel]);

  return (
    <>
      <h3>Your Budgets:</h3>
      <ul className={styles.budgets}>
        {budgets.map((budget) => (
          <li key={budget.id} className={toggleHidden}>
            {!openedPanel && (
              <>
                <h2 className={styles.month}>{budget.month}</h2>
                <p className={styles.income}>Income: ${budget.income}</p>
                <p className={styles.bills}>Bills: ${budget.bills}</p>
                <button onClick={() => openDetails(budget.month)}>
                  More Details?
                </button>
              </>
            )}
            {openedPanel === budget.month && (
              <MonthDetails budget={budget} closePanel={closePanel} />
            )}
          </li>
        ))}
      </ul>
    </>
  );
}
// const firstLetterToUpper = (month) => {
//   if (typeof month === "string") {
//     return month.charAt(0).toUpperCase() + month.slice(1);
//   } else {
//     return month;
//   }
// };
