import * as React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ThunkDispatch } from 'redux-thunk';

import ErrorableRadioButtons from '@department-of-veterans-affairs/formation-react/ErrorableRadioButtons';
import ErrorableTextInput from '@department-of-veterans-affairs/formation-react/ErrorableTextInput';
import * as actions from '../../actions';
import { ErrorableInput, RootState } from '../../types';

type OAuthAppInfoDispatch = ThunkDispatch<RootState, undefined, actions.UpdateApplicationAction>;

const OAuthAppInfo: React.FunctionComponent = (): JSX.Element => {
  const dispatch = useDispatch<OAuthAppInfoDispatch>();

  const oAuthApplicationType = useSelector((state: RootState) => state.application.inputs.oAuthApplicationType);
  const updateOAuthApplicationType = (value: ErrorableInput): void => {
    dispatch(actions.updateApplyOAuthApplicationType(value));
  };

  const oAuthRedirectURI = useSelector((state: RootState) => state.application.inputs.oAuthRedirectURI);
  const updateOAuthRedirectURI = (oldValidation?: string) => (value: ErrorableInput): void => {
    dispatch(actions.updateApplyOAuthRedirectURI(value, oldValidation));
  };
  
  return (
    <>
      <div className="vads-u-margin-top--4">
        Please specify whether your app can securely hide a client secret. Apps that can hide a
        secret will use the&nbsp;
        <a
          href="https://www.oauth.com/oauth2-servers/server-side-apps/authorization-code/"
          target="_blank"
          rel="noreferrer"
        >
          authorization code flow
        </a>, and apps that cannot will use the&nbsp;
        <a href="https://www.oauth.com/oauth2-servers/pkce/" target="_blank" rel="noreferrer">
          PKCE flow
        </a>.
      </div>
      <ErrorableRadioButtons
        label="Can your application securely hide a client secret?"
        onValueChange={updateOAuthApplicationType}
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
        onValueChange={updateOAuthRedirectURI(oAuthRedirectURI.validation)}
        required
      />
    </>
  );
};

export default OAuthAppInfo;
