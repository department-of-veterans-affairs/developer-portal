import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Formik, Form, Field } from 'formik';
import { CONTACT_US_URL } from '../../../types/constants';
import { makeRequest, ResponseType } from '../../../utils/makeRequest';
import '../SupportContactUsForm.scss';
import { SupportContactUsFormState, SupportContactUsFormProps, SupportContactUsFormPropTypes, FormType, FormData } from '../../../types/contactForm';
import DefaultFormFields from './components/DefaultFormFields';
import ContactDetailsFormFields from './components/ContactDetailsFormFields';
import PublishingFormFields from './components/PublishingFormFields';
import validateForm from './validateForm';

const processedData = (values: SupportContactUsFormState): FormData => {
  const contactFormData = {
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    organization: values.organization ?? '',
  };

  if (values.type === FormType.DEFAULT) {
    return {
      ...contactFormData,
      description: values.description,
      type: values.type,
    };
  } else {
    return {
      ...contactFormData,
      apiDescription: values.apiDescription ?? '',
      apiDetails: values.apiDetails,
      apiInternalOnly: values.apiInternalOnly === 'yes',
      apiOtherInfo: values.apiOtherInfo ?? '',
      type: values.type,
    };
  }
};

const SupportContactUsFormPublishing = ({ onSuccess, defaultType }: SupportContactUsFormProps): JSX.Element => {
  const initialValues: SupportContactUsFormState = {
    apiDetails: '',
    apiInternalOnly: 'no',
    apiInternalOnlyDetails: '',
    description: '',
    email: '',
    firstName: '',
    lastName: '',
    type: defaultType,
  };

  const formSubmission = async (values: SupportContactUsFormState): Promise<void> => {
    await makeRequest(CONTACT_US_URL, {
      body: JSON.stringify(processedData(values)),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    }, { responseType: ResponseType.TEXT });
    onSuccess();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={formSubmission} validate={validateForm}>
      {({ values, isSubmitting, isValid, dirty }): ReactNode => (
        <Form className={classNames('va-api-contact-us-form', 'vads-u-margin-y--2')}>
          <ContactDetailsFormFields />

          <fieldset className="vads-u-margin-top--5">
            <legend className="vads-u-font-size--lg">What can we help you with?</legend>
            <Field id="formTypeDefault" type="radio" name="type" value={FormType.DEFAULT} />
            <label htmlFor="formTypeDefault">
              Report a problem or ask a question
            </label>
            <Field id="formTypePublishing" type="radio" name="type" value={FormType.PUBLISHING} />
            <label htmlFor="formTypePublishing">
              Publish your API to Lighthouse - Internal VA use only
            </label>
          </fieldset>

          {
            values.type === FormType.DEFAULT &&
              <DefaultFormFields />
          }
          {
            values.type === FormType.PUBLISHING &&
              <PublishingFormFields />
          }

          <button type="submit" className="vads-u-width--auto" disabled={!dirty || !isValid}>{isSubmitting ? 'Sending...' : 'Submit'}</button>
        </Form>
      )}
    </Formik>
  );
};

SupportContactUsFormPublishing.propTypes = SupportContactUsFormPropTypes;

export default SupportContactUsFormPublishing;
