import classNames from 'classnames';
import * as React from 'react';

import CardLink from '../components/CardLink';
import PageHeader from '../components/PageHeader';
import SideNav, { SideNavEntry } from '../components/SideNav';
import * as NewsData from '../content/news.yml';
import toHtmlId from '../toHtmlId';

const sections = NewsData.sections.map((section: any) => ({
  ...section,
  id: toHtmlId(section.title),
}));

export default class News extends React.Component {
  private cardsSections = sections.map((section: any) => {
    return (
      <CardLink key={section.id} url={`#${section.id}`} name={section.title}>
        {section.description}
      </CardLink>
    );
  });

  public render() {
    const headerProps = {
      description:
        'This page is where you’ll find interesting press releases, articles, or media that relate to the VA Lighthouse program and the Developer Portal.',
      header: 'News',
    };

    const newsContent = sections.map((section: any) => {
      return (
        <section
          aria-label={section.title}
          key={section.id}
          id={section.id}
          className="vads-u-margin-bottom--4"
        >
          <h2>{section.title}</h2>
          {section.items.map((item: any) => {
            return (
              <p key={item.url}>
                <strong>
                  {item.date}
                  {item.source ? ` | ${item.source}` : null}
                </strong>
                <br />
                <a href={item.url}>{item.title}</a>
              </p>
            );
          })}
        </section>
      );
    });

    return (
      <div className="vads-u-padding-y--5">
        <div className="vads-l-grid-container">
          <div className="vads-l-row">
            <SideNav ariaLabel="News Side Nav">
              <SideNavEntry key="all" exact={true} to="/news" name="Overview" />
              {sections.map((section: any) => {
                return <SideNavEntry key={section.id} to={`#${section.id}`} name={section.title} />;
              })}
            </SideNav>
            <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
              <section role="region" aria-label="News">
                <PageHeader
                  description={headerProps.description}
                  header={headerProps.header}
                  className="vads-u-margin-bottom--4"
                />
                <div className={classNames('va-api-container', 'vads-u-margin-bottom--4')}>
                  {this.cardsSections}
                </div>
                {newsContent}
              </section>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
