import * as React from 'react';
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import store from '../../store';
import { FlagsProvider, getFlags } from '../../flags';
import * as apiDefs from '../../apiDefs/query';
import { ReleaseNotes } from './ReleaseNotes';
import 'jest';

describe('ReleaseNotes', () => {
  const lotrRingsApi = fakeCategories.lotr.apis[0];

  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiBySlug');

  afterEach(() => {
    jest.resetAllMocks();
  });

  beforeEach(async () => {
    lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/rings/release-notes']}>
            <Routes>
              <Route path="/explore/api/:urlSlug/release-notes" element={<ReleaseNotes />} />
            </Routes>
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders the heading', () => {
    const heading1 = screen.getByRole('heading', { level: 1, name: /Release notes/ });
    expect(heading1).toBeInTheDocument();
  });

  it('renders the existing notes', () => {
    const dateHeadings = screen.getAllByRole('heading', { level: 2 });
    expect(dateHeadings.length).toBe(2);
  });
});
