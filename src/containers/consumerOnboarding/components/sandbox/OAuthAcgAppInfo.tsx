import * as React from 'react';
import classNames from 'classnames';
import { TextField, FieldSet, CheckboxRadioField } from '../../../../components';

interface OAuthAcgAppInfoProps {
  acgPkceAuthUrl: string;
  multipleTypes: boolean;
}

const OAuthAcgAppInfo: React.FC<OAuthAcgAppInfoProps> = ({
  acgPkceAuthUrl,
  multipleTypes,
}): JSX.Element => (
  <div
    className={classNames('sandbox-access-form-oauth-details', {
      'multiple-types': multipleTypes,
    })}
  >
    <div className="vads-u-margin-top--2">
      Apps that cannot securely hide a client secret must use the{' '}
      <a href="https://oauth.net/2/pkce/" target="_blank" rel="noreferrer">
        PKCE
      </a>{' '}
      OAuth flow. If your app is a native or mobile app, or if it uses the same client secret for
      all users, you&apos;ll get credentials for{' '}
      <a href={acgPkceAuthUrl} target="_blank" rel="noreferrer">
        our PKCE OAuth flow
      </a>
      .
    </div>
    <FieldSet
      className="vads-u-margin-top--2"
      legend="Can your application securely hide a client secret?"
      legendClassName="legend-label"
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
      name="oAuthRedirectURI"
      placeholder="http://localhost:8080/oauth/callback"
      required
      className={classNames(
        'vads-u-margin-top--2',
        'oauth-uri-input',
        'xsmall-screen:vads-l-col--10',
      )}
    />
  </div>
);

export { OAuthAcgAppInfo };
