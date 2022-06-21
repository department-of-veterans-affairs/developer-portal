import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { APIDescription } from '../../../apiDefs/schema';
import { APISelector, CodeWrapper } from '../../../components';

interface RetrievingTokenProps {
  options: APIDescription[];
  selectedOption: string;
  scopes: string[];
  baseAuthPath: string;
}

const RetrievingTokenContent: FC<RetrievingTokenProps> = ({
  options,
  selectedOption,
  scopes,
  baseAuthPath,
}) => {
  const hasLaunchScope = scopes.includes('launch');

  return (
    <>
      <h3 id="retrieving-access-token" tabIndex={-1}>
        Retrieving an access token
      </h3>
      <p>
        Use your client assertion to retrieve an access token. Be sure to include the scopes for the
        API.
      </p>
      {hasLaunchScope && (
        <p>
          Lighthouse recommends also providing launch context requirements using the launch
          parameter and launch scope, if applicable. These limit the scope of an access token by
          indicating the token is for a specific patient or encounter. If used, the launch parameter
          must be a base64 encoded JSON object, such as:{' '}
          <code>
            {
              'base64({"patient":"1000720100V271387"}) => LWIgeyJwYXRpZW50IjoiMTAwMDcyMDEwMFYyNzEzODcifQo=='
            }
          </code>
        </p>
      )}
      <p>Select your API from the dropdown to see the correct auth server in the example.</p>
      <APISelector options={options} selectedOption={selectedOption} />
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
          {`~~~bash
curl --location --request POST 'https://sandbox-api.va.gov${baseAuthPath}/token' \\
  --header 'Accept: application/json' \\
  --header 'Content-Type: application/x-www-form-urlencoded' \\
  --data-urlencode 'grant_type=client_credentials' \\
  --data-urlencode 'client_assertion_type=urn:ietf:params:oauth:client-assertion-type:jwt-bearer' \\
  --data-urlencode 'client_assertion={{signed-assertion-here}}' \\
  --data-urlencode 'scope=${scopes.join(' ')}' \\
  ${hasLaunchScope ? "--data-urlencode 'launch=eyJwYXRpZW50IjoiMTIzNDUifQ==' \\" : ''}
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
            <td>
              <code>grant_type</code>
            </td>
            <td>True</td>
            <td>
              <code>client_credentials</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>client_assertion_type</code>
            </td>
            <td>True</td>
            <td>
              <code>urn:ietf:params:oauth:client-assertion-type:jwt-bearer</code>
            </td>
          </tr>
          <tr>
            <td>
              <code>client_assertion</code>
            </td>
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
              <p>With the base64 encoded payload similar to this:</p>
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
            </td>
          </tr>
          <tr>
            <td>
              <code>scope</code>
            </td>
            <td>True</td>
            <td>
              <ul>
                {scopes.map(scope => (
                  <li key={scope}>{scope}</li>
                ))}
              </ul>
            </td>
          </tr>
          {hasLaunchScope && (
            <tr>
              <td>
                <code>launch</code>
              </td>
              <td>False (but recommended)</td>
              <td>
                <p>
                  The launch scope and parameter limit the scope of an access token by indicating
                  the token is for a specific patient or encounter.
                </p>
                <p>
                  It must be a base64-encoded JSON object, the value of which is the patient&apos;s
                  ICN. The format of the object will be:{' '}
                  <code>{'{ "patient": "1000720100V271387"}'}</code>
                </p>
                <p>
                  When encoded using base64, the object will look like this:{' '}
                  <code>LWIgeyJwYXRpZW50IjoiMTAwMDcyMDEwMFYyNzEzODcifQo==</code>
                </p>
              </td>
            </tr>
          )}
        </tbody>
      </table>
      <p>POST this assertion to the /token service to receive an access token in response.</p>
      <p>We will respond with your access token, which looks like what is shown below.</p>
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
          {`~~~bash
Host: sandbox-api.va.gov
Content-Type: application/x-www-form-urlencoded
grant_type=client_credentials&
client_assertion_type=
urn%3Aietf%3Aparams%3Aoauth%3Aclient-assertion-type%3Ajwt-bearer&
client_assertion=eyJhbGciOiJIUzI1N...&
scope=${scopes.join(' ')}
{
  "access_token": "eyJraWQiOi...",
  "token_type": "Bearer",
  "scope": "${scopes.join(' ')}",
  "expires_in": 900
}
`}
        </ReactMarkdown>
      </CodeWrapper>
      <p>
        Use the returned access_token to authorize requests to our platform by including it in the
        header of HTTP requests as Authorization: Bearer {'{access_token}'}. Your access token will
        remain valid for 5 minutes. If your access token expires, you will need to request a new
        one.
      </p>
    </>
  );
};

export default RetrievingTokenContent;
