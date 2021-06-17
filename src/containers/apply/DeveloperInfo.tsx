import * as React from 'react';

import { TextField } from '../../components';

const DeveloperInfo = (): JSX.Element => (
  <>
    <TextField
      label="First name"
      name="firstName"
      required
      className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
    />

    <TextField
      label="Last name"
      name="lastName"
      required
      className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
    />

    <TextField
      label="Email"
      name="email"
      type="email"
      required
      className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
    />

    <TextField
      label="Organization"
      name="organization"
      required
      className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
    />
  </>
);

export { DeveloperInfo };
