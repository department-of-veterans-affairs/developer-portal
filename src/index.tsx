import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

import { Provider } from 'react-redux';

import App from './App';
import { unregister } from './registerServiceWorker';
import store from './store';

const { REACT_APP_SENTRY_DSN, REACT_APP_SENTRY_RELEASE } = process.env;

// We only want to send errors to sentry when we have a DSN and a relase. Deploys
// to review instances do not have SENTRY_RELEASE set so those instances will not
// send errors to sentry
if (REACT_APP_SENTRY_DSN && REACT_APP_SENTRY_RELEASE) {
  Sentry.init({
    dsn: REACT_APP_SENTRY_DSN,
    release: REACT_APP_SENTRY_RELEASE,
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
  if (REACT_APP_SENTRY_DSN && REACT_APP_SENTRY_RELEASE) {
    Sentry.captureException(err);
  }
}
