import * as React from 'react';
import classNames from 'classnames';

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
        label="OAuth Public Key"
        name={oAuthPublicKey}
        required
        className={classNames(
          'vads-u-margin-top--4',
          'oauth-uri-input',
          'xsmall-screen:vads-l-col--10',
        )}
      />
    </div>
  );
};

export { OAuthCcgAppInfo };
