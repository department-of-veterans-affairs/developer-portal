import * as React from 'react';
import { Link } from 'react-router-dom';

import { TextField } from '../../../../components';

interface OAuthCcgAppInfoProps {
  ccgPublicKeyUrl: string;
}

const OAuthCcgAppInfo: React.FC<OAuthCcgAppInfoProps> = ({ ccgPublicKeyUrl }): JSX.Element => {
  const oAuthPublicKey = 'oAuthPublicKey';

  return (
    <div>
      <div className="vads-u-margin-top--4">
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
  "n": "mYi1wUpwkJ1QB8...",
  "e": "AQAB",
  "alg": "RS256",
  "use": "sig"
}'
        label="OAuth public key"
        name={oAuthPublicKey}
        required
        className="vads-u-margin-top--4"
      />
    </div>
  );
};

export { OAuthCcgAppInfo };
