import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import { NavLink } from 'react-router-dom';

import toHtmlId from '../toHtmlId';

import PageHeader from '../components/PageHeader';
import { LocalNavHashLink } from '../components/SideNav';
import * as NewsData from '../content/news.yml';

import '../components/ApiCard';
// Temporarily import the sidenav styles until we extract it into a component
import '../components/SideNav.scss'
import './News.scss'

const sections = NewsData.sections.map((section: any) => ({ ...section, id: toHtmlId(section.title) }));

export function SideNav() {
  const activeCheck = (match: any, location: any): boolean => {
    return '' === location.hash;
  };

  const navSections = sections.map((section: any) => {
    return (
      <li key={section.id}>
        <LocalNavHashLink idSlug={section.id} to={`#${section.id}`}>{section.title}</LocalNavHashLink>
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

export class News extends React.Component {
  private navRef = React.createRef<HTMLDivElement>();

  private cardsSections = sections.map((section: any) => {
    return (
      <NavHashLink key={section.id} to={`#${section.id}`} className="va-api-card">
        <h3 className="va-api-name">
          {section.title}
        </h3>
        <div className="va-api-description">
          {section.description}
        </div>
      </NavHashLink>
    );
  });

  public render() {
    const headerProps = {
      description: "This page is where you’ll find interesting press releases, articles, or media that relate to the VA Lighthouse program and the Developer Portal.",
      header: "News",
    };


    const newsContent = sections.map((section: any) => {
      return (
        <section key={section.id} id={section.id}>
          <h2>{section.title}</h2>
          {section.items.map((item: any) => {
            return (
              <p key={item.url}>
                <strong>{item.date}{item.source ? ` | ${item.source}` : null}</strong>
                <br />
                <a href={item.url}>{item.title}</a>
              </p>
            )
          })}
        </section>
      )
    })

    return (
      <div className="News usa-section">
        <div className="usa-grid">
          <div className="vadp-side-nav usa-width-one-third sticky" ref={this.navRef} role="navigation" aria-label="News Side Nav">
            <SideNav />
          </div>
          <div className="usa-width-two-thirds">
            <section role="region" aria-label="News" className="usa-section">
              <PageHeader description={headerProps.description} header={headerProps.header} />
              <div className="va-api-container">
                {this.cardsSections}
              </div>
              {newsContent}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default News;

