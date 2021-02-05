import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
        <Router>
          <Footer />
        </Router>
      </FlagsProvider>,
    );
  });

  it('contains expected links', () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(6);

    const logoLink = screen.getByAltText('Department of Veterans Affairs').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', 'https://www.va.gov');

    const contactLink = screen.getByRole('link', { name: 'Contact Us' });
    expect(contactLink).toBeInTheDocument();
    expect(contactLink).toHaveAttribute('href', '/support/contact-us');

    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-of-service');

    const accessibilityLink = screen.getByRole('link', { name: 'Accessibility' });
    expect(accessibilityLink).toBeInTheDocument();
    expect(accessibilityLink).toHaveAttribute('href', 'https://www.section508.va.gov/');

    const policiesLink = screen.getByRole('link', { name: 'Web Policies' });
    expect(policiesLink).toBeInTheDocument();
    expect(policiesLink).toHaveAttribute('href', 'https://www.va.gov/webpolicylinks.asp');

    const privacyLink = screen.getByRole('link', { name: 'Privacy' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', 'https://www.va.gov/privacy/');
  });
});
