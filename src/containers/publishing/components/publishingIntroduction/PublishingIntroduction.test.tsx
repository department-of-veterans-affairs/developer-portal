import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import PublishingIntroduction from './PublishingIntroduction';

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
});
