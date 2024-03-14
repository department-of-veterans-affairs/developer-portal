import * as React from 'react';
import { Link } from 'react-router-dom';

import classNames from 'classnames';
import { TextField } from '../../../../components';

interface OAuthCcgAppInfoProps {
  ccgPublicKeyUrl: string;
  multipleTypes: boolean;
}

const OAuthCcgAppInfo: React.FC<OAuthCcgAppInfoProps> = ({
  ccgPublicKeyUrl,
  multipleTypes,
}): JSX.Element => (
  <div
    className={classNames('sandbox-access-form-oauth-details', {
      'multiple-types': multipleTypes,
    })}
  >
    <div className="vads-u-margin-top--2">
      <p>
        In order to access an API that uses OAuth 2.0 Client Credentials Grant, you must provide
        your public key.{' '}
        <Link to={ccgPublicKeyUrl} target="_blank">
          Learn how to generate a public key.
        </Link>
      </p>
    </div>

    <TextField
      as="textarea"
      placeholder='{
  "kty": "RSA",
  "n": "mYi1wUpwkJ1QB8..."
  ...
}'
      label="OAuth public key"
      name="oAuthPublicKey"
      required
      className="vads-u-margin-top--2"
    />
    <p>
      <strong>Important:</strong> To get production access using client credentials grant, you must
      either work for the VA or have specific VA agreements in place. If you have questions,{' '}
      <a href="https://developer.va.gov/support/contact-us">Contact us</a>.
    </p>
  </div>
);

export { OAuthCcgAppInfo };
