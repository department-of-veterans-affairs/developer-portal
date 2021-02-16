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
  <fieldset className={classNames('vads-l-grid-container', 'vads-u-padding-x--0')}>
    <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>Tell us about you</legend>
    <div className="vads-l-row">
      <div className={textFieldClasses('right')}>
        <FormField label="First Name" name="firstName" required />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Last Name" name="lastName" required />
      </div>
    </div>
    <div className="vads-l-row">
      <div className={textFieldClasses('right')}>
        <FormField label="Email" name="email" type="email" required />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Organization" name="organization" />
      </div>
    </div>
  </fieldset>
);

export default ContactDetailsFormFields;
