import * as React from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { AUTHORIZATION_PKCE_PATH } from '../../types/constants/paths';

import { CheckboxRadioField, TextField, FieldSet } from '../../components';
import './OAuthAppinfo.scss';

const OAuthAppInfo = (): JSX.Element => {
  const { errors } = useFormikContext();
  const redirectUriInputName = 'oAuthRedirectURI';
  const shouldDisplayUriError = !!errors[redirectUriInputName];
  const redirectUriClass = shouldDisplayUriError ? 'vads-u-margin-left--2' : '';

  return (
    <>
      <div className="vads-u-margin-top--4">
        Apps that cannot securely hide a client secret must use the{' '}
        <a href="https://oauth.net/2/pkce/" target="_blank" rel="noreferrer">
          PKCE
        </a>{' '}
        OAuth flow. If your app is a native or mobile app, or if it uses the same client secret for
        all users, you&apos;ll get credentials for{' '}
        <a href={AUTHORIZATION_PKCE_PATH} target="_blank" rel="noreferrer">
          our PKCE OAuth flow
        </a>
        .
      </div>
      <FieldSet
        className="vads-u-margin-top--4"
        legend="Can your application securely hide a client secret?"
        legendClassName="legend-label"
        errorClassName="vads-u-margin-left--2"
        name="oAuthApplicationType"
        required
      >
        <CheckboxRadioField
          type="radio"
          label="Yes"
          value="web"
          name="oAuthApplicationType"
          required
        />
        <CheckboxRadioField
          type="radio"
          label="No"
          value="native"
          name="oAuthApplicationType"
          required
        />
      </FieldSet>

      <TextField
        label="OAuth Redirect URI"
        name={redirectUriInputName}
        required
        className={classNames('vads-u-margin-top--4', 'oauth-uri-input', redirectUriClass)}
      />
    </>
  );
};

export { OAuthAppInfo };
