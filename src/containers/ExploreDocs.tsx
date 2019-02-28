import * as React from 'react';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { NavLink, Route } from 'react-router-dom';
import * as Stickyfill from 'stickyfilljs';

import { ApiPage, PageHero } from '../components';
import { IApiNameParam } from '../types';
import Explore from './Explore';

import { apiCategoryOrder, apiDefs, IApiCategory, IApiDescription } from '../apiDefs';

import './Explore.scss';

export function ApiPageHero() {
    const href = (process.env.REACT_APP_SALESFORCE_APPLY === 'true') ?
                 "https://vacommunity.secure.force.com/survey/ExAM__AMAndAnswerCreationPage?paId=a2ft0000000VVnJ" :
                 "/apply";
    const linkDirect = (process.env.REACT_APP_SALESFORCE_APPLY === 'true');
    return (
        <PageHero
            title="API Documentation"
            content="Explore usage policies and technical details about VA's API offerings"
            button="Request Access"
            linkDirect={linkDirect}
            buttonLink={href} />
    );
}

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
        <Route exact={true} path="/explore/:apiCategoryKey?" component={ApiPageHero} />
        <section className="Explore-main usa-grid">
          <div className="usa-width-one-third sticky" ref={this.navRef}>
            <SideNav {...this.props} />
          </div>
          <div className="usa-width-two-thirds">
            <Route exact={true} path="/explore/:apiCategoryKey?" component={ApiPage} />
            <Route exact={true} path="/explore/:apiCategoryKey/docs/:apiName" component={Explore} />
          </div>
        </section>
      </div>
    );
  }
}
