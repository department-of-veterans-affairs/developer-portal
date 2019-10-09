import * as React from 'react';

import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { getDeprecatedFlags } from './apiDefs/deprecated';
import { getEnvFlags } from './apiDefs/env';
import { getAllApis } from './apiDefs/query';
import { IApiDescription } from './apiDefs/schema';
import Footer from './components/Footer';
import Header from './components/Header';
import { topLevelRoutes } from './Routes';
import { history } from './store';

import 'highlight.js/styles/github.css';
import './App.scss';

class App extends React.Component {
  public render() {
    const appFlags = this.getFlags();

    return (
      <FlagsProvider flags={appFlags}>
        <ConnectedRouter history={history}>
          <div className="app-container">
            <div className="app">
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
    const apiFlags = getAllApis().reduce((result: {}, api: IApiDescription): {[key: string]: boolean} => {
      const isApiAvailable = envFlags[api.urlFragment] && !deprecatedFlags[api.urlFragment];
      result[api.urlFragment] = isApiAvailable;
      return result;
    }, {});
    
    return {
      deprecated: deprecatedFlags,
      enabled: envFlags,
      hosted_apis: apiFlags,
      signups_enabled: process.env.REACT_APP_SIGNUPS_ENABLED !== 'false',
    };
  }
}

export default App;
