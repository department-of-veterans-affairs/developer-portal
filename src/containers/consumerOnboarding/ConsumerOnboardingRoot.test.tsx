import { getByRole, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { MemoryRouter } from 'react-router';
import {
  CONSUMER_APIS_PATH,
  CONSUMER_DEMO_PATH,
  CONSUMER_PATH,
  CONSUMER_PROD_PATH,
} from '../../types/constants/paths';
import ConsumerOnboardingRoot from './ConsumerOnboardingRoot';

describe('ConsumerOnboardingRoot', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={[CONSUMER_PATH]}>
        <ConsumerOnboardingRoot />
      </MemoryRouter>,
    );
  });

  describe('side nav', () => {
    it('renders the side nav', () => {
      const nav = screen.getByRole('navigation', { name: 'Consumer Onboarding Page Nav' });
      expect(nav).toBeInTheDocument();
    });

    it.each([
      ['API Consumer onboarding', CONSUMER_PATH],
      ['Request production access', CONSUMER_PROD_PATH],
      ['Prepare for the demo', CONSUMER_DEMO_PATH],
      ['Working with our APIs', CONSUMER_APIS_PATH],
    ])('links to the "%s" page', (linkText: string, path: string) => {
      const nav = screen.getByRole('navigation', { name: 'Consumer Onboarding Page Nav' });
      const link = getByRole(nav, 'link', { name: linkText });
      expect(link).toBeInTheDocument();
      expect(link.getAttribute('href')).toBe(path);
    });
  });

  describe('pages', () => {
    it('renders the overview page', async () => {
      const link = screen.getByRole('link', { name: 'API Consumer onboarding' });
      userEvent.click(link);

      const heading = await screen.findByRole('heading', { name: 'API Consumer Onboarding' });
      expect(heading).toBeInTheDocument();
    });

    // more tests for pages/headings here...
  });
});
