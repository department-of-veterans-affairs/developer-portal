/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as Sentry from '@sentry/browser';
import * as React from 'react';
import * as ReactDOM from 'react-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { Provider } from 'react-redux';

import App from './App';
import { unregister } from './registerServiceWorker';
import store from './store';

const { REACT_APP_SENTRY_DSN, REACT_APP_SENTRY_ENV } = process.env;

if (REACT_APP_SENTRY_DSN) {
  Sentry.init({
    dsn: REACT_APP_SENTRY_DSN,
    environment: REACT_APP_SENTRY_ENV,
  });
}

const router = createBrowserRouter(
  [
    {
      element: <App />,
      path: '*',
    },
  ],
  {
    basename: process.env.PUBLIC_URL ?? '/',
  },
);

try {
  ReactDOM.render(
    <Provider store={store}>
      {/*
        default title matching index.html in case child doesn't define one. if omitted, will
        use the most recent Helmet title, not the index.html one.
      */}
      <Helmet titleTemplate="VA API Platform | %s" defaultTitle="VA API Platform" />
      <RouterProvider router={router} />
    </Provider>,
    document.getElementById('root') as HTMLElement,
  );
  /*
   * This is where the service worker is uninstalled. Note we don't register a new
   * service worker, only unregister any that have already been installed.
   */
  unregister();
} catch (err: unknown) {
  if (REACT_APP_SENTRY_DSN) {
    Sentry.captureException(err);
  }
}
