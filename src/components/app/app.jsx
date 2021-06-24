/* eslint-disable arrow-body-style */
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Header from '../header';

import {
  NotFoundPage, LoginPage, SignUpPage,
} from '../pages';

const App = () => {
  return (
    <Router>
      <div className="d-flex flex-column h-100">
        <Header />
        <Switch>
          <Route path="/" exact render={() => <h1>Main Page</h1>} />
          <Route path="/login" component={LoginPage} />
          <Route path="/signup" component={SignUpPage} />
          <Route component={NotFoundPage} />
        </Switch>
      </div>
    </Router>
  );
};

export default App;
