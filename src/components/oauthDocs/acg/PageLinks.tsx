import * as React from 'react';
import { Link } from 'react-router-dom';
import { CONSUMER_PROD_PATH } from '../../../types/constants/paths';

const PageLinks = (): JSX.Element => (
  <>
    <h2 tabIndex={-1} id="on-this-page">
      On this Page:
    </h2>
    <ul>
      <li>
        <Link to="#getting-started">Getting Started</Link>
      </li>
      <li>
        <Link to="#building-oidc-apps">Building OpenID Connect Applications</Link>
        <ul>
          <li>
            <Link to="#authorization-code-grant">Initiating the Authorization Code Grant</Link>
            <ul>
              <li>
                <Link to="#requesting-authorization">Requesting Authorization</Link>
              </li>
              <li>
                <Link to="#requesting-a-token">
                  Requesting a Token with an Authorization Code Grant
                </Link>
              </li>
              <li>
                <Link to="#manage-account">Manage Account</Link>
              </li>
              <li>
                <Link to="#revoking-tokens">Revoking Tokens</Link>
              </li>
              <li>
                <Link to="#revoking-grants">Revoking Grants</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="#pkce-authorization">PKCE (Proof Key for Code Exchange) Authorization</Link>
            <ul>
              <li>
                <Link to="#pkce-requesting-authorization">Requesting Authorization</Link>
              </li>
              <li>
                <Link to="#pkce-requesting-a-token">
                  Requesting a Token with an Authorization Code Grant
                </Link>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <Link to="#scopes">Scopes</Link>
      </li>
      <li>
        <Link to="#id-token">ID Token</Link>
      </li>
      <li>
        <Link to="#test-users">Test Users</Link>
      </li>
      <li>
        <Link to="#https">HTTPS</Link>
      </li>
    </ul>
    <h3>It&apos;s good to know that:</h3>
    <ul>
      <li>
        The access credentials we supply are for the sandbox environment only and will not work in
        the production environment.
      </li>
      <li>
        This page provides examples that show authorization server URLs in the sandbox environment,
        which differ depending on the API.
      </li>
      <li>
        When your application is ready, you may{' '}
        <Link to={CONSUMER_PROD_PATH}>apply for production access</Link>.
      </li>
    </ul>
  </>
);

PageLinks.propTypes = {};

export { PageLinks };
