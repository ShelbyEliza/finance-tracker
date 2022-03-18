import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useLogout();
  const { user } = useAuthContext();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>
          <NavLink exact to="/">
            Track Your Money
          </NavLink>
        </li>

        {!user && (
          <>
            <li>
              <NavLink to="/signup">Sign Up</NavLink>
            </li>
            <li>
              <NavLink to="/login">Log In</NavLink>
            </li>
          </>
        )}

        {user && (
          <>
            <li className={styles["budget-tab"]}>
              <NavLink to="/manage-budget">
                <p className={styles["tab-label"]}>Manage</p>
                <p className={styles["tab-label"]}>Budget</p>
              </NavLink>
            </li>
            <li>Hello, {user.displayName}</li>
            <li>
              <button onClick={logout} className="btn">
                Logout
              </button>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
