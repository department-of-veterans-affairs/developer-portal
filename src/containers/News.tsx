import classNames from 'classnames';
import * as React from 'react';
import Helmet from 'react-helmet';
import './News.scss';

import {
  CardLink,
  ContentWithNav,
  EmbeddedYoutubeVideo,
  PageHeader,
  SideNavEntry,
} from '../components';
import * as NewsData from '../content/news.yml';
import { defaultFlexContainer } from '../styles/vadsUtils';
import toHtmlId from '../toHtmlId';

export interface DataSection {
  title: string;
  description: string;
  media: boolean;
  items: NewsItemData[];
}

interface NewsSection extends DataSection {
  id: string;
}

export interface NewsItemData {
  date: string;
  title: string;
  url: string;
  source?: string;
}

const data = NewsData as {
  sections: DataSection[];
};

const sections = data.sections.map((section: DataSection) => ({
  ...section,
  id: toHtmlId(section.title),
}));

const ItemDescription = ({ item }: { item: NewsItemData }): JSX.Element => (
  <p>
    <a href={item.url}>{item.title}</a>
    <br />
    <strong>
      {item.date}
      {item.source ? ` | ${item.source}` : null}
    </strong>
  </p>
);

const MediaItem = ({ item }: { item: NewsItemData }): JSX.Element => {
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
      <div aria-hidden>
        <a href={item.url} tabIndex={-1}>
          <div className="hover-image-videoplayer" />
        </a>
      </div>
      <div className="vads-u-margin-left--2p5 va-api-media-row-description">{description}</div>
    </div>
  );
};

const NewsItem = ({ item, media }: { item: NewsItemData; media: boolean }): JSX.Element =>
  media ? <MediaItem item={item} /> : <ItemDescription item={item} />;

const News = (): JSX.Element => {
  const pageDescription =
    'This page is where you’ll find interesting press releases, articles, or media that relate to the VA Lighthouse program and the Developer Portal.';

  return (
    <ContentWithNav
      nav={
        <>
          <SideNavEntry key="all" exact to="/news" name="Overview" />
          {sections.map((section: NewsSection) => (
            <SideNavEntry key={section.id} to={`#${section.id}`} name={section.title} />
          ))}
        </>
      }
      content={
        <>
          <Helmet>
            <title>News</title>
          </Helmet>
          <PageHeader
            description={pageDescription}
            header="News"
            className="vads-u-margin-bottom--4"
          />
          <div className={classNames(defaultFlexContainer(), 'vads-u-margin-bottom--4')}>
            {sections.map((section: NewsSection) => (
              <CardLink key={section.id} url={`#${section.id}`} name={section.title}>
                {section.description}
              </CardLink>
            ))}
          </div>
          {sections.map((section: NewsSection) => (
            <section
              aria-label={section.title}
              key={section.id}
              className="vads-u-margin-bottom--4"
            >
              <h2 id={section.id} tabIndex={-1}>
                {section.title}
              </h2>
              {section.items.map((item: NewsItemData) => (
                <NewsItem key={item.url} item={item} media={section.media} />
              ))}
            </section>
          ))}
        </>
      }
      navAriaLabel="News Side Nav"
    />
  );
};

export default News;
