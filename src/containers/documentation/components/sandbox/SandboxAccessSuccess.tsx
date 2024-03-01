import { faCheckCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { isAcgApi, isApiKeyApi, isCcgApi } from '../../../../apiDefs/query';
import { APIDescription } from '../../../../apiDefs/schema';
import { ApplySuccessResult } from '../../../../types/forms/apply';
import './SandboxAccessSuccess.scss';
import { SUPPORT_CONTACT_PATH } from '../../../../types/constants/paths';

interface APIKeyNoticeProps {
  token: string;
  api: APIDescription;
  kongUsername: string;
}

interface OAuthACGCredentialsNoticeProps {
  api: APIDescription;
  clientID: string;
  clientSecret?: string;
  redirectURI: string;
}

interface OAuthCCGCredentialsNoticeProps {
  api: APIDescription;
  ccgClientId: string;
}

const OAuthACGCredentialsNotice: React.FunctionComponent<OAuthACGCredentialsNoticeProps> = ({
  api,
  clientID,
  clientSecret,
  redirectURI,
}: OAuthACGCredentialsNoticeProps) => (
  <>
    <h3>Sandbox credentials for the {api.name}.</h3>
    <va-alert background-only status="success" visible>
      <>
        <p>
          <strong>Your VA API OAuth Client ID: </strong> {clientID}
        </p>
        {clientSecret && (
          <p>
            <strong>Your VA API OAuth Client Secret: </strong> {clientSecret}
          </p>
        )}
        <p>
          <strong>Your Redirect URI is: </strong> {redirectURI}
        </p>
      </>
    </va-alert>
  </>
);

const OAuthCCGCredentialsNotice: React.FunctionComponent<OAuthCCGCredentialsNoticeProps> = ({
  ccgClientId,
  api,
}: OAuthCCGCredentialsNoticeProps) => (
  <>
    <h3>Sandbox credentials for the {api.name}.</h3>
    <va-alert background-only status="success" visible>
      <p>
        <strong>Your VA API OAuth Client ID: </strong> {ccgClientId}
      </p>
    </va-alert>
  </>
);

const ApiKeyNotice: React.FunctionComponent<APIKeyNoticeProps> = ({
  token,
  api,
  kongUsername,
}: APIKeyNoticeProps) => (
  <>
    <h3>Key for the {api.name}.</h3>
    <va-alert background-only status="success" visible>
      <>
        <p>
          <strong>Sandbox key:</strong> {token}
        </p>
        <p>
          <strong>Sandbox Request ID:</strong> {kongUsername}
        </p>
      </>
    </va-alert>
  </>
);

const InternalApiNotice: React.FunctionComponent = () => (
  <p>
    <strong>Important:</strong> to get production access for this API, you must either work for the
    VA or have specific VA agreements in place. If you have questions,{' '}
    <Link to={SUPPORT_CONTACT_PATH}>contact us</Link>.
  </p>
);

const SandboxAccessSuccess = (props: {
  result: ApplySuccessResult;
  api: APIDescription;
}): JSX.Element => {
  const { email, token, ccgClientId, clientID, clientSecret, kongUsername, redirectURI } =
    props.result;
  const { api } = props;

  return (
    <div className="signup-success-wrapper vads-u-margin-top--5">
      <FontAwesomeIcon icon={faCheckCircle} />
      <h2 className="vads-u-margin--0 vads-u-padding--0 vads-u-margin-left--5">Explore our APIs</h2>
      <div className="medium-screen:vads-u-margin-left--5">
        {isApiKeyApi(api) && token && kongUsername && (
          <ApiKeyNotice api={api} token={token} kongUsername={kongUsername} />
        )}
        {isAcgApi(api) && clientID && redirectURI && (
          <OAuthACGCredentialsNotice
            api={api}
            clientID={clientID}
            clientSecret={clientSecret}
            redirectURI={redirectURI}
          />
        )}
        {isCcgApi(api) && ccgClientId && (
          <OAuthCCGCredentialsNotice api={api} ccgClientId={ccgClientId} />
        )}
        <p>
          We sent this sandbox access information to your email address: <strong>{email}</strong>
        </p>
        <p>To access test data, follow the instructions in the email we sent to you.</p>
        {(isCcgApi(api) || api.name.includes('Address Validation')) && <InternalApiNotice />}
      </div>
    </div>
  );
};

export { SandboxAccessSuccess };
