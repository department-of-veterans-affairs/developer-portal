import React from 'react';
import { render } from '@testing-library/react';
import { SearchFilters } from './SearchFilters';

describe('SearchFilters', () => {
  const handleSearchSubmit = jest.fn();

  beforeEach(() => {
    render(<SearchFilters handleSearchSubmit={handleSearchSubmit} search="" />);
  });

  it('should render', () => {
    expect(document.querySelector('#explore-page-fuzzy-search')).toBeInTheDocument();
  });
});
