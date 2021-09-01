import React, { FC, useState } from 'react';

import classNames from 'classnames';
import { Link } from 'react-router-dom';

import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';

import { Form, Formik } from 'formik';
import { useFlag } from '../../../../flags';
import { makeRequest, ResponseType } from '../../../../utils/makeRequest';
import { TextField, CheckboxRadioField } from '../../../../components';
import { APPLY_URL, FLAG_CONSUMER_DOCS } from '../../../../types/constants';
import {
  ApplySuccessResult,
  DevApplicationRequest,
  DevApplicationResponse,
} from '../../../../types';
import { DeveloperInfo } from './DeveloperInfo';
import SelectedApis from './SelectedApis';
import { validateForm } from './validateForm';

import './SandboxAccessForm.scss';

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

interface SandboxAccessFormProps {
  onSuccess: (results: ApplySuccessResult) => void;
}

const SandboxAccessForm: FC<SandboxAccessFormProps> = ({ onSuccess }) => {
  const [submissionError, setSubmissionError] = useState(false);
  const consumerDocsEnabled = useFlag([FLAG_CONSUMER_DOCS]);

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
      {!consumerDocsEnabled && (
        <p
          className={classNames(
            'usa-font-lead',
            'vads-u-font-family--sans',
            'vads-u-margin-bottom--2',
            'vads-u-margin-top--0',
          )}
        >
          This page is the first step towards developing with VA Lighthouse APIs. The keys and/or
          credentials you will receive are for sandbox development only. When your app is ready to
          go live, you may <Link to="/go-live">request production access</Link>. Please submit the
          form below and you&apos;ll receive an email with your API key(s) and/or OAuth credentials,
          as well as further instructions. Thank you for being a part of our platform.
        </p>
      )}
      <div
        className={classNames('vads-l-col--12', { 'vads-u-padding-x--2p5': !consumerDocsEnabled })}
      >
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ errors, isSubmitting, touched, values }): React.ReactNode => {
            const hasTermsOfServiceError = errors.termsOfService && touched.termsOfService;
            const handleSubmitButtonClick = (): void => {
              setTimeout(() => {
                const errorElements = document.querySelectorAll<HTMLElement>('[aria-invalid=true]');

                if (errorElements.length > 0) {
                  errorElements[0].focus();
                }
              }, 0);
            };

            return (
              <Form noValidate>
                <h2>Application</h2>
                <DeveloperInfo />
                <SelectedApis selectedApis={values.apis} />

                <TextField
                  as="textarea"
                  label="Briefly describe how your organization will use VA APIs:"
                  name="description"
                  className="vads-u-margin-top--4"
                />

                <CheckboxRadioField
                  label="I agree to the terms"
                  name="termsOfService"
                  required
                  type="checkbox"
                  description={
                    <>
                      <p className={classNames({ 'vads-u-font-weight--bold': hasTermsOfServiceError })}>
                        Terms and conditions <span className="form-required-span">(*Required)</span>
                      </p>
                      <p className="vads-u-color--gray">
                        Review our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">terms of service</a>.
                      </p>
                    </>
                  }
                  className="terms-of-service-checkbox vads-u-margin-top--4"
                  showError
                />

                <button
                  onClick={handleSubmitButtonClick}
                  type="submit"
                  className="vads-u-width--auto"
                >
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

export { SandboxAccessForm };
