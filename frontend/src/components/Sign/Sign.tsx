import "./Sign.scss";
import { useState } from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

export const Sign = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [rememberMe, setRememberMe] = useState<boolean>(false);
  const [showSignIn, setShowSignIn] = useState<boolean>(true);
  const { register, login } = useUserAuth();

  const clearForm = () => {
    setUsername(() => "");
    setPassword(() => "");
    setConfirmPassword(() => "");
  };

  const toggleSign = () => {
    setShowSignIn((prev) => !prev);
    clearForm();
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
    register(username, password, confirmPassword).then((success) => {
      if (success) {
        clearForm();
        setShowSignIn(true);
      }
    });
  };

  const handleLogin = async () => {
    login(username, password, rememberMe);
  };

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
