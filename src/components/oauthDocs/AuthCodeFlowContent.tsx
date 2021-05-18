/* eslint-disable max-lines */
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
// import { Link } from 'react-router-dom';
import { APISelector, CodeWrapper } from '../index';
import { APIDescription } from '../../apiDefs/schema';

interface AuthCodeFlowContentProps {
  options: APIDescription[];
  selectedOption: string;
  apiDef: APIDescription | null;
}

const AuthCodeFlowContent = (props: AuthCodeFlowContentProps): JSX.Element => (
  <>
    <h3 id="authorization-code-flow">Initiating the Authorization Code Flow</h3>
    <p>
      <strong>Note:</strong> We provide a sample <a href="https://nodejs.org/en/">Node.JS</a>{' '}
      application for demonstrating how to get up and running with our OAuth system. You can find
      the complete source code for it on our{' '}
      <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/tree/master/samples/oauth_node">
        GitHub
      </a>
    </p>
    <h4>Requesting Authorization</h4>
    <p>
      Begin the OpenID Connect authorization by using the authorization endpoint, query parameters,
      and scopes listed below.
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-0-${props.selectedOption}`}>
      <pre>
        <code className="language-plaintext">
          https://sandbox-api.va.gov
          {`${props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}`}/authorization?
          <br />
          {'  '}client_id=0oa1c01m77heEXUZt2p7
          <br />
          {'  '}
          {'&redirect_uri=<yourRedirectURL>'}
          <br />
          {'  '}&response_type=code
          <br />
          {'  '}&scope=
          {`${props.apiDef?.oAuthInfo?.scopes.join(' ') ?? 'profile openid offline_access'}`}
          <br />
          {'  '}&state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ
          <br />
          {'  '}&nonce=o5jYpLSe29RBHBsn5iAnMKYpYw2Iw9XRBweacc001hRo5xxJEbHuniEbhuxHfVZy
        </code>
      </pre>
    </CodeWrapper>
    <table>
      <thead>
        <tr>
          <th>Query Parameter</th>
          <th>Required</th>
          <th>Values</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <code>client_id</code>
          </td>
          <td>
            <strong>Required</strong>
          </td>
          <td>
            The <code>client_id</code> issued by the VA API Platform team
          </td>
        </tr>
        <tr>
          <td>
            <code>redirect_uri</code>
          </td>
          <td>
            <strong>Required</strong>
          </td>
          <td>
            The URL you supplied. The user will be redirected to this URL after authorizing your
            application.{' '}
          </td>
        </tr>
        <tr>
          <td>
            <code>response_type</code>
          </td>
          <td>
            <strong>Required</strong>
          </td>
          <td>
            Supported response types: <code>code</code>
          </td>
        </tr>
        <tr>
          <td>
            <code>state</code>
          </td>
          <td>
            <strong>Required</strong>
          </td>
          <td>
            Specifying a `state` param helps protect against some classes of Cross Site Request
            Forgery (CSRF) attacks, and applications must include it. The <code>state</code> param
            will be passed back from the authorization server to your redirect URL unchanged, and
            your application should verify that it has the expected value. This helps assure that
            the client receiving the authorization response is the same as the client that initiated
            the authorization process.{' '}
          </td>
        </tr>
        <tr>
          <td>
            <code>scope</code>
          </td>
          <td>
            <strong>Required</strong>
          </td>
          <td>
            Will use your application&pos;s default scopes unless you specify a smaller subset of
            scopes separated by a space. Review the{' '}
            <HashLink to={{ ...location, hash: '#scopes' }}>Scopes section</HashLink> for more
            information.
          </td>
        </tr>
        <tr>
          <td>
            <code>nonce</code>
          </td>
          <td>Optional</td>
          <td>
            <p>
              Using a <code>nonce</code> with JWTs prevents some kinds of replay attacks where a
              malicious party can attempt to resend an <code>id_token</code> request in order to
              impersonate a user of your application.
            </p>
            <p>
              A nonce should be generated on a per-session basis and stored on the user&pos;s
              client. If the user requested an id_token (by including the openid scope in the
              authorization request) then the{' '}
              <HashLink to={{ ...location, hash: '#payload' }}>payload of the id_token</HashLink>{' '}
              will contain a nonce value that should match the nonce value included in the
              authorization request.
            </p>
            <p>
              The{' '}
              <a href="https://openid.net/specs/openid-connect-core-1_0.html#NonceNotes">
                OpenID Connect documentation
              </a>
              offers the following suggestion for generating nonces:
            </p>
            <p>
              The nonce parameter value needs to include per-session state and be unguessable to
              attackers. One method to achieve this for Web Server Clients is to store a
              cryptographically random value as an HttpOnly session cookie and use a cryptographic
              hash of the value as the nonce parameter. In that case, the nonce in the returned ID
              Token is compared to the hash of the session cookie to detect ID Token replay by third
              parties. A related method applicable to JavaScript Clients is to store the
              cryptographically random value in HTML5 local storage and use a cryptographic hash of
              this value.{' '}
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <code>prompt</code>
          </td>
          <td>Optional</td>
          <td>
            <p>
              Supported prompts: <code>login</code>, <code>consent</code> and <code>none</code>.
            </p>
            <p>
              If <code>login</code> is specified, the user will be forced to provide credentials
              regardless of session state. If omitted, an existing active session with the identity
              provider may not require the user to provide credentials.
            </p>
            <p>
              If <code>consent</code> is specified, the user will be asked to consent to their
              scopes being used regardless of prior consent.
            </p>
            <p>
              If <code>none</code> is specified, an application will attempt an authorization
              request without user interaction. When the session is invalid or there are scopes the
              user has not consented to, one of the following errors will be thrown:{' '}
              <code>login_required</code> or
              <code>consent_required</code>.
            </p>
          </td>
        </tr>
      </tbody>
    </table>
    <p>
      The Veteran will need to grant your application access permission. To do this, direct the
      Veteran to the URL above. The Veteran is taken through an authentication flow by VA.gov and
      asked to consent to your application accessing their data. The data that can be accessed is
      defined by your scopes. After the Veteran gives permission, your application will receive a
      response based on the `response_type` you requested.
    </p>
    <h3 id="requesting-a-token">Requesting a Token with an Authorization Code Grant</h3>
    <p>
      After a Veteran gives authorization for you to access their data, their browser will be
      redirected to your application with the response shown below, which returns the `code` and
      `state` parameters you must use to make a request to our authorization service. We require the
      state parameter for all authorization code grant flows.
    </p>
    <CodeWrapper key={`snippet-1-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          HTTP/1.1 302 Found
          <br />
          Location: {'<yourRedirectURL>?'}
          <br />
          {'  '}code=z92dapo5
          <br />
          {'  '}&state=af0ifjsldkj
        </code>
      </pre>
    </CodeWrapper>
    <p>
      Use the following format, in HTTP basic authentication, for your request using the returned
      code and state parameters.
    </p>
    <p>
      <ul>
        <li>
          Use your client ID and client secret as the HTTP basic authentication username and
          password.
        </li>
        <li>
          Be sure to replace <code>{'<yourRedirectURL>'}</code> with the redirect URL that you
          provided during registration.
        </li>
      </ul>
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-2-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">
            {` ${props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/token`}
          </span>
          {' HTTP/1.1'}
          <br />
          <span className="hljs-attribute">Host</span>: sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>
          : Basic &#123; base64 encoded *client_id* + &pos;:&pos; + *client_secret* &#125;
          <br />
          <br />
          <span className="pf">
            grant_type=authorization_code
            <br />
            &amp;code=z92dapo5&amp;
            <span className="hljs-keyword">state</span>=af0ifjsldkj
            <br />
            &amp;redirect_uri=
            <span className="hljs-variable">{'<yourRedirectURL>'}</span>
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>
    <p>
      The authorization server will respond with an{' '}
      <HashLink to={{ ...location, hash: '#id-token' }}>access token</HashLink>. If you requested
      the <code>offline_access</code> scope, you will also receive a <code>refresh_token</code>. The
      response will look like this:
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-3-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          HTTP/1.1 <span className="hljs-number">200 </span>
          OK
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>
          : no-store
          <br />
          <span className="hljs-attribute">Pragma</span>: no-cache
          <br />
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;access_token&quot;</span>:
            <span className="hljs-string">&quot;SlAV32hkKG&quot;</span>
            ,<br />
            <span className="hljs-attr">&quot;expires_in&quot;</span>:
            <span className="hljs-number">3600</span>
            ,
            <br />
            <span className="hljs-attr">&quot;refresh_token&quot;</span>:
            <span className="hljs-string">&quot;8xLOxBtZp8&quot;</span>
            ,
            <br />
            <span className="hljs-attr">&quot;scope&quot;</span>:
            <span className="hljs-string">
              {props.apiDef?.oAuthInfo?.scopes.join(' ') ?? 'profile openid offline_access'}
            </span>
            ,
            <br />
            <span className="hljs-attr">&quot;patient&quot;</span>:
            <span className="hljs-string">&quot;1558538470&quot;</span>,
            <br />
            <span className="hljs-attr">&quot;state&quot;</span>:
            <span className="hljs-string">&quot;af0ifjsldkj&quot;</span>,
            <br />
            <span className="hljs-attr">&quot;token_type&quot;</span>:
            <span className="hljs-string">&quot;Bearer&quot;</span>,
            <br />
            {'}'}
          </span>
        </code>
      </pre>
    </CodeWrapper>
    <p>If an error occurs, you will instead receive a response like this:</p>
    <CodeWrapper key={`snippet-4-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          HTTP/1.1
          <span className="hljs-number">400</span>
          Bad Request
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>
          : no-store
          <br />
          <span className="hljs-attribute">Pragma</span>
          : no-cache
          <br />
          <br />
          <span className="json">
            {'{'}
            <br />
            <span className="hljs-attr">&quot;error&quot;</span>:
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
      it in the header of HTTP requests as <code>{'Authorization: Bearer {access_token}'}</code>.
    </p>
    <p>
      <strong>Note:</strong>
      the <HashLink to={{ ...location, hash: '#id-token' }}>access token</HashLink> will only work
      for the API and scopes for which you have previously initiated authorization. If you need
      additional scopes in the future, you will need to build a new authorization URL with the
      additional scopes and have the Veteran grant consent again.
    </p>
    <p>
      Refresh tokens expire if they are not used for a period of 7 days in sandbox and 42 days in
      production. Use the <code>refresh_token</code> to obtain a new <code>access_token</code> after
      its expiry by sending the following request.
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-5-${props.selectedOption}`}>
      <pre>
        <code className="language-htttp">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">
            {props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}
          </span>{' '}
          HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>
          : sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>: Basic &#123; base64 encoded
          *client_id* + &#39;:&#39; + *client_secret* &#125;
          <br />
          <br />
          grant_type=refresh_token&refresh_token=&#123; *refresh_token* &#125;
        </code>
      </pre>
    </CodeWrapper>
    <p>
      The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
      you requested the
      <code>offline_access</code> scope.
    </p>
    <h4 id="manage-account">Manage Account</h4>
    <p>
      The manage endpoint directs end users to a URL where they can view which applications
      currently have access to their data and can make adjustments to these access rights (grants).
    </p>
    <CodeWrapper key={`snippet-6-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">GET </span>
          <span className="hljs-string">
            {props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/manage
          </span>{' '}
          HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>
          : sandbox-api.va.gov
          <br />
        </code>
      </pre>
    </CodeWrapper>
    <h4 id="revoking-tokens">Revoking Tokens</h4>
    <p>
      Clients may revoke their own <code>access_tokens</code> and <code>refresh_tokens</code> using
      the revoke endpoint. Once revoked, the introspection endpoint will see the token as inactive.
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-7-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">
            {props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/revoke
          </span>
          HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>
          : sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>
          : Basic &#123; base64 encoded *client_id* + &pos;:&pos; + *client_secret* &#125;
          <br />
          <br />
          <span className="routeros">
            token=&#123; *access_token* &#125;&token_type_hint=access_token
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-8-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">POST</span>
          <span className="hljs-string">
            {props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/revoke
          </span>
          HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>
          : sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/x-www-form-urlencoded
          <br />
          <span className="hljs-attribute">Authorization</span>
          : Basic &#123; base64 encoded *client_id* + &pos;:&pos; + *client_secret* &#125;
          <br />
          <br />
          token=&#123; *refresh_token* &#125;&token_type_hint=refresh_token
          <br />
        </code>
      </pre>
    </CodeWrapper>
    <h4 id="revoking-grants">Revoking Grants</h4>
    <p>
      <strong>NOTE:</strong>
      This endpoint is not available in the production environment and excludes identity provider
      grants.
    </p>
    <p>
      A user will be prompted only once to consent to each client&pos;s use of their data. Such a
      grant will remain in effect unless and until revoked. Grants for a specific user and client
      are revoked in the sandbox environment using the below endpoint.
    </p>
    <APISelector options={props.options} selectedOption={props.selectedOption} />
    <CodeWrapper key={`snippet-9-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          <span className="hljs-keyword">DELETE</span>
          <span className="hljs-string">
            {props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/grants
          </span>{' '}
          HTTP/1.1
          <br />
          <span className="hljs-attribute">Host</span>
          : sandbox-api.va.gov
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/x-www-form-urlencoded
          <br />
          <br />
          <span className="dust">
            <span className="xml">client_id=</span>
            <span className="hljs-template-variable">&#123;client_id&#125;</span>
            <span className="xml">&amp;email=</span>
            <span className="hljs-template-variable">&#123;test account email&#125;</span>
            <span className="xml">
              <br />
            </span>
          </span>
        </code>
      </pre>
    </CodeWrapper>
    <p>
      The client ID is your application client ID (<code>client_id</code>) and the email is the
      user’s email, which must be passed into the body of the request. Bad requests will be returned
      with an error response and description of the error.
    </p>
    <CodeWrapper key={`snippet-10-${props.selectedOption}`}>
      <pre>
        <code className="language-http">
          HTTP/1.1 <span className="hljs-number">400 </span>
          Bad Request
          <br />
          <span className="hljs-attribute">Content-Type</span>
          : application/json
          <br />
          <span className="hljs-attribute">Cache-Control</span>
          : no-store
          <br />
          <span className="hljs-attribute">Pragma</span>
          : no-cache
          <br />
          <br />
          <span className="json">
            &#123;
            <br />
            <span className="hljs-attr">&quot;error&quot;</span>:{' '}
            <span className="hljs-string">&quot;invalid_request&quot;</span>
            ,<br />
            <span className="hljs-attr">&quot;error_description&quot;</span>:{' '}
            <span className="hljs-string">&quot;Invalid email address.&quot;</span>
            <br />
            &#125;
            <br />
          </span>
        </code>
      </pre>
    </CodeWrapper>
  </>
);

export { AuthCodeFlowContent };
