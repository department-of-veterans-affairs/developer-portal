import * as React from 'react';

import classNames from 'classnames';
import { ConnectedRouter } from 'connected-react-router';
import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';

import { getDeactivatedFlags } from './apiDefs/deprecated';
import { getCategoryFlags, getEnvFlags } from './apiDefs/env';
import { getAllApis } from './apiDefs/query';
import { IApiDescription } from './apiDefs/schema';
import { Header } from './components';
import Footer from './components/Footer';
import PageContent from './components/PageContent';
import { history } from './store';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/base.scss';

export const getFlags = () => {
  const deactivatedFlags = getDeactivatedFlags();
  const envFlags = getEnvFlags();
  const apiCategories = getCategoryFlags();
  const apiFlags = getAllApis().reduce((result, api: IApiDescription): {
    [key: string]: boolean;
  } => {
    const isApiAvailable = envFlags[api.urlFragment] && !deactivatedFlags[api.urlFragment];
    result[api.urlFragment] = isApiAvailable;
    return result;
  }, {});

  return {
    categories: apiCategories,
    deactivated_apis: deactivatedFlags,
    enabled: envFlags,
    hosted_apis: apiFlags,
    show_testing_notice: process.env.REACT_APP_SHOW_TESTING_NOTICE === 'true',
    signups_enabled: process.env.REACT_APP_SIGNUPS_ENABLED !== 'false',
  };
};

// the double flex container only exists and is flexed to
// address a bug in IE11 where min-height is only respected
// if the parent of a flex container is also a flex container.
const App = (): JSX.Element => (
  <FlagsProvider flags={getFlags()}>
    <ConnectedRouter history={history}>
      <div className="vads-u-display--flex">
        <div
          className={classNames(
            'vads-u-display--flex',
            'vads-u-flex-direction--column',
            'vads-u-min-height--viewport',
            'vads-u-width--full',
          )}
        >
          <Header />
          <Route path="/" component={PageContent} />
          <Footer />
        </div>
      </div>
    </ConnectedRouter>
  </FlagsProvider>
);

export default App;
