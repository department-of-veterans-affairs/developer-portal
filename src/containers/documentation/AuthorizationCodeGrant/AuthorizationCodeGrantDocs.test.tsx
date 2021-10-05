import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { AuthorizationCodeGrantDocs } from './AuthorizationCodeGrantDocs';

describe('Authorization Docs', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <AuthorizationCodeGrantDocs />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Authorization' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Building OpenId header', () => {
    const heading = screen.getAllByText('Building OpenID Connect Applications');
    expect(heading).toHaveLength(2);
    expect(heading[0]).toBeInTheDocument();
    expect(heading[1]).toBeInTheDocument();
  });
});
