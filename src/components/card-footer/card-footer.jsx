import React from 'react';
import { Link } from 'react-router-dom';

const CardFooter = () => (
  <div className="card-footer p-4">
    <div className="text-center">
      <span>Нет аккаунта? </span>
      <Link to="/signup">Регистрация</Link>
    </div>
  </div>
);

export default CardFooter;
