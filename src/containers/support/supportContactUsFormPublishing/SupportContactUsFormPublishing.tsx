import classNames from 'classnames';
import React, { ReactNode } from 'react';
import { Formik, Form, Field, FormikErrors } from 'formik';
import Joi, { ValidationError } from 'joi';
import { CONTACT_US_URL } from '../../../types/constants';
import { makeRequest, ResponseType } from '../../../utils/makeRequest';
import '../SupportContactUsForm.scss';
import { SupportContactUsFormState, SupportContactUsFormProps, SupportContactUsFormPropTypes, FormType, FormData } from '../../../types/contactForm';
import DefaultFormFields from './components/DefaultFormFields';
import ContactDetailsFormFields from './components/ContactDetailsFormFields';
import PublishingFormFields from './components/PublishingFormFields';
import validationSchema from './schema';

const isJoiError = (error: unknown): error is ValidationError => (error as ValidationError).isJoi;

const initialValues: SupportContactUsFormState = {
  apiDetails: '',
  apiInternalOnly: 'no',
  apiInternalOnlyDetails: '',
  description: '',
  email: '',
  firstName: '',
  lastName: '',
  type: FormType.DEFAULT,
};

const validateForm = (values: SupportContactUsFormState): FormikErrors<SupportContactUsFormState> => {
  try {
    Joi.assert(values, validationSchema);
    return {};
  } catch (error: unknown) {
    if (isJoiError(error)) {
      const errors: FormikErrors<SupportContactUsFormState> = {};
      for (const validationFailure of error.details) {
        errors[validationFailure.path[0]] = validationFailure.message;
      }
      return errors;
    }
  }

  return {};
};

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

const SupportContactUsFormPublishing = (props: SupportContactUsFormProps): JSX.Element => {
  const formSubmission = async (values: SupportContactUsFormState): Promise<void> => {
    await makeRequest(CONTACT_US_URL, {
      body: JSON.stringify(processedData(values)),
      headers: {
        accept: 'application/json',
        'content-type': 'application/json',
      },
      method: 'POST',
    }, { responseType: ResponseType.TEXT });
    props.onSuccess();
  };

  return (
    <Formik initialValues={initialValues} onSubmit={formSubmission} validate={validateForm}>
      {({ values }): ReactNode => (
        <Form className={classNames('va-api-contact-us-form', 'vads-u-margin-y--2')}>
          <ContactDetailsFormFields />

          <fieldset>
            <legend className={classNames('vads-u-font-size--lg', 'vads-u-padding-top--7')}>What can we help you with?</legend>
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

          <input type="submit" />
        </Form>
      )}
    </Formik>
  );
};

SupportContactUsFormPublishing.propTypes = SupportContactUsFormPropTypes;

export default SupportContactUsFormPublishing;
