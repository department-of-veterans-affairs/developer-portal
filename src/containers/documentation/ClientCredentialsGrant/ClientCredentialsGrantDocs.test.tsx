import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import * as apiDefs from '../../../apiDefs/query';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrantDocs';

const apollo13Api = fakeCategories.movies.apis[0];

describe('Client Credentials Docs', () => {
  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');
  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(() => {
    lookupApiBySlugMock.mockReturnValue(apollo13Api);
    lookupApiCategoryMock.mockReturnValue(fakeCategories.movies);

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

  test('Requesting a Token header', () => {
    const heading = screen.getAllByText('Requesting a Token with CCG');
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
  });
});

describe('CCG Test Users Section', () => {
  const lookupApiBySlugMock = jest.spyOn(apiDefs, 'lookupApiBySlug');
  const lookupApiCategoryMock = jest.spyOn(apiDefs, 'lookupApiCategory');

  const renderTest = ({ urlSlug }: { urlSlug: string }): void => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={[`/explore/api/${urlSlug}/client-credentials`]}>
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

    const testUsersSection = screen.queryByText('Test user ICNs');

    expect(testUsersSection).not.toBeInTheDocument();
  };

  describe('Guaranty Remittance API', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    beforeEach(() => {
      lookupApiBySlugMock.mockReturnValue({
        ...apollo13Api,
        urlFragment: 'lgy_guaranty_remittance',
        urlSlug: 'guaranty-remittance',
      });
      lookupApiCategoryMock.mockReturnValue(fakeCategories.movies);
    });

    test('section does not render on Guaranty Remittance API', () => {
      renderTest({ urlSlug: 'guaranty-remittance' });
    });
  });

  describe('Loan Review API', () => {
    afterEach(() => {
      jest.resetAllMocks();
    });

    beforeEach(() => {
      lookupApiBySlugMock.mockReturnValue({
        ...apollo13Api,
        urlFragment: 'loan-review',
        urlSlug: 'loan-review',
      });
      lookupApiCategoryMock.mockReturnValue(fakeCategories.movies);
    });

    test('section does not render on Loan Review API', () => {
      renderTest({ urlSlug: 'loan-review' });
    });
  });
});
