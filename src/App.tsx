import * as React from 'react';

import { RouteComponentProps } from 'react-router'
import { Route } from 'react-router-dom'
import { ConnectedRouter } from 'react-router-redux'

import { Banner, Footer, NavBar, PageContent} from './components';
import { Apply, BetaPage, BetaSuccess, ExploreDocs, Home, OAuth, RoutedContent } from './containers';
import { history } from './store';

import './App.scss';

class App extends React.Component {
    public render() {
        return (
            <div className="App">
              <ConnectedRouter history={history}>
                <div>
                  <Banner />
                  <NavBar />
                  <div role="main">
                    <Route path="/" render={this.focusedRoutes} />
                  </div>
                  <Footer />
                </div>
              </ConnectedRouter>
            </div>
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
