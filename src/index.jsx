import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { io } from 'socket.io-client';
import Rollbar from 'rollbar';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import reducer from './reducers';
import * as actions from './actions';
import resources from './locales';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

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
  applyMiddleware(thunk),
);

const socketIo = io();

const makeSocketApi = (socket) => ({
  sendMessage: (data) => socket.volatile.emit('newMessage', data, (res) => {
    console.log('Status of sending the message:', res.status);
  }),
  createChannel: (data) => socket.volatile.emit('newChannel', data, (res) => {
    console.log('Channel creation status:', res.status);
  }),
  renameChannel: (data) => socket.volatile.emit('renameChannel', data, (res) => {
    console.log('Channel renaming status:', res.status);
  }),
  removeChannel: (data) => socket.volatile.emit('removeChannel', data, (res) => {
    console.log('Channel removing status:', res.status);
  }),
});

socketIo.on('newMessage', (data) => {
  store.dispatch(actions.updateMessages(data));
});
socketIo.on('newChannel', (data) => {
  store.dispatch(actions.addChannel(data));
});
socketIo.on('renameChannel', (data) => {
  store.dispatch(actions.renameChannel(data));
});
socketIo.on('removeChannel', (data) => {
  store.dispatch(actions.removeChannel(data));
});

const rollbar = new Rollbar({
  accessToken: 'b6de70c72c5947e8b1447aed96bf84bc',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const app = (socket) => {
  ReactDOM.render(
    <Provider store={store}>
      <ErrorBoundary rollbar={rollbar}>
        <App socket={makeSocketApi(socket)} />
      </ErrorBoundary>
    </Provider>,
    document.querySelector('#chat'),
  );
};

app(socketIo);
