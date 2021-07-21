import React from 'react';
import {
  BrowserRouter as Router, Route, Switch,
} from 'react-router-dom';
import { useSelector } from 'react-redux';
import {
  NotFoundPage, MainPage, LoginPage, SignUpPage,
} from '../../pages';
import Header from '../header';
import Modal from '../modals/modal.jsx';
import routes from '../../routes.js';
import { PrivateRoute } from '../../auth/index.jsx';

const App = () => {
  const modalState = useSelector((state) => state.modalState);

  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Modal modalState={modalState} />
        <Switch>
          <PrivateRoute path={routes.mainPage()} exact>
            <MainPage />
          </PrivateRoute>
          <Route path={routes.loginPage()} component={LoginPage} />
          <Route path={routes.signUpPage()} component={SignUpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
