import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { FlagsProvider, getFlags } from '../../../../flags';
import { PublishingExpectations } from './PublishingExpectations';

describe('PublishingExpectations', () => {
  beforeEach(() => {
    render(
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter initialEntries={['/api-publishing/expectations']}>
          <PublishingExpectations />
        </MemoryRouter>
      </FlagsProvider>,
    );
  });

  it('renders successfully', () => {
    expect(
      screen.getByRole('heading', { name: 'Expectations for Lighthouse APIs' }),
    ).toBeInTheDocument();
  });

  it('renders all accordions in a closed state', () => {
    const buttons = screen.getAllByRole('button');
    buttons.forEach(button => {
      expect(button.getAttribute('aria-expanded')).toBe('false');
    });
  });

  describe.each([
    ['Security'],
    ['Documentation'],
    ['Versioning'],
    ['Monitoring'],
    ['Support'],
    ['Modernization'],
    ['Authentication and Authorization'],
  ])('%s', name => {
    it('renders succesfully', () => {
      expect(screen.getByRole('heading', { name })).toBeInTheDocument();
    });
  });
});
