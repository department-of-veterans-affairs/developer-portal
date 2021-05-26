import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';

import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';
import store from '../../store';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { APIDescription } from '../../apiDefs/schema';
import { AuthCodeFlowContent } from './AuthCodeFlowContent';

describe('Auth Flow Content', () => {
  beforeEach(() => {
    const selectedOption = 'veteran_verification';
    const apiDef = lookupApiByFragment(selectedOption);
    const defs = getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item));

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
  it('Initiating auth flow header header', () => {
    const heading = screen.getByText('Initiating the Authorization Code Flow');
    expect(heading).toBeInTheDocument();
  });
});
