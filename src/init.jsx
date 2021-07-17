import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { I18nextProvider } from 'react-i18next';
import Rollbar from 'rollbar';
import 'bootstrap';

import App from './components/app';
import ErrorBoundary from './components/error-boundary';
import reducer from './reducers';
import * as actions from './actions';
import i18n from './i18n';
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

const init = (socket) => {
  const store = createStore(
    reducer,
    applyMiddleware(thunk),
  );

  const withAcknowledgement = (actionName) => (data) => {
    const messages = {
      newMessage: 'Status of sending the message:',
      newChannel: 'Channel creation status:',
      renameChannel: 'Channel renaming status:',
      removeChannel: 'Channel removing status:',
    };

    return socket.volatile.emit(actionName, data, (res) => {
      console.log(messages[actionName], res.status);
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
        <I18nextProvider i18n={i18n}>
          <App socketApi={socketApi} />
        </I18nextProvider>
      </ErrorBoundary>
    </Provider>
  );
};

export default init;
