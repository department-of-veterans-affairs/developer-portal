import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import PKCEAuthRequestURL from './PKCEAuthRequestURL.mdx';
import PKCEQueryParamsTable from './PKCEQueryParamsTable.mdx';
import PKCEAuthorizationRedirect from './PKCEAuthorizationRedirect.mdx';
import PKCEPostTokenRequest from './PKCEPostTokenRequest.mdx';
import PKCEPostTokenResponses from './PKCEPostTokenResponses.mdx';
import PKCEPostRefreshToken from './PKCEPostRefreshToken.mdx';

const PKCEAuthContent = (): JSX.Element => (
  <section aria-labelledby="pkce-authorization">
    <h3 tabIndex={-1} id="pkce-authorization">
      PKCE (Proof Key for Code Exchange) Authorization
    </h3>

    <p>
      <strong>NOTE:</strong> We provide a{' '}
      <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/tree/master/samples/oauth_pkce_cli">
        sample CLI application
      </a>{' '}
      for getting started using PKCE.
      <br />
      Begin the OpenID Connect authorization by using the authorization endpoint, query parameters,
      and scopes listed below.
    </p>

    <PKCEAuthRequestURL />

    <PKCEQueryParamsTable />

    <p>
      The Veteran will need to grant your application access permission. To do this, direct the
      Veteran to the URL above. The Veteran is taken through an authentication flow by VA.gov and
      asked to consent to your application accessing their data. The data that can be accessed is
      defined by your scopes. After the Veteran gives permission, your application will receive an
      authorization code.
    </p>

    <h3 id="authorization-code-grant-2">Authorization Code Grant</h3>

    <p>
      After the Veteran consents to authorize your application, their browser will redirect to your
      application with the response shown below, which returns the <code>code</code> and{' '}
      <code>state</code> parameters you must use to make a request to our authorization service and
      the <code>code_verifier</code> used to create the <code>code_challenge</code> in the previous
      step.
    </p>

    <PKCEAuthorizationRedirect />

    <p>Use the following format, in HTTP basic authentication, for your request.</p>

    <ul>
      <li>
        Use the <code>code</code> and <code>state</code> parameters that were returned in the
        previous step.
      </li>
      <li>
        Be sure to replace <code>&lt; yourRedirectURL &gt;</code> with the redirect URL that you
        provided during registration.
      </li>
    </ul>

    <PKCEPostTokenRequest />

    <p>
      The authorization server will send a 200 response with an{' '}
      <HashLink to="#id-token" onClick={onHashAnchorClick}>
        access token
      </HashLink>
      . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
      <code>refresh_token</code>. The response body will look like this, where{' '}
      <code>expires_in</code> is the time in seconds before the token expires:
    </p>

    <PKCEPostTokenResponses />

    <p>
      Use the returned <code>access_token</code> to authorize requests to our platform by including
      it in the header of HTTP requests as <code>Authorization: Bearer {'{access_token}'}</code>.
    </p>

    <p>
      <strong>NOTE:</strong> the{' '}
      <HashLink to="#id-token" onClick={onHashAnchorClick}>
        access token
      </HashLink>{' '}
      will only work for the API and scopes for which you have previously initiated authorization.
    </p>

    <p>
      Use the <code>refresh_token</code> to obtain a new <code>access_token</code> after its expiry
      by sending the following request.
    </p>

    <PKCEPostRefreshToken />

    <p>
      The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
      you requested the <code>offline_access</code> scope.
    </p>
  </section>
);

PKCEAuthContent.propTypes = {};

export { PKCEAuthContent };
