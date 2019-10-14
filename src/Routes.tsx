import * as React from 'react';

import { RouteComponentProps, Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { Flag } from 'flag';
import { getDeprecatedFlags } from './apiDefs/deprecated';
import { getEnvFlags } from './apiDefs/env';
import { getApiCategoryOrder, getApiDefinitions } from './apiDefs/query';
import { IApiDescription } from './apiDefs/schema';
import PageContent from './components/PageContent';
import ApplyForm from './containers/ApplyForm';
import ApplySuccess from './containers/ApplySuccess';
import BetaPage from './containers/Beta';
import BetaSuccess from './containers/BetaSuccess';
import DisabledApplyForm from './containers/DisabledApplyForm';
import DocumentationRoot from './containers/documentation/DocumentationRoot';
import ProviderIntegrationGuide from './containers/documentation/ProviderIntegrationGuide';
import Home from './containers/Home';
import News from './containers/News';
import NotFound from './containers/NotFound';
import ReleaseNotes from './containers/releaseNotes/ReleaseNotes';
import RoutedContent from './containers/RoutedContent';
import Support from './containers/support/Support';

export function topLevelRoutes(props: RouteComponentProps<void>) {
  return (
    <PageContent {...props}>
      <Switch>
        <Route exact={true} path="/" component={Home} />
        <Route exact={true} path="/index.html" component={Home} />

        {/* Legacy routes that we want to maintain: */}
        <Route
          path="/explore/terms-of-service"
          render={() => <Redirect to="/terms-of-service" />}
        />
        <Route path="/whats-new" render={() => <Redirect to="/news" />} />

        {/* Current routes: */}
        <Route path="/go-live" component={RoutedContent} />
        <Route path="/terms-of-service" component={RoutedContent} />
        <Route
          path="/apply"
          render={() => (
            <Flag
              name="signups_enabled"
              component={ApplyForm}
              fallbackComponent={DisabledApplyForm}
            />
          )}
        />
        <Route path="/applied" component={ApplySuccess} />
        <Route path="/beta" component={BetaPage} />
        <Route path="/beta-success" component={BetaSuccess} />
        <Route path="/explore/:apiCategoryKey?" component={DocumentationRoot} />
        <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" />
        <Route
          path="/oauth"
          render={() => <Redirect to="/explore/verification/docs/authorization" />}
        />
        <Route path="/release-notes/:apiCategoryKey?" component={ReleaseNotes} />
        <Route path="/news" component={News} />
        <Route path="/support" component={Support} />
        <Route path="/providers/integration-guide" component={ProviderIntegrationGuide} />
        <Route component={NotFound} />
      </Switch>
    </PageContent>
  );
}

/*  When a route is added to or removed from `topLevelRoutes` the sitemap will be automatically updated during the next build.
 *   There are situations when the config for react-router-sitemap needs to be updated for the sitemap to reflect the desired paths:
 *     - a route is included in `topLevelRoutes` that should not be included in the sitemap needs to be added to `pathFilter`
 *     - a route with dynamic subroutes (e.g. `/route/:param`) is added an array of the available params needs to be added to `paramsConfig`
 */

export function sitemapConfig() {
  const apiDefs = getApiDefinitions();
  const deprecatedFlags = getDeprecatedFlags();
  const envFlags = getEnvFlags();

  function getApiRouteParams(route: string, apiCategory: string): string[] {
    const routeParams = apiDefs[apiCategory].apis.reduce(
      (result: string[], api: IApiDescription) => {
        if (envFlags[api.urlFragment] && !deprecatedFlags[api.urlFragment]) {
          result.push(api.urlFragment);
        }
        return result;
      },
      [],
    );

    if (route === '/explore/:apiCategoryKey/docs/:apiName' && !apiDefs[apiCategory].apiKey) {
      routeParams.push('authorization');
    }

    return routeParams;
  }

  const apiCategoryOrder = getApiCategoryOrder();
  return {
    paramsConfig: {
      '/explore/:apiCategoryKey/docs/:apiName': apiCategoryOrder.map(apiCategory => {
        return {
          apiCategoryKey: apiCategory,
          apiName: getApiRouteParams('/explore/:apiCategoryKey/docs/:apiName', apiCategory),
        };
      }),
      '/explore/:apiCategoryKey?': [{ 'apiCategoryKey?': apiCategoryOrder }],
      '/release-notes/:apiCategoryKey?': [{ 'apiCategoryKey?': apiCategoryOrder }],
    },
    pathFilter: {
      isValid: false,
      rules: [/index.html|\/explore\/terms-of-service|\/applied|\/beta-success|\/oauth/],
    },
    topLevelRoutes,
  };
}
