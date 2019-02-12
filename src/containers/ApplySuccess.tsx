import * as React from 'react';

import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { apiDefs } from '../apiDefs';
import sentenceJoin from '../sentenceJoin';
import { IApiList, IApplication, IRootState } from '../types';
import { ASSISTANCE_EMAIL_ADDRESS } from '../types/constants';

import './Apply.scss';

const mapStateToProps = (state : IRootState) => {
  return {
    ...state.application,
  };
};

function AssistanceEmail() {
  return <a href={`mailto:${ASSISTANCE_EMAIL_ADDRESS}`}>{`${ASSISTANCE_EMAIL_ADDRESS}`}</a>;
}

function AssistanceTrailer() {
  return (
    <p>If you need any assistance, please email us at <AssistanceEmail /></p>
  );
}

interface IApiKeyNoticeProps {
  token: string;
  email: string;
  selectedApis: string[];
}

interface IOAuthCredentialsNoticeProps {
  clientID: string;
  clientSecret: string;
  email: string;
  selectedApis: string[];
}

const apisToEnglishList = (apis: string[]): string => {
  return sentenceJoin(apis.map((k) => {
    return apiDefs[k].properName;
  }));
}

function OAuthCredentialsNotice({ clientID, clientSecret, email, selectedApis } : IOAuthCredentialsNoticeProps) {
  const apiListSnippet = apisToEnglishList(selectedApis.filter((k) => !apiDefs[k].apiKey));

  return (
    <div>
      <p className="usa-font-lead"><strong>Your VA API OAuth Client ID:</strong> {clientID}</p>
      <p className="usa-font-lead"><strong>Your VA API OAuth Client Secret:</strong> {clientSecret}</p>

      <p>
        You should receive an email at {email} with the same credentials. Those credentials are for accessing the {apiListSnippet} in the development environment.
        See our <Link to="/oauth">OAuth Documentation</Link> for more information on usage.
      </p>

    </div>
  );
}

function ApiKeyNotice({ token, email, selectedApis } : IApiKeyNoticeProps) {
  const apiListSnippet = apisToEnglishList(selectedApis.filter((k) => apiDefs[k].apiKey));

  return (
    <div>
      <p className="usa-font-lead"><strong>Your VA API key is:</strong> {token}</p>

      <p>
        You should receive an email at {email} with the same key. That key is for accessing the {apiListSnippet} in the development environment.
        You can use it by including it in each request as an HTTP request header named <span className="mono">apiKey</span>.
      </p>

    </div>
  );
}

function selectedApiNames(apis: IApiList): string[] {
  return Object.keys(apis).filter((apiName) => {
    return apis[apiName] === true;
  });
}

function ApplySuccess(props: IApplication) {
  const { inputs: { apis, email: { value: email } }, token, clientID, clientSecret } = props;
  const selectedApis=selectedApiNames(apis);
  // Auth type should be encoded into global API table once it's extracted from ExploreDocs.
  const onlyOAuthSelected = (
    (selectedApis.indexOf('benefits') === -1)
    && (selectedApis.indexOf('facilities') === -1)
    && (selectedApis.indexOf('appeals') === -1)
  );

  const tokenNotice = onlyOAuthSelected
                    ? null
                    : <ApiKeyNotice email={email} token={token} selectedApis={selectedApiNames(apis)} />;

  const oAuthNotice = ((apis.health || apis.verification) && clientID && clientSecret)
                    ? <OAuthCredentialsNotice email={email} clientID={clientID} clientSecret={clientSecret} selectedApis={selectedApiNames(apis)} />
                    : <span>If you decide to develop an application with the Health API or the Verification API, email us at <AssistanceEmail /> to setup OAuth credentials.</span>;

  return (
    <div role="region" aria-labelledby="apply-region" className="usa-grid api-application">
      <p><strong>Thank you for signing up!</strong></p>

      {tokenNotice}

      {oAuthNotice}

      <AssistanceTrailer />
    </div>
  );
}

export default connect(mapStateToProps)(ApplySuccess);
