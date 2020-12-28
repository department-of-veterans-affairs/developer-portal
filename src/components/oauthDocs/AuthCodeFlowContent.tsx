import * as React from 'react';
import { useSelector } from 'react-redux';
import { HashLink } from 'react-router-hash-link';
import SyntaxHighlighter from 'react-syntax-highlighter';
import Prism from 'react-syntax-highlighter/dist/cjs/prism';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { getAllOauthApis, lookupApiByFragment } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import { RootState } from '../../types';
import { APISelector, CodeWrapper } from '../index';
import AuthCodeFlowQueryParamsTable from './AuthCodeFlowQueryParamsTable.mdx';

const AuthCodeFlowContent = (): JSX.Element => {
  const selectedOAuthApi = useSelector((state: RootState) => state.oAuthApiSelection.selectedOAuthApi);
  const apiDef = lookupApiByFragment(selectedOAuthApi);
  const selectorProps = {
    options: getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item)),
    selectedOption: selectedOAuthApi,
  };
  const authUrl = `https://sandbox-api.va.gov${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=${apiDef?.oAuthInfo?.scopes.join(' ') ?? 'profile openid offline_access'}\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy`;
  const codeGrant = 'GET <yourRedirectURL>?\n  code=z92dapo5\n  &state=af0ifjsldkj\n  Host: <yourRedirectHost>';
  const postToken = `POST ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/token HTTP/1.1\n  Host: sandbox-api.va.gov\n  Content-Type: application/x-www-form-urlencoded\n  Authorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\n  grant_type=authorization_code\n  &code=z92dapo5&state=af0ifjsldkj\n  &redirect_uri=<yourRedirectURL>`;
  const postTokenResponse200 = `HTTP/1.1 200 OK\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "access_token": "SlAV32hkKG",\n  "expires_in": 3600,\n  "refresh_token": "8xLOxBtZp8",\n  "scope": "${apiDef?.oAuthInfo?.scopes.join(' ') ?? 'profile openid offline_access'}",\n  "patient": "1558538470",\n  "state": "af0ifjsldkj",\n  "token_type": "Bearer",\n}`;
  const postTokenResponse400 = 'HTTP/1.1\n400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request"\n}';
  const postTokenRefresh = `POST ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ntoken={your refresh token}&token_type_hint=refresh_token`;
  const authManageAccount = `POST ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/token HTTP/1.1\nHost: sandbox-api.va.gov`;
  const authRevokeTokenAccess = `POST ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\ntoken={your access token}&token_type_hint=access_token`;
  const authRevokeTokenRefresh = `POST ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/revoke HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\nAuthorization: Basic {base64 encoded *client id* + ':' + *client secret*}\n\ntoken={your refresh token}&token_type_hint=refresh_token`;
  const authRevokeGrant = `DELETE ${apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/grants HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\n{\n  "client_id": {client_id},\n  "email": {test account email}\n}`;
  const authRevokeGrantError = 'HTTP/1.1 400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request",\n  "error_description": "Invalid email address."\n}';

  const syntaxColor = Prism;

  return (
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

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="plaintext" style={syntaxColor}>
          {authUrl}
        </SyntaxHighlighter>
      </CodeWrapper>

      <AuthCodeFlowQueryParamsTable />

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

      <CodeWrapper>
        <SyntaxHighlighter language="plaintext" style={syntaxColor}>
          {codeGrant}
        </SyntaxHighlighter>
      </CodeWrapper>

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

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {postToken}
        </SyntaxHighlighter>
      </CodeWrapper>

      <p>
        The authorization server will respond with an{' '}
        <HashLink to="#id-token">
          access token
        </HashLink>
        . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
        <code>refresh_token</code>. The response will look like this:
      </p>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {postTokenResponse200}
        </SyntaxHighlighter>
      </CodeWrapper>

      <p>If an error occurs, you will instead receive a response like this:</p>

      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {postTokenResponse400}
        </SyntaxHighlighter>
      </CodeWrapper>

      <p>
        Use the returned <code>access_token</code> to authorize requests to our platform by including
        it in the header of HTTP requests as <code>Authorization: Bearer {'{access_token}'}</code>.
      </p>

      <p>
        <strong>NOTE:</strong> the{' '}
        <HashLink to="#id-token">
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

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {postTokenRefresh}
        </SyntaxHighlighter>
      </CodeWrapper>

      <p>
        The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
        you requested the <code>offline_access</code> scope.
      </p>

      <h4 id="manage-account">Manage Account</h4>

      <p>
        The manage endpoint directs end users to a URL where they can view which applications
        currently have access to their data and can make adjustments to these access rights (grants).
      </p>

      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {authManageAccount}
        </SyntaxHighlighter>
      </CodeWrapper>

      <h4 id="revoking-tokens">Revoking Tokens</h4>

      <p>
        Clients may revoke their own <code>access_tokens</code> and <code>refresh_tokens</code> using
        the revoke endpoint. Once revoked, the introspection endpoint will see the token as inactive.
      </p>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {authRevokeTokenAccess}
        </SyntaxHighlighter>
      </CodeWrapper>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {authRevokeTokenRefresh}
        </SyntaxHighlighter>
      </CodeWrapper>

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

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {authRevokeGrant}
        </SyntaxHighlighter>
      </CodeWrapper>

      <p>The client ID is your application client ID (`client_id`) and the email is the user’s email, which must be passed into the body of the request. Bad requests will be returned with an error response and description of the error.</p>

      <CodeWrapper>
        <SyntaxHighlighter language="http" style={syntaxColor}>
          {authRevokeGrantError}
        </SyntaxHighlighter>
      </CodeWrapper>

    </section>
  );
};

AuthCodeFlowContent.propTypes = {};

export { AuthCodeFlowContent };
