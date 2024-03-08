import { cleanup, render, screen, waitFor } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { setupServer } from 'msw/lib/node';
import { MockedRequest, MockedResponse, ResponseComposition, RestContext, rest } from 'msw';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import * as apiDefs from '../../apiDefs/query';
import testUserData from '../../../cypress/fixtures/test-user-data.json';
import { ACGInfo, APIDescription } from '../../apiDefs/schema';
import TestUsersPage from './TestUsersPage';

const server = setupServer(
  rest.post(
    'http://localhost:4444/platform-backend/v0/consumers/test-user-data',
    (
      req: MockedRequest,
      res: ResponseComposition,
      context: RestContext,
    ): MockedResponse | Promise<MockedResponse> =>
      res(context.delay(750), context.status(200), context.json(testUserData)),
  ),
  rest.post(
    'http://localhost/platform-backend/v0/consumers/test-user-data',
    (
      req: MockedRequest,
      res: ResponseComposition,
      context: RestContext,
    ): MockedResponse | Promise<MockedResponse> =>
      res(context.delay(750), context.status(200), context.json(testUserData)),
  ),
);
describe('TestUsersPage', () => {
  const armageddonApi = fakeCategories.movies.apis[1];
  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiBySlug');

  beforeAll(() => server.listen());

  beforeEach(async () => {
    lookupApiByFragmentMock.mockReturnValue(armageddonApi);
    await waitFor(() => cleanup());
  });

  describe('Static Content', () => {
    it('renders the page header after the progress bar completes', async () => {
      const { container } = render(
        <Provider store={store}>
          <FlagsProvider flags={getFlags()}>
            <MemoryRouter initialEntries={['/explore/api/armageddon/test-users/123/good-hash']}>
              <Routes>
                <Route
                  path="/explore/api/:urlSlug/test-users/:userId/:hash"
                  element={<TestUsersPage />}
                />
              </Routes>
            </MemoryRouter>
          </FlagsProvider>
        </Provider>,
      );
      const loadingIndicator = container.querySelector('va-loading-indicator');
      expect(loadingIndicator).toBeInTheDocument();
      await waitFor(async () => {
        const heading = await screen.findByRole('heading', { level: 1, name: /Armageddon API/ });
        expect(heading).toBeInTheDocument();
      });
    });
  });

  describe('Test users content', () => {
    it('renders the test users table', async () => {
      render(
        <Provider store={store}>
          <FlagsProvider flags={getFlags()}>
            <MemoryRouter initialEntries={['/explore/api/armageddon/test-users/123/good-hash']}>
              <Routes>
                <Route
                  path="/explore/api/:urlSlug/test-users/:userId/:hash"
                  element={<TestUsersPage />}
                />
              </Routes>
            </MemoryRouter>
          </FlagsProvider>
        </Provider>,
      );
      await waitFor(() => {
        const heading = screen.queryByRole('heading', {
          level: 2,
          name: /Test user credentials for the Armageddon API/,
        });
        expect(heading).toBeInTheDocument();
        // All data tested for is fake data / non-pii information
        const user1 = screen.queryByText(/1012667145V762142/); // ICN
        expect(user1).toBeInTheDocument();
        const user2 = screen.queryByText(/va.api.user\+002@gmail.com/); // Email
        expect(user2).toBeInTheDocument();
        const user3 = screen.queryByText(/796378782/); // SSN
        expect(user3).toBeInTheDocument();
        const user4 = screen.queryByText(/OMSKULT5PSVFE3SINTWBT2YA2MSFXU4/); // 2-factor seed
        expect(user4).toBeInTheDocument();
        const user5 = screen.queryByText(/Pauline/); // First name
        expect(user5).toBeInTheDocument();
      });
    });
  });
});
describe('TestUsersPage disabled', () => {
  const armageddonApi: APIDescription = {
    ...fakeCategories.movies.apis[1],
    oAuthInfo: {
      ...fakeCategories.movies.apis[1].oAuthInfo,
      acgInfo: {
        ...fakeCategories.movies.apis[1].oAuthInfo?.acgInfo,
        disableTestUsersPage: true,
      } as ACGInfo,
    },
  };
  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiBySlug');

  beforeAll(() => server.listen());

  describe('Static Content', () => {
    it('renders the page header after the progress bar completes', () => {
      lookupApiByFragmentMock.mockReturnValue(armageddonApi);
      spyOn(console, 'error');
      expect(() => {
        render(
          <Provider store={store}>
            <FlagsProvider flags={getFlags()}>
              <MemoryRouter initialEntries={['/explore/api/armageddon/test-users/123/good-hash']}>
                <Routes>
                  <Route
                    path="/explore/api/:urlSlug/test-users/:userId/:hash"
                    element={<TestUsersPage />}
                  />
                </Routes>
              </MemoryRouter>
            </FlagsProvider>
          </Provider>,
        );
      }).toThrow();
    });
  });
});
