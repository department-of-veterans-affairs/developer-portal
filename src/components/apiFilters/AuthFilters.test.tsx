import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthFilters } from './AuthFilters';

describe('AuthFilters', () => {
  const handleAuthTypeFilterSubmit = jest.fn();

  it('should render', () => {
    render(<AuthFilters authFilter={[]} handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit} />);
    expect(document.querySelector('.explore-filter-form')).toBeInTheDocument();
  });

  it('submits the form when button is clicked', async () => {
    render(<AuthFilters authFilter={[]} handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit} />);
    const submitButton = screen.getByRole('button', {
      name: 'Apply filters to update the API list and close the filter menu',
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(handleAuthTypeFilterSubmit).toHaveBeenCalledTimes(1));
  });

  it('sets aria-expanded', async () => {
    render(
      <AuthFilters authFilter={['acg']} handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit} />,
    );
    const authTypeButton = screen.getAllByRole('button', {
      name: 'Auth Type, 1 filter applied',
    })[0];
    fireEvent.click(authTypeButton);
    await waitFor(() => expect(authTypeButton).toHaveAttribute('aria-expanded', 'true'));
    fireEvent.click(authTypeButton);
    await waitFor(() => expect(authTypeButton).toHaveAttribute('aria-expanded', 'false'));
  });
});
