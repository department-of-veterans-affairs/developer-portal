import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import AuthCodeFlowCodeBlock from './AuthCodeFlowCodeBlock.mdx';
import AuthCodeFlowTableContent from './OauthInitiatingAuthCodeFlowTable.mdx';
import AuthCodeGrantCodeBlock from './AuthCodeGrantCodeBlock.mdx';
import AuthCodeGrantPostCodeBlock from './AuthCodeGrantPostCodeBlock.mdx';
import AuthCodeGrant200CodeBlock from './AuthCodeGrant200CodeBlock.mdx';
import AuthCodeGrant400CodeBlock from './AuthCodeGrant400CodeBlock.mdx';
import AuthCodeGrantRefreshCodeBlock from './AuthCodeGrantRefreshCodeBlock.mdx';
import ManageAccountCodeBlock from './ManageAccountCodeBlock.mdx';
import RevokeTokenCodeBlock from './RevokeTokenCodeBlock.mdx';
import RevokeGrantsCodeBlock from './RevokeGrantsCodeBlock.mdx';

const AuthCodeFlowContent = (): JSX.Element => (
  <section aria-labelledby="authorization-code-flow">
    <h3 id="authorization-code-flow" tabIndex={-1}>
      Initiating the Authorization Code Flow
    </h3>

    <p>
      <strong>NOTE:</strong> We provide a sample <a href="https://nodejs.org/en/">Node.JS</a>{' '}
      application for demonstrating how to get up and running with our OAuth system. You can find
      the complete source code for it on our{' '}
      <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/tree/master/samples/oauth_node">
        GitHub
      </a>
      .
    </p>

    <p>
      Begin the OpenID Connect authorization by using the authorization endpoint, query parameters,
      and scopes listed below.
    </p>

    <AuthCodeFlowCodeBlock />

    <AuthCodeFlowTableContent />

    <p>
      The Veteran will need to grant your application access permission. To do this, direct the
      Veteran to the URL above. The Veteran is taken through an authentication flow by VA.gov and
      asked to consent to your application accessing their data. The data that can be accessed is
      defined by your scopes. After the Veteran gives permission, your application will receive a
      response based on the <code>response_type</code> you requested.
    </p>

    <h4 id="authorization-code-grant">Authorization Code Grant</h4>

    <p>
      After a Veteran gives authorization for you to access their data, their browser will be
      redirected to your application with the response shown below, which returns the{' '}
      <code>code</code> and <code>state</code> parameters you must use to make a request to our
      authorization service. We require the state parameter for all authorization code grant flows.
    </p>

    <AuthCodeGrantCodeBlock />

    <p>
      Use the following format, in HTTP basic authentication, for your request using the returned
      code and state parameters.
    </p>

    <ul>
      <li>
        Use your client ID and client secret as the HTTP basic authentication username and password.
      </li>
      <li>
        Be sure to replace <code>&lt; yourRedirectURL &gt;</code> with the redirect URL that you
        provided during registration.
      </li>
    </ul>

    <AuthCodeGrantPostCodeBlock />

    <p>
      The authorization server will respond with an{' '}
      <HashLink to="#id-token" onClick={onHashAnchorClick}>
        access token
      </HashLink>
      . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
      <code>refresh_token</code>. The response will look like this:
    </p>

    <AuthCodeGrant200CodeBlock />

    <p>If an error occurs, you will instead receive a response like this:</p>

    <AuthCodeGrant400CodeBlock />

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
      If you need additional scopes in the future, you will need to build a new authorization URL
      with the additional scopes and have the Veteran grant consent again.
    </p>

    <p>
      Use the <code>refresh_token</code> to obtain a new <code>access_token</code> after its expiry
      by sending the following request.
    </p>

    <AuthCodeGrantRefreshCodeBlock />

    <p>
      The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
      you requested the <code>offline_access</code> scope.
    </p>

    <h4 id="manage-account">Manage Account</h4>

    <p>
      The manage endpoint directs end users to a URL where they can view which applications
      currently have access to their data and can make adjustments to these access rights (grants).
    </p>

    <ManageAccountCodeBlock />

    <h4 id="revoking-tokens">Revoking Tokens</h4>

    <p>
      Clients may revoke their own <code>access_tokens</code> and <code>refresh_tokens</code> using
      the revoke endpoint. Once revoked, the introspection endpoint will see the token as inactive.
    </p>

    <RevokeTokenCodeBlock />

    <h4 id="revoking-grants">Revoking Grants</h4>

    <p>
      <strong>NOTE:</strong> This endpoint is not available in the production environment and
      excludes identity provider grants.
    </p>

    <p>
      A user will be prompted only once to consent to each client&#39;s use of their data. Such a
      grant will remain in effect unless and until revoked. Grants for a specific user and client
      are revoked in the sandbox environment using the below endpoint.
    </p>

    <RevokeGrantsCodeBlock />
  </section>
);

AuthCodeFlowContent.propTypes = {};

export { AuthCodeFlowContent };
