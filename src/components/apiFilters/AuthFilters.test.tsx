import React from 'react';
import { render } from '@testing-library/react';
import { AuthFilters } from './AuthFilters';

describe('AuthFilters', () => {
  const handleAuthTypeFilterSubmit = jest.fn();

  beforeEach(() => {
    render(<AuthFilters authFilter={[]} handleAuthTypeFilterSubmit={handleAuthTypeFilterSubmit} />);
  });

  it('should render', () => {
    expect(document.querySelector('.explore-filter-form')).toBeInTheDocument();
  });
});
