import { cleanup, getAllByRole, render, screen, waitFor } from '@testing-library/react';
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
    it.each([
      ['Explore APIs', '/explore'],
      ['Onboarding', '/onboarding'],
      ['About', '/about'],
      ['API Status', 'https://valighthouse.statuspage.io'],
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
