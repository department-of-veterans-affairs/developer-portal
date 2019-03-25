import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { NavLink } from 'react-router-dom';

// import ApiCard from '../components/ApiCard';
import PageHeader from '../components/PageHeader';
import WhatsNewPage from '../content/whats-new.mdx';

const sections = [
  {
    description: 'Lorem of the Ipsum variety describing news from the Veterans Adminstration',
    id: 'va-press-releases',
    name: 'VA Press Releases',
  },
  {
    description: 'Lorem of the Ipsum variety that relates to news and interesting articles that relate to developers and APIs generally',
    id: 'news',
    name: 'News',
  },
  {
    description: 'Lorem of the Ipsum variety that describes that media related stuff like videos and other cool stuff goes here',
    id: 'media',
    name: 'Media',
  },
];

export function SideNav() {
  const navSections = sections.map((section) => {
    return (
      <NavHashLink key={section.id} className="side-nav-category-link" activeClassName="usa-current" id={`hash-link-${section.id}`} to={`#${section.id}`}>
        {section.name}
      </NavHashLink>
    );
  });

  return (
    <ul role="navigation" aria-label="Release Notes Side Nav" className="usa-sidenav-list">
      <li key="all">
        <NavLink exact={true} to="/whats-new" className="side-nav-category-link" activeClassName="usa-current">
          Overview
        </NavLink>
        {navSections}
      </li>
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
      description: "This paragraph would explain that this page is where you find stuff that’s related to the API program and interesting to developers in general",
      header: "What's New?",
    };

    return (
      <div className="Explore">
        <section className="usa-section">
          <div className="Explore-main usa-grid">
            <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef}>
              <SideNav />
            </div>
            <div className="usa-width-two-thirds">
              <section role="region" aria-labelledby="whats-new" className="usa-section">
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

