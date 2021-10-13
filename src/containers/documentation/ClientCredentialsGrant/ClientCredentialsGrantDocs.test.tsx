import { render, screen } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router-dom';
import { FlagsProvider, getFlags } from '../../../flags';
import store from '../../../store';
import { ClientCredentialsGrantDocs } from './ClientCredentialsGrantDocs';

describe('Authorization Docs', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <FlagsProvider flags={getFlags()}>
          <MemoryRouter>
            <ClientCredentialsGrantDocs />
          </MemoryRouter>
        </FlagsProvider>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    const authHeading = screen.getByRole('heading', { name: 'Client Credentials Grant' });
    expect(authHeading).toBeInTheDocument();
  });

  it('Requesting a Token header', () => {
    const heading = screen.getAllByText('Requesting a Token with CCG');
    expect(heading).toHaveLength(1);
    expect(heading[0]).toBeInTheDocument();
  });
});
