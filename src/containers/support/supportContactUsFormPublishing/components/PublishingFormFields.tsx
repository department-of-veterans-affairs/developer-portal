import classNames from 'classnames';
import { Field, useFormikContext } from 'formik';
import React, { FC } from 'react';
import { FormField } from '../../../../components';
import { SupportContactUsFormState } from '../../../../types/contactForm';

const PublishingFormFields: FC = () => {
  const { values } = useFormikContext<SupportContactUsFormState>();
  return (
    <>
      <fieldset>
        <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>Tell us about your API</legend>
        <FormField
          label="Include as much information about your API as possible"
          name="apiDetails"
          as="textarea"
          description={
            <ul>
              <li>Your API’s background, purpose, target users, and functionality </li>
              <li>Any current or future consumers, including estimated volume of calls</li>
              <li>Key performance indicators and service level objectives</li>
              <li>A desired go-live date</li>
              <li>The business and technical points of contact for your API</li>
            </ul>
          }
          required
        />
      </fieldset>

      <fieldset>
        <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>Description</legend>
        <FormField
          label="Send us your OpenAPI specification. Include a public-facing description of your API."
          name="apiDescription"
          as="textarea"
        />
      </fieldset>

      <fieldset>
        <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>Do you have concerns about publishing your API for public use?</legend>
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
        />
      }

      <fieldset>
        <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>Other information</legend>
        <FormField
          label="Is there anything else we should know about your API, how it’s used, or what you need from us?"
          name="apiOtherInformation"
          as="textarea"
        />
      </fieldset>
    </>
  );
};

export default PublishingFormFields;
