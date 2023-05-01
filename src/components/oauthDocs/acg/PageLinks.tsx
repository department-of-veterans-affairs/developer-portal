import * as React from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';
import { CONSUMER_PROD_PATH } from '../../../types/constants/paths';

const PageLinks = (): JSX.Element => (
  <>
    <h2 tabIndex={-1} id="on-this-page">
      On this Page:
    </h2>
    <ul>
      <li>
        <HashLink to={{ ...location, hash: '#getting-started' }}>Getting Started</HashLink>
      </li>
      <li>
        <HashLink to={{ ...location, hash: '#building-oidc-apps' }}>
          Building OpenID Connect Applications
        </HashLink>
        <ul>
          <li>
            <HashLink to={{ ...location, hash: '#authorization-code-flow' }}>
              Initiating the Authorization Code Flow
            </HashLink>
            <ul>
              <li>
                <HashLink to={{ ...location, hash: '#requesting-authorization' }}>
                  Requesting Authorization
                </HashLink>
              </li>
              <li>
                <HashLink to={{ ...location, hash: '#requesting-a-token' }}>
                  Requesting a Token with an Authorization Code Grant
                </HashLink>
              </li>
              <li>
                <HashLink to={{ ...location, hash: '#manage-account' }}>Manage Account</HashLink>
              </li>
              <li>
                <HashLink to={{ ...location, hash: '#revoking-tokens' }}>Revoking Tokens</HashLink>
              </li>
              <li>
                <HashLink to={{ ...location, hash: '#revoking-grants' }}>Revoking Grants</HashLink>
              </li>
            </ul>
          </li>
          <li>
            <HashLink to={{ ...location, hash: '#pkce-authorization' }}>
              PKCE (Proof Key for Code Exchange) Authorization
            </HashLink>
            <ul>
              <li>
                <HashLink to={{ ...location, hash: '#pkce-requesting-authorization' }}>
                  Requesting Authorization
                </HashLink>
              </li>
              <li>
                <HashLink to={{ ...location, hash: '#pkce-requesting-a-token' }}>
                  Requesting a Token with an Authorization Code Grant
                </HashLink>
              </li>
            </ul>
          </li>
        </ul>
      </li>
      <li>
        <HashLink to={{ ...location, hash: '#scopes' }}>Scopes</HashLink>
      </li>
      <li>
        <HashLink to={{ ...location, hash: '#id-token' }}>ID Token</HashLink>
      </li>
      <li>
        <HashLink to={{ ...location, hash: '#test-users' }}>Test Users</HashLink>
      </li>
      <li>
        <HashLink to={{ ...location, hash: '#https' }}>HTTPS</HashLink>
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
