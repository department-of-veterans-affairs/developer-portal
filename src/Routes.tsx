import * as React from 'react';

import { RouteComponentProps, Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { apiCategoryOrder, apiDefs } from './apiDefs';
import { PageContent } from './components/PageContent';
import { ApplyForm, ApplySuccess, BetaPage, BetaSuccess, ExploreDocs, Home, OAuth, RoutedContent } from './containers';

export function topLevelRoutes(props: RouteComponentProps<void>) {
    return (
      <PageContent {...props} >
        <Switch>
          <Route exact={true} path="/" component={Home} />
          <Route exact={true} path="/index.html" component={Home} />

          {/* Legacy routes that we want to maintain: */}
          <Route path="/explore/terms-of-service" render={() => <Redirect to="/terms-of-service" />} />

          {/* Current routes: */}
          <Route path="/go-live" component={RoutedContent} />
          <Route path="/terms-of-service" component={RoutedContent} />
          <Route path="/apply" component={ApplyForm} />
          <Route path="/applied" component={ApplySuccess} />
          <Route path="/beta" component={BetaPage} />
          <Route path="/beta-success" component={BetaSuccess} />
          <Route path="/explore/:apiCategoryKey?" component={ExploreDocs} />
          <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" />
          <Route path="/oauth" component={OAuth} />
        </Switch>
      </PageContent>
    );
  }

  export function getSitemapData() {
    return {
      apiCategoryOrder,
      apiDefs,
      topLevelRoutes,
    };
  }
