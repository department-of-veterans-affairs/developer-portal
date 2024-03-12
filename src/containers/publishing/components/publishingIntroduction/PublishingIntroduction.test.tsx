import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../../../../store';
import { PUBLISHING_STANDARDS_URL } from '../../../../types/constants/paths';
import { PublishingIntroduction } from './PublishingIntroduction';

describe('PublishingIntroduction', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/api-publishing']}>
          <PublishingIntroduction />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });

  describe('card links', () => {
    it.each([
      ['How onboarding works', '/api-publishing/process'],
      ['Contact us', '/support/contact-us'],
      ['Requirements for APIs', PUBLISHING_STANDARDS_URL],
    ])('has the "%s" card link', (title: string, url: string) => {
      const cardLink = screen.getByRole('link', { name: title });
      expect(cardLink).toBeInTheDocument();
      expect(cardLink).toHaveAttribute('href', url);
    });
  });
});
