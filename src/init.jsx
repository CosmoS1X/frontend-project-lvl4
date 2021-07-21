import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import i18n from 'i18next';
import { initReactI18next, I18nextProvider } from 'react-i18next';
import Rollbar from 'rollbar';
import 'bootstrap';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import { AuthProvider } from './auth/index.jsx';
import { socketContext } from './contexts';
import reducer, { actions } from './slices';
import resources from './locales/index.js';
import '../assets/application.scss';

const production = process.env.NODE_ENV === 'production';

if (!production) {
  localStorage.debug = 'chat:*';
}

const rollbar = new Rollbar({
  enable: production,
  accessToken: process.env.ROLLBAR_ACCESS_TOKEN,
  captureUncaught: true,
  captureUnhandledRejections: true,
});

const init = async (socket) => {
  const i18nInstance = i18n.createInstance();
  await i18nInstance.use(initReactI18next).init({
    lng: 'ru',
    fallbackLng: 'ru',
    interpolation: {
      escapeValue: false,
    },
    resources,
  });

  const store = configureStore({
    reducer,
  });

  const withAcknowledgement = (actionName) => (data) => {
    const messages = {
      newMessage: 'Status of sending the message:',
      newChannel: 'Channel creation status:',
      renameChannel: 'Channel renaming status:',
      removeChannel: 'Channel removing status:',
    };

    return new Promise((resolve, reject) => {
      const timer = setTimeout(() => {
        reject();
      }, 3000);

      socket.volatile.emit(actionName, data, (response) => {
        console.log(messages[actionName], response.status);
        clearTimeout(timer);

        if (response.status === 'ok') {
          resolve(response.data);
        } else {
          reject();
        }
      });
    });
  };

  const socketApi = {
    sendMessage: (data) => withAcknowledgement('newMessage')(data),
    createChannel: (data) => withAcknowledgement('newChannel')(data),
    renameChannel: (data) => withAcknowledgement('renameChannel')(data),
    removeChannel: (data) => withAcknowledgement('removeChannel')(data),
  };

  /* eslint-disable react/destructuring-assignment */
  socket.on('newMessage', (data) => {
    store.dispatch(actions.updateMessages(data));
  });
  socket.on('newChannel', (data) => {
    store.dispatch(actions.createChannel(data));
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
        <I18nextProvider i18n={i18nInstance}>
          <socketContext.Provider value={socketApi}>
            <AuthProvider>
              <App />
            </AuthProvider>
          </socketContext.Provider>
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
