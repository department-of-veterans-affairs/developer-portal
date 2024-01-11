import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';

import { lookupApiBySlug } from '../../../apiDefs/query';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import { setApis } from '../../../features/apis/apisSlice';
import { AuthCodeGrantContent } from './AuthCodeGrantContent';

describe('Auth Grant Content', () => {
  store.dispatch(setApis(fakeCategories));

  beforeEach(() => {
    const selectedOption = 'armageddon';
    const api = lookupApiBySlug(selectedOption);
    if (!api) {
      return;
    }

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <AuthCodeGrantContent api={api} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });
  it('Initiating auth grant header', () => {
    const heading = screen.getByText('Initiating the Authorization Code Grant');
    expect(heading).toBeInTheDocument();
  });
  it('Oauth base path found ', () => {
    const codeWrapperArray = screen.getAllByText(/\/oauth2\/armageddon\/v1\/authorization\?/i);
    expect(codeWrapperArray.length).toBeGreaterThan(0);
  });
  it('Correct number of code wrappers', () => {
    const codeWrapperArray = document.getElementsByClassName('code-wrapper');
    expect(codeWrapperArray.length).toBeGreaterThanOrEqual(11);
  });
});
