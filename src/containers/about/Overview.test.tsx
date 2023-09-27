/* eslint-disable max-nested-callbacks -- Jest callbacks */
import * as React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import 'jest';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import * as NewsData from '../../__mocks__/news.test.yml';
import { CONSUMER_APIS_PATH, CONSUMER_PATH } from '../../types/constants/paths';
import About from './About';
import Overview from './Overview';
import { DataSection } from './types/data-section';

const data = NewsData as {
  sections: DataSection[];
};

describe('About Overview', () => {
  beforeEach(() => {
    const router = createMemoryRouter(
      [
        {
          children: [
            {
              element: <Overview />,
              index: true,
            },
          ],
          element: <About />,
          path: '/about',
        },
      ],
      { initialEntries: ['/about'] },
    );
    render(<RouterProvider router={router} />);
  });

  it('renders successfully', () => {
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  describe('side nav', () => {
    it('has the expected side nav entries', () => {
      const sideNav = screen.getByRole('navigation', { name: 'About Side' });
      const navLinks = getAllByRole(sideNav, 'link');
      // Increment by 2 to account for additional "News" link
      expect(navLinks).toHaveLength(data.sections.length + 2);

      const overviewLink = getByRole(sideNav, 'link', { name: 'About' });
      expect(overviewLink).toHaveAttribute('href', '/about');

      const newsLink = getByRole(sideNav, 'link', { name: 'News' });
      expect(newsLink).toHaveAttribute('href', '/about/news');
    });
  });

  describe('text links', () => {
    it('has the expected number of links', () => {
      const mainSection = screen.getByRole('region', { name: 'About' });
      const pageLinks = getAllByRole(mainSection, 'link');
      expect(pageLinks).toHaveLength(8);
    });

    it('has the expected hrefs displayed on the page', () => {
      const mainSection = screen.getByRole('region', { name: 'About' });
      const mainSectionLinks = getAllByRole(mainSection, 'link');
      const linkUrls = mainSectionLinks.map((link: HTMLElement) => link.getAttribute('href'));
      const ABOUT_PAGE_URLS = [
        'https://www.oit.va.gov/services/trm/',
        '/explore',
        'https://www.va.gov/resources/find-apps-you-can-use/',
        CONSUMER_APIS_PATH,
        CONSUMER_PATH,
      ];

      linkUrls.forEach((url: string) => {
        expect(ABOUT_PAGE_URLS).toContain(url);
      });
    });
  });
});
