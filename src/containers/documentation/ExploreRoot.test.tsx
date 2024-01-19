/* eslint-disable max-nested-callbacks -- Jest callbacks */
import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { fakeCategories } from '../../__mocks__/fakeCategories';
import * as apiQueries from '../../apiDefs/query';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import { setApis } from '../../features/apis/apisSlice';
import { ExploreRoot } from './ExploreRoot';

describe('ExploreRoot', () => {
  store.dispatch(setApis(fakeCategories));
  let getAllApisSpy: jest.SpyInstance;

  beforeEach(() => {
    getAllApisSpy = jest.spyOn(apiQueries, 'getAllApis');

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <ExploreRoot />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const exploreHeading = screen.getByRole('heading', { name: /Explore our APIs/ }, { level: 1 });
    expect(exploreHeading).toBeInTheDocument();
  });

  test('if getAllApis is called', () => {
    expect(getAllApisSpy).toHaveBeenCalled();
  });

  it('should render mocked apis', () => {
    const apiCount = screen.getByTestId('api-count').textContent;
    expect(apiCount).toBe('6');
  });
});
