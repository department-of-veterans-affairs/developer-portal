import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';

import { getActiveOauthApis, lookupApiByFragment } from '../../../apiDefs/query';
import store from '../../../store';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import { setApis } from '../../../actions';
import { PKCEAuthContent } from './PKCEAuthContent';

describe('Auth Flow Content', () => {
  store.dispatch(setApis(fakeCategories));

  beforeEach(() => {
    const selectedOption = 'armageddon';
    const apiDef = lookupApiByFragment(selectedOption);
    const defs = getActiveOauthApis();

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <PKCEAuthContent apiDef={apiDef} options={defs} selectedOption={selectedOption} />
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
