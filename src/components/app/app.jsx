import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import axios from 'axios';
import {
  NotFoundPage, MainPage, LoginPage, SignUpPage,
} from '../../pages';
import Header from '../header';
import { socketContext, authContext } from '../../contexts';
import routes from '../../routes.js';

const AuthProvider = ({ children }) => {
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
  const getData = async (token) => {
    const data = await axios.get(routes.usersPath(), { headers: { Authorization: `Bearer ${token}` } });
    return data;
  };
  const getUserData = () => JSON.parse(localStorage.getItem('userData'));

  const value = {
    loggedIn,
    logIn,
    logOut,
    getToken,
    getData,
    getUserData,
  };

  return (
    <authContext.Provider value={value}>
      {children}
    </authContext.Provider>
  );
};

const PrivateRoute = ({ path, children }) => {
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

const App = ({ socketApi }) => (
  <AuthProvider>
    <socketContext.Provider value={socketApi}>
      <Router>
        <div className="d-flex flex-column h-100">
          <Header />
          <Switch>
            <PrivateRoute path="/" exact>
              <MainPage />
            </PrivateRoute>
            <Route path={routes.loginPage()} component={LoginPage} />
            <Route path={routes.signUpPage()} component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </socketContext.Provider>
  </AuthProvider>
);

export default App;
