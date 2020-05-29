import React from 'react';
import ButtonOne from '../utils/Button';
import Login from './Login';

const RegisterLogin = () => {
  return (
    <div className="register-login container-form">
      {/* <div className="register-login__left">
        <h2 className="register-login__header">Naujas klientas?</h2>
        <div className="register-login__button">
          <ButtonOne
            className="btn btn__btn-default"
            type="default"
            title="Sukurti paskyrą"
            linkTo="registruotis"
            addStyles={{
              margin: '10px 0 0 0',
            }}
          />
        </div>
      </div> */}
      <div className="register-login__right">
        {/* <h2 className="register-login__header">Esamas klientas</h2> */}
        <Login />
      </div>
    </div>
  );
};

export default RegisterLogin;
