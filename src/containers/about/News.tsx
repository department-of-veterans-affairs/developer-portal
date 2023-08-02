import * as React from 'react';
import classNames from 'classnames';
import { Helmet } from 'react-helmet';
import { CardLink, EmbeddedYoutubeVideo, PageHeader } from '../../components';
import { defaultFlexContainer } from '../../styles/vadsUtils';
import toHtmlId from '../../toHtmlId';
import * as newsData from '../../content/news.yml';
import { DataSection } from './types/data-section';
import { NewsItemData } from './types/news-item-data';
import { NewsSection } from './types/news-section';
import './News.scss';

const data = newsData as {
  sections: DataSection[];
};

export const newsSectionData = data.sections.map((section: DataSection) => ({
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
  const url = new URL(item.url);
  if (url.host === 'www.youtube.com') {
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

const News = (): JSX.Element => (
  <>
    <Helmet>
      <title>News</title>
    </Helmet>
    <PageHeader header="News" className="vads-u-margin-bottom--4" />
    <p className="vads-u-font-size--lg vads-u-font-weight--bold vads-u-margin-y--2">
      This page is where you&apos;ll find interesting press releases, articles, or media that relate
      to the VA Lighthouse program and the Developer Portal.
    </p>
    <div className={classNames(defaultFlexContainer(), 'vads-u-margin-bottom--4')}>
      {newsSectionData.map((section: NewsSection) => (
        <CardLink
          key={section.id}
          url={`#${section.id}`}
          name={section.title}
          callToAction={section.callToAction}
        >
          {section.description}
        </CardLink>
      ))}
    </div>
    {newsSectionData.map((section: NewsSection) => (
      <section aria-label={section.title} key={section.id} className="vads-u-margin-bottom--4">
        <h2 id={section.id} tabIndex={-1}>
          {section.title}
        </h2>
        {section.items.map((item: NewsItemData) => (
          <NewsItem key={item.url} item={item} media={section.media} />
        ))}
      </section>
    ))}
  </>
);

export default News;
