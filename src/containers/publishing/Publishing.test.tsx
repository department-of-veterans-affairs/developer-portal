import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import Publishing from './Publishing';

describe('Publishing', () => {
  beforeEach(() => {
    render(
      <MemoryRouter initialEntries={['/api-publishing']}>
        <Publishing />
      </MemoryRouter>,
    );
  });

  it('renders successfully', () => {
    const header = screen.getByRole('heading', { name: 'Publishing your API on Lighthouse' });
    expect(header).toBeInTheDocument();
  });
});
