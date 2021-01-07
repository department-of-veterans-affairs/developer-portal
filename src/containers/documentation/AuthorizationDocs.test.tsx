import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../flags';
import store from '../../store';
import { AuthorizationDocs } from './AuthorizationDocs';

describe('Authorization Docs', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <AuthorizationDocs />
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
    const heading = screen.getByText('Building OpenID Connect Applications');
    expect(heading).toBeInTheDocument();
  });
});
