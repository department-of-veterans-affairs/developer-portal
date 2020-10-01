import classNames from 'classnames';
import * as React from 'react';

import CardLink from '../components/CardLink';
import EmbeddedYoutubeVideo from '../components/EmbeddedYoutubeVideo';
import HoverImage from '../components/HoverImage';
import PageHeader from '../components/PageHeader';
import SideNav, { SideNavEntry } from '../components/SideNav';
import * as NewsData from '../content/news.yml';
import { defaultFlexContainer } from '../styles/vadsUtils';
import toHtmlId from '../toHtmlId';
import { onHashAnchorClick } from '../utils/clickHandlers';

export interface DataSection {
  title: string;
  description: string;
  media: boolean;
  items: NewsItem[];
}

interface NewsSection extends DataSection {
  id: string;
}

export interface NewsItem {
  date: string;
  title: string;
  url: string;
  source?: string;
}

const sections = NewsData.sections.map((section: DataSection) => ({
  ...section,
  id: toHtmlId(section.title),
}));

function NewsItem({ item, media }: { item: NewsItem; media: boolean }) {
  return media ? <MediaItem item={item} /> : <ItemDescription item={item} />;
}

function MediaItem({ item }: { item: NewsItem }) {
  const description = <ItemDescription item={item} />;
  if (item.url.includes('www.youtube.com')) {
    return (
      <div className="vads-u-margin-y--5">
        {description}
        <EmbeddedYoutubeVideo title={item.title} url={item.url} />
      </div>
    );
  }

  return (
    <div className="vads-u-display--flex vads-u-flex-direction--row vads-u-margin-y--5">
      <div aria-hidden={true}>
        <a href={item.url} tabIndex={-1}>
          <HoverImage
            imagePath={require('../assets/video-player.png')}
            hoverImagePath={require('../assets/video-player-hover.png')}
          />
        </a>
      </div>
      <div className="vads-u-margin-left--2p5 va-api-media-row-description">{description}</div>
    </div>
  );
}

function ItemDescription({ item }: { item: NewsItem }) {
  return (
    <p>
      <a href={item.url}>{item.title}</a>
      <br />
      <strong>
        {item.date}
        {item.source ? ` | ${item.source}` : null}
      </strong>
    </p>
  );
}

export default function News() {
  const pageDescription =
    'This page is where you’ll find interesting press releases, articles, or media that relate to the VA Lighthouse program and the Developer Portal.';

  return (
    <div className="vads-u-padding-y--5">
      <div className="vads-l-grid-container">
        <div className="vads-l-row">
          <SideNav ariaLabel="News Side Nav">
            <SideNavEntry key="all" exact={true} to="/news" name="Overview" />
            {sections.map((section: any) => {
              return (
                <SideNavEntry
                  key={section.id}
                  to={`#${section.id}`}
                  name={section.title}
                  onClick={onHashAnchorClick}
                />
              );
            })}
          </SideNav>
          <div className={classNames('vads-l-col--12', 'medium-screen:vads-l-col--8')}>
            <section role="region" aria-label="News">
              <PageHeader
                description={pageDescription}
                header="News"
                className="vads-u-margin-bottom--4"
              />
              <div className={classNames(defaultFlexContainer(), 'vads-u-margin-bottom--4')}>
                {sections.map((section: NewsSection) => {
                  return (
                    <CardLink key={section.id} url={`#${section.id}`} name={section.title}>
                      {section.description}
                    </CardLink>
                  );
                })}
              </div>
              {sections.map((section: NewsSection) => {
                return (
                  <section
                    aria-label={section.title}
                    key={section.id}
                    className="vads-u-margin-bottom--4"
                  >
                    <h2 id={section.id} tabIndex={-1}>
                      {section.title}
                    </h2>
                    {section.items.map((item: NewsItem) => {
                      return <NewsItem key={item.url} item={item} media={section.media} />;
                    })}
                  </section>
                );
              })}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}
