import * as React from 'react';

import { connect } from 'react-redux';

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

class ApiKeyNotice extends React.Component<IApiKeyNoticeProps, {}> {
  // Proper names should be encoded into global API table once it's extracted from ExploreDocs.
  private apisToProperNames = {
    appeals: 'Appeals Status API',
    benefits: 'Benefits Intake API',
    facilities: 'VA Facilities API',
    health: 'Health API',
    verification: 'Veteran Verification API',
  };

  public render() {
    const { token, email, selectedApis } = this.props;
    const apiListSnippet = this.apisToEnglishList(selectedApis.filter((k) => k !== 'health'));

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

  private apisToEnglishList(apis: string[]): string {
    return sentenceJoin(apis.map((k) => {
      return this.apisToProperNames[k];
    }));
  }
}

function selectedApiNames(apis: IApiList): string[] {
  return Object.keys(apis).filter((apiName) => {
    return apis[apiName] === true;
  });
}

function ApplySuccess(props: IApplication) {
  const { inputs: { apis, email }, token } = props;
  const selectedApis=selectedApiNames(apis);
  // Auth type should be encoded into global API table once it's extracted from ExploreDocs.
  const onlyOAuthSelected = (
      (selectedApis.indexOf('benefits') === -1)
      && (selectedApis.indexOf('facilities') === -1)
      && (selectedApis.indexOf('appeals') === -1)
    );

  const tokenNotice = onlyOAuthSelected
    ? null
    : <ApiKeyNotice email={email.value} token={token} selectedApis={selectedApiNames(apis)} />;

  const oAuthNotice = (apis.health)
    ? <span>We will email you at {email.value} soon to setup OAuth credentials for the Health API.</span>
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
