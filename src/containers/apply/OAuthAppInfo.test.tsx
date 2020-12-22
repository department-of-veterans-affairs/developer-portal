import '@testing-library/jest-dom/extend-expect';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import React from 'react';
import { Provider } from 'react-redux';
import { MemoryRouter } from 'react-router';
import store from '../../store';
import { OAuthAppInfo } from './OAuthAppInfo';

describe('OAuthAppInfo', () => {
  beforeEach(() => {
    render(
      <Provider store={store}>
        <MemoryRouter>
          <OAuthAppInfo />
        </MemoryRouter>
      </Provider>,
    );
  });

  it('renders successfully', () => {
    expect(
      screen.getByRole('group', {
        name: 'Can your application securely hide a client secret? (*Required)',
      }),
    ).toBeInTheDocument();
  });

  it('contains a link to documentation on "authorization code flow"', () => {
    const authCodeFlowLink = screen.getByRole('link', { name: 'authorization code flow' });

    expect(authCodeFlowLink).toBeInTheDocument();
    expect(authCodeFlowLink.getAttribute('href')).toBe(
      'https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/',
    );
  });

  it('contains a link to documentation on "PKCE flow"', () => {
    const authCodeFlowLink = screen.getByRole('link', { name: 'PKCE flow' });

    expect(authCodeFlowLink).toBeInTheDocument();
    expect(authCodeFlowLink.getAttribute('href')).toBe(
      'https://www.oauth.com/oauth2-servers/pkce/',
    );
  });

  it('updates radio button choices on selection', () => {
    const [yesRadio, noRadio]: HTMLInputElement[] = screen.getAllByRole(
      'radio',
    ) as HTMLInputElement[];

    expect(yesRadio.checked).toBeFalsy();
    expect(noRadio.checked).toBeFalsy();

    userEvent.click(yesRadio);

    expect(yesRadio.checked).toBeTruthy();
    expect(noRadio.checked).toBeFalsy();

    userEvent.click(noRadio);

    expect(yesRadio.checked).toBeFalsy();
    expect(noRadio.checked).toBeTruthy();
  });

  it('updates the redirect URI textbox on user input', async () => {
    const input: HTMLInputElement = screen.getByRole('textbox', {
      name: 'OAuth Redirect URI (*Required)',
    }) as HTMLInputElement;

    expect(input.value).toBe('');

    await userEvent.type(input, 'http://www.dunedain.com');

    expect(input.value).toBe('http://www.dunedain.com');
  });
});
