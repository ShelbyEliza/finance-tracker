import { useCollections } from "../../hooks/useCollections";
import "./Home.css";

export default function TransactionList({ user }) {
  const { documents: document1, error } = useCollections("users", [
    "uid",
    "==",
    user.uid,
  ]);
  const { documents: document2 } = useCollections("months", [
    "uid",
    "==",
    user.uid,
  ]);

  if (document1) {
    console.log(document1);
  }
  if (document2) {
    console.log(document2);
  }
  if (error) {
    console.log(error);
  }
  return <div></div>;
}
