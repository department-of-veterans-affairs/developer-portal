import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';
import { unregister } from './registerServiceWorker';
import store from './store';

const { REACT_APP_SENTRY_DSN } = process.env;

if (REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: REACT_APP_SENTRY_DSN,
  });
}
try {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
  /*
   This is where the service worker is uninstalled. Note we don't register a new
   service worker, only unregister any that have already been installed.
  */
  unregister();
} catch (err) {
  if (REACT_APP_SENTRY_DSN) {
    Sentry.captureException(err);
  }
}
