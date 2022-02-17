import * as React from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { getActiveApiDefinitions, getApiCategoryOrder } from './apiDefs/query';
import { MarkdownPage } from './components';
import ConsumerOnboardingRoot from './containers/consumerOnboarding/ConsumerOnboardingRoot';
import DocumentationRoot from './containers/documentation/DocumentationRoot';
import Home from './containers/Home';
import About from './containers/about/About';
import News from './containers/about/News';
import ErrorPage from './containers/ErrorPage';
import ReleaseNotes from './containers/releaseNotes/ReleaseNotes';
import Support, { sections as supportSections, SupportSection } from './containers/support/Support';
import TermsOfService from './content/termsOfService.mdx';
import ProviderIntegrationGuide from './content/providers/integrationGuide.mdx';
import { Publishing } from './containers/publishing';
import {
  CONSUMER_APPLICATION_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_ROUTER_PATHS,
  CONSUMER_SANDBOX_PATH,
  PUBLISHING_ROUTER_PATHS,
} from './types/constants/paths';
import { buildApiDetailRoutes } from './utils/routesHelper';
import ProductionAccess from './containers/consumerOnboarding/ProductionAccess';

export const SiteRoutes: React.FunctionComponent = (): JSX.Element => {
  const apiDefinitions = getActiveApiDefinitions();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/index.html" component={Home} />

      {/* Legacy routes that we want to maintain: */}
      <Route
        path="/explore/terms-of-service"
        render={(): JSX.Element => <Redirect to="/terms-of-service" />}
      />
      <Route path="/whats-new" render={(): JSX.Element => <Redirect to="/about/news" />} />
      <Route path="/news" render={(): JSX.Element => <Redirect to="/about/news" />} />
      <Route path="/oauth" render={(): JSX.Element => <Redirect to="/explore/authorization" />} />

      {/* Current routes: */}
      <Route path="/terms-of-service" render={(): JSX.Element => MarkdownPage(TermsOfService)} />

      {/* API Documentation */}
      <Route exact path="/explore" component={DocumentationRoot} />
      <Route exact path="/explore/authorization" component={DocumentationRoot} />
      <Route
        exact
        path="/explore/authorization/docs/authorization-code"
        component={DocumentationRoot}
      />
      <Route
        exact
        path="/explore/authorization/docs/client-credentials"
        component={DocumentationRoot}
      />
      {buildApiDetailRoutes(apiDefinitions).map(
        (path: string): JSX.Element => (
          <Route exact key={path} path={path} component={DocumentationRoot} />
        ),
      )}

      {/* Release Notes */}
      <Route exact path="/release-notes" component={ReleaseNotes} />
      {Object.entries(apiDefinitions).map(
        ([key]): JSX.Element => (
          <Route
            exact
            key={`${key}-release-notes`}
            path={`/release-notes/${key}`}
            component={ReleaseNotes}
          />
        ),
      )}
      <Route exact path="/release-notes/deactivated" component={ReleaseNotes} />

      {/* About */}
      <Route path="/about" component={About} />
      <Route path="/about/news" component={News} />

      {/* Support */}
      <Route exact path="/support" component={Support} />
      {supportSections.map((section: SupportSection) => (
        <Route path={`/support/${section.id}`} key={`${section.id}-support`} component={Support} />
      ))}

      {/* Integration Guide */}
      <Route
        path="/providers/integration-guide"
        render={(): JSX.Element => MarkdownPage(ProviderIntegrationGuide)}
      />

      {/* API Publishing */}
      {PUBLISHING_ROUTER_PATHS.map((path: string) => (
        <Route exact path={path} component={Publishing} key={path} />
      ))}

      {/* Consumer Docs */}

      <Route path={CONSUMER_APPLICATION_PATH} component={ProductionAccess} />

      {CONSUMER_ROUTER_PATHS.map((path: string) => (
        <Route exact path={path} component={ConsumerOnboardingRoot} key={path} />
      ))}

      <Redirect from="/apply" to={CONSUMER_SANDBOX_PATH} />

      <Redirect from="/go-live" to={CONSUMER_PROD_PATH} />

      {/* Catch the rest with the 404 */}
      <Route render={(): JSX.Element => <ErrorPage errorCode={404} />} />
    </Switch>
  );
};

interface SitemapConfig {
  topLevelRoutes: React.FunctionComponent;
  paramsConfig: Record<string, unknown>;
  pathFilter: {
    isValid: boolean;
    rules: RegExp[];
  };
}

/**
 * When a route is added to or removed from `topLevelRoutes` the sitemap will be automatically
 * updated during the next build. There are situations when the config for react-router-sitemap needs
 * to be updated for the sitemap to reflect the desired paths:
 * - a route is included in `topLevelRoutes` that should not be included in the sitemap needs to be added to `pathFilter`
 * - a route with dynamic subroutes (e.g. `/route/:param`) is added an array of the available params needs to be added to `paramsConfig`
 */

export const sitemapConfig = (): SitemapConfig => {
  const apiCategoryOrder = getApiCategoryOrder();
  return {
    paramsConfig: {},
    pathFilter: {
      isValid: false,
      rules: [
        /index.html|\/explore\/terms-of-service|\/applied|\/oauth/,
        ...apiCategoryOrder.map((item): RegExp => new RegExp(`${item}\\\/docs\\\/:apiName`)),
      ],
    },
    topLevelRoutes: SiteRoutes,
  };
};
