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
import reducer from './reducers';
import {
  updateMessages, addChannel, renameChannel, removeChannel,
} from './actions';
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
  modalShown: { modalName: null, id: null },
};

const store = createStore(
  reducer,
  initialState,
  compose(applyMiddleware(thunk), devtoolMiddleware),
);

const socketIo = io();

socketIo.on('newMessage', (data) => {
  store.dispatch(updateMessages(data));
});

socketIo.on('newChannel', (data) => {
  store.dispatch(addChannel(data));
});

socketIo.on('renameChannel', (data) => {
  store.dispatch(renameChannel(data));
});

socketIo.on('removeChannel', (data) => {
  store.dispatch(removeChannel(data));
});

const app = (socket) => {
  ReactDOM.render(
    <Provider store={store}>
      <App socket={socket} />
    </Provider>,
    document.querySelector('#chat'),
  );
};

app(socketIo);
