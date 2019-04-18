import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux'

import App from './App';
import registerServiceWorker from './registerServiceWorker';
import store from './store';

if (process.env.REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: process.env.REACT_APP_SENTRY_DSN,
  });
}
try {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
  registerServiceWorker();
} catch (err) {
  if (process.env.REACT_APP_SENTRY_DSN) {
    Sentry.captureException(err)
  }
}
