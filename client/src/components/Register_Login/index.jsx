import React from "react";
import ButtonOne from "../utils/Button";
import Login from "./Login";

const RegisterLogin = () => {
  return (
    <div className="register-login-container">
      <div className="register-login-left">
        <h1 className="register-header">Naujas klientas?</h1>
        <div className="register-button">
          <ButtonOne
            type="default"
            title="Sukurti paskyrą"
            linkTo="registruotis"
            addStyles={{
              margin: "10px 0 0 0"
            }}
          />
        </div>
      </div>
      <div className="register-login-right">
        <h1 className="login-hrader">Esamas klientas</h1>
        <Login />
      </div>
    </div>
  );
};

export default RegisterLogin;
