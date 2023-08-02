import React, { FC } from 'react';
import classNames from 'classnames';
import { TextField } from '../../../../components';

const ContactDetailsFormFields: FC = () => (
  <fieldset
    className={classNames('vads-l-grid-container', 'vads-u-padding-x--0', 'contact-details')}
  >
    <legend>
      <h2 className={classNames('vads-u-font-size--lg', 'vads-u-margin-y--0')}>
        Tell us about you
      </h2>
    </legend>
    <div className={classNames('vads-u-margin-top--2p5')}>
      <TextField label="First name" name="firstName" required />
    </div>
    <div className={classNames('vads-u-margin-top--4')}>
      <TextField label="Last name" name="lastName" required />
    </div>
    <div className={classNames('vads-u-margin-top--4')}>
      <TextField label="Email address" name="email" type="email" required />
    </div>
    <div className={classNames('vads-u-margin-top--4')}>
      <TextField label="Organization" name="organization" />
    </div>
  </fieldset>
);

export default ContactDetailsFormFields;
