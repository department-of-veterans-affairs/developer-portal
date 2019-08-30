import * as React from 'react';
import { NavHashLink } from 'react-router-hash-link';

import classNames from 'classnames';

import toHtmlId from '../toHtmlId';

import PageHeader from '../components/PageHeader';
import { SideNav, SideNavEntry } from '../components/SideNav';
import * as NewsData from '../content/news.yml';

import './News.scss';

const sections = NewsData.sections.map((section: any) => ({ ...section, id: toHtmlId(section.title) }));

function NewsSideNav() {
  const navSections = sections.map((section: any) => {
    return <SideNavEntry key={section.id} to={`#${section.id}`} name={section.title} />;
  });

  return (
    <SideNav ariaLabel="News Side Nav">
      <SideNavEntry
        key="all"
        exact={true}
        to="/news"
        name="Overview"
      />
      {navSections}
    </SideNav>
  );
}

export class News extends React.Component {
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
        <section aria-label={section.title} key={section.id} id={section.id} className="news-section">
          <h2>{section.title}</h2>
          {section.items.map((item: any) => {
            return (
              <p key={item.url}>
                <strong>{item.date}{item.source ? ` | ${item.source}` : null}</strong>
                <br />
                <a href={item.url}>{item.title}</a>
              </p>
            );
          })}
        </section>
      );
    });

    return (
      <div className={classNames('news', 'usa-section')}>
        <div className="usa-grid">
          <NewsSideNav />
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

