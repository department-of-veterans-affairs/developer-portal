import * as React from 'react';

import { Link } from 'react-router-dom';

import {
  getAllKeyAuthApis,
  getAllApis,
  getAllAuthCodeApis,
  getAllCCGApis,
} from '../../../../apiDefs/query';
import { APIDescription } from '../../../../apiDefs/schema';
import sentenceJoin from '../../../../sentenceJoin';
import { ApplySuccessResult } from '../../../../types/forms/apply';
import { isVaEmail } from '../../../../utils/validators';
import './SandboxAccessSuccess.scss';

const AssistanceTrailer = (): JSX.Element => (
  <p>
    If you would like to report a bug or make a feature request, please open an issue through our{' '}
    <Link to="/support">Support page</Link>.
  </p>
);

interface APIKeyNoticeProps {
  token: string;
  email: string;
  kongUsername: string;
  selectedApis: string[];
}

interface OAuthACGCredentialsNoticeProps {
  clientID: string;
  clientSecret?: string;
  email: string;
  selectedApis: string[];
  redirectURI: string;
}

interface OAuthCCGCredentialsNoticeProps {
  ccgClientId: string;
  email: string;
  selectedApis: string[];
}

interface InternalApiNoticeProps {
  email: string;
}

const OAuthACGCredentialsNotice: React.FunctionComponent<OAuthACGCredentialsNoticeProps> = ({
  clientID,
  clientSecret,
  email,
  selectedApis,
  redirectURI,
}: OAuthACGCredentialsNoticeProps) => {
  const allApis = getAllApis();
  const apiNameList = allApis
    .filter(
      (api: APIDescription) =>
        selectedApis.includes(api.urlFragment) || selectedApis.includes(api.altID ?? ''),
    )
    .map((api: APIDescription) => api.name);
  const apiListSnippet = sentenceJoin(apiNameList);

  return (
    <div>
      <p className="usa-font-lead">
        <strong>Your VA API OAuth Client ID: </strong>
        <span className="oauth-client-id">{clientID}</span>
      </p>
      {clientSecret && (
        <p className="usa-font-lead">
          <strong>Your VA API OAuth Client Secret: </strong>
          <span className="oauth-client-secret">{clientSecret}</span>
        </p>
      )}
      <p className="usa-font-lead">
        <strong>Your Redirect URI is: </strong>
        <span className="oauth-redirect-uri">{redirectURI}</span>
      </p>

      <p>
        You should receive an email at {email} with the same credentials. Those credentials are for
        accessing the {apiListSnippet} in the sandbox environment. See our{' '}
        <Link to="/explore/authorization/docs/authorization-code">OAuth Documentation</Link> for
        more information on usage.
      </p>
    </div>
  );
};

const OAuthCCGCredentialsNotice: React.FunctionComponent<OAuthCCGCredentialsNoticeProps> = ({
  ccgClientId,
  email,
  selectedApis,
}: OAuthCCGCredentialsNoticeProps) => {
  const allApis = getAllApis();
  const apiNameList = allApis
    .filter(
      (api: APIDescription) =>
        selectedApis.includes(api.urlFragment) || selectedApis.includes(api.altID ?? ''),
    )
    .map((api: APIDescription) => api.name);
  const apiListSnippet = sentenceJoin(apiNameList);

  return (
    <div>
      <p className="usa-font-lead">
        <strong>Your VA API OAuth Client ID: </strong>
        <span className="oauth-client-id">{ccgClientId}</span>
      </p>

      <p>
        You should receive an email at {email} with the same credentials. Those credentials are for
        accessing the {apiListSnippet} in the sandbox environment. See our{' '}
        <Link to="/explore/authorization/docs/client-credentials">OAuth Documentation</Link> for
        more information on usage.
      </p>
    </div>
  );
};

const ApiKeyNotice: React.FunctionComponent<APIKeyNoticeProps> = ({
  token,
  email,
  kongUsername,
  selectedApis,
}: APIKeyNoticeProps) => {
  const allApis = getAllApis();
  const apiNameList = allApis
    .filter(
      (api: APIDescription) =>
        selectedApis.includes(api.urlFragment) || selectedApis.includes(api.altID ?? ''),
    )
    .map((api: APIDescription) => api.name);
  const apiListSnippet = sentenceJoin(apiNameList);

  return (
    <div>
      <p className="usa-font-lead">
        <strong>Your VA API key is:</strong> {token}
      </p>
      <p className="usa-font-lead">
        <strong>Your application id is:</strong> {kongUsername}
      </p>
      <p>
        You should receive an email at {email} with the same key. That key is for accessing the{' '}
        {apiListSnippet} in the sandbox environment. You can use it by including it in each request
        as an HTTP request header named <span className="va-api-u-font-family--mono">apiKey</span>.
      </p>
    </div>
  );
};

const InternalApiNotice: React.FunctionComponent<InternalApiNoticeProps> = ({
  email,
}: InternalApiNoticeProps) => (
  <p>You should receive an email at {email} containing your access credentials.</p>
);

const SandboxAccessSuccess = (props: { result: ApplySuccessResult }): JSX.Element => {
  const { apis, email, token, ccgClientId, clientID, clientSecret, kongUsername, redirectURI } =
    props.result;
  const keyAuthApis = getAllKeyAuthApis();
  const acgAuthApis = getAllAuthCodeApis();
  const ccgAuthApis = getAllCCGApis();
  const keyAuthApiList = keyAuthApis.map(api => api.altID ?? api.urlFragment);
  const acgAuthApisList = acgAuthApis.map(api => api.altID ?? api.urlFragment);
  const ccgAuthApisList = ccgAuthApis.map(api => api.altID ?? api.urlFragment);

  // Auth type should be encoded into global API table once it's extracted from ExploreDocs.
  const hasOAuthAcgAPI = acgAuthApisList.some(apiId => apis.includes(`acg/${apiId}`));
  const hasOAuthCcgAPI = ccgAuthApisList.some(appId => apis.includes(`ccg/${appId}`));
  const hasStandardAPI = keyAuthApiList.some(apiId => apis.includes(`apikey/${apiId}`));
  const hasInternalAPI = isVaEmail(email);
  const oAuthAcgAPIs = acgAuthApisList.filter(apiId => apis.includes(`acg/${apiId}`));
  const oAuthCcgAPIs = ccgAuthApisList.filter(apiId => apis.includes(`ccg/${apiId}`));
  const standardAPIs = keyAuthApiList.filter(apiId => apis.includes(`apikey/${apiId}`));

  return (
    <>
      <p>
        <strong>Thank you for signing up!</strong>
      </p>
      {!hasInternalAPI && (
        <>
          {hasStandardAPI && token && kongUsername && (
            <ApiKeyNotice
              email={email}
              token={token}
              kongUsername={kongUsername}
              selectedApis={standardAPIs}
            />
          )}
          {hasOAuthAcgAPI && clientID && redirectURI && (
            <OAuthACGCredentialsNotice
              email={email}
              clientID={clientID}
              clientSecret={clientSecret}
              selectedApis={oAuthAcgAPIs}
              redirectURI={redirectURI}
            />
          )}
          {hasOAuthCcgAPI && ccgClientId && (
            <OAuthCCGCredentialsNotice
              email={email}
              ccgClientId={ccgClientId}
              selectedApis={oAuthCcgAPIs}
            />
          )}
          <AssistanceTrailer />
        </>
      )}
      {hasInternalAPI && <InternalApiNotice email={email} />}
    </>
  );
};

export { SandboxAccessSuccess };
