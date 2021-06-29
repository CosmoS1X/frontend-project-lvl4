import React from 'react';
import RoundImage from '../round-image';
import LoginForm from '../login-form';
import CardFooter from '../card-footer';
import loginIcon from './login-icon.jpeg';

const LoginPage = () => (
  <div className="container-fluid h-100">
    <div className="row justify-content-center align-content-center h-100">
      <div className="col-12 col-md-8 col-xxl-6">
        <div className="card shadow-sm">
          <div className="card-body row p-5">
            <RoundImage image={loginIcon} alt="Войти" />
            <LoginForm />
          </div>
          <CardFooter />
        </div>
      </div>
    </div>
  </div>
);

export default LoginPage;
