import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { PublishingOnboarding } from './PublishingOnboarding';

describe('PublishingOnboarding', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing']}>
        <PublishingOnboarding />
      </MemoryRouter>
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'How publishing works' });
    expect(header).toBeInTheDocument();
  });
});
