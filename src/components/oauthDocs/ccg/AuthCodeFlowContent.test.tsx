import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';

import { getActiveCCGApis, lookupApiByFragment } from '../../../apiDefs/query';
import store from '../../../store';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';

describe('Auth Flow Content', () => {
  beforeEach(() => {
    const selectedOption = 'fhir';
    const apiDef = lookupApiByFragment(selectedOption);
    const defs = getActiveCCGApis();

    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <AuthCodeFlowContent apiDef={apiDef} options={defs} selectedOption={selectedOption} />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });
  it('Initiating token request header', () => {
    const heading = screen.getByText('Requesting a Token with CCG');
    expect(heading).toBeInTheDocument();
  });
  it('Oauth base path found', () => {
    const codeWrapperArray = screen.getAllByText(/\/oauth2\/health\/system\/v1\//i);
    expect(codeWrapperArray.length).toBeGreaterThan(0);
  });
  it('Correct number of code wrappers', () => {
    const codeWrapperArray = document.getElementsByClassName('code-wrapper');
    expect(codeWrapperArray.length).toBeGreaterThanOrEqual(4);
  });
});
