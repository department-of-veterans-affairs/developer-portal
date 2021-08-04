import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PublishingIntroduction } from './PublishingIntroduction';

describe('PublishingIntroduction', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing']}>
        <PublishingIntroduction />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });

  describe('card links', () => {
    it.each([
      ['How onboarding works', '/api-publishing/process'],
      ['Expectations of Lighthouse APIs', '/api-publishing/expectations'],
      ['Contact us', '/support/contact-us'],
    ])('has the "%s" card link', (title: string, url: string) => {
      const cardLink = screen.getByRole('link', { name: title });
      expect(cardLink).toBeInTheDocument();
      expect(cardLink).toHaveAttribute('href', url);
    });
  });
});
