import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cleanup } from 'axe-core';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import * as apiDefs from '../../../apiDefs/query';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrantDocs';

const apollo13Api = fakeCategories.movies.apis[0];

describe('Authorization Docs', () => {
  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    lookupApiBySlugMock.mockReturnValue(apollo13Api);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.movies);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/apollo-13/client-credentials']}>
            <Routes>
              <Route
                path="/explore/api/:urlSlug/client-credentials"
                element={<ClientCredentialsGrantDocs />}
              />
            </Routes>
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Client Credentials Grant' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Requesting a Token header', () => {
    const heading = screen.getAllByText('Requesting a Token with CCG');
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
  });
});
