import * as React from 'react';
import { connect } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableRadioButtons from '@department-of-veterans-affairs/formation-react/ErrorableRadioButtons';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { IErrorableInput, IRootState } from '../../types';

interface IOAuthAppInfoProps {
  oAuthApplicationType: IErrorableInput;
  oAuthRedirectURI: IErrorableInput;
  updateOAuthApplicationType: (value: IErrorableInput) => void;
  updateOAuthRedirectURI: (value: IErrorableInput) => void;
}

const mapStateToProps = (state: IRootState) => {
  return {
    oAuthApplicationType: state.application.inputs.oAuthApplicationType,
    oAuthRedirectURI: state.application.inputs.oAuthRedirectURI,
  };
};

type OAuthAppInfoDispatch = ThunkDispatch<
  IRootState,
  undefined,
  actions.UpdateApplicationAction
>;

const mapDispatchToProps = (dispatch: OAuthAppInfoDispatch) => {
  return {
    updateOAuthApplicationType: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOAuthApplicationType(value));
    },
    updateOAuthRedirectURI: (value: IErrorableInput) => {
      dispatch(actions.updateApplicationOAuthRedirectURI(value));
    },
  };
};

const OAuthAppInfo = (props: IOAuthAppInfoProps) => {
  return (
    <React.Fragment>
      <div className="vads-u-margin-top--4">
        Please specify whether your app can securely hide a client secret. 
        Apps that can hide a secret will use the&nbsp;
        <a href="https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/" target="_blank">
          authorization code flow
        </a>,
        and apps that cannot will use the&nbsp;
        <a href="https://www.oauth.com/oauth2-servers/pkce/" target="_blank">PKCE flow</a>.
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
        value={props.oAuthApplicationType}
        required={true}
        additionalLegendClass="vads-u-margin-top--0"
        additionalFieldsetClass="vads-u-margin-top--1"
      />
        
      <ErrorableTextInput
        errorMessage={props.oAuthRedirectURI.validation}
        label="OAuth Redirect URI"
        field={props.oAuthRedirectURI}
        onValueChange={props.updateOAuthRedirectURI}
        required={true}
      />
    </React.Fragment>
  );
};

export default connect(mapStateToProps, mapDispatchToProps)(OAuthAppInfo);