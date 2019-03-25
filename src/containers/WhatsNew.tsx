import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { NavLink } from 'react-router-dom';

import WhatsNewPage from '../content/whats-new.mdx';

export function SideNav() {

  return (
    <ul role="navigation" aria-label="Release Notes Side Nav" className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/whats-new" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
        <NavHashLink className="side-nav-category-link" activeClassName="usa-current" id="hash-link-va-press-releases" to="#va-press-releases">
          VA Press Releases
        </NavHashLink>
        <NavHashLink className="side-nav-category-link" activeClassName="usa-current" id="hash-link-news" to="#news">
          News
        </NavHashLink>
        <NavHashLink className="side-nav-category-link" activeClassName="usa-current" id="hash-link-media" to="#media">
          Media
        </NavHashLink>
      </li>
    </ul>
  );
}

export class WhatsNew extends React.Component {
  private navRef = React.createRef<HTMLDivElement>();

  public render() {
    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef}>
              <SideNav />
            </div>
            <div className="usa-width-two-thirds">
              <WhatsNewPage />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WhatsNew;

