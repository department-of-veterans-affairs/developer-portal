import { cleanup, render, waitFor, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import * as apiDefs from '../../apiDefs/query';
import ApiOverviewPage from './ApiOverviewPage';

describe('ApiOverviewPage', () => {
  const lotrRingsApi = fakeCategories.lotr.apis[0];

  const lookupApiByFragmentMock = jest.spyOn(apiDefs, 'lookupApiBySlug');

  beforeEach(async () => {
    lookupApiByFragmentMock.mockReturnValue(lotrRingsApi);
    await waitFor(() => cleanup());
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter initialEntries={['/explore/api/rings/release-notes']}>
            <Routes>
              <Route path="/explore/api/:urlSlug/release-notes" element={<ApiOverviewPage />} />
            </Routes>
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  describe('Static Content', () => {
    it('renders the page header', () => {
      const heading = screen.getByRole('heading', { name: 'Rings API' });
      expect(heading).toBeInTheDocument();
    });

    it('renders a link to the docs', () => {
      const link = screen.getByRole('link', { name: 'Read the docs' });
      expect(link).toHaveAttribute('href', '/explore/api/rings/docs');
    });
  });

  describe('API Overview Page Dynamic Content', () => {
    it('renders the heading', () => {
      const heading = screen.getByRole('heading', { level: 3, name: 'With this API you can' });
      expect(heading).toBeInTheDocument();
    });

    it('renders the lists', () => {
      const list = screen.getByRole('list');
      expect(list).toHaveTextContent('Rule them all');
      expect(list).toHaveTextContent('Find them');
      expect(list).toHaveTextContent('Bring them all');
      expect(list).toHaveTextContent('And in the darkness bind them');
    });

    it('renders links', () => {
      const link = screen.getByRole('link', { name: 'Start developing' });
      expect(link).toHaveAttribute('href', '/explore/api/rings/sandbox-access');
    });
  });
});
