import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { cleanup } from 'axe-core';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import * as apiDefs from '../../../apiDefs/query';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrantDocs';

describe('Authorization Docs', () => {
  const armageddonMovie = fakeCategories.movies.apis[1];

  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    lookupApiBySlugMock.mockReturnValue(armageddonMovie);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.movies);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/armageddon/authorization-code']}>
            <Routes>
              <Route
                path="/explore/api/:urlSlug/authorization-code"
                element={<AuthorizationCodeGrantDocs />}
              />
            </Routes>
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Authorization Code Grant' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Building OpenId header', () => {
    const heading = screen.getAllByText('Building OpenID Connect Applications');
    expect(heading).toHaveLength(2);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[1]).toBeInTheDocument();
  });
});
