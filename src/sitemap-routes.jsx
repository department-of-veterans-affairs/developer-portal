import * as React from 'react';
import { Route, Redirect } from 'react-router';

export default (
    // from App.focusedRoutes with component prop stripped out
    <Route>
        <Route exact={true} path="/" />
        <Route exact={true} path="/index.html" />

        {/* Legacy routes that we want to maintain: */}
        <Route path="/explore/terms-of-service" render={props1 => <Redirect to="/terms-of-service" />} />

        {/* Current routes: */}
        <Route path="/go-live" />
        <Route path="/terms-of-service" />
        <Route path="/apply" />
        <Route path="/applied" />
        <Route path="/beta" />
        <Route path="/beta-success" />
        <Route path="/explore/:apiCategoryKey?" />
        <Route path="/oauth" />
    </Route>
);