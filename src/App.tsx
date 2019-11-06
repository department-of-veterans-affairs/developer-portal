import * as React from 'react';

import classNames from 'classnames';
import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { getDeprecatedFlags } from './apiDefs/deprecated';
import { getCategoryFlags, getEnvFlags } from './apiDefs/env';
import { getAllApis } from './apiDefs/query';
import { IApiDescription } from './apiDefs/schema';
import Footer from './components/Footer';
import Header from './components/Header';
import { topLevelRoutes } from './Routes';
import { history } from './store';

import 'highlight.js/styles/atom-one-dark-reasonable.css';
import './styles/base.scss';

class App extends React.Component {
  public render() {
    const appFlags = this.getFlags();
    // the double flex container only exists and is flexed to
    // address a bug in IE11 where min-height is only respected
    // if the parent of a flex container is also a flex container.
    return (
      <FlagsProvider flags={appFlags}>
        <ConnectedRouter history={history}>
          <div className="vads-u-display--flex">
            <div className={classNames("vads-u-display--flex", "vads-u-flex-direction--column", "vads-u-min-height--viewport", "vads-u-width--full")}>
              <Header />
              <div className="main" role="main">
                <Route path="/" render={topLevelRoutes} />
              </div>
              <Footer />
            </div>
          </div>
        </ConnectedRouter>
      </FlagsProvider>
    );
  }

  private getFlags() {
    const deprecatedFlags = getDeprecatedFlags();
    const envFlags = getEnvFlags();
    const apiCategories =  getCategoryFlags();
    const apiFlags = getAllApis().reduce((result: {}, api: IApiDescription): {[key: string]: boolean} => {
      const isApiAvailable = envFlags[api.urlFragment] && !deprecatedFlags[api.urlFragment];
      result[api.urlFragment] = isApiAvailable;
      return result;
    }, {});

    return {
      categories: apiCategories,
      deprecated: deprecatedFlags,
      enabled: envFlags,
      hosted_apis: apiFlags,
      show_testing_notice: process.env.REACT_APP_SHOW_TESTING_NOTICE === 'true',
      signups_enabled: process.env.REACT_APP_SIGNUPS_ENABLED !== 'false',
    };
  }
}

export default App;
