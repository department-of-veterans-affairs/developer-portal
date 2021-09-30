/* eslint-disable max-lines */
import React, { FC } from 'react';
import classNames from 'classnames';
import { useFormikContext } from 'formik';
import { TextField, CheckboxRadioField, FieldSet } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { includesInternalOnlyAPI, onlyOpenDataAPIs } from '../../../../apiDefs/query';

const BasicInformation: FC = () => {
  const {
    values: { monitizedVeteranInformation, veteranFacing, apis },
  } = useFormikContext<Values>();
  const hasMonetizedBorderClass =
    monitizedVeteranInformation === 'yes' ? 'vads-u-border-left--4px' : '';
  const hasMonetizedsBorderColorClass =
    monitizedVeteranInformation === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';
  const isVetFacingBorderClass = veteranFacing === 'yes' ? 'vads-u-border-left--4px' : '';
  const isVetFacingBorderColorClass =
    veteranFacing === 'yes' ? 'vads-u-border-color--primary-alt-light' : '';

  return (
    <>
      <fieldset>
        <legend><h3 className="vads-u-margin-bottom--0">Primary Contact</h3></legend>
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
      </fieldset>
      <fieldset>
        <legend><h3 className="vads-u-margin-bottom--0">Secondary Contact</h3></legend>
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
      </fieldset>
      <fieldset>
        <legend><h3 className="vads-u-margin-bottom--0">About your company or organization</h3></legend>
        <TextField
          label="Company or organization name"
          name="organization"
          required
          className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        />
        <TextField
          label="Phone number"
          name="phoneNumber"
          className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        />
        <TextField
          label="Front-end name of application (if different from organization name)"
          name="appName"
          className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        />
        <TextField
          name="statusUpdateEmails"
          label={
            <>
              Notification email for API status updates{' '}
              <span className="form-required-span">(*Required)</span>
            </>
          }
          description="A distribution list email is preferred. This email can be updated later if you need."
          className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
        />
      </fieldset>
      <fieldset>
        <legend><h3 className="vads-u-margin-bottom--0">About your app</h3></legend>
        <TextField
          as="textarea"
          label="Describe the value of your app or service to Veterans and provide your app’s use case."
          name="valueProvided"
          className="vads-u-margin-top--4"
          required
        />
        {!onlyOpenDataAPIs(apis) && (
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
          legend="Do you plan to monetize Veteran data? "
          legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
          name="monitizedVeteranInformation"
          required
        >
          <CheckboxRadioField
            type="radio"
            label="Yes"
            name="monitizedVeteranInformation"
            value="yes"
            required
          />

          <CheckboxRadioField
            type="radio"
            label="No"
            name="monitizedVeteranInformation"
            value="no"
            required
          />
          {monitizedVeteranInformation === 'yes' && (
            <TextField
              as="textarea"
              label="If yes, explain."
              name="monitizationExplanation"
              className="vads-u-margin-top--4 vads-u-margin-left--4"
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
          name="veteranFacing"
          required
        >
          <CheckboxRadioField type="radio" label="Yes" name="veteranFacing" value="yes" required />

          <CheckboxRadioField type="radio" label="No" name="veteranFacing" value="no" required />
          {veteranFacing === 'yes' && (
            <div className="vads-u-margin-left--4">
              <TextField
                label="Provide a link to your app’s primary webpage."
                name="website"
                className="vads-u-margin-top--4"
                required
              />
              <TextField
                name="signUpLink"
                label={
                  <>
                    Provide a link to a page describing how to sign up for your app.{' '}
                    <span className="form-required-span">(*Required)</span>
                  </>
                }
                className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
              />
              <TextField
                name="supportLink"
                label={
                  <>
                    Provide a link to your FAQs and/or support page.{' '}
                    <span className="form-required-span">(*Required)</span>
                  </>
                }
                className="vads-u-margin-top--4 medium-screen:vads-l-col--10"
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
                  <>
                    <p>
                      This will be used for the{' '}
                      <a href="http://va.gov/" target="_blank" rel="noopener noreferrer">
                        VA.gov
                      </a>{' '}
                      App Directory and should tell Veterans how your app can help them. Your
                      description should:
                    </p>
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
                  </>
                }
                name="appDescription"
                className="vads-u-margin-top--4"
                required
              />
            </div>
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
        {onlyOpenDataAPIs(apis) && (
          <TextField
            as="textarea"
            label="We require you to store your production key securely so as not to risk unauthorized exposure. How and where do you provide this?"
            name="productionKeyCredentialStorage"
            className="vads-u-margin-top--4"
            required
          />
        )}
      </fieldset>
    </>
  );
};

export { BasicInformation };
