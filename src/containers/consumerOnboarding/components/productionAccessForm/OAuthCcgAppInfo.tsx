import * as React from 'react';
import { Link } from 'react-router-dom';
import { AUTHORIZATION_CCG_PATH } from '../../../../types/constants/paths';

import { TextField } from '../../../../components';

const OAuthCcgAppInfo = (): JSX.Element => (
  <div className="vads-u-margin-left--2">
    <div className="vads-u-margin-top--4">
      <p>
        In order to access an API that uses OAuth 2.0 Client Credentials Grant, you must provide
        your public key.{' '}
        <Link to={AUTHORIZATION_CCG_PATH} target="_blank">
          Learn how to generate a public key.
        </Link>
      </p>
    </div>

    <TextField
      as="textarea"
      placeholder='{
  "kty": "RSA",
  "n": "mYi1wUpwkJ1QB8...",
  "e": "AQAB",
  "alg": "RS256",
  "use": "sig"
}'
      label="OAuth public key"
      name="oAuthPublicKey"
      required
      className="vads-u-margin-top--4"
    />
  </div>
);

export { OAuthCcgAppInfo };
