import * as React from 'react';

import { TextField } from '../../../../components';

const classNames = 'vads-u-margin-top--4 medium-screen:vads-l-col--10';

const DeveloperInfo = (): JSX.Element => (
  <>
    <TextField
      label="First name"
      name="firstName"
      required
      className={classNames}
    />

    <TextField
      label="Last name"
      name="lastName"
      required
      className={classNames}
    />

    <TextField
      label="Email"
      name="email"
      type="email"
      required
      className={classNames}
    />

    <TextField
      label="Organization"
      name="organization"
      required
      className={classNames}
    />
  </>
);

export { DeveloperInfo };
