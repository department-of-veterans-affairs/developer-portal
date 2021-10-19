import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { SectionHeaderWrapper, APISelector, CodeWrapper } from '../../index';
import { lookupApiByFragment } from '../../../apiDefs/query';
import { ClientCredentialsFlowContentProps } from '../../../containers/documentation/ClientCredentialsGrant/ClientCredentialsGrantDocs';

const AuthCodeFlowContent = (props: ClientCredentialsFlowContentProps): JSX.Element => {
  const apiDef = lookupApiByFragment(props.selectedOption);
  const scopes = apiDef?.oAuthInfo?.scopes ?? [];
  const baseAuthPath = apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2/{api}/v1';

  return (
    <div>
      <SectionHeaderWrapper heading="Requesting a Token with CCG" id="requesting-a-token" />
      <p>
        To get authorized, you’ll need
        to <a href="https://developer.okta.com/docs/reference/api/oidc/#token-claims-for-client-authentication-with-client-secret-or-private-key-jwt">generate a JSON web token</a> (JWT) and sign it using a private key. You’ll then use the signed JWT as a client assertion to receive an access token.
      </p>
      <h3 id="generating-signing-jwt" tabIndex={-1}>
        Generating and signing the JWT
      </h3>
      <p>
        Generate your JWT using:
      </p>
      <p>
        <ul>
          <li>The Lighthouse-provided client ID for the <code>iss</code> and <code>sub</code> claims</li>
          <li>The ID for your auth server</li>
          <li>An <code>aud</code> for your API</li>
        </ul>
      </p>
      <p>
        <strong>NOTE:</strong> The <code>aud</code> will not look like the <code>aud</code> for the SMART-on-FHIR token service.
        This different formatting is necessary because we apply SMART-on-FHIR on top of a commercial authorization provider.
        You can programmatically pull the <code>issuer</code> from the metadata
        at <a href={`https://sandbox-api.va.gov${baseAuthPath}/.well-known/openid-configuration`}>{`https://sandbox-api.va.gov${baseAuthPath}/.well-known/openid-configuration`}</a> and append <code>/v1/token</code> to avoid hardcoding this value and needing to change it if/when this is changed in the future.
      </p>
      <p>
        Sign your JWT using your RSA-generated private key, which you will use as a client assertion. An example for what the structure will look like is:
        <CodeWrapper>
          <ReactMarkdown
            rehypePlugins={[highlight]}
            components={{
              // eslint-disable-next-line react/display-name
              code: ({ className, children, ...codeProps }): JSX.Element =>
                // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                <code tabIndex={0} className={className} {...codeProps}>
                  {children}
                </code>,
            }}
          >
            {`~~~json
{
  "aud": "TBD",
  "iss": "TBD",
  "sub": "TBD",
  "iat": 1604429781,
  "exp": 1604430081,
  "jti": "23f8f614-72c3-4267-b0da-b8b067662c74"
}`             }
          </ReactMarkdown>
        </CodeWrapper>
      </p>
      <p>
        The claims in your client assertion are described in this table.
      </p>
      <table>
        <thead>
          <tr>
            <th>Claim</th>
            <th>Required</th>
            <th>Description</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>aud</code></td>
            <td>True</td>
            <td><strong>String.</strong> This is the URL for the API for which you are generating a token.  For the [API NAME], this is: XYZ</td>
          </tr>
          <tr>
            <td><code>iss</code></td>
            <td>True</td>
            <td><strong>String.</strong> This is the client ID we sent you when you signed up for sandbox access. </td>
          </tr>
          <tr>
            <td><code>sub</code></td>
            <td>True</td>
            <td><strong>String.</strong> This is the client ID we sent you when you signed up for sandbox access. </td>
          </tr>
          <tr>
            <td><code>iat</code></td>
            <td>False</td>
            <td><strong>Integer.</strong> This is a timestamp for how many seconds have passed since January 1, 1970 UTC. It must be a time before the request occurs. Example: 1604429781</td>
          </tr>
          <tr>
            <td><code>exp</code></td>
            <td>True</td>
            <td><strong>Integer.</strong> This is a timestamp for when the token will expire, given in seconds since January 1, 1970. This claim fails the request if the expiration time is more than 300 seconds (5 minutes) after the iat. Example: 1604430081. </td>
          </tr>
          <tr>
            <td><code>jti</code></td>
            <td>False</td>
            <td><strong>String.</strong> The unique token identifier. If you specify this parameter, the token can only be used once and, as a result, subsequent token requests won&apos;t succeed.</td>
          </tr>
        </tbody>
      </table>
      <h3 id="retrieving-access-token" tabIndex={-1}>
        Retrieving an access token
      </h3>
      <p>
        Use your client assertion to retrieve an access token. Be sure to include the scopes for the API
      </p>
      <p>
        Lighthouse recommends also providing launch context requirements using the launch parameter and launch scope,
        if applicable. These limit the scope of an access token by indicating the token is for a specific patient or
        encounter. If used, the launch parameter must be a base64 encoded JSON object, such as: <code>{'base64({"patient":"1000720100V271387"}) => LWIgeyJwYXRpZW50IjoiMTAwMDcyMDEwMFYyNzEzODcifQo=='}</code>
      </p>
      <p>
        Select your API from the dropdown to see the right auth server in the example.
      </p>
      <APISelector options={props.options} selectedOption={props.selectedOption} />
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element =>
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>,
          }}
        >
          {`~~~bash
curl --location --request POST 'https://sandbox-api.va.gov${baseAuthPath}/token' \\
  --header 'Accept: application/json' \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --data-urlencode 'grant_type=client_credentials' \\
  --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \\
  --data-urlencode 'client_assertion={{signed-assertion-here}}' \\
  --data-urlencode 'scope=system/Address.write system/Address.read launch' \\
  --data-urlencode 'launch=eyJwYXRpZW50IjoiMTIzNDUifQ==' \\
`}
        </ReactMarkdown>
      </CodeWrapper>
      <table>
        <thead>
          <tr>
            <th>Field</th>
            <th>Required</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><code>grant_type</code></td>
            <td>True</td>
            <td><code>client_credentials</code></td>
          </tr>
          <tr>
            <td><code>client_assertion_type</code></td>
            <td>True</td>
            <td><code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code></td>
          </tr>
          <tr>
            <td><code>client_assertion</code></td>
            <td>True</td>
            <td>
              <p>
                Base64 encoded, signed JWT in this format:
                <br />
                {'<header>'}
                <br />
                {'<payload>'}
                <br />
                {'<signature>'}
              </p>
              <p>
                With the base64 encoded payload similar to this:
                <CodeWrapper>
                  <ReactMarkdown
                    rehypePlugins={[highlight]}
                    components={{
                      // eslint-disable-next-line react/display-name
                      code: ({ className, children, ...codeProps }): JSX.Element =>
                        // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
                        <code tabIndex={0} className={className} {...codeProps}>
                          {children}
                        </code>,
                    }}
                  >
                    {`~~~json
base64url(
  {
    "aud": "TBD",
    "iss": "TBD",
    "sub": "TBD",
    "jti": "20f2e950-0065-11ec-a854-3def9ffaf1cb",
    "iat": 1629319488,
    "exp": 1629319548
  }
) => 
eyJhdWQiOiJUQkQiLCJpc3MiOiJUQkQiLCJzdWIiOiJUQkQiLCJqdGkiOiIyMGYyZTk1
MC0wMDY1LTExZWMtYTg1NC0zZGVmOWZmYWYxY2IiLCJpYXQiOjE2MjkzMTk0ODgsI
mV4cCI6MTYyOTMxOTU0OH0
`}
                  </ReactMarkdown>
                </CodeWrapper>
              </p>
            </td>
          </tr>
          <tr>
            <td><code>scope</code></td>
            <td>True</td>
            <td>
              <p>
                View a user&apos;s VA Health records and patient information, see specific read only scopes below.
                <ul>
                  {scopes.map(scope =>
                   (
                     <li key={scope}>{scope}</li>
                   )
                   )}
                </ul>
              </p>
            </td>
          </tr>
          <tr>
            <td><code>launch</code></td>
            <td>False (but recommended)</td>
            <td>
              <p>
                Base64-encoded JSON object, the value of which is the patient&apos;s ICN. The format of the object will
                be: <code>{'{ "patient": "1000720100V271387"}'}</code>
              </p>
              <p>
                When encoded using base64, the object will look like
                this: <code>LWIgeyJwYXRpZW50IjoiMTAwMDcyMDEwMFYyNzEzODcifQo==</code>
              </p>
            </td>
          </tr>
        </tbody>
      </table>
      <p>
        POST this assertion to the /token service to receive an access token in response.
        Lighthouse will respond with your access token, which looks like what is shown below.
      </p>
      <CodeWrapper>
        <ReactMarkdown
          rehypePlugins={[highlight]}
          components={{
            // eslint-disable-next-line react/display-name
            code: ({ className, children, ...codeProps }): JSX.Element =>
              // eslint-disable-next-line jsx-a11y/no-noninteractive-tabindex
              <code tabIndex={0} className={className} {...codeProps}>
                {children}
              </code>,
          }}
        >
          {`~~~bash
Host: api.va.gov
Content-Type: application/x-www-form-urlencoded
grant_type=client_credentials&
client_assertion_type=
urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=eyJhbGciOiJIUzI1N...&
scope=TBD
{
  "access_token": "eyJraWQiOi...",
  "token_type": "Bearer",
  "scope": "TBD",
  "expires_in": 900
}
`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>
        Use the returned access_token to authorize requests to our platform by including it in the header of HTTP
        requests as Authorization: Bearer {'{access_token}'}. Your access token will remain valid for 5 minutes.
        If your access token expires, you will need to request a new one.
      </p>
    </div>
  );
};

export { AuthCodeFlowContent };
