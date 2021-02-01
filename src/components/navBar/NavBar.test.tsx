import { cleanup, render, RenderResult, screen } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { NavBar } from './NavBar';

const noop = (): void => undefined;

const renderNavBar = (isMobileMenuVisible: boolean): RenderResult => (
  render(
    <FlagsProvider flags={getFlags()}>
      <Router>
        <NavBar isMobileMenuVisible={isMobileMenuVisible} onMobileNavClose={noop} />
      </Router>
    </FlagsProvider>
  )
);

afterEach(cleanup);

describe('NavBar', () => {
  it('should render the navbar', () => {
    const { getAllByText } = renderNavBar(true);

    const documentation = getAllByText('Documentation')[0];
    expect(documentation).toBeInTheDocument();
  });

  it('should use "va-api-mobile-nav-visible" when isMobileMenuVisible is true', () => {
    let navbar = renderNavBar(false);
    expect(navbar.container.querySelector('nav')?.classList.contains('va-api-mobile-nav-visible')).toBeFalsy();

    navbar = renderNavBar(true);
    expect(navbar.container.querySelector('nav')?.classList.contains('va-api-mobile-nav-visible')).toBeTruthy();
  });

  it('contains the expected links', () => {
    renderNavBar(true);

    const documentation = screen.getByRole('link', { name: 'Documentation' });
    expect(documentation).toHaveAttribute('href', '/explore');

    const documentationButton = screen.getByRole('button', { name: 'Documentation Expand Documentation' });
    expect(documentationButton).toBeInTheDocument();

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

    const publishingButton = screen.getByRole('button', { name: 'API Publishing Expand API Publishing' });
    expect(publishingButton).toBeInTheDocument();

    const status = screen.getAllByRole('link', { name: 'API Status' });
    expect(status.length).toEqual(2);
    expect(status[0]).toHaveAttribute('href', 'https://valighthouse.statuspage.io');
    expect(status[1]).toHaveAttribute('href', 'https://valighthouse.statuspage.io');
  });
});
