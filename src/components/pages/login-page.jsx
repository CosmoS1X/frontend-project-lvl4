import React from 'react';

import Container from '../container';
import RoundedImage from '../rounded-image';
import LoginForm from '../login-form';
import CardFooter from '../card-footer';
import loginIcon from './login-icon.jpeg';

const LoginPage = () => (
  <Container>
    <div className="card shadow-sm">
      <div className="card-body row p-5">
        <RoundedImage image={loginIcon} alt="Войти" />
        <LoginForm />
      </div>
      <CardFooter />
    </div>
  </Container>
);

export default LoginPage;
