import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Rollbar from 'rollbar';
import 'bootstrap';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import reducer from './reducers';
import * as actions from './actions';
import resources from './locales';
import '../assets/application.scss';

const production = process.env.NODE_ENV === 'production';

if (!production) {
  localStorage.debug = 'chat:*';
}

const rollbar = new Rollbar({
  enable: production,
  accessToken: 'b6de70c72c5947e8b1447aed96bf84bc',
  captureUncaught: true,
  captureUnhandledRejections: true,
});

i18n.use(initReactI18next).init({
  lng: 'ru',
  fallbackLng: 'ru',
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default (socket) => {
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

  const socketApi = {
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
  };

  /* eslint-disable react/destructuring-assignment */
  socket.on('newMessage', (data) => {
    store.dispatch(actions.updateMessages(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(actions.addChannel(data));
  });
  socket.on('renameChannel', (data) => {
    store.dispatch(actions.renameChannel(data));
  });
  socket.on('removeChannel', (data) => {
    store.dispatch(actions.removeChannel(data));
  });
  /* eslint-enable */

  return (
    <Provider store={store}>
      <ErrorBoundary rollbar={rollbar}>
        <App socket={socketApi} />
      </ErrorBoundary>
    </Provider>
  );
};