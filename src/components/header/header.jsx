import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar } from 'react-bootstrap';
import { useAuth } from '../../hooks';

const AuthButton = () => {
  const auth = useAuth();

  return auth.loggedIn ? <Button onClick={auth.logOut}>Выйти</Button> : null;
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
