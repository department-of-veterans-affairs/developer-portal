import React from 'react';
import { act, fireEvent, render, screen, waitFor } from '@testing-library/react';
import { createMemoryRouter, MemoryRouter, Route, Routes, RouterProvider } from 'react-router-dom';
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
        <MemoryRouter>
          <Routes>
            <Route path="/" element={<ApiFilters apis={apis} setApis={setApis} />} />
          </Routes>
        </MemoryRouter>
      </Provider>,
    );
    expect(container.querySelector('.filters-toggle-button')).toBeInTheDocument();
  });

  it('displays a filter pill for given search', () => {
    const router = createMemoryRouter(
      [
        {
          element: <ApiFilters apis={apis} setApis={setApis} />,
          path: '/explore',
        },
      ],
      {
        initialEntries: ['/explore?q=georgia'],
      },
    );
    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const element: HTMLElement = screen.getByText("'georgia'");
    fireEvent.click(element);
    expect(router.state.location.search).toBe('');
  });

  it('clears all filters when "Clear all" button is clicked', () => {
    const router = createMemoryRouter(
      [
        {
          element: <ApiFilters apis={apis} setApis={setApis} />,
          path: '/explore',
        },
      ],
      {
        initialEntries: ['/explore?auth=ccg'],
      },
    );

    const { container } = render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    expect(container.querySelectorAll('.va-api-filter-pill')).toHaveLength(1);
    const clearAllButton = screen.getByRole('button', { name: 'Clear all filters' });
    fireEvent.click(clearAllButton);
    expect(container.querySelectorAll('.va-api-filter-pill')).toHaveLength(0);
  });

  it('removes auth filter when clicked on the auth Pill', () => {
    const router = createMemoryRouter(
      [
        {
          element: <ApiFilters apis={apis} setApis={setApis} />,
          path: '/explore',
        },
      ],
      {
        initialEntries: ['/explore?auth=ccg'],
      },
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    const ccgPill = screen.getByRole('button', { name: /Client Credentials Grant/ });
    expect(ccgPill).toBeInTheDocument();
    fireEvent.click(ccgPill);
    expect(router.state.location.pathname).toBe('/explore');
  });

  it('sets localStorage exploreApisPath on location change', async () => {
    const router = createMemoryRouter(
      [
        {
          element: <ApiFilters apis={apis} setApis={setApis} />,
          path: '/explore/:categoryUrlSlugs',
        },
      ],
      {
        initialEntries: ['/explore/va-benefits'],
      },
    );

    render(
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>,
    );
    expect(localStorage.getItem('exploreApisPath')).toBe('/explore/va-benefits');
    await act(async () => {
      await router.navigate('/explore/va-benefits?auth=ccg');
    });

    await waitFor(() => {
      expect(localStorage.getItem('exploreApisPath')).toBe('/explore/va-benefits?auth=ccg');
    });
    localStorage.clear();
  });
});
