import React, { FC } from 'react';
import classNames from 'classnames';
import { FormField } from '../../../../components';

const textFieldClasses = (paddingDirection: string): string =>
  classNames(
    'vads-l-col--12',
    'small-screen:vads-l-col--6',
    `small-screen:vads-u-padding-${paddingDirection}--2`,
  );

const ContactDetailsFormFields: FC = () => (
  <fieldset className={classNames('vads-l-grid-container', 'vads-u-padding-x--0', 'contact-details')}>
    <legend>
      <h2 className={classNames('vads-u-font-size--lg', 'vads-u-margin-y--0')}>
        Tell us about you
      </h2>
    </legend>
    <div className={classNames('vads-l-row', 'vads-u-margin-top--2p5')}>
      <div className={textFieldClasses('right')}>
        <FormField label="First name" name="firstName" required />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Last name" name="lastName" required />
      </div>
    </div>
    <div className={classNames('vads-l-row', 'vads-u-margin-top--4')}>
      <div className={textFieldClasses('right')}>
        <FormField label="Email address" name="email" type="email" required />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Organization" name="organization" />
      </div>
    </div>
  </fieldset>
);

export default ContactDetailsFormFields;
