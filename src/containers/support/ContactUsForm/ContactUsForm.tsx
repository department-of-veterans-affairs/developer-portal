import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode } from 'react';
import { Formik, Form, Field } from 'formik';
import { CONTACT_US_URL } from '../../../types/constants';
import { makeRequest, ResponseType } from '../../../utils/makeRequest';
import './ContactUsForm.scss';
import { ContactUsFormState, FormType, SubmissionData } from '../../../types/contactUsForm';
import ConsumerFormFields from './components/ConsumerFormFields';
import ContactDetailsFormFields from './components/ContactDetailsFormFields';
import PublishingFormFields from './components/PublishingFormFields';
import validateForm from './validateForm';

const ContactUsFormPropTypes = {
  defaultType: PropTypes.oneOf([FormType.CONSUMER, FormType.PUBLISHING]).isRequired,
  onSuccess: PropTypes.func.isRequired,
};

type ContactUsFormProps = PropTypes.InferProps<typeof ContactUsFormPropTypes>;

const processedData = (values: ContactUsFormState): SubmissionData => {
  const contactFormData = {
    email: values.email,
    firstName: values.firstName,
    lastName: values.lastName,
    organization: values.organization ?? '',
  };

  if (values.type === FormType.CONSUMER) {
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
      apiInternalOnlyDetails: values.apiInternalOnlyDetails,
      apiOtherInfo: values.apiOtherInfo ?? '',
      type: values.type,
    };
  }
};

const ContactUsFormPublishing = ({ onSuccess, defaultType }: ContactUsFormProps): JSX.Element => {
  const initialValues: ContactUsFormState = {
    apiDescription: '',
    apiDetails: '',
    apiInternalOnly: 'no',
    apiInternalOnlyDetails: '',
    apiOtherInfo: '',
    description: '',
    email: '',
    firstName: '',
    lastName: '',
    organization: '',
    type: defaultType,
  };

  const formSubmission = async (values: ContactUsFormState): Promise<void> => {
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
        <Form className={classNames('va-api-contact-us-form', 'vads-u-margin-top--6')}>
          <ContactDetailsFormFields />

          <fieldset className="vads-u-margin-top--6">
            <legend>
              <h2 className={classNames('vads-u-font-size--lg', 'vads-u-margin-y--0')}>
                What can we help you with?
              </h2>
            </legend>
            <Field id="formTypeDefault" type="radio" name="type" value={FormType.CONSUMER} />
            <label htmlFor="formTypeDefault">
              Report a problem or ask a question
            </label>
            <Field id="formTypePublishing" type="radio" name="type" value={FormType.PUBLISHING} />
            <label htmlFor="formTypePublishing">
              Publish your API to Lighthouse - Internal VA use only
            </label>
          </fieldset>

          {
            values.type === FormType.CONSUMER &&
            <ConsumerFormFields />
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

ContactUsFormPublishing.propTypes = ContactUsFormPropTypes;

export default ContactUsFormPublishing;
