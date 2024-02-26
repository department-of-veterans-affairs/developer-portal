import { VaAlert } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import React, { ReactNode, useState } from 'react';
import { Formik, Form } from 'formik';
import { useCookies } from 'react-cookie';
import { CheckboxRadioField } from '../../../components';
import { LPB_CONTACT_US_URL, LPB_FORGERY_TOKEN } from '../../../types/constants';
import { makeRequest, ResponseType } from '../../../utils/makeRequest';
import './ContactUsForm.scss';
import { ContactUsFormState, FormType, SubmissionData } from '../../../types/forms/contactUsForm';
import { ScrollToFirstError } from '../../../utils/ScrollToFirstError';
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
    const isInternalOnly = values.apiInternalOnly === 'yes';
    const data: SubmissionData = {
      ...contactFormData,
      apiDescription: values.apiDescription ?? '',
      apiDetails: values.apiDetails,
      apiInternalOnly: isInternalOnly,
      apiOtherInfo: values.apiOtherInfo ?? '',
      type: values.type,
    };

    if (isInternalOnly) {
      data.apiInternalOnlyDetails = values.apiInternalOnlyDetails;
    }

    return data;
  }
};

const ContactUsFormPublishing = ({ onSuccess, defaultType }: ContactUsFormProps): JSX.Element => {
  const [submissionError, setSubmissionError] = useState(false);
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

  const setCookie = useCookies(['CSRF-TOKEN'])[1];
  const formSubmission = async (values: ContactUsFormState): Promise<void> => {
    setSubmissionError(false);

    try {
      setCookie('CSRF-TOKEN', LPB_FORGERY_TOKEN, {
        path: LPB_CONTACT_US_URL,
        sameSite: 'strict',
        secure: true,
      });

      await makeRequest(
        LPB_CONTACT_US_URL,
        {
          body: JSON.stringify(processedData(values)),
          headers: {
            'X-Csrf-Token': LPB_FORGERY_TOKEN,
            accept: 'application/json',
            'content-type': 'application/json',
          },
          method: 'POST',
        },
        { responseType: ResponseType.TEXT },
      );
      onSuccess();
    } catch {
      setSubmissionError(true);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={formSubmission}
      validate={validateForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ values, isSubmitting }): ReactNode => (
        <Form
          className={classNames('va-api-contact-us-form', 'vads-u-margin-top--6')}
          noValidate
          name="contact-us"
        >
          <ContactDetailsFormFields />
          <fieldset className="vads-u-margin-top--6">
            <legend className="vads-u-margin-bottom--2p5">
              <h2 className={classNames('vads-u-font-size--lg', 'vads-u-margin-y--0')}>
                What can we help you with?
              </h2>
            </legend>
            <CheckboxRadioField
              type="radio"
              label="Report a problem or ask a question"
              name="type"
              value={FormType.CONSUMER}
            />
            <CheckboxRadioField
              type="radio"
              label="Publish your API to Lighthouse - Internal VA use only"
              name="type"
              value={FormType.PUBLISHING}
            />
          </fieldset>
          {values.type === FormType.CONSUMER && <ConsumerFormFields />}
          {values.type === FormType.PUBLISHING && <PublishingFormFields />}
          <button type="submit" className="vads-u-width--auto">
            {isSubmitting ? 'Sending...' : 'Send to developer support'}
          </button>
          {submissionError && (
            <VaAlert status="error" visible uswds>
              <p className="vads-u-margin-y--0">
                We encountered a server error while saving your form. Please try again later.
              </p>
            </VaAlert>
          )}
          <ScrollToFirstError />
        </Form>
      )}
    </Formik>
  );
};

ContactUsFormPublishing.propTypes = ContactUsFormPropTypes;

export default ContactUsFormPublishing;
