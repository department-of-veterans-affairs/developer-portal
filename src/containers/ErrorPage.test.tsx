import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../flags';
import store from '../store';
import * as apiQueries from '../apiDefs/query';
import { fakeCategories, fakeCategoryOrder } from '../__mocks__/fakeCategories';
import { setApis } from '../features/apis/apisSlice';
import ErrorPage from './ErrorPage';

interface ErrorPageProps {
  errorCode: number;
  error?: Error;
}

const renderComponent = async (props: ErrorPageProps): Promise<void> => {
  await waitFor(() => cleanup()); // clean up beforeEach render if we're testing a different page
  render(
    <Provider store={store}>
      <FlagsProvider flags={getFlags()}>
        <MemoryRouter>
          <ErrorPage {...props} />
        </MemoryRouter>
      </FlagsProvider>
    </Provider>,
  );
};

describe('ErrorPage', () => {
  store.dispatch(setApis(fakeCategories));

  beforeEach(() => {
    jest.spyOn(apiQueries, 'getApiCategoryOrder').mockReturnValue(fakeCategoryOrder);
    jest.spyOn(apiQueries, 'getApiDefinitions').mockReturnValue(fakeCategories);
  });

  it('renders 404 page successfully', async () => {
    await renderComponent({
      errorCode: 404,
    });

    const heading = screen.getAllByRole('heading', { level: 1 });
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent('Page not found.');
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(
      screen.getAllByText(/Try using these links or the search bar to find your way forward./)
        .length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders 403 page successfully', async () => {
    await renderComponent({
      errorCode: 403,
    });

    const heading = screen.getAllByRole('heading', { level: 1 });
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent('An error was encountered.');
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(
      screen.getAllByText(/Try using these links or the search bar to find your way forward./)
        .length,
    ).toBeGreaterThanOrEqual(1);
  });

  it('renders error page with error text', async () => {
    await renderComponent({
      error: new Error('Computers do not like Lord of the Rings movies in unit tests.'),
      errorCode: 403,
    });

    const heading = screen.getAllByRole('heading', { level: 1 });
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[0]).toHaveTextContent('An error was encountered.');
    expect(screen.getAllByRole('heading', { level: 2 })).toHaveLength(3);
    expect(
      screen.getAllByText(/Error: Computers do not like Lord of the Rings movies in unit tests./)
        .length,
    ).toBe(1);
  });
});
