import { cleanup, render, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { NavBar } from './NavBar';

const noop = (): void => undefined;

describe('NavBar', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
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

  it('contains the expected links', () => {
    /*
     * The Documentation and API Publishing navigation items are links in the desktop view
     * and buttons in the mobile view. Both are rendered even though only one will only be
     * visible at a time based on the view.
     */
    const documentation = screen.getByRole('link', { name: 'Documentation' });
    expect(documentation).toHaveAttribute('href', '/explore');
    const documentationButton = screen.getByRole('button', { name: 'Documentation' });
    expect(documentationButton).toBeInTheDocument();

    /*
     * The News, Release Notes, Support, and API Status navigation items are links in both
     * the desktop view and mobile view. Both are rendered even though only one will only be
     * visible at a time based on the view.
     */
    const news = screen.getAllByRole('link', { name: 'News' });
    expect(news.length).toEqual(2);
    expect(news[0]).toHaveAttribute('href', '/news');
    expect(news[1]).toHaveAttribute('href', '/news');

    const releaseNotes = screen.getAllByRole('link', { name: 'Release Notes' });
    expect(releaseNotes.length).toEqual(2);
    expect(releaseNotes[0]).toHaveAttribute('href', '/release-notes');
    expect(releaseNotes[1]).toHaveAttribute('href', '/release-notes');

    const support = screen.getAllByRole('link', { name: 'Support' });
    expect(support.length).toEqual(2);
    expect(support[0]).toHaveAttribute('href', '/support');
    expect(support[1]).toHaveAttribute('href', '/support');

    const publishing = screen.getByRole('link', { name: 'API Publishing' });
    expect(publishing).toHaveAttribute('href', '/api-publishing');
    const publishingButton = screen.getByRole('button', { name: 'API Publishing' });
    expect(publishingButton).toBeInTheDocument();

    const status = screen.getAllByRole('link', { name: 'API Status' });
    expect(status.length).toEqual(2);
    expect(status[0]).toHaveAttribute('href', 'https://valighthouse.statuspage.io');
    expect(status[1]).toHaveAttribute('href', 'https://valighthouse.statuspage.io');
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
      await cleanup();
      render(
        <FlagsProvider flags={getFlags()}>
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
