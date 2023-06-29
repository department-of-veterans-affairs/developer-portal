import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Router as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import { ApiFilters } from './ApiFilters';

describe('ApiFilters', () => {
  const setApis = jest.fn();
  const apis: APIDescription[] = Object.values(fakeCategories).flatMap(
    (category: APICategory) => category.apis,
  );

  it('should render', () => {
    const { container } = render(
      <Router>
        <ApiFilters apis={apis} setApis={setApis} />
      </Router>,
    );
    expect(container.querySelector('.filters-toggle-button')).toBeInTheDocument();
  });

  it('displays a filter pill for given search', () => {
    const history = createMemoryHistory();
    history.push('/explore?q=georgia');
    render(
      <HistoryRouter history={history}>
        <ApiFilters apis={apis} setApis={setApis} />
      </HistoryRouter>,
    );
    const searchPill = screen.getByText("'georgia'");
    fireEvent.click(searchPill);
    expect(history.location.search).toBe('');
  });

  it('clears all filters when "Clear all" button is clicked', () => {
    const history = createMemoryHistory();
    history.push('/explore?auth=ccg');
    const { container } = render(
      <HistoryRouter history={history}>
        <ApiFilters apis={apis} setApis={setApis} />
      </HistoryRouter>,
    );
    expect(container.querySelectorAll('.va-api-filter-pill')).toHaveLength(1);
    const clearAllButton = screen.getByRole('button', { name: 'Clear all' });
    fireEvent.click(clearAllButton);
    expect(container.querySelectorAll('.va-api-filter-pill')).toHaveLength(0);
  });

  it('removes auth filter when clicked on the auth Pill', () => {
    const history = createMemoryHistory();
    history.push('/explore?auth=ccg');
    render(
      <HistoryRouter history={history}>
        <ApiFilters apis={apis} setApis={setApis} />
      </HistoryRouter>,
    );
    const ccgPill = screen.getByRole('button', { name: 'Client Credentials Grant' });
    expect(ccgPill).toBeInTheDocument();
    fireEvent.click(ccgPill);
    expect(history.location.pathname).toBe('/explore');
  });
});
