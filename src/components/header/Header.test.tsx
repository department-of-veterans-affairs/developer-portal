import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import { Header } from './Header';

describe('Header', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
        <Router>
          <Header />
        </Router>
      </FlagsProvider>,
    );
  });

  it('should render the header', () => {
    expect(screen.getByText(/Developer/)).toBeInTheDocument();
  });

  it('should contain a the Veterans Crisis Line modal', () => {
    expect(screen.getByText(/Veterans Crisis Line/)).toBeInTheDocument();
  });

  it('should contain a link to skip to the main content', () => {
    const mainContentLink: HTMLAnchorElement = screen.getByRole('link', {
      name: 'Skip to main content',
    }) as HTMLAnchorElement;

    expect(mainContentLink.getAttribute('href')).toBe('/#main');
  });

  describe('when the menu button is clicked', () => {
    it('displays the menu on mobile', () => {
      const navigation = screen.getByRole('navigation');

      expect(navigation.classList.contains('va-api-mobile-nav-visible')).toBeFalsy();

      userEvent.click(screen.getByText('Menu'));

      expect(navigation.classList.contains('va-api-mobile-nav-visible')).toBeTruthy();
    });
  });
});
