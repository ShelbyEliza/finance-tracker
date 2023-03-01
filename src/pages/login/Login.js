import { useState } from "react";
import { useLogin } from "../../hooks/useLogin";

import styles from "./Login.module.css";

import { useAuthContext } from "../../hooks/useAuthContext";

export default function Login() {
  const { user } = useAuthContext();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, sendVerificationEmail, error, isPending } = useLogin();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  return (
    <div className={styles.content}>
      {user === null && (
        <form onSubmit={handleSubmit} className={styles["login-form"]}>
          <h2>Log In</h2>
          <label>
            <span>Email:</span>
            <input
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              name="email"
              autoComplete="on"
            />
          </label>
          <label>
            <span>Password:</span>
            <input
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              autoComplete="current-password"
            />
          </label>
          {!isPending && <button className="btn">Log In</button>}
          {isPending && (
            <button className="btn" disabled>
              Loading...
            </button>
          )}
          {error && <p>{error}</p>}
        </form>
      )}

      {user && !user.verifiedEmail && (
        <div className={styles.unverified}>
          <h1>Attention</h1>
          <p>Please, verify your email before enjoying site content.</p>
          <p>
            If you would like another verification email sent to you, click the
            button below.
          </p>
          <button
            className={styles["resend-btn"]}
            onClick={sendVerificationEmail}
          >
            Resend Email
          </button>
        </div>
      )}
    </div>
  );
}
