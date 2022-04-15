import styles from "./ManageBudget.module.css";

export default function BudgetDetails({ selectedBudget, openMonth, editMode }) {
  return (
    <div className={styles.budget}>
      {!selectedBudget && !editMode && (
        <p>
          Sorry, there is not yet a budget for {openMonth}. Would you like to
          make one?
        </p>
      )}
      {selectedBudget && (
        <>
          {!editMode && (
            <>
              <div className={styles.income}>
                <label>Income:</label>
                <p className={styles.res}>${selectedBudget.income}</p>
              </div>
              <div className={styles.expenses}>
                <label>Expenses:</label>
                <p className={styles.res}>${selectedBudget.expenses}</p>
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}
