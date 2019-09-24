import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { Route, Switch } from 'react-router-dom';

import { apiCategoryOrder, apiDefs, IApiCategory, IApiDescription } from '../../apiDefs';
import { SideNav, SideNavEntry } from '../../components/SideNav';
import { QuickstartPage } from '../../containers';
import { IApiNameParam } from '../../types';
import ApiPage from './ApiPage';
import { AuthorizationDocs } from './AuthorizationDocs';
import CategoryPage from './CategoryPage';
import DocumentationOverview from './DocumentationOverview';

import '../Documentation.scss';

function VaInternalTag() {
  return <small className="vadp-internal-tag">Internal VA use only.</small>;
}

function SideNavApiEntry(apiCategoryKey: string, api: IApiDescription) {
  const internalTag = api.vaInternalOnly === true ? VaInternalTag() : null;

  return (
    <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
      <SideNavEntry
        key={api.urlFragment}
        exact={true}
        to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}`}
        name={
          <React.Fragment>
            {api.name}
            {internalTag}
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

function SideNavCategoryEntry(apiCategoryKey: string, apiCategory: IApiCategory) {
  const subNavLinks = apiCategory.apis.map(api => {
    return SideNavApiEntry(apiCategoryKey, api);
  });

  const authorizationEntry = apiCategory.apiKey ? null : OAuthSideNavEntry(apiCategoryKey);
  const quickstartEntry = apiCategory.content.quickstart ? (
    <SideNavEntry
      exact={true}
      to={`/explore/${apiCategoryKey}/docs/quickstart`}
      name="Quickstart"
    />
  ) : null;

  return (
    <SideNavEntry
      key={apiCategoryKey}
      to={`/explore/${apiCategoryKey}`}
      id={`side-nav-category-link-${apiCategoryKey}`}
      className="side-nav-category-link"
      name={apiCategory.name}
    >
      {quickstartEntry}
      {authorizationEntry}
      {subNavLinks}
    </SideNavEntry>
  );
}

function ExploreSideNav() {
  const navLinks = apiCategoryOrder.map((key: string) => SideNavCategoryEntry(key, apiDefs[key]));

  return (
    <SideNav ariaLabel="API Docs Side Nav">
      <SideNavEntry key="all" exact={true} to="/explore" name="Overview" />
      {navLinks}
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
