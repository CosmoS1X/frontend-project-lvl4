import 'core-js/stable/index.js';
import 'regenerator-runtime/runtime.js';
import 'bootstrap';

import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/app';

import '../assets/application.scss';

if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}

ReactDOM.render(<App />, document.querySelector('#chat'));
