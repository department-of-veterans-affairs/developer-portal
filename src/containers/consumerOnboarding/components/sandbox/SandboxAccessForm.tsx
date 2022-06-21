/* eslint-disable no-console */
import React, { FC, useState } from 'react';

import { Link } from 'react-router-dom';

import AlertBox from '@department-of-veterans-affairs/component-library/AlertBox';

import { useCookies } from 'react-cookie';
import { Form, Formik } from 'formik';
import { HttpErrorResponse, makeRequest, ResponseType } from '../../../../utils/makeRequest';
import { TextField, TermsOfServiceCheckbox } from '../../../../components';
import { LPB_APPLY_URL } from '../../../../types/constants';
import {
  ApplySuccessResult,
  DevApplicationRequest,
  DevApplicationResponse,
  InternalApiInfo,
} from '../../../../types';
import { includesInternalOnlyAPI } from '../../../../apiDefs/query';
import { DeveloperInfo } from './DeveloperInfo';
import SelectedApis from './SelectedApis';
import { validateForm } from './validateForm';

export interface Values {
  apis: string[];
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  internalApiInfo: InternalApiInfo;
  oAuthApplicationType: string;
  oAuthPublicKey: string;
  oAuthRedirectURI: string;
  organization: string;
  termsOfService: boolean;
}

const initialValues = {
  apis: [],
  description: '',
  email: '',
  firstName: '',
  internalApiInfo: {
    programName: '',
    sponsorEmail: '',
    vaEmail: '',
  },
  lastName: '',
  oAuthApplicationType: '',
  oAuthPublicKey: '',
  oAuthRedirectURI: '',
  organization: '',
  termsOfService: false,
};

interface SandboxAccessFormProps {
  onSuccess: (results: ApplySuccessResult) => void;
}

interface SandboxAccessFormError extends HttpErrorResponse {
  body: {
    errors?: string[];
  };
}

const SandboxAccessForm: FC<SandboxAccessFormProps> = ({ onSuccess }) => {
  const [submissionHasError, setSubmissionHasError] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const setCookie = useCookies(['CSRF-TOKEN'])[1];

  const handleSubmit = async (values: Values): Promise<void> => {
    setSubmissionHasError(false);
    setSubmissionErrors([]);
    const applicationBody: DevApplicationRequest = {
      ...values,
      apis: values.apis.join(','),
    };

    if (!includesInternalOnlyAPI(values.apis)) {
      delete applicationBody.internalApiInfo;
    }

    if (applicationBody.internalApiInfo && !applicationBody.internalApiInfo.vaEmail) {
      applicationBody.internalApiInfo.vaEmail = applicationBody.email;
    }

    try {
      const forgeryToken = Math.random().toString(36).substring(2);
      setCookie('CSRF-TOKEN', forgeryToken, {
        path: LPB_APPLY_URL,
        sameSite: 'strict',
        secure: true,
      });

      const response = await makeRequest<DevApplicationResponse>(
        LPB_APPLY_URL,
        {
          body: JSON.stringify(applicationBody),
          headers: {
            'X-Csrf-Token': forgeryToken,
            accept: 'application/json',
            'content-type': 'application/json',
          },
          method: 'POST',
        },
        { responseType: ResponseType.JSON },
      );

      const json = response.body as DevApplicationResponse;

      if (!json.token && !json.clientID && !json.email) {
        throw Error(
          'Developer Application endpoint returned successful response status with an invalid response body',
        );
      }

      onSuccess({
        ...json,
        apis: values.apis,
        email: json.email ?? values.email,
      });
    } catch (error: unknown) {
      setSubmissionHasError(true);
      // This will only capture the errors on 4xx errors from the developer-portal-backend.
      const errors = (error as SandboxAccessFormError).body.errors ?? [];
      setSubmissionErrors(errors);
    }
  };

  return (
    <div className="vads-l-row">
      <div className="vads-u-padding-x--2p5">
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validate={validateForm}
          validateOnBlur={false}
          validateOnChange={false}
        >
          {({ isSubmitting, values }): React.ReactNode => {
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

                <TermsOfServiceCheckbox />
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
        {submissionHasError && (
          <AlertBox
            status="error"
            headline="We encountered a server error while saving your form. Please try again later."
            content={
              <span>
                Need assistance? Create an issue through our <Link to="/support">Support page</Link>
                {process.env.NODE_ENV === 'development' && submissionErrors.length > 0 && (
                  <ul>
                    {submissionErrors.map((item: string) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                )}
              </span>
            }
          />
        )}
      </div>
    </div>
  );
};

export { SandboxAccessForm };
