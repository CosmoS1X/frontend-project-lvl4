/* eslint-disable arrow-body-style */
import React, { useState, useContext } from 'react';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import {
  NotFoundPage, MainPage, LoginPage, SignUpPage,
} from '../pages';
import Header from '../header';
import authContext from '../../contexts';

const AuthProvider = ({ children }) => {
  const userId = JSON.parse(localStorage.getItem('userId'));
  const hasToken = userId && userId.token;
  const [loggedIn, setLoggedIn] = useState(hasToken);

  const logIn = () => setLoggedIn(true);
  const logOut = () => {
    localStorage.removeItem('userId');
    setLoggedIn(false);
  };

  return (
    <authContext.Provider value={{ loggedIn, logIn, logOut }}>
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
        auth.loggedIn ? children : <Redirect to="/login" />
      )}
    />
  );
};

const App = ({ socket }) => {
  return (
    <AuthProvider>
      <Router>
        <div className="d-flex flex-column h-100">
          <Header />
          <Switch>
            <PrivateRoute path="/" exact>
              <MainPage socket={socket} />
            </PrivateRoute>
            <Route path="/login" component={LoginPage} />
            <Route path="/signup" component={SignUpPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </div>
      </Router>
    </AuthProvider>
  );
};

export default App;
