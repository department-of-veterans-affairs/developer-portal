import * as PropTypes from 'prop-types';
import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';

import { Redirect, RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions, lookupApiCategory } from '../../apiDefs/query';
import { IApiCategory, IApiDescription } from '../../apiDefs/schema';
import SideNav, { SideNavEntry } from '../../components/SideNav';
import { IApiNameParam } from '../../types';
import { CURRENT_VERSION_IDENTIFIER } from '../../types/constants';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import CategoryPage from './CategoryPage';
import DocumentationOverview from './DocumentationOverview';
import QuickstartPage from './QuickstartPage';

import './Documentation.scss';

const SideNavApiEntry = (apiCategoryKey: string, api: IApiDescription): JSX.Element => (
  <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
    <SideNavEntry
      key={api.urlFragment}
      exact={true}
      to={`/explore/${apiCategoryKey}/docs/${
        api.urlFragment
      }?version=${CURRENT_VERSION_IDENTIFIER}`}
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
  const apiCategoryOrder = getApiCategoryOrder();
  const apiDefinitions = getApiDefinitions();

  return (
    <SideNav ariaLabel="API Docs Side Nav">
      <SideNavEntry key="all" exact={true} to="/explore" name="Overview" />
      {apiCategoryOrder.map((categoryKey: string) => {
        const apiCategory: IApiCategory = apiDefinitions[categoryKey];
        return (
          <Flag name={`categories.${categoryKey}`} key={categoryKey}>
            <SideNavEntry
              to={`/explore/${categoryKey}`}
              id={`side-nav-category-link-${categoryKey}`}
              className="side-nav-category-link"
              name={apiCategory.name}
            >
              {apiCategory.content.quickstart && (
                <SideNavEntry
                  exact={true}
                  to={`/explore/${categoryKey}/docs/quickstart`}
                  name="Quickstart"
                  subNavLevel={1}
                />
              )}
              {categoryKey !== 'benefits' &&
                apiCategory.apis.some(api => !!api.oAuth) &&
                OAuthSideNavEntry(categoryKey)}
              {apiCategory.apis.map((api: IApiDescription) => SideNavApiEntry(categoryKey, api))}
            </SideNavEntry>
          </Flag>
        );
      })}
    </SideNav>
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

const DocumentationRoot = (props: RouteComponentProps<IApiNameParam>): JSX.Element => {
  const { apiCategoryKey } = props.match.params;
  const shouldRouteCategory = !apiCategoryKey || lookupApiCategory(apiCategoryKey) != null;

  return (
    <div className={classNames('documentation', 'vads-u-padding-y--5')}>
      <section className="vads-l-grid-container">
        <div className="vads-l-row">
          <ExploreSideNav />
          <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
            <Switch>
              {oldRouteToNew.map(routes => (
                <Redirect key={routes.from} exact={true} from={routes.from} to={routes.to} />
              ))}
              {!shouldRouteCategory && <Redirect from="/explore/:apiCategoryKey" to="/explore" />}
              <Route exact={true} path="/explore/" component={DocumentationOverview} />
              <Route exact={true} path="/explore/:apiCategoryKey" component={CategoryPage} />
              <Route
                exact={true}
                path="/explore/:apiCategoryKey/docs/authorization"
                component={AuthorizationDocs}
              />
              <Route
                exact={true}
                path="/explore/:apiCategoryKey/docs/quickstart"
                component={QuickstartPage}
              />
              <Route
                exact={true}
                path="/explore/:apiCategoryKey/docs/:apiName"
                component={ApiPage}
              />
            </Switch>
          </div>
        </div>
      </section>
    </div>
  );
};

DocumentationRoot.propTypes = {
  match: PropTypes.object.isRequired,
};

export default DocumentationRoot;
