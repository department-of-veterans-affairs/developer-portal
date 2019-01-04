import * as React from 'react';

import { FlagsProvider } from 'flag';
import { RouteComponentProps } from 'react-router'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { Banner, Footer, NavBar, PageContent } from './components';
import { Apply, BetaPage, BetaSuccess, ExploreDocs, Home, OAuth, RoutedContent } from './containers';
import { history } from './store';

let currentPath = history.location.pathname;
history.listen(location => {
  currentPath = location.pathname;
});

import 'highlight.js/styles/github.css'
import './App.scss';

function isHostedApiEnabled(shortName: string, defaultValue: boolean): boolean {
  const envValue = process.env[`REACT_APP_${shortName.toUpperCase()}_API_ENABLED`];
  if (envValue == null) {
    return defaultValue;
  } else {
    return (envValue === 'true');
  }
}

const flags = {
  hosted_apis: {
    appeals: isHostedApiEnabled('appeals', true),
    argonaut: isHostedApiEnabled('argonaut', true),
    benefits: isHostedApiEnabled('benefits', true),
    claims: isHostedApiEnabled('claims', true),
    disability_rating: isHostedApiEnabled('disability_rating', true),
    facilities: isHostedApiEnabled('facilities', true),
    loan_guarantees: isHostedApiEnabled('loan_guarantees', false),
    service_history: isHostedApiEnabled('service_history', true)
  }
};

class App extends React.Component {
  public render() {
    return (
      <FlagsProvider flags={flags}>
        <div className="App">
          <ConnectedRouter history={history}>
            <div>
              <Banner />
              <NavBar hideLinks={currentPath === '/beta' || currentPath === '/beta-success'} />
              <div role="main">
                <Route path="/" render={this.focusedRoutes} />
              </div>
              <Footer />
            </div>
          </ConnectedRouter>
        </div>
      </FlagsProvider>
    );
  }

  private focusedRoutes(props: RouteComponentProps<void>) {
    return (
      <PageContent {...props} >
        <Route exact={true} path="/" component={Home} />
        <Route path="/go-live" component={RoutedContent} />
        <Route path="/terms-of-service" component={RoutedContent} />
        <Route path="/apply" component={Apply} />
        <Route path="/beta" component={BetaPage} />
        <Route path="/beta-success" component={BetaSuccess} />
        <Route path="/explore/:apiCategory?" component={ExploreDocs} />
        <Route path="/oauth" component={OAuth} />
      </PageContent>
    );
  }
}

export default App;
