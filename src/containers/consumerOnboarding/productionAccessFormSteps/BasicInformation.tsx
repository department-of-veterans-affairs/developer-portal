import React, { FC } from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { TextField, ListOfTextEntries, CheckboxRadioField, FieldSet } from '../../../components';
import { Values } from '../ProductionAccess';

const BasicInformation: FC = () => {
  const { values } = useFormikContext<Values>();
  const { hasMonetized } = values;
  const hasMonetizedBorderClass = hasMonetized === 'yes' ? 'vads-u-border-left--4px' : '';
  const hasMonetizedsBorderColorClass =
    hasMonetized === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';

  return (
    <>
      <h3>Primary Contact</h3>
      <TextField
        label="First name"
        name="primaryContact.firstName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Last name"
        name="primaryContact.lastName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Email"
        name="primaryContact.email"
        type="email"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <h3>Secondary Contact</h3>
      <TextField
        label="First name"
        name="secondaryContact.firstName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Last name"
        name="secondaryContact.lastName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />

      <TextField
        label="Email"
        name="secondaryContact.email"
        type="email"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <h3>About your company or organization</h3>
      <TextField
        label="Company or organization name"
        name="organization"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <TextField
        label="Phone number"
        name="phoneNumber"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <TextField
        label="Front-end name of application (if different from organization name)"
        name="applicationName"
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
      />
      <ListOfTextEntries
        description={
          <>
            <p>
              Notification email for API status updates{' '}
              <span className="form-required-span">(*Required)</span>
            </p>
            <p>
              A distribution list email is preferred. You may enter more than one email address, and
              this information can be updated later.
            </p>
          </>
        }
        className="vads-u-background-color--gray-lightest vads-u-margin-top--2p5"
        type="email"
        buttonText=" Add another email"
      />
      <h3>About your app</h3>
      <TextField
        as="textarea"
        label="Describe the value of your app or service to Veterans and provide your app’s use case."
        name="valueProvided"
        className="vads-u-margin-top--4"
        required
      />
      {values.apis.some(api => ['vaForms', 'facilities'].includes(api)) && (
        <TextField
          as="textarea"
          label="Describe your business model. Explain how you generate the income to provide your service to users."
          name="businessModel"
          className="vads-u-margin-top--4"
          required
        />
      )}

      <FieldSet
        className={classNames(
          'vads-u-margin-top--2',
          'vads-u-padding-x--1p5',
          'vads-u-padding-bottom--1p5',
          hasMonetizedBorderClass,
          hasMonetizedsBorderColorClass,
        )}
        legend="Have you ever monetized Veteran data?"
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
        name="hasMonetized"
        required
      >
        <CheckboxRadioField type="radio" label="Yes" name="hasMonetized" value="yes" required />

        <CheckboxRadioField type="radio" label="No" name="hasMonetized" value="no" required />
        {hasMonetized === 'yes' && (
          <TextField
            as="textarea"
            label="If yes, explain."
            name="monetizationExplination"
            className="vads-u-margin-top--4"
            required
          />
        )}
      </FieldSet>
    </>
  );
};

export default BasicInformation;
