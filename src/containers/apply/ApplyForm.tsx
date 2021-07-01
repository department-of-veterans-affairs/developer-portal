import React, { FC, useState } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';

import { Form, Formik } from 'formik';
import { makeRequest, ResponseType } from '../../utils/makeRequest';
import { TextField, CheckboxRadioField } from '../../components';
import { APPLY_URL } from '../../types/constants';
import { ApplySuccessResult, DevApplicationRequest, DevApplicationResponse } from '../../types';
import { DeveloperInfo } from './DeveloperInfo';
import { OAuthAppInfo } from './OAuthAppInfo';
import SelectedApis from './SelectedApis';
import { validateForm, anyOAuthApisSelected } from './validateForm';

export interface Values {
  apis: string[];
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  oAuthApplicationType: string;
  oAuthRedirectURI: string;
  organization: string;
  termsOfService: boolean;
}

const initialValues = {
  apis: [],
  description: '',
  email: '',
  firstName: '',
  lastName: '',
  oAuthApplicationType: '',
  oAuthRedirectURI: '',
  organization: '',
  termsOfService: false,
};

interface ApplyFormProps {
  onSuccess: (results: ApplySuccessResult) => void;
}

const ApplyForm: FC<ApplyFormProps> = ({ onSuccess }) => {
  const [submissionError, setSubmissionError] = useState(false);

  const handleSubmit = async (values: Values): Promise<void> => {
    setSubmissionError(false);
    const applicationBody: DevApplicationRequest = {
      ...values,
      apis: values.apis.join(','),
    };

    try {
      const response = await makeRequest<DevApplicationResponse>(
        APPLY_URL,
        {
          body: JSON.stringify(applicationBody),
          headers: {
            accept: 'application/json',
            'content-type': 'application/json',
          },
          method: 'POST',
        },
        { responseType: ResponseType.JSON },
      );

      const json = response.body as DevApplicationResponse;

      if (!json.token && !json.clientID) {
        throw Error(
          'Developer Application endpoint returned 200 response with a valid response body',
        );
      }

      onSuccess({
        ...json,
        apis: values.apis,
        email: values.email,
      });
    } catch (error: unknown) {
      setSubmissionError(true);
    }
  };

  return (
    <div className="vads-l-row">
      <p
        className={classNames(
          'usa-font-lead',
          'vads-u-font-family--sans',
          'vads-u-margin-bottom--2',
          'vads-u-margin-top--0',
        )}
      >
        This page is the first step towards developing with VA Lighthouse APIs. The keys and/or
        credentials you will receive are for sandbox development only. When your app is ready to go
        live, you may <Link to="/go-live">request production access</Link>. Please submit the form
        below and you&apos;ll receive an email with your API key(s) and/or OAuth credentials, as
        well as further instructions. Thank you for being a part of our platform.
      </p>
      <div className={classNames('vads-l-col--12', 'vads-u-padding-x--2p5')}>
        <Formik initialValues={initialValues} onSubmit={handleSubmit} validate={validateForm} validateOnBlur={false} validateOnChange={false}>
          {({ isSubmitting, values, submitForm }): React.ReactNode => {
            const handleSubmitButtonClick = async (): Promise<void> => {
              await submitForm();
              setTimeout(() => {
                const errorElements = document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

                if (errorElements.length > 0) {
                  errorElements[0].focus();
                }
              }, 0);
            };

            return (
              <Form className="usa-form" noValidate>
                <h2>Application</h2>
                <DeveloperInfo />
                <SelectedApis />
                {anyOAuthApisSelected(values) && <OAuthAppInfo />}

                <TextField
                  as="textarea"
                  label="Briefly describe how your organization will use VA APIs:"
                  name="description"
                  className="vads-u-margin-top--4"
                />

                <CheckboxRadioField
                  label={
                    <span>
                      I agree to the <Link to="/terms-of-service">Terms of Service</Link>{' '}
                      <span className="form-required-span">(*Required)</span>
                    </span>
                }
                  name="termsOfService"
                  required
                  type="checkbox"
                  className="form-checkbox"
                />

                <button onClick={handleSubmitButtonClick} type="submit" className="vads-u-width--auto">
                  {isSubmitting ? 'Sending...' : 'Submit'}
                </button>
              </Form>
          );
 }}
        </Formik>
        {submissionError && (
          <AlertBox
            status="error"
            headline="We encountered a server error while saving your form. Please try again later."
            content={
              <span>
                Need assistance? Create an issue through our <Link to="/support">Support page</Link>
              </span>
            }
          />
        )}
      </div>
    </div>
  );
};

export { ApplyForm };
