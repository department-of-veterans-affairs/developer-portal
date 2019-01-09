import * as React from 'react';

import { connect } from 'react-redux';

import { IApplication, IRootState } from '../types';
import { ASSISTANCE_EMAIL_ADDRESS } from '../types/constants';

import './Apply.scss';

const mapDispatchToProps = (dispatch: any) => {
  return {};
};

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

function TokenNotice({ token } : { token: string }) {
  return (
    <div>
      <p className="usa-font-lead"><strong>Your VA API token is:</strong> {token}</p>
    </div>
  );
}

function ApplySuccess(props: IApplication) {
  const { inputs: { apis, email }, token } = props;

  const oAuthNotice = (apis.health)
    ? <span>We will email you at {email.value} soon to setup OAuth credentials for the Health API.</span>
    : <span>If you decide to develop an application with the Health API, email us at <AssistanceEmail /> to setup OAuth credentials.</span>;

  return (
    <div role="region" aria-labelledby="apply-region" className="usa-grid api-application">
      <strong>Thank you for signing up!</strong>

      <TokenNotice token={token} />

      <p>
        This same token will also be emailed to {email.value}. You can use this
        token now in the dev environment. It will work with all APIs other than
        the Health API. {oAuthNotice}
      </p>
      <AssistanceTrailer />
    </div>
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(ApplySuccess);
