import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';

import App from './components/app';
import reducers from './reducers';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

const initialState = {
  channels: [],
  currentChannelId: null,
  messages: [],
};

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunk), devtoolMiddleware),
);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.querySelector('#chat'),
);
