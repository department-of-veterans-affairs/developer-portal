/* eslint-disable max-nested-callbacks -- Jest callbacks */
import { getAllByRole, getByRole, getByText, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import * as NewsData from '../../__mocks__/news.test.yml';
import toHtmlId from '../../toHtmlId';
import About from './About';
import News from './News';
import { DataSection } from './types/data-section';
import { NewsItemData } from './types/news-item-data';

const data = NewsData as {
  sections: DataSection[];
};

describe('News', () => {
  beforeEach(() => {
    const router = createMemoryRouter(
      [
        {
          children: [
            {
              element: <News />,
              path: 'news',
            },
          ],
          element: <About />,
          path: '/about',
        },
      ],
      { initialEntries: ['/about/news'] },
    );
    render(<RouterProvider router={router} />);
  });

  it('renders successfully', () => {
    expect(screen.getByRole('heading', { name: 'News' })).toBeInTheDocument();
  });

  describe('side nav', () => {
    it('has the expected side nav entries', () => {
      const sideNav = screen.getByRole('navigation', { name: 'About Side' });
      const navLinks = getAllByRole(sideNav, 'link');
      // Increment by 2 to account for additional "News" link
      expect(navLinks).toHaveLength(data.sections.length + 2);

      const newsLink = getByRole(sideNav, 'link', { name: 'News' });
      expect(newsLink).toHaveAttribute('href', '/about/news');

      data.sections.forEach((dataSection: DataSection) => {
        const link = getByRole(sideNav, 'link', { name: dataSection.title });
        expect(link).toHaveAttribute('href', `/about/news#${toHtmlId(dataSection.title)}`);
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

    const cardLinks = getAllByRole(mainSection.children[2] as HTMLElement, 'link');
    expect(cardLinks).toHaveLength(data.sections.length);
    data.sections.forEach((section: DataSection, index: number) => {
      expect(cardLinks[index]).toHaveTextContent(section.title);
      expect(cardLinks[index]).toHaveAttribute('href', `/about/news#${toHtmlId(section.title)}`);
      expect(cardLinks[index].nextElementSibling).toHaveTextContent(section.description);
    });
  });

  describe('sections', () => {
    it('renders each section', () => {
      data.sections.forEach((section: DataSection) => {
        const newsSection = screen.getByRole('region', { name: section.title });
        expect(newsSection).toBeInTheDocument();

        const header = getByRole(newsSection, 'heading', { name: section.title });
        expect(header).toBeInTheDocument();
        expect(header.tabIndex).toBe(-1);
      });
    });

    describe('items', () => {
      const testSectionItems = (section: DataSection): void => {
        const newsSection = screen.getByRole('region', { name: section.title });
        expect(newsSection).toBeInTheDocument();
        // header plus paragraph per news item
        expect(newsSection.children).toHaveLength(1 + section.items.length);
        const items: HTMLElement[] = Array.from(newsSection.children).slice(1) as HTMLElement[];
        expect(items.length).toBe(section.items.length);

        section.items.forEach((expected: NewsItemData, index: number) => {
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
      };

      it('renders news releases', () => {
        const newsReleasesSection: DataSection = data.sections.find(
          (section: DataSection) => section.title === 'News releases',
        ) as DataSection;

        testSectionItems(newsReleasesSection);
      });

      it('renders articles', () => {
        const articlesSection: DataSection = data.sections.find(
          (section: DataSection) => section.title === 'Articles',
        ) as DataSection;

        testSectionItems(articlesSection);
      });

      it('renders digital media items', () => {
        const digitalMediaSection: DataSection = data.sections.find(
          (section: DataSection) => section.title === 'Digital media',
        ) as DataSection;

        testSectionItems(digitalMediaSection);
      });
    });
  });
});
