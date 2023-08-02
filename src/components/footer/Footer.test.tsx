import * as React from 'react';
import { render, screen } from '@testing-library/react';

import { BrowserRouter as Router } from 'react-router-dom';
import { Footer } from './Footer';

describe('Footer', () => {
  beforeEach(() => {
    render(
      <Router>
        <Footer />
      </Router>,
    );
  });

  it('contains expected links', () => {
    const links = screen.getAllByRole('link');
    expect(links.length).toEqual(7);

    const publishingLink = screen.getByRole('link', { name: 'API Publishing' });
    expect(publishingLink).toBeInTheDocument();
    expect(publishingLink).toHaveAttribute('href', '/api-publishing');

    const accessibilityLink = screen.getByRole('link', { name: 'Accessibility' });
    expect(accessibilityLink).toBeInTheDocument();
    expect(accessibilityLink).toHaveAttribute('href', 'https://www.section508.va.gov/');

    const supportLink = screen.getByRole('link', { name: 'Support' });
    expect(supportLink).toBeInTheDocument();
    expect(supportLink).toHaveAttribute('href', '/support');

    const policiesLink = screen.getByRole('link', { name: 'Web Policies' });
    expect(policiesLink).toBeInTheDocument();
    expect(policiesLink).toHaveAttribute('href', 'https://www.va.gov/webpolicylinks.asp');

    const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
    expect(termsLink).toBeInTheDocument();
    expect(termsLink).toHaveAttribute('href', '/terms-of-service');

    const privacyLink = screen.getByRole('link', { name: 'Privacy' });
    expect(privacyLink).toBeInTheDocument();
    expect(privacyLink).toHaveAttribute('href', 'https://www.va.gov/privacy/');

    const logoLink = screen.getByAltText('Department of Veterans Affairs').closest('a');
    expect(logoLink).toBeInTheDocument();
    expect(logoLink).toHaveAttribute('href', 'https://www.va.gov');
  });
});
