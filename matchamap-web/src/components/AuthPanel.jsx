import { useState } from "react";
import { login, register } from "../lib/auth";

function AuthPanel({ user, onAuthSuccess, onLogout }) {
  const [mode, setMode] = useState("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  function handleSubmit(event) {
    event.preventDefault();
    try {
      const authUser =
        mode === "register"
          ? register({ email, password })
          : login({ email, password });
      setError("");
      onAuthSuccess(authUser);
    } catch (err) {
      setError(err.message || "Authentication failed.");
    }
  }

  if (user) {
    return (
      <section className="card">
        <div className="auth-row">
          <p>
            Signed in as <strong>{user.email}</strong>
          </p>
          <button onClick={onLogout} className="secondary">
            Log out
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="card">
      <h2>Account</h2>
      <div className="tabs">
        <button
          onClick={() => setMode("login")}
          className={mode === "login" ? "active" : ""}
        >
          Log in
        </button>
        <button
          onClick={() => setMode("register")}
          className={mode === "register" ? "active" : ""}
        >
          Create account
        </button>
      </div>

      <form onSubmit={handleSubmit} className="stack">
        <label>
          Email
          <input
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>
        <label>
          Password
          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            required
            minLength={6}
          />
        </label>
        <button type="submit">{mode === "register" ? "Create account" : "Log in"}</button>
      </form>
      {error ? <p className="error">{error}</p> : null}
    </section>
  );
}

export default AuthPanel;
