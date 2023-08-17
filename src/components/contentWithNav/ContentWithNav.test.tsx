import React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { PAGE_HEADER_AND_HALO_ID } from '../../types/constants';
import { SideNavEntry } from '../sideNav/SideNavEntry';
import { PageHeader } from '../pageHeader/PageHeader';
import { ContentWithNav } from './ContentWithNav';

describe('ContentWithNav', () => {
  describe('default content aria label', () => {
    beforeEach(() => {
      const router = createMemoryRouter(
        [
          {
            children: [
              {
                element: (
                  <>
                    <Helmet>
                      <title>One Ring</title>
                    </Helmet>
                    <PageHeader header="One Ring" />
                  </>
                ),
                index: true,
              },
            ],
            element: (
              <ContentWithNav
                nav={
                  <>
                    <SideNavEntry to="/rule" name="Rule" />
                    <SideNavEntry to="/find" name="Find" />
                    <SideNavEntry to="/bring" name="Bring" />
                    <SideNavEntry to="/bind" name="Bind" />
                  </>
                }
                navAriaLabel="One Ring Side Nav"
              />
            ),
            path: '/bind',
          },
        ],
        { initialEntries: ['/rule', '/find', '/bring', '/bind'] },
      );
      render(<RouterProvider router={router} />);
    });

    it('renders the side nav', () => {
      const sideNav = screen.getByRole('navigation', { name: 'One Ring Side Nav' });
      const navLinks = getAllByRole(sideNav, 'link');
      expect(navLinks.length).toEqual(4);

      const ruleLink = getByRole(sideNav, 'link', { name: 'Rule' });
      expect(ruleLink).toHaveAttribute('href', '/rule');

      const findLink = getByRole(sideNav, 'link', { name: 'Find' });
      expect(findLink).toHaveAttribute('href', '/find');

      const bringLink = getByRole(sideNav, 'link', { name: 'Bring' });
      expect(bringLink).toHaveAttribute('href', '/bring');

      const bindLink = getByRole(sideNav, 'link', { name: 'Bind' });
      expect(bindLink).toHaveAttribute('href', '/bind');
    });

    it('renders the main content', () => {
      const region = screen.getByRole('region', { name: 'One Ring' });
      expect(region).toBeInTheDocument();
    });
  });

  describe('Custom content aria label', () => {
    beforeEach(() => {
      const router = createMemoryRouter(
        [
          {
            children: [
              {
                element: (
                  <>
                    <Helmet>
                      <title>One Ring</title>
                    </Helmet>
                    <PageHeader header="To Rule Them All" halo="One Ring" />
                  </>
                ),
                index: true,
              },
            ],
            element: (
              <ContentWithNav
                nav={<SideNavEntry to="/rule" name="Rule" />}
                navAriaLabel="One Ring Side Nav"
                contentAriaLabelledBy={PAGE_HEADER_AND_HALO_ID}
              />
            ),
            path: '/bind',
          },
        ],
        { initialEntries: ['/rule', '/find', '/bring', '/bind'] },
      );
      render(<RouterProvider router={router} />);
    });

    it('renders the main content', () => {
      const region = screen.getByRole('region', { name: 'One Ring To Rule Them All' });
      expect(region).toBeInTheDocument();
    });
  });
});
