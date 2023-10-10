import * as React from 'react';
import { ContentWithNav, SideNavEntry } from '../../components';
import { PAGE_HEADER_ID } from '../../types/constants';
import { ABOUT_OVERVIEW_PATH, ABOUT_NEWS_PATH } from '../../types/constants/paths';
import toHtmlId from '../../toHtmlId';
import * as newsData from '../../content/news.yml';
import { DataSection } from './types/data-section';
import { NewsSection } from './types/news-section';
import { SideNavSubEntryProps } from './types/side-nav-sub-entry-props';

const data = newsData as {
  sections: DataSection[];
};

export const newsSectionData = data.sections.map((section: DataSection) => ({
  ...section,
  id: toHtmlId(section.title),
}));

const SideNavSubEntry = (props: SideNavSubEntryProps): JSX.Element => {
  const { id, name } = props;

  return <SideNavEntry to={`${ABOUT_NEWS_PATH}#${id}`} name={name} subNavLevel={1} />;
};

const About = (): JSX.Element => (
  <ContentWithNav
    nav={
      <>
        <SideNavEntry key={`${ABOUT_OVERVIEW_PATH} page`} to="." name="About" end />
        <SideNavEntry key={`${ABOUT_NEWS_PATH} page`} to="news" name="News" end>
          {newsSectionData.map((section: NewsSection) => (
            <SideNavSubEntry key={section.id} id={section.id} name={section.title} />
          ))}
        </SideNavEntry>
      </>
    }
    navAriaLabel="About Side"
    contentAriaLabelledBy={PAGE_HEADER_ID}
  />
);

export default About;
