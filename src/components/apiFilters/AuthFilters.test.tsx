import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { AuthFilters } from './AuthFilters';

describe('AuthFilters', () => {
  const handleAuthTypeFilterSubmit = jest.fn();

  beforeEach(() => {
    render(<AuthFilters authFilter={[]} handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit} />);
  });

  it('should render', () => {
    expect(document.querySelector('.explore-filter-form')).toBeInTheDocument();
  });

  it('submits the form when button is clicked', async () => {
    const submitButton = screen.getByRole('button', {
      name: 'Apply filters to update the API list and close the filter menu',
    });
    fireEvent.click(submitButton);
    await waitFor(() => expect(handleAuthTypeFilterSubmit).toHaveBeenCalledTimes(1));
  });
});
