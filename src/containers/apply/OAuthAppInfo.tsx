import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableRadioButtons from '@department-of-veterans-affairs/formation-react/ErrorableRadioButtons';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { ErrorableInput, RootState } from '../../types';

interface OAuthAppInfoProps {
  oAuthApplicationType: ErrorableInput;
  oAuthRedirectURI: ErrorableInput;
  updateOAuthApplicationType: (value: ErrorableInput) => void;
  updateOAuthRedirectURI: (oldValidation?: string) => (value: ErrorableInput) => void;
}

const mapStateToProps = (state: RootState) => ({
  oAuthApplicationType: state.application.inputs.oAuthApplicationType,
  oAuthRedirectURI: state.application.inputs.oAuthRedirectURI,
});

type OAuthAppInfoDispatch = ThunkDispatch<RootState, undefined, actions.UpdateApplicationAction>;

const mapDispatchToProps = (dispatch: OAuthAppInfoDispatch) => ({
  updateOAuthApplicationType: (value: ErrorableInput) => {
    dispatch(actions.updateApplyOAuthApplicationType(value));
  },
  updateOAuthRedirectURI: (oldValidation?: string) => (value: ErrorableInput) => {
    dispatch(actions.updateApplyOAuthRedirectURI(value, oldValidation));
  },
});

const OAuthAppInfo = (props: OAuthAppInfoProps) => {
  const { oAuthApplicationType, oAuthRedirectURI } = props;

  return (
    <React.Fragment>
      <div className="vads-u-margin-top--4">
        Please specify whether your app can securely hide a client secret. Apps that can hide a
        secret will use the&nbsp;
        <a
          href="https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/"
          target="_blank"
          rel="noreferrer"
        >
          authorization code flow
        </a>
        , and apps that cannot will use the&nbsp;
        <a href="https://www.oauth.com/oauth2-servers/pkce/" target="_blank" rel="noreferrer">
          PKCE flow
        </a>
        .
      </div>
      <ErrorableRadioButtons
        label="Can your application securely hide a client secret?"
        onValueChange={props.updateOAuthApplicationType}
        options={[
          {
            label: 'Yes',
            value: 'web',
          },
          {
            label: 'No',
            value: 'native',
          },
        ]}
        value={oAuthApplicationType}
        required
        additionalLegendClass="vads-u-margin-top--0"
        additionalFieldsetClass="vads-u-margin-top--1"
      />

      <ErrorableTextInput
        errorMessage={oAuthRedirectURI.validation}
        label="OAuth Redirect URI"
        field={oAuthRedirectURI}
        onValueChange={props.updateOAuthRedirectURI(oAuthRedirectURI.validation)}
        required
      />
    </React.Fragment>
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(OAuthAppInfo);
