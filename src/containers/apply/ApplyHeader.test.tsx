import '@testing-library/jest-dom/extend-expect';
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

  it('contains a link to request production access', () => {
    const requestLink = screen.getByRole('link', { name: 'request production access' });

    expect(requestLink).toBeInTheDocument();
    expect(requestLink.getAttribute('href')).toBe('/go-live');
  });
});
