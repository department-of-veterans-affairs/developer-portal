import React, { FC } from 'react';
import ReactMarkdown from 'react-markdown';
import highlight from 'rehype-highlight';
import { CodeWrapper } from '../../../components';

interface GeneratingJWTProps {
  apiName: string;
  productionAud: string;
  sandboxAud: string;
}

const GeneratingJWTContent: FC<GeneratingJWTProps> = ({ apiName, productionAud, sandboxAud }) => (
  <>
    <h3 id="generating-signing-jwt" tabIndex={-1}>
      Generating and signing the JWT
    </h3>
    <p>Generate your JWT using:</p>
    <ul>
      <li>The client ID we sent you</li>
      <li>The ID for your auth server</li>
      <li>
        An <code>aud</code> for your API
      </li>
    </ul>
    <p>
      Sign your JWT using your RSA-generated private key, which you will use as a client assertion.
      An example for what the structure will look like is:
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
        {`~~~json
{
"aud": "TBD",
"iss": "{yourClientId}",
"sub": "{yourClientId}",
"iat": 1604429781,
"exp": 1604430081,
"jti": "23f8f614-72c3-4267-b0da-b8b067662c74"
}`}
      </ReactMarkdown>
    </CodeWrapper>
    <p>The claims in your client assertion are described in this table.</p>
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
          <td>
            <code>aud</code>
          </td>
          <td>True</td>
          <td>
            <p>
              <strong>String.</strong> This is the URL for the API for which you are generating a
              token.
            </p>
            <p>
              For the {apiName} in sandbox, this is:{' '}
              <a href={`https://deptva-eval.okta.com/oauth2/${sandboxAud}/v1/token`}>
                {`https://deptva-eval.okta.com/oauth2/${sandboxAud}/v1/token`}
              </a>
            </p>
            <p>
              For the {apiName} in production, this is:{' '}
              <a href={`https://va.okta.com/oauth2/${productionAud}/v1/token`}>
                {`https://va.okta.com/oauth2/${productionAud}/v1/token`}
              </a>
            </p>
          </td>
        </tr>
        <tr>
          <td>
            <code>iss</code>
          </td>
          <td>True</td>
          <td>
            <strong>String.</strong> This is the client ID we sent you when you signed up for
            sandbox access.
          </td>
        </tr>
        <tr>
          <td>
            <code>sub</code>
          </td>
          <td>True</td>
          <td>
            <strong>String.</strong> This is the client ID we sent you when you signed up for
            sandbox access.
          </td>
        </tr>
        <tr>
          <td>
            <code>iat</code>
          </td>
          <td>False</td>
          <td>
            <strong>Integer.</strong> This is a timestamp for how many seconds have passed since
            January 1, 1970 UTC. It must be a time before the request occurs. Example: 1604429781
          </td>
        </tr>
        <tr>
          <td>
            <code>exp</code>
          </td>
          <td>True</td>
          <td>
            <strong>Integer.</strong> This is a timestamp for when the token will expire, given in
            seconds since January 1, 1970. This claim fails the request if the expiration time is
            more than 300 seconds (5 minutes) after the iat. Example: 1604430081.{' '}
          </td>
        </tr>
        <tr>
          <td>
            <code>jti</code>
          </td>
          <td>False</td>
          <td>
            <strong>String.</strong> The unique token identifier. If you specify this parameter, the
            token can only be used once and, as a result, subsequent token requests won&apos;t
            succeed.
          </td>
        </tr>
      </tbody>
    </table>
  </>
);

export default GeneratingJWTContent;
