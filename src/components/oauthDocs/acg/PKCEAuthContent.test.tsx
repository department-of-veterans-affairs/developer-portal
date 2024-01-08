import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';

import { lookupApiBySlug } from '../../../apiDefs/query';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import { setApis } from '../../../features/apis/apisSlice';
import { PKCEAuthContent } from './PKCEAuthContent';

describe('Auth Flow Content', () => {
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
            <PKCEAuthContent api={api} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });
  it('PKCE Auth Header', () => {
    const heading = screen.getByText('PKCE (Proof Key for Code Exchange) Authorization');
    expect(heading).toBeInTheDocument();
  });
  it('Oauth base path found ', () => {
    const basePath = screen.getByText(/oauth2\/armageddon\/v1\/authorization\?/i);
    expect(basePath).toBeInTheDocument();
  });
  it('Corrent number of code wrappers', () => {
    const codeWrapperArray = document.getElementsByClassName('code-wrapper');
    expect(codeWrapperArray.length).toBeGreaterThanOrEqual(6);
  });
});
