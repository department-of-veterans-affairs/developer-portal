import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { APISelector, CodeWrapper } from '../index';
import { isApiDeactivated } from '../../apiDefs/deprecated';
import { getAllOauthApis } from '../../apiDefs/query';
import { APIDescription } from '../../apiDefs/schema';
import PKCEQueryParamsTable from './PKCEQueryParamsTable.mdx';

interface PKCEAuthContentProps {
  apiDef: APIDescription | null;
  selectedOption: string;
  onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PKCEAuthContent = (props: PKCEAuthContentProps): JSX.Element => {
  const selectorProps = {
    onSelectionChange: props.onSelectionChange,
    options: getAllOauthApis().filter((item: APIDescription) => !isApiDeactivated(item)),
    selectedOption: props.selectedOption,
  };
  const authUrl = `\`\`\`plaintext\nhttps://sandbox-api.va.gov${props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/authorization?\n  client_id=0oa1c01m77heEXUZt2p7\n  &redirect_uri=<yourRedirectURL>\n  &response_type=code\n  &scope=${props.apiDef?.oAuthInfo?.scopes.join(' ') ?? ''}\n  &state=1AOQK33KIfH2g0ADHvU1oWAb7xQY7p6qWnUFiG1ffcUdrbCY1DBAZ3NffrjaoBGQ\n  &code_challenge_method=S256\n  &code_challenge=gNL3Mve3EVRsiFq0H6gfCz8z8IUANboT-eQZgEkXzKw\n\`\`\``;
  const codeGrant = '\`\`\`plaintext\nGET <yourRedirectURL>?\n  code=z92dapo5\n  &state=af0ifjsldkj\n  Host: <yourRedirectHost>\n\`\`\`';
  const postToken = `\`\`\`plaintext\nPOST ${props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=authorization_code\n&code=z92dapo5\n&state=af0ifjsldkj\n&redirect_uri=<yourRedirectURL>\n&code_verifier=ccec_bace_d453_e31c_eb86_2ad1_9a1b_0a89_a584_c068_2c96\n\`\`\``;
  const postTokenResponse200 = `\`\`\`plaintext\n{\n  "access_token": "SlAV32hkKG",\n  "expires_in": 3600,\n  "refresh_token": "8xLOxBtZp8",\n  "scope": "${props.apiDef?.oAuthInfo?.scopes.join(' ') ?? ''}",\n  "state": "af0ifjsldkj",\n  "token_type": "Bearer",\n}\n\`\`\``;
  const postTokenResponse400 = '\`\`\`http\nHTTP/1.1 400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request"\n}\n\`\`\`';
  const postTokenRefresh = `\`\`\`http\nPOST ${props.apiDef?.oAuthInfo?.baseAuthPath ?? '/oauth2'}/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=refresh_token\n&refresh_token={your refresh_token}\n&client_id={client_id}\n&scope={${props.apiDef?.oAuthInfo?.scopes.join(' ') ?? ''}}\n\`\`\``;

  return (
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
        Begin the OpenID Connect authorization by using the authorization endpoint, query
        parameters, and scopes listed below.
      </p>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <ReactMarkdown>{authUrl}</ReactMarkdown>
      </CodeWrapper>

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
        After the Veteran consents to authorize your application, their browser will redirect to
        your application with the response shown below, which returns the <code>code</code> and{' '}
        <code>state</code> parameters you must use to make a request to our authorization service
        and the <code>code_verifier</code> used to create the <code>code_challenge</code> in the
        previous step.
      </p>

      <CodeWrapper>
        <ReactMarkdown>{codeGrant}</ReactMarkdown>
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
        <ReactMarkdown>{postToken}</ReactMarkdown>
      </CodeWrapper>

      <p>
        The authorization server will send a 200 response with an{' '}
        <HashLink to="#id-token">
          access token
        </HashLink>
        . If you requested the <code>offline_access</code> scope, you will also receive a{' '}
        <code>refresh_token</code>. The response body will look like this, where{' '}
        <code>expires_in</code> is the time in seconds before the token expires:
      </p>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <ReactMarkdown>{postTokenResponse200}</ReactMarkdown>
      </CodeWrapper>

      <p>If an error occurs, you will instead receive a 400 response, like this:</p>

      <CodeWrapper>
        <ReactMarkdown>{postTokenResponse400}</ReactMarkdown>
      </CodeWrapper>

      <p>
        Use the returned <code>access_token</code> to authorize requests to our platform by
        including it in the header of HTTP requests as{' '}
        <code>Authorization: Bearer {'{access_token}'}</code>.
      </p>

      <p>
        <strong>NOTE:</strong> the{' '}
        <HashLink to="#id-token">
          access token
        </HashLink>{' '}
        will only work for the API and scopes for which you have previously initiated authorization.
      </p>

      <p>
        Use the <code>refresh_token</code> to obtain a new <code>access_token</code> after its
        expiry by sending the following request.
      </p>

      <APISelector {...selectorProps} />
      <CodeWrapper>
        <ReactMarkdown>{postTokenRefresh}</ReactMarkdown>
      </CodeWrapper>

      <p>
        The response will return a new <code>access_token</code> and <code>refresh_token</code>, if
        you requested the <code>offline_access</code> scope.
      </p>
    </section>
  );
};
PKCEAuthContent.propTypes = {
  apiDef: PropTypes.object,
  onSelectionChange: PropTypes.func,
  selectedOption: PropTypes.string,
};

export { PKCEAuthContent };
