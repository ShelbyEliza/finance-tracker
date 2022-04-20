import { useFirestore } from "../../hooks/useFirestore";
import "./Home.css";

export default function TransactionList({ transactions }) {
  const { deleteDocument } = useFirestore("transactions");

  return (
    <ul className="transactions">
      {transactions.map((transaction) => (
        <li key={transaction.id} className={transaction.type}>
          <p className="name">{transaction.name}</p>
          {transaction.type === "expense" && (
            <p className="amount">- ${transaction.amount}</p>
          )}
          {transaction.type === "income" && (
            <p className="amount">+ ${transaction.amount}</p>
          )}
          <p>{transaction.month}</p>
          <button onClick={() => deleteDocument(transaction.id)}>x</button>
        </li>
      ))}
    </ul>
  );
}
