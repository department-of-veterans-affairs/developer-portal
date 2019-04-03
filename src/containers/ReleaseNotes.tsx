import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { Flag } from 'flag';
import { RouteComponentProps } from 'react-router';
import { NavLink, Route } from 'react-router-dom';

import { ApiPageReleaseNotes } from '../components';
import { IApiNameParam } from '../types';
import ReleaseNotesOverview from './ReleaseNotesOverview';

import { apiCategoryOrder, apiDefs, IApiCategory, IApiDescription } from '../apiDefs';

import './Explore.scss';

function VaInternalTag() {
  return (
    <span><small>Internal VA use only.</small></span>
  );
}

function SideNavApiEntry(apiCategoryKey: string, api: IApiDescription) {
  const internalTag = (api.vaInternalOnly === true) ? VaInternalTag() : null;
  const dashUrlFragment = api.urlFragment.replace('_', '-')

  return (
    <Flag key={api.urlFragment} name={`hosted_apis.${api.urlFragment}`}>
      <li key={api.urlFragment}>
        <NavHashLink className="side-nav-api-link" activeClassName="usa-current" id={`hash-link-${apiCategoryKey}-${api.urlFragment}`} /*isActive={activeCheck}*/ to={`#${dashUrlFragment}`}>
          {api.name}
          <br />
          {internalTag}
        </NavHashLink>
      </li>
    </Flag>
  );
}

function SideNavCategoryEntry(currentUrl: string, apiCategoryKey: string, apiCategory: IApiCategory) {
  const subNavLinks = () => {
    return apiCategory.apis.map(api => {
      if (apiCategory.apis.length > 1) {
        return SideNavApiEntry(apiCategoryKey, api);
      } else {
        return null;
      }
    });
  };

  return (
    <li key={`hash-link-${apiCategoryKey}`}>
      <NavLink to={`/release-notes/${apiCategoryKey}`} id={`side-nav-category-link-${apiCategoryKey}`} className="side-nav-category-link" activeClassName="usa-current">
        {apiCategory.name}
      </NavLink>
      <ul className="usa-sidenav-sub_list">
        {subNavLinks()}
      </ul>
    </li>
  );
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
  const navLinks = apiCategoryOrder.map((key: string) => apiDefs[key].releaseNotes ? SideNavCategoryEntry(url, key, apiDefs[key]) : null);

  return (
    <ul className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/release-notes" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
      </li>
      {navLinks}
    </ul>
  );
}

function renderOverview(routeProps: any, props: any) {
  return <ReleaseNotesOverview {...routeProps} {...props} description={props.description} halo={props.halo} header={props.header} parent={props.parent} />
}

export class ReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  private navRef = React.createRef<HTMLDivElement>();
  private overviewProps = {
    description: 'The goal of the Release Notes section is to inform developers of updates and changes to the VA APIs. This section of the developer portal is new and will expand as release notes for new APIs become available.', 
    halo: 'Release Notes',
    header: 'Overview', 
    parent: 'release-notes',
  };

  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef} role="navigation" aria-label="Release Notes Side Nav">
              <SideNav {...this.props} />
            </div>
            <div className="usa-width-two-thirds">
              <Route exact={true} path="/release-notes/" render={(routeProps) => renderOverview(routeProps, this.overviewProps)} />
              <Route exact={true} path="/release-notes/:apiCategoryKey" component={ApiPageReleaseNotes} />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ReleaseNotes;

