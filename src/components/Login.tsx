import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

type LoginProps = {
  checkToken: () => void;
};

function Login({ checkToken }: LoginProps) {
  const [login, setLogin] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [wrongLog, setWrongLog] = useState<boolean>(false);

  const properLogin = "user";
  const properPassword = "user1";

  const navigate = useNavigate();

  const handleLoginInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setLogin(e.target.value);
  };

  const handlePasswordInput = (
    e: React.ChangeEvent<HTMLInputElement>
  ): void => {
    setPassword(e.target.value);
  };

  const handleLogin = (e: React.MouseEvent<HTMLElement>): void => {
    e.preventDefault();

    if (login === properLogin && password === properPassword) {
      Cookies.set("logged", "true");
      checkToken();
      setWrongLog(false);
      navigate("/");
    } else {
      setWrongLog(true);
    }
  };

  return (
    <div>
      <div>
        <form>
          <input
            type="text"
            value={login}
            id="loginInput"
            placeholder="login"
            onChange={handleLoginInput}
          />
          <input
            type="password"
            value={password}
            id="passwordInput"
            placeholder="password"
            onChange={handlePasswordInput}
          />
          {wrongLog ? (
            <div>
              <p>Wrong login or password. Please try again.</p>
            </div>
          ) : null}
          <button type="submit" onClick={handleLogin}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

export default Login;
