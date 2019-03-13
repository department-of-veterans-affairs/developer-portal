import * as React from 'react';

import { RouteComponentProps } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { apiCategoryOrder, apiDefs } from './apiDefs';
import { PageContent } from './components/PageContent';
import { ApplyForm, ApplySuccess, BetaPage, BetaSuccess, Explore, ExploreDocs, Home, OAuth, RoutedContent } from './containers';

export function focusedRoutes(props: RouteComponentProps<void>) {
    return (
      <PageContent {...props} >
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/index.html" component={Home} />

        {/* Legacy routes that we want to maintain: */}
        <Route path="/explore/terms-of-service" render={props1 => <Redirect to="/terms-of-service" />} />

        {/* Current routes: */}
        <Route path="/go-live" component={RoutedContent} />
        <Route path="/terms-of-service" component={RoutedContent} />
        <Route path="/apply" component={ApplyForm} />
        <Route path="/applied" component={ApplySuccess} />
        <Route path="/beta" component={BetaPage} />
        <Route path="/beta-success" component={BetaSuccess} />
        <Route path="/explore/:apiCategoryKey?" component={ExploreDocs} />
        <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" component={Explore} />
        <Route path="/oauth" component={OAuth} />
      </PageContent>
    );
  }

  export function getSitemapData() {
    return {
      apiCategoryOrder,
      apiDefs,
      focusedRoutes,
    };
  }
