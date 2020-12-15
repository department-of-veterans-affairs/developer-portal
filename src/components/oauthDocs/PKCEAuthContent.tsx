import * as React from 'react';
import ReactMarkdown from 'react-markdown';
import PropTypes from 'prop-types';
import { HashLink } from 'react-router-hash-link';
import { CodeWrapper } from '../codeWrapper/CodeWrapper';
import { APIDescription } from '../../apiDefs/schema';
import { onHashAnchorClick } from '../../utils/clickHandlers';
import PKCEQueryParamsTable from './PKCEQueryParamsTable.mdx';

interface PKCEAuthContentProps {
  apiDef: APIDescription | null;
  options: APIDescription[];
  selectedOption: string;
  onSelectionChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
}

const PKCEAuthContent = (props: PKCEAuthContentProps): JSX.Element => {
  const wrapperProps = {
    onSelectionChange: props.onSelectionChange,
    options: props.options,
    selectedOption: props.selectedOption,
  };
  const authUrl = `\`\`\`plaintext\n${props.apiDef?.pkceDocs?.authUrl ?? ''}\n\`\`\``;
  const codeGrant = '\`\`\`plaintext\nGET <yourRedirectURL>?\n  code=z92dapo5\n  &state=af0ifjsldkj\n  Host: <yourRedirectHost>\n\`\`\`';
  const postToken = `\`\`\`plaintext\n${props.apiDef?.pkceDocs?.authPostToken ?? ''}\n\`\`\``;
  const postTokenResponse200 = '\`\`\`plaintext\n{\n  "access_token": "SlAV32hkKG",\n  "expires_in": 3600,\n  "refresh_token": "8xLOxBtZp8",\n  "scope": "openid profile email offline_access",\n  "state": "af0ifjsldkj",\n  "token_type": "Bearer",\n}\`\`\`';
  const postTokenResponse400 = '\`\`\`http\nHTTP/1.1 400 Bad Request\nContent-Type: application/json\nCache-Control: no-store\nPragma: no-cache\n\n{\n  "error": "invalid_request"\n}\n\`\`\`';
  const postTokenRefresh = '\`\`\`http\nPOST /oauth2/token HTTP/1.1\nHost: sandbox-api.va.gov\nContent-Type: application/x-www-form-urlencoded\n\ngrant_type=refresh_token&refresh_token={your refresh_token}&client_id={client_id}&scope={space separated scopes}\n\`\`\`';

  return (
    <section aria-labelledby="pkce-authorizations">
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

      <CodeWrapper {...wrapperProps}>
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

      <CodeWrapper {...wrapperProps}>
        <ReactMarkdown>{postToken}</ReactMarkdown>
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
        <HashLink to="#id-token" onClick={onHashAnchorClick}>
          access token
        </HashLink>{' '}
        will only work for the API and scopes for which you have previously initiated authorization.
      </p>

      <p>
        Use the <code>refresh_token</code> to obtain a new <code>access_token</code> after its
        expiry by sending the following request.
      </p>

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
  options: PropTypes.array,
  selectedOption: PropTypes.string,
};

export { PKCEAuthContent };
