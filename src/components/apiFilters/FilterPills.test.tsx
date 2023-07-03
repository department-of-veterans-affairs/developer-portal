import React from 'react';
import { fireEvent, render } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { FilterPills } from './FilterPills';

describe('FilterPills', () => {
  const props = { clearAllFilters: jest.fn() };
  const { clearAllFilters } = props;
  let clearAllFiltersSpy: jest.SpyInstance;

  beforeEach(() => {
    clearAllFiltersSpy = jest.spyOn(props, 'clearAllFilters');
  });

  afterEach(() => {
    clearAllFiltersSpy.mockRestore();
  });

  test('should render', () => {
    const pills: JSX.Element[] = [];
    const { getByTestId } = render(
      <Router>
        <FilterPills clearAllFilters={clearAllFilters}>{pills}</FilterPills>
      </Router>,
    );
    expect(getByTestId('filter-pills')).toBeInTheDocument();
  });

  test('for clearAllFilters to be called', () => {
    const pills: JSX.Element[] = [];
    const { getByRole, getByTestId } = render(
      <Router>
        <FilterPills clearAllFilters={clearAllFilters}>{pills}</FilterPills>
      </Router>,
    );
    expect(getByTestId('filter-pills')).toBeInTheDocument();

    fireEvent(
      getByRole('button'),
      new MouseEvent('click', {
        bubbles: true,
        cancelable: true,
      }),
    );
    expect(clearAllFiltersSpy).toHaveBeenCalledTimes(1);
  });
});
