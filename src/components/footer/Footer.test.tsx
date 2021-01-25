import * as React from 'react';
import { render, screen } from '@testing-library/react';

import 'jest';

import { shallow } from 'enzyme';
import { BrowserRouter as Router } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import { Footer } from './Footer';

describe('Footer', () => {
  it('There should be no more beta footer banner', () => {
    const wrapper = shallow(<Footer />);
    expect(wrapper.find('.va-api-beta-banner').length).toBe(0);
  });

  describe('renders', () => {
    beforeEach(() => {
      render(
        <FlagsProvider flags={getFlags()}>
          <Router>
            <Footer />
          </Router>
        </FlagsProvider>
      );
    });

    it('contains expected links', () => {
      const links = screen.getAllByRole('link');
      expect(links.length).toEqual(6);

      const logoLink = screen.getByAltText('Department of Veterans Affairs').closest('a');
      expect(logoLink).toHaveAttribute('href', 'https://www.va.gov');

      const contactLink = screen.getByRole('link', { name: 'Contact Us' });
      expect(contactLink).toBeInTheDocument();

      const termsLink = screen.getByRole('link', { name: 'Terms of Service' });
      expect(termsLink).toBeInTheDocument();

      const accessibilityLink = screen.getByRole('link', { name: 'Accessibility' });
      expect(accessibilityLink).toBeInTheDocument();

      const policiesLink = screen.getByRole('link', { name: 'Web Policies' });
      expect(policiesLink).toBeInTheDocument();

      const privacyLink = screen.getByRole('link', { name: 'Privacy' });
      expect(privacyLink).toBeInTheDocument();
    });
  });
});
