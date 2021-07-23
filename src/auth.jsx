import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import routes from './routes';
import { authContext } from './contexts';

export const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const hasToken = userData && userData.token;
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = (data) => {
    localStorage.setItem('userData', JSON.stringify(data));
    setLoggedIn(true);
  };

  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };

  const getAuthHeader = (token) => ({ Authorization: `Bearer ${token}` });

  const getUserData = () => JSON.parse(localStorage.getItem('userData'));

  const value = {
    loggedIn,
    logIn,
    logOut,
    getAuthHeader,
    getUserData,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

export const PrivateRoute = ({ path, children }) => {
  const auth = useContext(authContext);

  return (
    <Route
      path={path}
      render={() => (
        auth.loggedIn ? children : <Redirect to={routes.loginPage()} />
      )}
    />
  );
};
