import { cleanup, render, screen, waitFor } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { NavBar } from './NavBar';

const noop = (): void => undefined;
const flags = getFlags();

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={flags}>
        <Router>
          <NavBar isMobileMenuVisible onMobileNavClose={noop} />
        </Router>
      </FlagsProvider>,
    );
  });

  it('should render the navbar', () => {
    const navbar = screen.getByRole('navigation');
    expect(navbar).toBeInTheDocument();
  });

  describe('links', () => {
    /*
     * The Documentation, Onboarding, and API Publishing navigation items are links in the
     * desktop view and buttons in the mobile view. Both are rendered even though only one
     * will only be visible at a time based on the view.
     */
    it.each([
      ['Documentation', '/explore'],
      ['Onboarding', '/onboarding'],
      ['API Publishing', '/api-publishing'],
    ])('contains the %s link with the correct URL (%s) and the corresponding button for the mobile nav', (
      navItemText: string,
      linkURL: string,
    ) => {
      const link = screen.getByRole('link', { name: navItemText });
      expect(link).toHaveAttribute('href', linkURL);
      const button = screen.getByRole('button', { name: navItemText });
      expect(button).toBeInTheDocument();
    });

    /*
     * The News, Release Notes, Support, and API Status navigation items are links in both
     * the desktop view and mobile view. Both are rendered even though only one will only be
     * visible at a time based on the view.
     */
    it.each([
      ['News', '/news'],
      ['Release Notes', '/release-notes'],
      ['Support', '/support'],
      ['API Status', 'https://valighthouse.statuspage.io'],
    ])('contains the %s nav links for desktop and mobile', (
      navItemText: string,
      linkURL: string,
    ) => {
      const links = screen.getAllByRole('link', { name: navItemText });
      expect(links.length).toEqual(2);
      expect(links[0]).toHaveAttribute('href', linkURL);
      expect(links[1]).toHaveAttribute('href', linkURL);
    });
  });

  describe('isMobileMenuVisible is true', () => {
    it('should use "va-api-mobile-nav-visible"', () => {
      expect(
        screen.getByRole('navigation').classList.contains('va-api-mobile-nav-visible'),
      ).toBeTruthy();
    });
  });

  describe('isMobileMenuVisible is false', () => {
    beforeEach(async () => {
      // cleanup NavBar rendered with isMobileMenuVisible set to true
      await waitFor(() => cleanup());
      render(
        <FlagsProvider flags={flags}>
          <Router>
            <NavBar isMobileMenuVisible={false} onMobileNavClose={noop} />
          </Router>
        </FlagsProvider>,
      );
    });

    it('should not use "va-api-mobile-nav-visible"', () => {
      expect(
        screen.getByRole('navigation').classList.contains('va-api-mobile-nav-visible'),
      ).toBeFalsy();
    });
  });
});
