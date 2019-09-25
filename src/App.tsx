import * as React from 'react';

import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';

import { apiEnvFlags } from './apiDefs/env';
import { Footer, NavBar } from './components';
import { topLevelRoutes } from './Routes';
import { history } from './store';

import './App.scss';

let currentPath = history.location.pathname;
history.listen(location => {
  currentPath = location.pathname;
});

import 'highlight.js/styles/github.css';

const flags = {
  hosted_apis: apiEnvFlags,
  signups_enabled: process.env.REACT_APP_SIGNUPS_ENABLED !== 'false',
};

class App extends React.Component {
  public render() {
    return (
      <FlagsProvider flags={flags}>
        <ConnectedRouter history={history}>
          <div className="app-container">
            <div className="App">
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
}

export default App;
