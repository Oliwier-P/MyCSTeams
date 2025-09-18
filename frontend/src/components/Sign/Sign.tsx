import "./Sign.scss";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Sign = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const navigate = useNavigate();

  const toggleSign = () => {
    setShowSignIn((prev) => !prev);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (showSignIn) {
      handleLogin();
    } else {
      handleRegister();
    }
  };

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert("Passwords do not match!");
      return;
    }
    if (username.length < 3 || password.length < 6) {
      alert("Username must be at least 3 characters and password at least 6 characters long.");
      return;
    }

    const response = await fetch("http://127.0.0.1:8000/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    if (data.response) {
      alert("Registration successful! You can now log in.");
      setShowSignIn(true);
      setUsername(() => "");
      setPassword(() => "");
      setConfirmPassword(() => "");
    } else {
      alert(`Registration failed: ${data.detail || "Unknown error"}`);
    }
  };

  const handleLogin = async () => {
    if (!username || !password) {
      alert("Please enter both username and password.");
      return;
    }

    const response = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password, remember_me: rememberMe }),
      credentials: "include", // Include cookies in the request
    });

    const data = await response.json();

    if (!response.ok) {
      alert(`${data.detail || "Unknown error"}`);
    }

    navigate("/"); // Home page
    setUsername(() => "");
    setPassword(() => "");
    setConfirmPassword(() => "");
  };

  // TODO: Remember me functionality

  return (
    <div className={`sign__form__container ${showSignIn ? "" : "sign__up"}`}>
      <form className="sign__form" onSubmit={handleSubmit}>
        <input
          className="input"
          id="username"
          name="username"
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          className="input"
          id="password"
          name="password"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {showSignIn ? (
          <>
            <div className="checkbox__remember">
              <input type="checkbox" name="rememberMe" id="rememberMe" checked={rememberMe} onChange={(e) => setRememberMe(e.target.checked)} />
              <span className="checkmark"></span>
              <div className="checkmark__text">Remember me?</div>
            </div>
            <button className="button__submit" type="submit">
              Sign In
            </button>
            <div className="switch__form" onClick={toggleSign}>
              Create new account
            </div>
          </>
        ) : (
          <>
            <input
              className="input"
              id="password"
              name="password"
              type="password"
              placeholder="Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button className="button__submit" type="submit">
              Sign Up
            </button>
            <div className="switch__form" onClick={toggleSign}>
              Already have an account?
            </div>
          </>
        )}
      </form>
    </div>
  );
};
