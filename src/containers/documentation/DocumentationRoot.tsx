import * as React from 'react';
import { Redirect } from 'react-router';
import { Route, Switch, useParams } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions, lookupApiCategory } from '../../apiDefs/query';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { ContentWithNav, SideNavEntry } from '../../components';
import { Flag, useFlag } from '../../flags';
import { APINameParam } from '../../types';
import {
  CURRENT_VERSION_IDENTIFIER,
  FLAG_AUTH_DOCS_V2,
  FLAG_CATEGORIES,
  FLAG_HOSTED_APIS,
} from '../../types/constants';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import { AuthorizationDocsLegacy } from './AuthorizationDocsLegacy';
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
          {api.trustedPartnerOnly && (
            <small className="vads-u-display--block">
              Internal VA use only.{/* Trusted Partner use only.*/}
            </small>
          )}
        </>
      }
      subNavLevel={1}
    />
  </Flag>
);

const OAuthSideNavEntry = (apiCategoryKey: string): JSX.Element => (
  <SideNavEntry
    to={`/explore/${apiCategoryKey}/docs/authorization`}
    id={`side-nav-authorization-link-${apiCategoryKey}`}
    name="Authorization"
    subNavLevel={1}
  >
    <SideNavEntry to="#getting-started" name="Getting Started" subNavLevel={2} />
    <SideNavEntry
      to="#building-openid-connect-applications"
      name="Building OpenID Connect Applications"
      subNavLevel={2}
    />
    <SideNavEntry to="#scopes" name="Scopes" subNavLevel={2} />
    <SideNavEntry to="#id-token" name="ID Token" subNavLevel={2} />
    <SideNavEntry to="#test-users" name="Test Users" subNavLevel={2} />
    <SideNavEntry to="#security-considerations" name="Security Considerations" subNavLevel={2} />
    <SideNavEntry to="#support" name="Support" subNavLevel={2} />
    <SideNavEntry to="#sample-applications" name="Sample Application" subNavLevel={2} />
  </SideNavEntry>
);

const ExploreSideNav = (): JSX.Element => {
  const authDocsV2 = useFlag([FLAG_AUTH_DOCS_V2]);
  const apiCategoryOrder: string[] = getApiCategoryOrder();
  const apiDefinitions = getApiDefinitions();

  return (
    <>
      <SideNavEntry key="all" exact to="/explore" name="Overview" />
      <Flag name={[FLAG_AUTH_DOCS_V2]}>
        <SideNavEntry
          key="authorization"
          to="/explore/authorization"
          name="Authorization"
          forceAriaCurrent={true}
        />
      </Flag>
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
              {categoryKey !== 'benefits' &&
                apiCategory.apis.some(api => !!api.oAuth) &&
                !authDocsV2 &&
                OAuthSideNavEntry(categoryKey)}
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
];

const DocumentationRoot = (): JSX.Element => {
  const { apiCategoryKey } = useParams<APINameParam>();
  const shouldRouteCategory = !apiCategoryKey || lookupApiCategory(apiCategoryKey) != null;
  const authDocsV2 = useFlag([FLAG_AUTH_DOCS_V2]);

  return (
    <ContentWithNav
      nav={<ExploreSideNav />}
      content={
        <Switch>
          {oldRouteToNew.map(routes => (
            <Redirect key={routes.from} exact from={routes.from} to={routes.to} />
          ))}
          {authDocsV2 && (
            <Route path="/explore/authorization" component={AuthorizationDocs} exact />
          )}
          {authDocsV2 && (
            <Redirect
              exact
              from="/explore/verification/docs/authorization"
              to="/explore/authorization?api=veteran_verification"
            />
          )}
          {!shouldRouteCategory && <Redirect from="/explore/:apiCategoryKey" to="/404" />}
          <Route exact path="/explore/" component={DocumentationOverview} />
          <Route exact path="/explore/:apiCategoryKey" component={CategoryPage} />
          <Route exact path="/explore/:apiCategoryKey/docs/authorization">
            {authDocsV2 ? <Redirect to="/explore/authorization" /> : <AuthorizationDocsLegacy />}
          </Route>
          <Route exact path="/explore/:apiCategoryKey/docs/quickstart" component={QuickstartPage} />
          <Route exact path="/explore/:apiCategoryKey/docs/:apiName" component={ApiPage} />
        </Switch>
      }
      navAriaLabel="API Docs Side Nav"
      className="documentation"
    />
  );
};

export default DocumentationRoot;
