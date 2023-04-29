import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { cleanup } from 'axe-core';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import * as apiDefs from '../../../apiDefs/query';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrantDocs';

const lotrRingsApi = fakeCategories.lotr.apis[0];

describe('Authorization Docs', () => {
  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiByFragment');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/lotr/client-credentials']}>
            <Route
              path="/explore/api/:urlFragment/client-credentials"
              component={ClientCredentialsGrantDocs}
            />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/lotr/authorization-code']}>
            <ClientCredentialsGrantDocs />
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
