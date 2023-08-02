import * as React from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import ConsumerOnboardingRoot from './containers/consumerOnboarding/ConsumerOnboardingRoot';
import DocumentationRoot from './containers/documentation/DocumentationRoot';
import Home from './containers/Home';
import About from './containers/about/About';
import News from './containers/about/News';
import Support, { sections as supportSections, SupportSection } from './containers/support/Support';
import { Publishing } from './containers/publishing';
import {
  CONSUMER_APPLICATION_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_ROUTER_PATHS,
  CONSUMER_SANDBOX_PATH,
  PUBLISHING_ROUTER_PATHS,
} from './types/constants/paths';
import ProductionAccess from './containers/consumerOnboarding/ProductionAccess';
import ErrorPage404 from './containers/ErrorPage404';
import TermsOfService from './containers/TermsOfService';
import IntegrationGuide from './containers/providers/IntegrationGuide';

export const SiteRoutes: React.FunctionComponent = (): JSX.Element => (
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

    {/* Current routes: */}
    <Route path="/terms-of-service" component={TermsOfService} />

    {/* API Documentation */}
    <Redirect from="/explore/api" to="/explore" exact />
    <Route path="/explore/api/:urlSlug" component={DocumentationRoot} />
    <Route path="/explore/:categoryUrlSlugs" component={DocumentationRoot} />
    <Route path="/explore" component={DocumentationRoot} />

    {/* About */}
    <Route path="/about" component={About} />
    <Route path="/about/news" component={News} />

    {/* Support */}
    <Route exact path="/support" component={Support} />
    {supportSections.map((section: SupportSection) => (
      <Route path={`/support/${section.id}`} key={`${section.id}-support`} component={Support} />
    ))}

    {/* Integration Guide */}
    <Route path="/providers/integration-guide" component={IntegrationGuide} />

    {/* API Publishing */}
    {PUBLISHING_ROUTER_PATHS.map((path: string) => (
      <Route exact path={path} component={Publishing} key={path} />
    ))}

    {/* Consumer Docs */}

    <Route path={CONSUMER_APPLICATION_PATH} component={ProductionAccess} />

    {CONSUMER_ROUTER_PATHS.map((path: string) => (
      <Route exact path={path} component={ConsumerOnboardingRoot} key={path} />
    ))}

    <Redirect from="/apply" to="/explore" />
    <Redirect from={CONSUMER_SANDBOX_PATH} to="/explore" />

    <Redirect from="/go-live" to={CONSUMER_PROD_PATH} />

    {/* Catch the rest with the 404 */}
    <Route component={ErrorPage404} />
  </Switch>
);
