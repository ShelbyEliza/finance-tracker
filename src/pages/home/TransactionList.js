import styles from "./Home.module.css";

import { useState, useEffect } from "react";

export default function TransactionList({
  selectedBudget,
  openMonth,
  selectedIncome,
  selectedExpense,
}) {
  const [incomeTotal, setIncomeTotal] = useState(0);
  const [expenseTotal, setExpenseTotal] = useState(0);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    if (selectedIncome && selectedExpense) {
      let totalIncome = 0;
      for (let i = 0; i < selectedIncome.length; i++) {
        totalIncome = totalIncome + parseInt(selectedIncome[i].amount, 10);
      }
      let totalExpense = 0;
      for (let i = 0; i < selectedExpense.length; i++) {
        totalExpense = totalExpense - parseInt(selectedExpense[i].amount, 10);
      }
      setIncomeTotal(totalIncome);
      setExpenseTotal(totalExpense);
      setTotal(totalIncome + totalExpense);
      console.log(totalExpense + totalIncome);
    }
  }, [selectedIncome, selectedExpense]);

  return (
    <div className={styles.budget}>
      {!selectedBudget && (
        <p>
          Sorry, there is not yet a budget for {openMonth}. Would you like to
          make one?
        </p>
      )}
      {selectedIncome && (
        <>
          <label>Income:</label>
          {selectedIncome.length !== 0 ? (
            <>
              {selectedIncome.map((transaction) => (
                <div key={transaction.name} className={styles["income-trans"]}>
                  <div className={styles.income}>
                    <p>{transaction.name}</p>
                    <p className={styles.res}>${transaction.amount}</p>
                  </div>
                </div>
              ))}
            </>
          ) : (
            <>
              <p>No income logged this month.</p>
            </>
          )}
          <div>
            <p>
              Total Income for {openMonth}: {incomeTotal}
            </p>
          </div>
        </>
      )}

      {selectedExpense && (
        <>
          <label>Expenses:</label>
          {selectedExpense.length !== 0 ? (
            <>
              {selectedExpense.map((transaction) => (
                <div key={transaction.name} className={styles["expense-trans"]}>
                  <div className={styles.expenses}>
                    <p>{transaction.name}</p>
                    <p className={styles.res}>-${transaction.amount}</p>
                  </div>
                </div>
              ))}
              <div>
                <p>
                  Total Expenses for {openMonth}: {expenseTotal}
                </p>
              </div>
            </>
          ) : (
            <p>No income logged this month.</p>
          )}
        </>
      )}
      <p>
        Total {openMonth} transactions: ${total}.
      </p>
    </div>
  );
}
