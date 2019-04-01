import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { NavLink } from 'react-router-dom';

import PageHeader from '../components/PageHeader';
import WhatsNewPage from '../content/whats-new.mdx';

import '../components/ApiCard';
import './Explore.scss';

const sections = [
  {
    description: 'Press Releases from the Department of Veterans Affairs',
    id: 'va-press-releases',
    name: 'VA Press Releases',
  },
  {
    description: 'News and articles related to developers, APIs, the Developer Portal, and Veterans',
    id: 'news',
    name: 'News',
  },
  {
    description: 'Media related to developers, APIs, Veterans, and the Department of Veterans Affairs',
    id: 'media',
    name: 'Media',
  },
];

function LocalNavHashLink(props: any): JSX.Element {
  const activeCheck = (match: any, location: any): boolean => {
    return props.to === location.hash;
  };
  const toWithoutHash = props.to.replace(/^#/, '');
  let id = `hash-link`;
  if (props.idSlug != null) {
    id = `${id}-${props.idSlug}`;
  }
  id = `${id}-${toWithoutHash}`;
  return (
    <NavHashLink className="side-nav-category-link" activeClassName="usa-current" id={id} isActive={activeCheck} to={props.to}>
      {props.children}
    </NavHashLink>
  );
};

export function SideNav() {
  const activeCheck = (match: any, location: any): boolean => {
    return '' === location.hash;
  };

  const navSections = sections.map((section) => {
    return (
      <li key={section.id}>
        <LocalNavHashLink idSlug={section.id} to={`#${section.id}`}>{section.name}</LocalNavHashLink>
      </li>
    );
  });

  return (
    <ul className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/whats-new" className="side-nav-category-link" activeClassName="usa-current" isActive={activeCheck}>
          Overview
        </NavLink>
      </li>
      {navSections}
    </ul>
  );
}

export class WhatsNew extends React.Component {
  private navRef = React.createRef<HTMLDivElement>();

  private cardsSections = sections.map((section) => {
    return (
      <NavHashLink key={section.id} to={`#${section.id}`} className="va-api-card">
        <h3 className="va-api-name">
          {section.name}
        </h3>
        <div className="va-api-description">
          {section.description}
        </div>
      </NavHashLink>
    );
  });

  public render() {
    const headerProps = {
      description: "This page is where you’ll find interesting press releases, news, or media that relates to the API program and the Developer Portal",
      header: "What\u2019s New?",
    };

    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef} role="navigation" aria-label="What's New Side Nav">
              <SideNav />
            </div>
            <div className="usa-width-two-thirds">
              <section role="region" aria-label="What's New" className="usa-section">
                <PageHeader description={headerProps.description} header={headerProps.header} />
                <div className="va-api-container">
                  {this.cardsSections}
                </div>
                <WhatsNewPage />
              </section>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default WhatsNew;

