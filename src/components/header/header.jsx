import React from 'react';
import { Link } from 'react-router-dom';

import './header.scss';

const Header = () => (
  <div className="header d-flex">
    <h3>
      <Link to="/">Hexlet Chat</Link>
    </h3>
    <ul className="d-flex">
      <li>
        <Link to="/login">Login</Link>
      </li>
      <li>
        <Link to="/not_found">Not Found</Link>
      </li>
    </ul>
  </div>
);

export default Header;
