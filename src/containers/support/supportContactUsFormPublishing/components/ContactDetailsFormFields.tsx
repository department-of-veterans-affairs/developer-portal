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
    <legend className={classNames('vads-u-font-size--lg')}>Tell us about you</legend>
    <div className="vads-l-row">
      <div className={textFieldClasses('right')}>
        <FormField label="First name" name="firstName" required className="vads-u-margin-top--3" />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Last name" name="lastName" required className="vads-u-margin-top--3" />
      </div>
    </div>
    <div className="vads-l-row">
      <div className={textFieldClasses('right')}>
        <FormField label="Email address" name="email" type="email" required className="vads-u-margin-top--3" />
      </div>
      <div className={textFieldClasses('left')}>
        <FormField label="Organization" name="organization" className="vads-u-margin-top--3" />
      </div>
    </div>
  </fieldset>
);

export default ContactDetailsFormFields;
