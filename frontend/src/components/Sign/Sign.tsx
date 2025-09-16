import "./Sign.scss";
import { useState } from "react";

export const Sign = () => {
  const [showSignIn, setShowSignIn] = useState<boolean>(true);

  const toggleSign = () => {
    setShowSignIn((prev) => !prev);
  };

  // TODO: Remember me functionality

  return (
    <div className={`sign__form__container ${showSignIn ? "" : "sign__up"}`}>
      <form className="sign__form">
        <input className="input" id="username" name="username" type="text" placeholder="Username" />
        <input className="input" id="password" name="password" type="password" placeholder="Password" />
        {showSignIn ? (
          <>
            <div className="checkbox__remember">
              <input type="checkbox" name="rememberMe" id="rememberMe" onChange={() => {}} />
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
            <input className="input" id="password" name="password" type="password" placeholder="Password" />
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
