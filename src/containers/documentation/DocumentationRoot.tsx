import * as React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { Flag } from '../../flags';
import {
  CURRENT_VERSION_IDENTIFIER,
  FLAG_CATEGORIES,
  FLAG_HOSTED_APIS,
} from '../../types/constants';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrant/AuthorizationCodeGrantDocs';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrant/ClientCredentialsGrantDocs';
import CategoryPage from './CategoryPage';
import DocumentationOverview from './DocumentationOverview';
import QuickstartPage from './QuickstartPage';

import './Documentation.scss';

const SideNavApiEntry = (apiCategoryKey: string, api: APIDescription): JSX.Element => (
  <Flag key={api.urlFragment} name={[FLAG_HOSTED_APIS, api.urlFragment]}>
    <SideNavEntry
      key={api.urlFragment}
      exact
      to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}?version=${CURRENT_VERSION_IDENTIFIER}`}
      name={
        <>
          {api.name}
          {api.vaInternalOnly && (
            <small className="vads-u-display--block">Internal VA use only.</small>
          )}
        </>
      }
      subNavLevel={1}
    />
  </Flag>
);

const ExploreSideNav = (): JSX.Element => {
  const apiCategoryOrder: string[] = getApiCategoryOrder();
  const apiDefinitions = getApiDefinitions();

  return (
    <>
      <SideNavEntry key="all" exact to="/explore" name="Overview" />
      <SideNavEntry
        key="authorization"
        to="/explore/authorization"
        id="side-nav-category-link-authorization"
        name="Authorization"
        forceAriaCurrent
      >
        <SideNavEntry
          exact
          to="/explore/authorization/docs/authorization-code"
          name="Authorization Code Flow"
          subNavLevel={1}
        />
        <SideNavEntry
          exact
          to="/explore/authorization/docs/client-credentials"
          name="Client Credentials Grant"
          subNavLevel={1}
        />
      </SideNavEntry>
      {apiCategoryOrder.map((categoryKey: string) => {
        const apiCategory: APICategory = apiDefinitions[categoryKey];
        return (
          <Flag name={[FLAG_CATEGORIES, categoryKey]} key={categoryKey}>
            <SideNavEntry
              to={`/explore/${categoryKey}`}
              id={`side-nav-category-link-${categoryKey}`}
              className="side-nav-category-link"
              name={apiCategory.name}
            >
              {apiCategory.content.quickstart && (
                <SideNavEntry
                  exact
                  to={`/explore/${categoryKey}/docs/quickstart`}
                  name="Quickstart"
                  subNavLevel={1}
                />
              )}
              {apiCategory.apis.map((api: APIDescription) => SideNavApiEntry(categoryKey, api))}
            </SideNavEntry>
          </Flag>
        );
      })}
    </>
  );
};

const oldRouteToNew = [
  {
    from: '/explore/verification/docs/disability_rating',
    to: '/explore/verification/docs/veteran_verification',
  },
  {
    from: '/explore/verification/docs/service_history',
    to: '/explore/verification/docs/veteran_verification',
  },
  {
    from: '/explore/benefits/docs/appeals',
    to: '/explore/appeals/docs/appeals',
  },
  {
    from: '/explore/verification/docs/authorization',
    to: '/explore/authorization?api=veteran_verification',
  },
];

const DocumentationRoot = (): JSX.Element => (
  <ContentWithNav
    fullWidth
    nav={<ExploreSideNav />}
    content={
      <Switch>
        {oldRouteToNew.map(routes => (
          <Redirect key={routes.from} exact from={routes.from} to={routes.to} />
        ))}
        <Route path="/explore/authorization" component={AuthorizationDocs} exact />
        <Route path="/explore/authorization/docs/authorization-code" component={AuthorizationCodeGrantDocs} exact />
        <Route path="/explore/authorization/docs/client-credentials" component={ClientCredentialsGrantDocs} exact />
        <Route exact path="/explore/" component={DocumentationOverview} />
        <Route exact path="/explore/:apiCategoryKey" component={CategoryPage} />
        <Route exact path="/explore/:apiCategoryKey/docs/authorization">
          <Redirect to="/explore/authorization" />
        </Route>
        <Route exact path="/explore/:apiCategoryKey/docs/quickstart" component={QuickstartPage} />
        <Route exact path="/explore/:apiCategoryKey/docs/:apiName" component={ApiPage} />
      </Switch>
    }
    navAriaLabel="API Docs Side Nav"
    className="documentation"
  />
);

export default DocumentationRoot;
