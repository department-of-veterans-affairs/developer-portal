import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';

import { lookupApiByFragment } from '../../../apiDefs/query';
import store from '../../../store';
import { setApis } from '../../../actions';
import { fakeCategories } from '../../../__mocks__/fakeCategories';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';

describe('Auth Flow Content', () => {
  store.dispatch(setApis(fakeCategories));

  beforeEach(() => {
    const selectedOption = 'armageddon';
    const api = lookupApiByFragment(selectedOption);
    if (!api) {
      return;
    }

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <AuthCodeFlowContent api={api} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });
  it('Initiating auth flow header', () => {
    const heading = screen.getByText('Initiating the Authorization Code Flow');
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
