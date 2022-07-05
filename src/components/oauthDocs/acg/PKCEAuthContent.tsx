/* eslint-disable max-lines */
import * as React from 'react';
import { HashLink } from 'react-router-hash-link';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { APISelector, CodeWrapper } from '../../index';
import { APIDescription } from '../../../apiDefs/schema';

interface PKCEContentProps {
  options: APIDescription[];
  selectedOption: string;
  apiDef: APIDescription | null;
}
const PKCEAuthContent = (props: PKCEContentProps): JSX.Element => {
  const baseAuthPath = props.apiDef?.oAuthInfo?.acgInfo?.baseAuthPath ?? '/oauth2/{api}/v1';
  return (
    <>
      <h3 tabIndex={-1} id="pkce-authorization">
        PKCE (Proof Key for Code Exchange) Authorization
      </h3>
      <p>
        <strong>NOTE:</strong> We provide a{' '}
        <a href="https://github.com/department-of-veterans-affairs/vets-api-clients/tree/master/samples/oauth_pkce_cli">
          sample CLI application
        </a>{' '}
        for getting started using PKCE.
      </p>
      <h4 tabIndex={-1} id="pkce-requesting-authorization">
        Requesting Authorization
      </h4>
      <p>
        Begin the OpenID Connect authorization by using the authorization endpoint, query
        parameters, and scopes listed below.
      </p>
      <APISelector
        options={props.options}
        selectedOption={props.selectedOption}
        buttonText="Update code"
        buttonSuccessMessage="Code updated!"
        theme="dark"
      />
      <CodeWrapper>
        <ReactMarkdown
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~plaintext
https://sandbox-api.va.gov${baseAuthPath}/authorization?
  client_id=0oa1c01m77heEXUZt2p7
  &redirect_uri=<yourRedirectURL>
  &response_type=code
  &scope=${props.apiDef?.oAuthInfo?.acgInfo?.scopes.join(' ') ?? 'profile openid offline_access'}
  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ
  &code_challenge_method=S256
  &code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw`}
        </ReactMarkdown>
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
              The <code>client_id</code> issued by the VA Lighthouse APIs team team
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
              application.
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
              <code>code_challenge</code>
            </td>
            <td>
              <strong>Required</strong>
            </td>
            <td>
              Base64 encoded challenge generated from your <code>code_verifier</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>code_challenge_method</code>
            </td>
            <td>
              <strong>Required</strong>
            </td>
            <td>
              Supported code challenges: <code>S256</code>
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
              Specifying a <code>state</code> param helps protect against some classes of Cross Site
              Request Forgery (CSRF) attacks, and applications must include it. The{' '}
              <code>state</code> param will be passed back from the authorization server to your
              redirect URL unchanged, and your application should verify that it has the expected
              value. This helps assure that the client receiving the authorization response is the
              same as the client that initiated the authorization process.
            </td>
          </tr>
          <tr>
            <td>
              <code>scope</code>
            </td>
            <td>Optional</td>
            <td>
              Will use your application&#39;s default scopes unless you specify a smaller subset of
              scopes separated by a space. Review the{' '}
              <HashLink to={{ ...location, hash: '#scopes' }}>Scopes section</HashLink> for more
              information.
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
                regardless of session state. If omitted, an existing active session with the
                identity provider may not require the user to provide credentials.
              </p>
              <p>
                If <code>consent</code> is specified, the user will be asked to consent to their
                scopes being used regardless of prior consent.
              </p>
              <p>
                If <code>none</code> is specified, an application will attempt an authorization
                request without user interaction. When the session is invalid or there are scopes
                the user has not consented to, one of the following errors will be thrown:{' '}
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
        defined by your scopes. After the Veteran gives permission, your application will receive an
        authorization code.
      </p>
      <h4 tabIndex={-1} id="pkce-requesting-a-token">
        Requesting a Token with an Authorization Code Grant
      </h4>
      <p>
        After the Veteran consents to authorize your application, their browser will redirect to
        your application with the response shown below, which returns the <code>code</code> and{' '}
        <code>state</code> parameters you must use to make a request to our authorization service
        and the <code>code_verifier</code> used to create the <code>code_challenge</code> in the
        previous step.
      </p>
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~http
HTTP/1.1 302 Found
Location: <yourRedirectURL>?
  code=z92dapo5
  &state=af0ifjsldkj`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>Use the following format, in HTTP basic authentication, for your request.</p>
      <ul>
        <li>
          Use the <code>code</code> parameter that was returned in the previous step.
        </li>
        <li>
          Be sure to replace <code>{'<yourRedirectURL>'}</code> with the redirect URL that you
          provided during registration.
        </li>
      </ul>
      <APISelector
        options={props.options}
        selectedOption={props.selectedOption}
        buttonText="Update code"
        buttonSuccessMessage="Code updated!"
        theme="dark"
      />
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~http
POST ${props.apiDef?.oAuthInfo?.acgInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/token HTTP/1.1
Host: sandbox-api.va.gov
Content-Type: application/x-www-form-urlencoded

grant_type=authorization_code
&code=z92dapo5
&client_id=0oa1c01m77heEXUZt2p7
&redirect_uri=<yourRedirectURL>
&code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>
        The authorization server will send a 200 response with an{' '}
        <HashLink to={{ ...location, hash: '#id-token' }}>access token</HashLink>. If you requested
        the <code>offline_access</code> scope, you will also receive a <code>refresh_token</code>.
        The response body will look like this, where <code>expires_in</code> is the time in seconds
        before the token expires:
      </p>
      <APISelector
        options={props.options}
        selectedOption={props.selectedOption}
        buttonText="Update code"
        buttonSuccessMessage="Code updated!"
        theme="dark"
      />
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~json
{
    "access_token": "SlAV32hkKG",
    "expires_in": 3600,
    "refresh_token": "8xLOxBtZp8",
    "scope": ${
      props.apiDef?.oAuthInfo?.acgInfo?.scopes.join(' ') ?? 'profile openid offline_access'
    },
    "state": "af0ifjsldkj",
    "token_type": "Bearer"
}`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>If an error occurs, you will instead receive a 400 response, like this:</p>
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~http
HTTP/1.1 400 Bad Request
Content-Type: application/json
Cache-Control: no-store
Pragma: no-cache

{
    "error": "invalid_request"
}`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>
        Use the returned <code>access_token</code> to authorize requests to our platform by
        including it in the header of HTTP requests as{' '}
        <code>Authorization: Bearer &#123;access_token&#125;</code>.
      </p>
      <p>
        <strong>NOTE: </strong>the{' '}
        <HashLink to={{ ...location, hash: '#id-token' }}>access token </HashLink> will only work
        for the API and scopes for which you have previously initiated authorization.
      </p>
      <p>
        Refresh tokens expire if they are not used for a period of 7 days in sandbox and 42 days in
        production. Use the <code>refresh_token</code> to obtain a new <code>access_token</code>{' '}
        after its expiry by sending the following request.
      </p>
      <APISelector
        options={props.options}
        selectedOption={props.selectedOption}
        buttonText="Update code"
        buttonSuccessMessage="Code updated!"
        theme="dark"
      />
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element => (
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>
            ),
          }}
        >
          {`~~~http
POST ${props.apiDef?.oAuthInfo?.acgInfo?.baseAuthPath ?? '/oauth2/{api}/v1'}/token HTTP/1.1
Host: sandbox-api.va.gov
Content-Type: application/x-www-form-urlencoded

grant_type=refresh_token
&refresh_token={your refresh_token}
&client_id={client_id}
&scope=${props.apiDef?.oAuthInfo?.acgInfo?.scopes.join(' ') ?? 'profile openid offline_access'}`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>
        The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
        you requested the
        <code>offline_access</code> scope.
      </p>
    </>
  );
};

export { PKCEAuthContent };
