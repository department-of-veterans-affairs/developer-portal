import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { BrowserRouter as Router, Router as HistoryRouter } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { Provider } from 'react-redux';
import { APICategory, APIDescription } from '../../apiDefs/schema';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import * as apiDefs from '../../apiDefs/query';
import { apiLoadingState } from '../../types/constants';
import store from '../../store';
import { ApiFilters } from './ApiFilters';

describe('ApiFilters', () => {
  const setApis = jest.fn();
  global.scrollTo = jest.fn();
  const apis: APIDescription[] = Object.values(fakeCategories).flatMap(
    (category: APICategory) => category.apis,
  );
  const getAllApisSpy = jest.spyOn(apiDefs, 'getAllApis');
  const apisLoadedSpy = jest.spyOn(apiDefs, 'getApisLoadedState');
  beforeEach(() => {
    getAllApisSpy.mockReturnValue(apis);
    apisLoadedSpy.mockReturnValue(apiLoadingState.LOADED);
  });
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render', () => {
    const { container } = render(
      <Provider store={store}>
        <Router>
          <ApiFilters apis={apis} setApis={setApis} />
        </Router>
      </Provider>,
    );
    expect(container.querySelector('.filters-toggle-button')).toBeInTheDocument();
  });

  it('displays a filter pill for given search', () => {
    const history = createMemoryHistory();
    history.push('/explore?q=georgia');
    render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ApiFilters apis={apis} setApis={setApis} />
        </HistoryRouter>
      </Provider>,
    );
    const element: HTMLElement = screen.getByText("'georgia'");
    fireEvent.click(element);
    expect(history.location.search).toBe('');
  });

  it('clears all filters when "Clear all" button is clicked', () => {
    const history = createMemoryHistory();
    history.push('/explore?auth=ccg');
    const { container } = render(
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ApiFilters apis={apis} setApis={setApis} />
        </HistoryRouter>
      </Provider>,
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
      <Provider store={store}>
        <HistoryRouter history={history}>
          <ApiFilters apis={apis} setApis={setApis} />
        </HistoryRouter>
      </Provider>,
    );
    const ccgPill = screen.getByRole('button', { name: 'Client Credentials Grant' });
    expect(ccgPill).toBeInTheDocument();
    fireEvent.click(ccgPill);
    expect(history.location.pathname).toBe('/explore');
  });
});
