import { render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route } from 'react-router-dom';
import { cleanup } from 'axe-core';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import * as apiDefs from '../../../apiDefs/query';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrantDocs';

describe('Authorization Docs', () => {
  const lotrRingsApi = fakeCategories.lotr.apis[0];

  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    lookupApiBySlugMock.mockReturnValue(lotrRingsApi);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.lotr);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/lotr/authorization-code']}>
            <Route
              path="/explore/api/:urlSlug/authorization-code"
              component={AuthorizationCodeGrantDocs}
            />
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
