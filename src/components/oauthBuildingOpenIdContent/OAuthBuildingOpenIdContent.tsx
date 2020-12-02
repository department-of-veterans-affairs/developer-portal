/* eslint-disable max-lines */
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import { SectionHeaderWrapper, CodeWrapper } from '../index';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import AuthCodeFlowTableContent from '../../content/apiDocs/oauth/oauthInitiatingAuthCodeFlowTable.mdx';
import PKCETableContent from '../../content/apiDocs/oauth/oauthPKCETable.mdx';

const OAuthBuildingOpenIdContent = (): JSX.Element => (
  <div>
    <SectionHeaderWrapper heading="Building OpenID Connect Applications" id="building-openid" />
    <p>After being approved to use OpenID Connect, you&#39;ll receive a client id.</p>
    <ul>
      <li>
        If you are building a <strong>server-based application</strong>, you’ll also receive a
        client secret and will use the{' '}
        <HashLink to="#initiating-the-authorization-code-flow" onClick={onHashAnchorClick}>
          authorization code flow
        </HashLink>{' '}
        to complete authentication.
      </li>
      <li>
        If you are unable to <strong>safely store a client secret</strong> such as a native mobile
        app, you will{' '}
        <HashLink
          to="#pkce-(proof-key-for-code-exchange)-authorization"
          onClick={onHashAnchorClick}
        >
          use PKCE
        </HashLink>
        to complete authentication.
      </li>
    </ul>

    <h3 id="initiating-the-authorization-code-flow" tabIndex={-1}>
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

    <CodeWrapper>
      <pre>
        <code className="language-plaintext">
          https://sandbox-api.va.gov/oauth2/authorization?
          <br />
          client_id=&lt;yourClientID&gt;
          <br />
          &amp;redirect_uri=&lt;yourRedirectURL&gt;
          <br />
          &amp;response_type=code
          <br />
          &amp;scope=openid offline_access profile email veteran_status.read launch/patient
          <br />
          &amp;state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ&amp;nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy
          <br />
        </code>
      </pre>
    </CodeWrapper>

    <AuthCodeFlowTableContent />

    <p>
      The Veteran will need to grant your application access permission. To do this, direct the
      Veteran to the URL above. The Veteran is taken through an authentication flow by VA.gov and
      asked to consent to your application accessing their data. The data that can be accessed is
      defined by your scopes. After the Veteran gives permission, your application will receive a
      response based on the <code>response_type</code> you requested
    </p>

    <h4 id="authorization-code-grant">Authorization Code Grant</h4>

    <p>
      After a Veteran gives authorization for you to access their data, their browser will be
      redirected to your application with the response shown below, which returns the{' '}
      <code>code</code> and <code>state</code> parameters you must use to make a request to our
      authorization service. We require the state parameter for all authorization code grant flows.
    </p>

    <CodeWrapper>
      <pre>
        <code className="language-plaintext">
          GET &lt;yourRedirectURL&gt;?
          <br />
          code=z92dapo5
          <br />
          &amp;state=af0ifjsldkj
          <br />
          Host: &lt;yourRedirectHost&gt;
          <br />
        </code>
      </pre>
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

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">/oauth2/token</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>: Basic{' '}
          {"{base64 encoded *client id* + ':' + *client secret*}"}
          <br />
          <br />
          <span className="pf">
            grant_type=authorization_code&amp;code=z92dapo5&amp;
            <span className="hljs-keyword">state</span>=af0ifjsldkj&amp;redirect_uri=
            <span className="hljs-variable">&lt;yourRedirectURL&gt;</span>
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <p>
      The authorization server will respond with an{' '}
      <HashLink to="#id-token" onClick={onHashAnchorClick}>
        access token
      </HashLink>
      . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
      <code>refresh_token</code>. The response will look like this:
    </p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          HTTP/1.1 <span className="hljs-number">200</span> OK
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>: no-store
          <br />
          <span className="hljs-attribute">Pragma</span>: no-cache
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;access_token&quot;</span>:{' '}
            <span className="hljs-string">&quot;SlAV32hkKG&quot;</span>,<br />
            <span className="hljs-attr">&quot;expires_in&quot;</span>:{' '}
            <span className="hljs-number">3600</span>,<br />
            <span className="hljs-attr">&quot;refresh_token&quot;</span>:{' '}
            <span className="hljs-string">&quot;8xLOxBtZp8&quot;</span>,<br />
            <span className="hljs-attr">&quot;scope&quot;</span>:{' '}
            <span className="hljs-string">&quot;openid profile email offline_access&quot;</span>,
            <br />
            <span className="hljs-attr">&quot;patient&quot;</span>:{' '}
            <span className="hljs-string">&quot;1558538470&quot;</span>,<br />
            <span className="hljs-attr">&quot;state&quot;</span>:{' '}
            <span className="hljs-string">&quot;af0ifjsldkj&quot;</span>,<br />
            <span className="hljs-attr">&quot;token_type&quot;</span>:{' '}
            <span className="hljs-string">&quot;Bearer&quot;</span>,<br />
            {'}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <p>If an error occurs, you will instead receive a response like this:</p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          HTTP/1.1 <span className="hljs-number">400</span> Bad Request
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>: no-store
          <br />
          <span className="hljs-attribute">Pragma</span>: no-cache
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;error&quot;</span>:{' '}
            <span className="hljs-string">&quot;invalid_request&quot;</span>
            <br />
            {'}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

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

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>{' '}
          <span className="hljs-string">/oauth2/token</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>: Basic{' '}
          {"{base64 encoded *client id* + ':' + *client secret*}"}
          <br />
          <span className="angelscript">
            grant_type=<span className="hljs-built_in">ref</span>resh_token&amp;
            <span className="hljs-built_in">ref</span>
            {'resh_token={your'} <span className="hljs-built_in">ref</span>
            {'resh_token}'}&amp;scope={'{space separated scopes}'}
            <br />
          </span>
        </code>
      </pre>
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
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>{' '}
          <span className="hljs-string">/oauth2/token</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
        </code>
      </pre>
    </CodeWrapper>

    <h4 id="revoking-tokens">Revoking Tokens</h4>

    <p>
      Clients may revoke their own <code>access_tokens</code> and <code>refresh_tokens</code> using
      the revoke endpoint. Once revoked, the introspection endpoint will see the token as inactive.
    </p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>{' '}
          <span className="hljs-string">/oauth2/revoke</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>: Basic{' '}
          {"{base64 encoded *client id* + ':' + *client secret*}"}
          <br />
          <br />
          <span className="ini">
            <span className="hljs-attr">token</span>={'{your access token}'}
            &amp;token_type_hint=access_token
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>{' '}
          <span className="hljs-string">/oauth2/revoke</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>: Basic{' '}
          {"{base64 encoded *client id* + ':' + *client secret*}"}
          <br />
          <br />
          <span className="angelscript">
            {'token={your'} <span className="hljs-built_in">ref</span>
            {'resh token}'}&amp;token_type_hint=<span className="hljs-built_in">ref</span>resh_token
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <h4 id="revoking-grants">Revoking Grants</h4>

    <p>
      <strong>NOTE:</strong> This endpoint is not available in the production environment and
      excludes identity provider grants.
    </p>

    <p>
      A user will be prompted only once to consent to each client&#39;s use of their data. Such a grant
      will remain in effect unless and until revoked. Grants for a specific user and client are
      revoked in the sandbox environment using the below endpoint.
    </p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">DELETE</span>{' '}
          <span className="hljs-string">/oauth2/grants</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <br />
          <span className="clojure">
            {'{'}
            <br />
            <span className="hljs-string">&quot;client_id&quot;</span>: {'{client_id}'},<br />
            <span className="hljs-string">&quot;email&quot;</span>: {'{test account email}'}
            <br />
            {'}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <p>
      The client ID is your application client ID (<code>client_id</code>) and the email is the
      user’s email, which must be passed into the body of the request. Bad requests will be returned
      with an error response and description of the error.
    </p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          HTTP/1.1
          <span className="hljs-number">400</span> Bad Request
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>: no-store
          <br />
          <span className="hljs-attribute">Pragma</span>: no-cache
          <br />
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;error&quot;</span>:{' '}
            <span className="hljs-string">&quot;invalid_request&quot;</span>,<br />
            <span className="hljs-attr">&quot;error_description&quot;</span>:{' '}
            <span className="hljs-string">&quot;Invalid email address.&quot;</span>
            <br />
            {'}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <h3 tabIndex={-1} id="pkce-(proof-key-for-code-exchange)-authorization">
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

    <CodeWrapper>
      <pre>
        <code className="language-plaintext">
          https://sandbox-api.va.gov/oauth2/authorization?
          <br />
          client_id=0oa1c01m77heEXUZt2p7
          <br />
          &amp;response_type=code
          <br />
          &amp;scope=openid profile email patient/DiagnosticReport.read
          <br />
          &amp;redirect_uri=&lt;yourRedirectURL&gt;
          <br />
          &amp;state=499f_073a_5094_fd7a_ff7f_0bf0_69e4_adad_2bdf_e3ab_76b9
          <br />
          &amp;code_challenge_method=S256
          <br />
          &amp;code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw
          <br />
          <br />
        </code>
      </pre>
    </CodeWrapper>

    <PKCETableContent />

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

    <CodeWrapper>
      <pre>
        <code className="language-plaintext">
          code=z92dapo5
          <br />
          &amp;state=af0ifjsldkj
          <br />
          Host: &lt;yourRedirectHost&gt;
          <br />
          <br />
        </code>
      </pre>
    </CodeWrapper>

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

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">/oauth2/token</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <br />
          <span className="pf">
            grant_type=authorization_code&amp;code=z92dapo5&amp;
            <span className="hljs-keyword">state</span>=af0ifjsldkj&amp;redirect_uri=
            <span className="hljs-variable">&lt;yourRedirectURL&gt;</span>
            &amp;code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <p>
      The authorization server will send a 200 response with an{' '}
      <HashLink to="#id-token" onClick={onHashAnchorClick}>
        access token
      </HashLink>
      . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
      <code>refresh_token</code>. The response body will look like this, where{' '}
      <code>expires_in</code> is the time in seconds before the token expires:
    </p>

    <CodeWrapper>
      <pre>
        <code>
          {'{'}
          <br /> <span className="hljs-attr">&quot;access_token&quot;</span>:{' '}
          <span className="hljs-string">&quot;SlAV32hkKG&quot;</span>,<br />
          <span className="hljs-attr">&quot;expires_in&quot;</span>:{' '}
          <span className="hljs-number">3600</span>
          ,<br />
          <span className="hljs-attr">&quot;refresh_token&quot;</span>:{' '}
          <span className="hljs-string">&quot;8xLOxBtZp8&quot;</span>,<br />
          <span className="hljs-attr">&quot;scope&quot;</span>:{' '}
          <span className="hljs-string">&quot;openid profile email offline_access&quot;</span>,
          <br />
          <span className="hljs-attr">&quot;state&quot;</span>:{' '}
          <span className="hljs-string">&quot;af0ifjsldkj&quot;</span>,<br />
          <span className="hljs-attr">&quot;token_type&quot;</span>:{' '}
          <span className="hljs-string">&quot;Bearer&quot;</span>,<br />
          {'}'}
          <br />
        </code>
      </pre>
    </CodeWrapper>

    <p>If an error occurs, you will instead receive a 400 response, like this:</p>

    <CodeWrapper>
      <pre>
        <code className="language-http">
          HTTP/1.1 <span className="hljs-number">400</span> Bad Request
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>: no-store
          <br />
          <span className="hljs-attribute">Pragma</span>: no-cache
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;error&quot;</span>:{' '}
            <span className="hljs-string">&quot;invalid_request&quot;</span>
            <br />
            {'}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

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

    <CodeWrapper>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>{' '}
          <span className="hljs-string">/oauth2/token</span> HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>: application/x-www-form-urlencoded
          <br />
          <span className="angelscript">
            grant_type=<span className="hljs-built_in">ref</span>resh_token&amp;
            <span className="hljs-built_in">ref</span>
            {'resh_token={your'} <span className="hljs-built_in">ref</span>
            {'resh_token}'}&amp;client_id={'{client_id}'}&amp;scope={'{space separated scopes}'}
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>

    <p>
      The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
      you requested the <code>offline_access</code> scope.
    </p>
  </div>
);

OAuthBuildingOpenIdContent.propTypes = {};

export { OAuthBuildingOpenIdContent };
