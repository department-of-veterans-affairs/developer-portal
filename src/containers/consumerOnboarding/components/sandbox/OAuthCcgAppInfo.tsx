import * as React from 'react';

import { TextField } from '../../../../components';

const OAuthCcgAppInfo = (): JSX.Element => {
  const oAuthPublicKey = 'oAuthPublicKey';

  return (
    <div className="vads-u-margin-left--2">
      <div className="vads-u-margin-top--4">
        <p>
          Apps requesting API access through the client credentials grant authentication method need
          to provide their public key.
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
        label="OAuth Public Key"
        name={oAuthPublicKey}
        required
        className="vads-u-margin-top--4"
      />
    </div>
  );
};

export { OAuthCcgAppInfo };
