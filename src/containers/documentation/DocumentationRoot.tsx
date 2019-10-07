import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { getApiCategoryOrder, getApiDefinitions } from '../../apiDefs/query';
import { IApiCategory, IApiDescription } from '../../apiDefs/schema';
import SideNav, { SideNavEntry } from '../../components/SideNav';
import { IApiNameParam } from '../../types';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import CategoryPage from './CategoryPage';
import DocumentationOverview from './DocumentationOverview';
import QuickstartPage from './QuickstartPage';

import '../Documentation.scss';

function SideNavApiEntry(apiCategoryKey: string, api: IApiDescription) {
  return (
    <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
      <SideNavEntry
        key={api.urlFragment}
        exact={true}
        to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}`}
        name={
          <React.Fragment>
            {api.name}
            {api.vaInternalOnly && <small className="vadp-internal-tag">Internal VA use only.</small>}
          </React.Fragment>
        }
      />
    </Flag>
  );
}

function OAuthSideNavEntry(apiCategoryKey: string) {
  return (
    <SideNavEntry
      to={`/explore/${apiCategoryKey}/docs/authorization`}
      id={`side-nav-authorization-link-${apiCategoryKey}`}
      name="Authorization"
    >
      <SideNavEntry to="#getting-started" name="Getting Started" />
      <SideNavEntry to="#scopes" name="Scopes" />
      <SideNavEntry to="#id-token" name="ID Token" />
      <SideNavEntry to="#test-users" name="Test Users" />
      <SideNavEntry to="#security-considerations" name="Security Considerations" />
      <SideNavEntry to="#support" name="Support" />
      <SideNavEntry to="#sample-application" name="Sample Application" />
    </SideNavEntry>
  );
}

function ExploreSideNav() {
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
              {apiCategory.content.quickstart &&
                <SideNavEntry
                  exact={true}
                  to={`/explore/${categoryKey}/docs/quickstart`}
                  name="Quickstart"
                />
              }
              {!apiCategory.apiKey && OAuthSideNavEntry(categoryKey)}
              {apiCategory.apis.map((api: IApiDescription) => SideNavApiEntry(categoryKey, api))}
            </SideNavEntry>
          </Flag>
        );
      })}
    </SideNav>
  );
}

export default class DocumentationRoot extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  public render() {
    return (
      <div className="explore">
        <section className="usa-grid">
          <ExploreSideNav />
          <div className="usa-width-two-thirds">
            <Route exact={true} path="/explore/" component={DocumentationOverview} />
            <Route exact={true} path="/explore/:apiCategoryKey" component={CategoryPage} />
            <Switch>
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
        </section>
      </div>
    );
  }
}
