import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';
import store from '../../store';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { APIDescription } from '../../apiDefs/schema';
import { PKCEAuthContent } from './PKCEAuthContent';

describe('Auth Flow Content', () => {
  beforeEach(() => {
    const selectedOption = 'veteran_verification';
    const apiDef = lookupApiByFragment(selectedOption);
    const defs = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));

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
    const x = screen.getAllByText(/\/oauth2\/veteran\-verification\/v1\/authorization\? /i);
    expect(x.length).toBeGreaterThan(0);
  });
  it('Corrent number of code wrappers', () => {
    const x = document.getElementsByClassName('code-wrapper');
    expect(x.length).toBeGreaterThanOrEqual(6);
  });
});
