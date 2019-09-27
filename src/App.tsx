import * as React from 'react';

import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { getAllApis } from './apiDefs/query';
import Footer from './components/Footer';
import NavBar from './components/NavBar';
import { topLevelRoutes } from './Routes';
import { history } from './store';

import './App.scss';

let currentPath = history.location.pathname;
history.listen(location => {
  currentPath = location.pathname;
});

import 'highlight.js/styles/github.css';
import { getDeprecatedFlags } from './apiDefs/deprecated';
import { getEnvFlags } from './apiDefs/env';
import { IApiDescription } from './apiDefs/schema';

class App extends React.Component {
  public render() {
    const appFlags = this.getFlags();

    return (
      <FlagsProvider flags={appFlags}>
        <ConnectedRouter history={history}>
          <div className="app-container">
            <div className="app">
              <NavBar hideLinks={currentPath === '/beta' || currentPath === '/beta-success'} />
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
