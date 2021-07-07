import React from 'react';
import { Link } from 'react-router-dom';
import { Button, Navbar, Nav } from 'react-bootstrap';
import { useAuth } from '../../hooks';

const AuthButton = () => {
  const auth = useAuth();

  return (
    auth.loggedIn
      ? <Button onClick={auth.logOut}>Выйти</Button>
      : <Button as={Link} to="/login">Войти</Button>
  );
};

const Header = () => (
  <Navbar className="shadow-sm" bg="white" expand="lg">
    <div className="container">
      <Navbar.Brand as={Link} to="/">Hexlet Chat</Navbar.Brand>
      <Nav className="mr-auto">
        <Nav.Link as={Link} to="/not_found">Not Found</Nav.Link>
      </Nav>
      <AuthButton />
    </div>
  </Navbar>
);

export default Header;
