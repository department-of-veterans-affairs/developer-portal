import '@testing-library/jest-dom/extend-expect';
import { cleanup, render } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { NavBar } from './NavBar';

const noop = (): void => undefined;

afterEach(cleanup);

describe('NavBar', () => {
  it('should render the navbar', () => {
    const { getAllByText } = render(
      <Router>
        <NavBar isMobileMenuVisible onMobileNavClose={noop} />
      </Router>,
    );
    const documentation = getAllByText('Documentation')[0];
    expect(documentation).toBeInTheDocument();
  });

  it('should use "va-api-mobile-nav-visible" when isMobileMenuVisible is true', () => {
    let navbar = render(
      <Router>
        <NavBar isMobileMenuVisible={false} onMobileNavClose={noop} />
      </Router>,
    );
    expect(navbar.container.querySelector('nav')?.classList.contains('va-api-mobile-nav-visible')).toBeFalsy();

    navbar = render(
      <Router>
        <NavBar isMobileMenuVisible onMobileNavClose={noop} />
      </Router>,
    );
    expect(navbar.container.querySelector('nav')?.classList.contains('va-api-mobile-nav-visible')).toBeTruthy();
  });
});
