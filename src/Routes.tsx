import * as React from 'react';
import { Switch } from 'react-router';
import { Redirect, Route } from 'react-router-dom';

import { getDeactivatedFlags } from './apiDefs/deprecated';
import { getEnvFlags } from './apiDefs/env';
import {
  getAllQuickstartCategorySlugs,
  getApiCategoryOrder,
  getApiDefinitions,
} from './apiDefs/query';
import { APIDescription } from './apiDefs/schema';
import { MarkdownPage } from './components';
import ConsumerOnboardingRoot from './containers/consumerOnboarding/ConsumerOnboardingRoot';
import DisabledApplyForm from './containers/DisabledApplyForm';
import DocumentationRoot from './containers/documentation/DocumentationRoot';
import Home from './containers/Home';
import News from './containers/News';
import ErrorPage from './containers/ErrorPage';
import ReleaseNotes from './containers/releaseNotes/ReleaseNotes';
import Support, { sections as supportSections, SupportSection } from './containers/support/Support';
import PathToProduction from './content/goLive.mdx';
import TermsOfService from './content/termsOfService.mdx';
import ProviderIntegrationGuide from './content/providers/integrationGuide.mdx';
import { Flag, getFlags } from './flags';
import { Publishing } from './containers/publishing';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
  CONSUMER_SANDBOX_PATH,
  PUBLISHING_EXPECTATIONS_PATH,
  PUBLISHING_ONBOARDING_PATH,
  PUBLISHING_PATH,
} from './types/constants/paths';
import { Apply } from './containers/apply/Apply';
import { FLAG_SIGNUPS_ENABLED } from './types/constants';

export const SiteRoutes: React.FunctionComponent = (): JSX.Element => {
  const flags = getFlags();
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route exact path="/index.html" component={Home} />

      {/* Legacy routes that we want to maintain: */}
      <Route
        path="/explore/terms-of-service"
        render={(): JSX.Element => <Redirect to="/terms-of-service" />}
      />
      <Route path="/whats-new" render={(): JSX.Element => <Redirect to="/news" />} />

      {/* Current routes: */}
      <Route path="/go-live" render={(): JSX.Element => MarkdownPage(PathToProduction)} />
      <Route path="/terms-of-service" render={(): JSX.Element => MarkdownPage(TermsOfService)} />
      <Route
        path="/apply"
        render={(): JSX.Element => (
          <Flag
            name={[FLAG_SIGNUPS_ENABLED]}
            component={Apply}
            fallbackComponent={DisabledApplyForm}
          />
        )}
      />
      <Route path="/explore/:apiCategoryKey?" component={DocumentationRoot} />
      <Route
        path="/oauth"
        render={(): JSX.Element => <Redirect to="/explore/verification/docs/authorization" />}
      />
      <Route path="/release-notes/:apiCategoryKey?" component={ReleaseNotes} />
      <Route path="/news" component={News} />
      <Route path="/support" component={Support} />
      <Route
        path="/providers/integration-guide"
        render={(): JSX.Element => MarkdownPage(ProviderIntegrationGuide)}
      />
      <Route path={PUBLISHING_PATH} component={Publishing} />
      {flags.consumer_docs && (
        <Route path={CONSUMER_PATH} component={ConsumerOnboardingRoot} />
      )}
      <Route render={(): JSX.Element => <ErrorPage errorCode={404} />} />

      {/* The below Routes are needed for the sitemap */}
      <Route path="/explore/:apiCategoryKey/docs/quickstart" />
      <Route path="/explore/:apiCategoryKey/docs/:apiName" />
      <Route exact path={PUBLISHING_EXPECTATIONS_PATH} />
      <Route exact path={PUBLISHING_ONBOARDING_PATH} />
      {supportSections.map((section: SupportSection) => (
        <Route path={`/support/${section.id}`} key={section.id} />
      ))}
      {flags.consumer_docs && (
        <>
          <Route exact path={CONSUMER_SANDBOX_PATH} />
          <Route exact path={CONSUMER_PROD_PATH} />
          <Route exact path={CONSUMER_DEMO_PATH} />
          <Route exact path={CONSUMER_APIS_PATH} />
        </>
      )}
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
  const apiDefs = getApiDefinitions();
  const deactivatedFlags = getDeactivatedFlags();
  const envFlags = getEnvFlags();

  const getApiRouteParams = (route: string, apiCategory: string): string[] => {
    const routeParams = apiDefs[apiCategory].apis.reduce(
      (result: string[], api: APIDescription) => {
        if (envFlags[api.urlFragment] && !deactivatedFlags[api.urlFragment]) {
          result.push(api.urlFragment);
        }
        return result;
      },
      [],
    );

    return routeParams;
  };

  const apiCategoryOrder = getApiCategoryOrder();
  const apiQuickstartCategories = getAllQuickstartCategorySlugs();
  return {
    paramsConfig: {
      '/explore/:apiCategoryKey/docs/:apiName': apiCategoryOrder.map(apiCategory => ({
        apiCategoryKey: apiCategory,
        apiName: getApiRouteParams('/explore/:apiCategoryKey/docs/:apiName', apiCategory),
      })),
      '/explore/:apiCategoryKey/docs/quickstart': [{ apiCategoryKey: apiQuickstartCategories }],
      '/explore/:apiCategoryKey?': [{ 'apiCategoryKey?': apiCategoryOrder }],
      '/release-notes/:apiCategoryKey?': [
        { 'apiCategoryKey?': [...apiCategoryOrder, 'deactivated'] },
      ],
    },
    pathFilter: {
      isValid: false,
      rules: [/index.html|\/explore\/terms-of-service|\/applied|\/oauth/],
    },
    topLevelRoutes: SiteRoutes,
  };
};
