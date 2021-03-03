import { render, screen } from '@testing-library/react';
import React from 'react';
import { MemoryRouter } from 'react-router';
import ApplyHeader from './ApplyHeader';

describe('ApplyHeader', () => {
  beforeEach(() => {
    render(
      <MemoryRouter>
        <ApplyHeader />
      </MemoryRouter>,
    );
  });

  it('renders succesfully', () => {
    expect(
      screen.getByRole('heading', { name: 'Apply for VA Lighthouse Developer Access' }),
    ).toBeInTheDocument();
  });
});
