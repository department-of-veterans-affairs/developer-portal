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
import TestUsersPage from './TestUsersPage';

const server = setupServer(
  rest.post(
    'http://localhost:4444/platform-backend/v0/consumers/test-user-data',
    (
      req: MockedRequest,
      res: ResponseComposition,
      context: RestContext,
    ): MockedResponse | Promise<MockedResponse> =>
      res(context.status(200), context.json(testUserData)),
  ),
);
describe('TestUsersPage', () => {
  const armageddonApi = fakeCategories.movies.apis[1];
  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiBySlug');

  beforeAll(() => server.listen());

  beforeEach(async () => {
    lookupApiByFragmentMock.mockReturnValue(armageddonApi);
    await waitFor(() => cleanup());
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
  });

  describe('Static Content', () => {
    it('renders the page header', async () => {
      await waitFor(() => {
        const heading = screen.getByRole('heading', { level: 1, name: /Armageddon API/ });
        expect(heading).toBeInTheDocument();
      });
    });
  });
});
