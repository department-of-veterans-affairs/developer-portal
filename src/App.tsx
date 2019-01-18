import * as React from 'react';

import { FlagsProvider } from 'flag';
import { RouteComponentProps } from 'react-router'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { Footer, NavBar, PageContent } from './components';
import { ApplyForm, ApplySuccess, BetaPage, BetaSuccess, ExploreDocs, Home, OAuth, RoutedContent } from './containers';
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
    address_validation: isHostedApiEnabled('address_validation', false),
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
          <div className="App">
            <NavBar hideLinks={currentPath === '/beta' || currentPath === '/beta-success'} />
            <div className="main" role="main">
              <Route path="/" render={this.focusedRoutes} />
            </div>
            <Footer />
          </div>
        </ConnectedRouter>
      </FlagsProvider>
    );
  }

  private focusedRoutes(props: RouteComponentProps<void>) {
    return (
      <PageContent {...props} >
        <Route exact={true} path="/" component={Home} />
        <Route path="/go-live" component={RoutedContent} />
        <Route path="/terms-of-service" component={RoutedContent} />
        <Route path="/apply" component={ApplyForm} />
        <Route path="/applied" component={ApplySuccess} />
        <Route path="/beta" component={BetaPage} />
        <Route path="/beta-success" component={BetaSuccess} />
        <Route path="/explore/:apiCategoryKey?" component={ExploreDocs} />
        <Route path="/oauth" component={OAuth} />
      </PageContent>
    );
  }
}

export default App;
