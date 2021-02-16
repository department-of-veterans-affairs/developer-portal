import classNames from 'classnames';
import { Field, useFormikContext } from 'formik';
import React, { FC } from 'react';
import { FormField } from '../../../../components';
import { SupportContactUsFormState } from '../../../../types/contactForm';

const PublishingFormFields: FC = () => {
  const { values } = useFormikContext<SupportContactUsFormState>();
  return (
    <>
      <h3 className={classNames('vads-u-margin-top--4', 'vads-u-margin-bottom--1')}>Tell us about your API</h3>
      <FormField
        label="Include as much information about your API as possible"
        name="apiDetails"
        as="textarea"
        description={
          <ul className="vads-u-margin-y--0">
            <li className="vads-u-margin-y--0">Your API’s background, purpose, target users, and functionality </li>
            <li className="vads-u-margin-y--0">Any current or future consumers, including estimated volume of calls</li>
            <li className="vads-u-margin-y--0">Key performance indicators and service level objectives</li>
            <li className="vads-u-margin-y--0">A desired go-live date</li>
            <li className="vads-u-margin-y--0">The business and technical points of contact for your API</li>
          </ul>
        }
        required
      />

      <h3 className={classNames('vads-u-margin-top--4', 'vads-u-margin-bottom--1')}>Description</h3>
      <FormField
        label="Send us your OpenAPI specification. Include a public-facing description of your API."
        name="apiDescription"
        as="textarea"
      />

      <fieldset className="vads-u-margin-top--4">
        <legend className={classNames('vads-u-font-size--lg')}>Do you have concerns about publishing your API for public use?</legend>
        <Field id="formApiInternalOnlyYes" type="radio" name="apiInternalOnly" value="yes" />
        <label htmlFor="formApiInternalOnlyYes">
          Yes
        </label>
        <Field id="formApiInternalOnlyNo" type="radio" name="apiInternalOnly" value="no" />
        <label htmlFor="formApiInternalOnlyNo">
          No
        </label>
      </fieldset>

      {
        values.apiInternalOnly === 'yes' &&
        <FormField
          label="Tell us more about why the API needs to be restricted to internal VA use."
          name="apiInternalOnlyDetails"
          as="textarea"
          required
          className={classNames('feature', 'vads-u-margin-left--4', 'vads-u-padding-top--1')}
        />
      }

      <h3 className={classNames('vads-u-margin-top--4', 'vads-u-margin-bottom--1')}>Other information</h3>
      <FormField
        label="Is there anything else we should know about your API, how it’s used, or what you need from us?"
        name="apiOtherInformation"
        as="textarea"
      />
    </>
  );
};

export default PublishingFormFields;
