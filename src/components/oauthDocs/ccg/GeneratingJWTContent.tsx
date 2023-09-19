import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { SUPPORT_CONTACT_PATH } from '../../../types/constants/paths';
import { CodeBlock } from '../../../components';

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
      The basic structure for this is provided below.
    </p>
    <CodeBlock
      withCopyButton
      language="json"
      code={`\
{
  "aud": "TBD",
  "iss": "{yourClientId}",
  "sub": "{yourClientId}",
  "iat": 1604429781,
  "exp": 1604430081,
  "jti": "23f8f614-72c3-4267-b0da-b8b067662c74"
}`}
    />
    <p>
      The following example shows how the basic structure above would work for a NodeJS function
      using{' '}
      <a href="https://www.npmjs.com/package/njwt" target="_blank" rel="noopener noreferrer">
        nJwt
      </a>
      .
    </p>
    <p>
      Note: Ensure that your CCG assertion includes the optional, but recommended &quot;kid&quot; in the headers section.
    </p>
    <CodeBlock
      withCopyButton
      language="javascript"
      code={`function getAssertionPrivatekey (clientId, key, audience) {
  let algorithm = "RS256";
  const claims = { aud: audience, iss: clientId, sub: clientId, jti: uuidv4 };
  let secret = fs.readFileSync(key, "utf8");
  const token = jwt.create(claims, secret, algorithm); 
  token.setExpiration(new Date() - getTime() + 60 * 1000);
  token.setHeader('kid', 'your-key-id-here'); // Recommended
  return token.compact();
}`}
    />
    <p>The claims in your client assertion are described in this table.</p>
    <div className="table-wrapper">
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
              {sandboxAud !== productionAud && (
                <p>
                  For the {apiName} in production, this is:{' '}
                  <a href={`https://va.okta.com/oauth2/${productionAud}/v1/token`}>
                    {`https://va.okta.com/oauth2/${productionAud}/v1/token`}
                  </a>
                </p>
              )}
              <p>
                <b>Important: </b> To get production access, you must either work for VA or have
                specific VA agreements in place. If you have questions,{' '}
                <Link to={SUPPORT_CONTACT_PATH}>contact us</Link>.
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
              <strong>String.</strong> The unique token identifier. If you specify this parameter,
              the token can only be used once and, as a result, subsequent token requests won&apos;t
              succeed.
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

export default GeneratingJWTContent;
