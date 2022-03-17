import styles from "./ManageBudget.module.css";
import { useAuthContext } from "../../hooks/useAuthContext";
import { useCollection } from "../../hooks/useCollection";
import BudgetForm from "./BudgetForm";
import BudgetDetails from "./BudgetDetails";

export default function ManageBudget() {
  const { user } = useAuthContext();

  const { documents, error } = useCollection(
    "budget_2022_test",
    ["uid", "==", user.uid]
    // ["createdAt", "desc"]
  );

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        {error && <p>{error}</p>}
        {documents && <BudgetDetails budgets={documents} />}
      </div>

      <div className={styles.sidebar}>
        <BudgetForm uid={user.uid} />
      </div>
    </div>
  );
}
