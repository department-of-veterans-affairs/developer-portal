import * as React from 'react';

import classNames from 'classnames';

import toHtmlId from '../toHtmlId';

import CardLink from '../components/CardLink';
import EmbeddedYoutubeVideo from '../components/EmbeddedYoutubeVideo';
import HoverImage from '../components/HoverImage';
import PageHeader from '../components/PageHeader';
import SideNav, { SideNavEntry } from '../components/SideNav';
import * as NewsData from '../content/news.yml';

import './News.scss';

interface ISection {
  title: string;
  description: string;
  media: boolean;
  items: INewsItem[];
}

interface INewsSection extends ISection {
  id: string;
}

interface INewsItem {
  date: string;
  title: string;
  url: string;
  source?: string;
}

const sections = NewsData.sections.map((section: ISection) => ({
  ...section,
  id: toHtmlId(section.title),
}));

function NewsSideNav() {
  const navSections = sections.map((section: INewsSection) => {
    return <SideNavEntry key={section.id} to={`#${section.id}`} name={section.title} />;
  });

  return (
    <SideNav ariaLabel="News Side Nav">
      <SideNavEntry key="all" exact={true} to="/news" name="Overview" />
      {navSections}
    </SideNav>
  );
}

function renderNewsItem(item: INewsItem, media: boolean) {
  let content;
  if(media) {
    content = mediaItem(item);
  } else {
    content = itemDescription(item);
  }

  return (
    <div key={item.url}>
      {content}
    </div>
  );
}

function mediaItem(item: INewsItem) {
  const description = itemDescription(item);
  if (item.url.includes('www.youtube.com')) {
    return (
      <div className="va-api-media-item">
        {description}
        <EmbeddedYoutubeVideo title={item.title} url={item.url} />
      </div>
    );
  }

  return (
    <div className="va-api-media-row va-api-media-item">
      <div aria-hidden={true}>
        <a href={item.url} tabIndex={-1}>
          <HoverImage
            imagePath={require('../assets/video-player.png')}
            hoverImagePath={require('../assets/video-player-hover.png')}
          />
        </a>
      </div>
      <div className="va-api-media-row-description">
        {description}
      </div>
    </div>
  );
}

function itemDescription(item: INewsItem) {
  return (
    <p key={item.url}>
      <a href={item.url}>{item.title}</a>
      <br />
      <strong>
        {item.date}
        {item.source ? ` | ${item.source}` : null}
      </strong>
    </p>
  );
}

export class News extends React.Component {
  private cardsSections = sections.map((section: INewsSection) => {
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

    const newsContent = sections.map((section: INewsSection) => {
      return (
        <section
          aria-label={section.title}
          key={section.id}
          id={section.id}
          className="news-section"
        >
          <h2>{section.title}</h2>
          {section.items.map((item: INewsItem) => {
            return renderNewsItem(item, section.media);
          })}
        </section>
      );
    });

    return (
      <div className={classNames('news', 'usa-section', 'va-api-sidenav-page')}>
        <div className="usa-grid">
          <NewsSideNav />
          <div className="usa-width-two-thirds">
            <section role="region" aria-label="News" className="usa-section">
              <PageHeader description={headerProps.description} header={headerProps.header} />
              <div className="va-api-container">{this.cardsSections}</div>
              {newsContent}
            </section>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
