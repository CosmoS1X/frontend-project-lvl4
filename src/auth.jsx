import React, { useState, useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';
import axios from 'axios';
import routes from './routes';
import { authContext } from './contexts';

export const AuthProvider = ({ children }) => {
  const userData = JSON.parse(localStorage.getItem('userData'));
  const hasToken = userData && userData.token;
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userData');
    setLoggedIn(false);
  };
  const getToken = async (route, data) => {
    const response = await axios.post(route, data);
    localStorage.setItem('userData', JSON.stringify(response.data));
  };
  const getAuthHeader = (token) => ({ Authorization: `Bearer ${token}` });

  const getUserData = () => JSON.parse(localStorage.getItem('userData'));

  const value = {
    loggedIn,
    logIn,
    logOut,
    getToken,
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
