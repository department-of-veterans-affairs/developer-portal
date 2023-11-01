import { getAllByRole, render, screen, waitFor } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { NavBar } from './NavBar';

const noop = (): void => undefined;
const flags = getFlags();

describe('NavBar', () => {
  it('should render the navbar', () => {
    render(
      <FlagsProvider flags={flags}>
        <Router>
          <NavBar isMobileMenuVisible onMobileNavClose={noop} />
        </Router>
      </FlagsProvider>,
    );
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  it('sets aria-expanded true when opened', async () => {
    render(
      <FlagsProvider flags={flags}>
        <Router>
          <NavBar isSearchBarVisible isMobileMenuVisible={false} onMobileNavClose={noop} />
        </Router>
      </FlagsProvider>,
    );

    const searchButton = screen.getByTestId('search-button');
    await waitFor(() => expect(searchButton).toHaveAttribute('aria-expanded', 'true'));
  });

  it('sets aria-expanded false when closed', async () => {
    render(
      <FlagsProvider flags={flags}>
        <Router>
          <NavBar isSearchBarVisible={false} isMobileMenuVisible={false} onMobileNavClose={noop} />
        </Router>
      </FlagsProvider>,
    );

    const searchButton = screen.getByTestId('search-button');
    await waitFor(() => expect(searchButton).toHaveAttribute('aria-expanded', 'false'));
  });

  describe('links', () => {
    beforeEach(() => {
      render(
        <FlagsProvider flags={flags}>
          <Router>
            <NavBar isMobileMenuVisible onMobileNavClose={noop} />
          </Router>
        </FlagsProvider>,
      );
    });

    it.each([
      ['Explore APIs', '/explore'],
      ['Onboarding', '/onboarding'],
      ['About', '/about'],
      ['API Status, opens in a new tab', 'https://valighthouse.statuspage.io'],
      ['Support', '/support'],
    ])(
      'contains the %s link with the correct URL (%s) and the corresponding button for the mobile nav',
      (navItemText: string, linkURL: string) => {
        const navbar = screen.getByRole('navigation');
        const link = getAllByRole(navbar, 'link', { name: navItemText });
        expect(link[0]).toHaveAttribute('href', linkURL);
        expect(link[0]).toBeInTheDocument();
      },
    );
  });

  describe('isMobileMenuVisible is true', () => {
    it('should use "va-api-mobile-nav-visible"', () => {
      render(
        <FlagsProvider flags={flags}>
          <Router>
            <NavBar isMobileMenuVisible onMobileNavClose={noop} />
          </Router>
        </FlagsProvider>,
      );
      const navbar = screen.getByRole('navigation');
      expect(navbar.classList.contains('va-api-mobile-nav-visible')).toBeTruthy();
    });
  });

  describe('isMobileMenuVisible is false', () => {
    it('should not use "va-api-mobile-nav-visible"', () => {
      render(
        <FlagsProvider flags={flags}>
          <Router>
            <NavBar isMobileMenuVisible={false} onMobileNavClose={noop} />
          </Router>
        </FlagsProvider>,
      );
      expect(
        screen.getByRole('navigation').classList.contains('va-api-mobile-nav-visible'),
      ).toBeFalsy();
    });
  });
});
