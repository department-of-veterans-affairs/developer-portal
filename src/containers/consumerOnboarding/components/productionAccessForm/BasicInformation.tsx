import React, { FC, useEffect, useRef } from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { TextField, CheckboxRadioField, FieldSet } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { includesInternalOnlyAPI } from '../../../../apiDefs/query';
import ListOfTextEntries from './ListOfTextEntries';

const BasicInformation: FC = () => {
  const {
    values: { hasMonetized, isVetFacing, apis },
  } = useFormikContext<Values>();
  const hasMonetizedBorderClass = hasMonetized === 'yes' ? 'vads-u-border-left--4px' : '';
  const hasMonetizedsBorderColorClass =
    hasMonetized === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';
  const isVetFacingBorderClass = isVetFacing === 'yes' ? 'vads-u-border-left--4px' : '';
  const isVetFacingBorderColorClass =
    isVetFacing === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    firstInputRef.current?.focus();
  }, []);

  return (
    <>
      <h3>Primary Contact</h3>
      <TextField
        label="First name"
        name="primaryContact.firstName"
        required
        className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        innerRef={firstInputRef}
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
            <p className="vads-u-font-weight--bold">
              Notification email for API status updates{' '}
              <span className="form-required-span">(*Required)</span>
            </p>
            <p>
              A distribution list email is preferred. You may enter more than one email address, and
              this information can be updated later.
            </p>
          </>
        }
        className="vads-u-margin-top--2p5"
        name="statusUpdateEmails"
        buttonText="Add another email"
      />
      <h3>About your app</h3>
      <TextField
        as="textarea"
        label="Describe the value of your app or service to Veterans and provide your app’s use case."
        name="valueProvided"
        className="vads-u-margin-top--4"
        required
      />
      {apis.some(api => ['vaForms', 'facilities'].includes(api)) && (
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
        legend="Have you ever monetized Veteran data? "
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
      <FieldSet
        className={classNames(
          'vads-u-margin-top--2',
          'vads-u-padding-x--1p5',
          'vads-u-padding-bottom--1p5',
          isVetFacingBorderClass,
          isVetFacingBorderColorClass,
        )}
        legend="Is your app Veteran-facing?"
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
        name="isVetFacing"
        required
      >
        <CheckboxRadioField type="radio" label="Yes" name="isVetFacing" value="yes" required />

        <CheckboxRadioField type="radio" label="No" name="isVetFacing" value="no" required />
        {isVetFacing === 'yes' && (
          <>
            <TextField
              label="Provide a link to your app’s primary webpage."
              name="website"
              className="vads-u-margin-top--4"
              required
            />
            <ListOfTextEntries
              description={
                <p className="vads-u-font-weight--bold">
                  Provide a link to a page describing how to sign up for your app.{' '}
                  <span className="form-required-span">(*Required)</span>
                </p>
              }
              className="vads-u-background-color--gray-lightest vads-u-margin-top--2p5"
              name="signUpLink"
              buttonText="Add another URL"
            />
            <ListOfTextEntries
              description={
                <p className="vads-u-font-weight--bold">
                  Provide a link to your FAQs and/or support page.{' '}
                  <span className="form-required-span">(*Required)</span>
                </p>
              }
              className="vads-u-background-color--gray-lightest vads-u-margin-top--2p5"
              name="supportLink"
              buttonText="Add another URL"
            />
            <TextField
              label="List of devices/platforms on which this app is available (eg. iOS, iPhone, iPad, Android tablet, Android phone, web browser, etc.)"
              name="platforms"
              className="vads-u-margin-top--4"
              required
            />
            <TextField
              label="Provide a brief description of your application."
              description={
                <p>
                  This will be used for the{' '}
                  <a href="http://va.gov/" target="_blank" rel="noopener noreferrer">
                    VA.gov
                  </a>{' '}
                  App Directory and should tell Veterans how your app can help them. Your
                  description should:
                  <ul>
                    <li>Be 415 characters or fewer</li>
                    <li>
                      Use VA guidelines for{' '}
                      <a
                        href="https://www.va.gov/web/management/content-plain-language.cfm"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        plain language
                      </a>{' '}
                      to encourage Veteran engagement
                    </li>
                    <li>Capitalize “Veteran” whenever used</li>
                  </ul>
                </p>
              }
              name="appDescription"
              className="vads-u-margin-top--4"
              required
            />
          </>
        )}
      </FieldSet>
      {includesInternalOnlyAPI(apis) && (
        <TextField
          label="Enter the VASI system name of the application which will consume the API."
          name="vasiSystemName"
          className="vads-u-margin-top--4"
          required
        />
      )}
    </>
  );
};

export { BasicInformation };
