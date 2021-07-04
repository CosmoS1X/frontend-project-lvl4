import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';

import App from './components/app';
import reducers from './reducers';
import resources from './locales';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

/* eslint-disable no-underscore-dangle */
const ext = window.__REDUX_DEVTOOLS_EXTENSION__;
const devtoolMiddleware = ext && ext();
/* eslint-enable */

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

const initialState = {
  currentUser: null,
  channels: [],
  currentChannelId: 1,
  messages: [],
};

const store = createStore(
  reducers,
  initialState,
  compose(applyMiddleware(thunk), devtoolMiddleware),
);

const socketIo = io();

const api = {
  sendMessage: (message) => socketIo.volatile.emit('newMessage', message),
};

const app = (socketApi) => {
  ReactDOM.render(
    <Provider store={store}>
      <App socketApi={socketApi} />
    </Provider>,
    document.querySelector('#chat'),
  );
};

app(api);
