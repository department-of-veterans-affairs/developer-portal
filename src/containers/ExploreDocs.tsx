import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { NavLink, Route, Switch } from 'react-router-dom';
import * as Stickyfill from 'stickyfilljs';

import { ApiPage } from '../components';
import { LocalNavHashLink } from '../components/SideNav';
import { QuickstartPage } from '../containers';
import { IApiNameParam } from '../types';
import { AuthorizationDocs } from './AuthorizationDocs';
import DocumentationOverview from './DocumentationOverview';
import Explore from './Explore';

import { apiCategoryOrder, apiDefs, IApiCategory, IApiDescription } from '../apiDefs';

import './Explore.scss';

function VaInternalTag() {
  return (
    <span><small>Internal VA use only.</small></span>
  );
}

function SideNavApiEntry(apiCategoryKey: string, api: IApiDescription) {
  const internalTag = (api.vaInternalOnly === true) ? VaInternalTag() : null;

  return (
    <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
      <li key={api.urlFragment}>
        <NavLink exact={true} to={`/explore/${apiCategoryKey}/docs/${api.urlFragment}`} 
            className="side-nav-api-link" activeClassName="usa-current">
          <div>
            {api.name}
            <br />
            {internalTag}
          </div>
        </NavLink>
      </li>
    </Flag>
  );
}


function OAuthSideNavEntry(apiCategoryKey: string, apiCategory: IApiCategory) {
  return (
      <li>
        <NavLink exact={true} to={`/explore/${apiCategoryKey}/docs/authorization`} 
            className="side-nav-api-link" id={`side-nav-authorization-link-${apiCategoryKey}`} activeClassName="usa-current">
            Authorization
        </NavLink>
        <ul className="usa-sidenav-sub_list">
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#getting-started">Getting Started</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#scopes">Scopes</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#id-token">ID Token</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#test-users">Test Users</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#security-considerations">Security Considerations</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#support">Support</LocalNavHashLink></li>
          <li><LocalNavHashLink idSlug={apiCategoryKey} to="#sample-application">Sample Application</LocalNavHashLink></li>
        </ul>
      </li>
    );
}

function QuickstartNavEntry(apiCategoryKey: string) {
  return (
    <li>
      <NavLink exact={true} to={`/explore/${apiCategoryKey}/docs/quickstart`}
        className="side-nav-api-link" id={`side-nav-quickstart-link-${apiCategoryKey}`} activeClassName="usa-current">
        Quickstart
      </NavLink>
    </li>
  );
}

function SideNavCategoryEntry(currentUrl: string, apiCategoryKey: string, apiCategory: IApiCategory) {
  const subNavLinks = apiCategory.apis.map(api => {
    return SideNavApiEntry(apiCategoryKey, api);
  });

  const authorizationEntry = apiCategory.apiKey ? null : OAuthSideNavEntry(apiCategoryKey, apiCategory);
  const quickstartEntry = apiCategory.content.quickstart ? QuickstartNavEntry(apiCategoryKey) : null;

  return (
    <li key={apiCategoryKey}>
      <NavLink to={`/explore/${apiCategoryKey}`} id={`side-nav-category-link-${apiCategoryKey}`} className="side-nav-category-link" activeClassName="usa-current">
        {apiCategory.name}
      </NavLink>
      <ul className="usa-sidenav-sub_list">
        {quickstartEntry}
        {authorizationEntry}
        {subNavLinks}
      </ul>
    </li>
  );
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
  const navLinks = apiCategoryOrder.map((key: string) => SideNavCategoryEntry(url, key, apiDefs[key]));

  return (
    <ul className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/explore" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
      </li>
      {navLinks}
    </ul>
  );
}

export class ExploreDocs extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  private navRef = React.createRef<HTMLDivElement>();

  public componentDidMount() {
    if (this.navRef.current) {
      Stickyfill.addOne(this.navRef.current);
    }
  }

  public componentDidUpdate(prevProps : RouteComponentProps<IApiNameParam>) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      window.scrollTo(0, 0);
    }
  }

  public render() {
    const sideNavClasses = classNames("vadp-side-nav", "usa-width-one-third", "sticky");
    return (
      <div className="explore">
        <section className="explore-main usa-grid">
          <div className={sideNavClasses} ref={this.navRef} role="navigation" aria-label="API Docs Side Nav">
            <SideNav {...this.props} />
          </div>
          <div className="usa-width-two-thirds">
            <Route exact={true} path="/explore/" component={DocumentationOverview} />
            <Route exact={true} path="/explore/:apiCategoryKey" component={ApiPage} />
            <Switch>
              <Route exact={true} path="/explore/:apiCategoryKey/docs/authorization" component={AuthorizationDocs} />
              <Route exact={true} path="/explore/:apiCategoryKey/docs/quickstart" component={QuickstartPage} />
              <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" component={Explore} />
            </Switch>
          </div>
        </section>
      </div>
    );
  }
}
