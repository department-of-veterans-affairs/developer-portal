import * as React from 'react';

import { FlagsProvider } from 'flag';
import { Route } from 'react-router-dom';
import { ConnectedRouter } from 'react-router-redux';


import { Footer, NavBar } from './components';
import { topLevelRoutes } from './Routes';
import { history } from './store';

import './App.scss'

let currentPath = history.location.pathname;
history.listen(location => {
  currentPath = location.pathname;
});

import 'highlight.js/styles/github.css'

function isHostedApiEnabled(shortName: string, defaultValue: boolean): boolean {
  const envValue = process.env[`REACT_APP_${shortName.toUpperCase()}_API_ENABLED`];
  if (envValue == null) {
    return defaultValue;
  } else {
    return (envValue === 'true');
  }
}

export const flags = {
  hosted_apis: {
    address_validation: isHostedApiEnabled('address_validation', true),
    appeals: isHostedApiEnabled('appeals', true),
    argonaut: isHostedApiEnabled('argonaut', true),
    benefits: isHostedApiEnabled('benefits', true),
    claims: isHostedApiEnabled('claims', true),
    disability_rating: isHostedApiEnabled('disability_rating', true),
    facilities: isHostedApiEnabled('facilities', true),
    loan_guaranty: isHostedApiEnabled('loan_guaranty', false),
    service_history: isHostedApiEnabled('service_history', true),
    veteran_confirmation: isHostedApiEnabled('veteran_confirmation', true),
  },
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
