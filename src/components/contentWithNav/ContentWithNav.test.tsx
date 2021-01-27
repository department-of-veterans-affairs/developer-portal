import React from 'react';
import { getAllByRole, getByRole, render, screen } from '@testing-library/react';
import { Helmet } from 'react-helmet';
import { MemoryRouter } from 'react-router';
import { PAGE_HEADER_AND_HALO_ID } from '../../types/constants';
import { SideNavEntry } from '../sideNav/SideNavEntry';
import { PageHeader } from '../pageHeader/PageHeader';
import { ContentWithNav } from './ContentWithNav';

describe('ContentWithNav', () => {
  describe('default content aria label', () => {
    beforeEach(() => {
      render(
        <MemoryRouter initialEntries={['/rule', '/find', '/bring', '/bind']}>
          <ContentWithNav
            nav={
              <>
                <SideNavEntry key="rule" exact to="/rule" name="Rule" />
                <SideNavEntry key="find" exact to="/find" name="Find" />
                <SideNavEntry key="bring" exact to="/bring" name="Bring" />
                <SideNavEntry key="bind" exact to="/bind" name="Bind" />
              </>
            }
            content={
              <>
                <Helmet>
                  <title>One Ring</title>
                </Helmet>
                <PageHeader header="One Ring" />
              </>
            }
            navAriaLabel="One Ring Side Nav"
          />
        </MemoryRouter>,
      );
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
      render(
        <MemoryRouter initialEntries={['/rule', '/find', '/bring', '/bind']}>
          <ContentWithNav
            nav={<SideNavEntry key="rule" exact to="/rule" name="Rule" />}
            content={
              <>
                <Helmet>
                  <title>One Ring</title>
                </Helmet>
                <PageHeader header="To Rule Them All" halo="One Ring" />
              </>
            }
            navAriaLabel="One Ring Side Nav"
            contentAriaLabelledBy={PAGE_HEADER_AND_HALO_ID}
          />
        </MemoryRouter>,
      );
    });

    it('renders the main content', () => {
      const region = screen.getByRole('region', { name: 'One Ring To Rule Them All' });
      expect(region).toBeInTheDocument();
    });
  });
});
