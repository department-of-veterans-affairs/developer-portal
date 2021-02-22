import classNames from 'classnames';
import { Field, useFormikContext } from 'formik';
import React, { FC } from 'react';
import { FormField } from '../../../../components';
import { ContactUsFormState } from '../../../../types/contactUsForm';

const titleClass = classNames(
  'vads-u-margin-top--4',
  'vads-u-margin-bottom--2p5',
  'vads-u-font-size--lg',
);
const PublishingFormFields: FC = () => {
  const { values } = useFormikContext<ContactUsFormState>();
  return (
    <>
      <h2 className={titleClass}>Tell us about your API</h2>
      <FormField
        label="Include as much information about your API as possible"
        name="apiDetails"
        as="textarea"
        description={
          <ul className="vads-u-margin-y--2p5">
            <li>Your API’s background, purpose, target users, and functionality </li>
            <li>Any current or future consumers, including estimated volume of calls</li>
            <li>Key performance indicators and service level objectives</li>
            <li>A desired go-live date</li>
            <li>The business and technical points of contact for your API</li>
          </ul>
        }
        required
      />

      <h2 className={titleClass}>Description</h2>
      <FormField
        label="Send us your OpenAPI specification. Include a public-facing description of your API."
        name="apiDescription"
        as="textarea"
      />

      <fieldset className="vads-u-margin-top--4">
        <legend className={classNames('vads-u-font-size--lg')}>
          <h2 className="vads-u-font-size--lg">
            Do you have concerns about publishing your API for public use?
          </h2>
        </legend>
        <Field id="formApiInternalOnlyYes" type="radio" name="apiInternalOnly" value="yes" />
        <label htmlFor="formApiInternalOnlyYes">
          Yes
        </label>

        {
          values.apiInternalOnly === 'yes' &&
          <div className={classNames('vads-u-margin-left--4', 'feature', 'vads-u-padding-top--2')}>
            <h3 className={classNames('vads-u-margin-top--0', 'vads-u-margin-bottom-2p5')}>Internal to VA only:</h3>
            <FormField
              label="Tell us more about why the API needs to be restricted to internal VA use."
              name="apiInternalOnlyDetails"
              as="textarea"
              required
              className={classNames()}
            />
          </div>
        }

        <Field id="formApiInternalOnlyNo" type="radio" name="apiInternalOnly" value="no" />
        <label htmlFor="formApiInternalOnlyNo">
          No
        </label>
      </fieldset>

      <h2 className={titleClass}>Other information</h2>
      <FormField
        label="Is there anything else we should know about your API, how it’s used, or what you need from us?"
        name="apiOtherInfo"
        as="textarea"
      />
    </>
  );
};

export default PublishingFormFields;
