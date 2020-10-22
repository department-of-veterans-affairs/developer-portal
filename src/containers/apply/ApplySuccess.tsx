import * as React from 'react';

import classNames from 'classnames';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { getApiDefinitions } from '../../apiDefs/query';
import sentenceJoin from '../../sentenceJoin';
import { ApplySuccessResult, RootState } from '../../types';
import { APPLY_OAUTH_APIS, APPLY_STANDARD_APIS, PAGE_HEADER_ID } from '../../types/constants';

const mapStateToProps = (state: RootState) => ({
  ...state.application.result,
});

const AssistanceTrailer = () => (
  <p>
    If you would like to report a bug or make a feature request, please open an issue through our{' '}
    <Link to="/support">Support page</Link>.
  </p>
);

interface APIKeyNoticeProps {
  token: string;
  email: string;
  selectedApis: string[];
}

interface OAuthCredentialsNoticeProps {
  clientID: string;
  clientSecret?: string;
  email: string;
  selectedApis: string[];
}

// Mapping from the options on the form to Proper Names for APIs
const apisToEnglishOAuthList: Record<string, string> = {
  claims: 'Benefits Claims API',
  communityCare: 'Community Care API',
  health: 'VA Health API',
  verification: 'Veteran Verification API',
};

const apisToEnglishApiKeyList = (): Record<string, string> => {
  const apiDefs = getApiDefinitions();
  return {
    benefits: apiDefs.benefits.properName,
    confirmation: 'Veteran Confirmation API',
    facilities: apiDefs.facilities.properName,
    vaForms: apiDefs.vaForms.properName,
  };
};

const OAuthCredentialsNotice = ({
  clientID,
  clientSecret,
  email,
  selectedApis,
}: OAuthCredentialsNoticeProps) => {
  const apiNameList = selectedApis.map(k => apisToEnglishOAuthList[k]);
  const apiListSnippet = sentenceJoin(apiNameList);

  return (
    <div>
      <p className="usa-font-lead">
        <strong>Your VA API OAuth Client ID:</strong> {clientID}
      </p>
      {clientSecret && (
        <p className="usa-font-lead">
          <strong>Your VA API OAuth Client Secret:</strong> {clientSecret}
        </p>
      )}

      <p>
        You should receive an email at {email} with the same credentials. Those credentials are for
        accessing the {apiListSnippet} in the sandbox environment. See our{' '}
        <Link to="/oauth">OAuth Documentation</Link> for more information on usage.
      </p>
    </div>
  );
};

const ApiKeyNotice = ({ token, email, selectedApis }: APIKeyNoticeProps) => {
  const apiNameList = selectedApis.map(k => apisToEnglishApiKeyList()[k]);
  const apiListSnippet = sentenceJoin(apiNameList);

  return (
    <div>
      <p className="usa-font-lead">
        <strong>Your VA API key is:</strong> {token}
      </p>
      <p>
        You should receive an email at {email} with the same key. That key is for accessing the{' '}
        {apiListSnippet} in the sandbox environment. You can use it by including it in each request
        as an HTTP request header named <span className="va-api-u-font-family--mono">apiKey</span>.
      </p>
    </div>
  );
};

const ApplySuccess = (props: ApplySuccessResult) => {
  const { apis, email, token, clientID, clientSecret } = props;

  // Auth type should be encoded into global API table once it's extracted from ExploreDocs.
  const hasOAuthAPI = APPLY_OAUTH_APIS.some(apiId => apis[apiId]);
  const hasStandardAPI = APPLY_STANDARD_APIS.some(apiId => apis[apiId]);
  const oAuthAPIs = APPLY_OAUTH_APIS.filter(apiId => apis[apiId]);
  const standardAPIs = APPLY_STANDARD_APIS.filter(apiId => apis[apiId]);

  return (
    <div
      role="region"
      aria-labelledby={PAGE_HEADER_ID}
      className={classNames('vads-l-grid-container', 'vads-u-padding--4')}
    >
      <p>
        <strong>Thank you for signing up!</strong>
      </p>
      {hasStandardAPI && <ApiKeyNotice email={email} token={token} selectedApis={standardAPIs} />}
      {hasOAuthAPI && clientID && (
        <OAuthCredentialsNotice
          email={email}
          clientID={clientID}
          clientSecret={clientSecret}
          selectedApis={oAuthAPIs}
        />
      )}
      <AssistanceTrailer />
    </div>
  );
};

export default connect(mapStateToProps)(ApplySuccess);
