import * as React from 'react';

import classNames from 'classnames';
import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import * as Stickyfill from 'stickyfilljs';

import { ApiPage } from '../components';
import { IApiNameParam } from '../types';
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

function SideNavCategoryEntry(currentUrl: string, apiCategoryKey: string, apiCategory: IApiCategory) {
  const subNavLinks = apiCategory.apis.map(api => {
    return SideNavApiEntry(apiCategoryKey, api);
  });

  return (
    <li key={apiCategoryKey}>
      <NavLink to={`/explore/${apiCategoryKey}`} className="side-nav-category-link" activeClassName="usa-current">
        {apiCategory.name}
      </NavLink>
      <ul className="usa-sidenav-sub_list">
        {subNavLinks}
      </ul>
    </li>
  );
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
  const navLinks = apiCategoryOrder.map((key: string) => SideNavCategoryEntry(url, key, apiDefs[key]));

  return (
    <ul role="navigation" aria-label="API Docs Side Nav" className="usa-sidenav-list">
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

  public render() {
    return (
      <div className="Explore">
        <section className="Explore-main usa-grid">
          <div className={classNames("vadp-side-nav", "usa-width-one-third", "sticky")} ref={this.navRef}>
            <SideNav {...this.props} />
          </div>
          <div className="usa-width-two-thirds">
            <Route exact={true} path="/explore/" component={DocumentationOverview} />
            <Route exact={true} path="/explore/:apiCategoryKey" component={ApiPage} />
            <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" component={Explore} />
          </div>
        </section>
      </div>
    );
  }
}
