/* eslint-disable max-lines -- exception for test suite */
import { cleanup, render, screen, waitFor } from '@testing-library/react';
import 'jest';
import * as React from 'react';
import { MemoryRouter, Route } from 'react-router';
import { Provider } from 'react-redux';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import store from '../../store';
import { FlagsProvider, getFlags } from '../../flags';
import * as apiDefs from '../../apiDefs/query';
import { ReleaseNotes } from './ReleaseNotes';

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
            <Route path="/explore/api/:urlSlug/release-notes" component={ReleaseNotes} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders the heading', () => {
    const heading1 = screen.getByRole('heading', { name: 'Release notes' });
    expect(heading1).toBeInTheDocument();
    const heading2 = screen.getByRole('heading', { name: 'Rings API' });
    expect(heading2).toHaveTextContent('Rings API');
  });

  it('renders the existing notes', () => {
    const dateHeadings = screen.getAllByRole('heading', { level: 3 });
    expect(dateHeadings.length).toBe(2);
  });
});
