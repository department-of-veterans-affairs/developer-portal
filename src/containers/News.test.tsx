import '@testing-library/jest-dom/extend-expect';
import { getAllByRole, getByRole, getByText, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { MemoryRouter } from 'react-router';
import * as NewsData from '../__mocks__/news.test.yml';
import toHtmlId from '../toHtmlId';
import News, { DataSection, NewsItem } from './News';

describe('News', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/news']}>
        <News />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument();
  });

  describe('side nav', () => {
    it('has the expected side nav entries', () => {
      const sideNav = screen.getByRole('navigation', { name: 'News Side Nav' });
      const navLinks = getAllByRole(sideNav, 'link');
      expect(navLinks).toHaveLength(NewsData.sections.length + 1);

      expect(navLinks[0]).toHaveTextContent('Overview');
      expect(navLinks[0].getAttribute('href')).toBe('/news');

      NewsData.sections.forEach((data: DataSection, index: number) => {
        expect(navLinks[index + 1]).toHaveTextContent(data.title);
        expect(navLinks[index + 1].getAttribute('href')).toBe(`/news#${toHtmlId(data.title)}`);
      });
    });
  });

  it('has the main news region', () => {
    const mainSection = screen.getByRole('region', { name: 'News' });
    expect(mainSection).toBeInTheDocument();
  });

  it('has a card link for each section', () => {
    const mainSection = screen.getByRole('region', { name: 'News' });
    // headers, card links, news sections - relevant for getting card links
    expect(mainSection.children.length).toBeGreaterThanOrEqual(2);

    const cardLinks = getAllByRole(mainSection.children[1] as HTMLElement, 'link');
    expect(cardLinks).toHaveLength(NewsData.sections.length);
    NewsData.sections.forEach((section: DataSection, index: number) => {
      expect(cardLinks[index].getAttribute('href')).toBe(`/news#${toHtmlId(section.title)}`);
      expect(cardLinks[index].children[0]).toHaveTextContent(section.title);
      expect(cardLinks[index].children[1]).toHaveTextContent(section.description);
    });
  });

  describe('sections', () => {
    it('renders each section', () => {
      NewsData.sections.forEach((section: DataSection) => {
        const newsSection = screen.getByRole('region', { name: section.title });
        expect(newsSection).toBeInTheDocument();

        const header = getByRole(newsSection, 'heading', { name: section.title });
        expect(header).toBeInTheDocument();
        expect(header.tabIndex).toBe(-1);
      });
    });

    describe('items', () => {
      function testSectionItems(section: DataSection) {
        const newsSection = screen.getByRole('region', { name: section.title });
        expect(newsSection).toBeInTheDocument();
        // header plus paragraph per news item
        expect(newsSection.children).toHaveLength(1 + section.items.length);
        const items: HTMLElement[] = Array.from(newsSection.children).slice(1) as HTMLElement[];
        expect(items.length).toBe(section.items.length);

        section.items.forEach((expected: NewsItem, index: number) => {
          let link: HTMLElement;
          if (section.media) {
            const links = getAllByRole(items[index], 'link');
            link = links[0].innerText === '' ? links[1] : links[0];
          } else {
            link = getByRole(items[index], 'link');
          }

          expect(link).toHaveTextContent(expected.title);
          expect(link.getAttribute('href')).toBe(expected.url);

          const info = getByText(
            items[index],
            `${expected.date}${expected.source ? ` | ${expected.source}` : ''}`,
          );
          expect(info).toBeInTheDocument();
        });
      }

      it('renders news releases', () => {
        const newsReleasesSection: DataSection = NewsData.sections.find(
          (section: DataSection) => section.title === 'News releases',
        );

        testSectionItems(newsReleasesSection);
      });

      it('renders articles', () => {
        const articlesSection: DataSection = NewsData.sections.find(
          (section: DataSection) => section.title === 'Articles',
        );

        testSectionItems(articlesSection);
      });

      it('renders digital media items', () => {
        const digitalMediaSection: DataSection = NewsData.sections.find(
          (section: DataSection) => section.title === 'Digital media',
        );

        testSectionItems(digitalMediaSection);
      });
    });
  });
});
