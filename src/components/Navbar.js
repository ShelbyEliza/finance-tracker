import { NavLink } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";

import styles from "./Navbar.module.css";

const Navbar = () => {
  const { logout } = useLogout();

  return (
    <nav className={styles.navbar}>
      <ul>
        <li className={styles.title}>Track Your Money</li>
        <li>
          <NavLink exact to="/">
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/signup">Sign Up</NavLink>
        </li>
        <li>
          <NavLink to="/login">Log In</NavLink>
        </li>
        <li>
          <button onClick={logout} className="btn">
            Logout
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
