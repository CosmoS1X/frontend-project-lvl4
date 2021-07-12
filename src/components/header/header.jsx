import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../../hooks';

const AuthButton = () => {
  const auth = useAuth();
  const { t } = useTranslation();

  return auth.loggedIn ? <Button onClick={auth.logOut}>{t('buttons.logOut')}</Button> : null;
};

const Header = () => (
  <Navbar className="shadow-sm" bg="white" expand="lg">
    <div className="container">
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <AuthButton />
    </div>
  </Navbar>
);

export default Header;
