import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';


import { RouteComponentProps } from 'react-router';
import { NavLink } from 'react-router-dom';

import ReleaseNotesPage from '../content/release-notes/release-notes.mdx';
import { IApiNameParam } from '../types';

import { apiCategoryOrder, apiDefs, IApiCategory } from '../apiDefs';

function SideNavCategoryEntry(currentUrl: string, apiCategoryKey: string, apiCategory: IApiCategory) {
  // const activeCheck = (match: any, location: any): boolean => {
  //   return ('#' + apiCategoryKey) === location.hash;
  // };
  return (
    <li key={`hash-link-${apiCategoryKey}`}>
      <NavHashLink className="side-nav-category-link" activeClassName="usa-current" id={`hash-link-${apiCategoryKey}`} /*isActive={activeCheck}*/ to={`#${apiCategoryKey}`}>
        {apiCategory.name}
      </NavHashLink>
    </li>
  );
}

export function SideNav({ match: { url } } : RouteComponentProps<IApiNameParam>) {
  const navLinks = apiCategoryOrder.map((key: string) => SideNavCategoryEntry(url, key, apiDefs[key]));

  return (
    <ul role="navigation" aria-label="Release Notes Side Nav" className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/release-notes" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
      </li>
      {navLinks}
    </ul>
  );
}

export class ReleaseNotes extends React.Component<RouteComponentProps<IApiNameParam>, {}> {
  private navRef = React.createRef<HTMLDivElement>();

  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef}>
              <SideNav {...this.props} />
            </div>
            <div className="usa-width-two-thirds">
              <ReleaseNotesPage />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default ReleaseNotes;

