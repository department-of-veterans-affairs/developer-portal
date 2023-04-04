import React, { FC, useRef, useState } from 'react';

import { Link } from 'react-router-dom';

import AlertBox from 'component-library-legacy/AlertBox';

import { useCookies } from 'react-cookie';
import { Form, Formik } from 'formik';
import { HttpErrorResponse, makeRequest, ResponseType } from '../../../../utils/makeRequest';
import {
  TextField,
  TermsOfServiceCheckbox,
  CheckboxRadioField,
  FieldSet,
} from '../../../../components';
import { LPB_FORGERY_TOKEN } from '../../../../types/constants';
import {
  ApplySuccessResult,
  DevApplicationRequest,
  DevApplicationResponse,
  InternalApiInfo,
} from '../../../../types/forms/apply';
import { includesInternalOnlyAPI } from '../../../../apiDefs/query';
import { DeveloperInfo } from './DeveloperInfo';
import { validateForm } from './validateForm';
import { OAuthAcgAppInfo } from './OAuthAcgAppInfo';
import { OAuthCcgAppInfo } from './OAuthCcgAppInfo';

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
  apiIdentifier: string;
  authTypes: string[];
  onSuccess: (results: ApplySuccessResult) => void;
  postUrl: string;
}

interface SandboxAccessFormError extends HttpErrorResponse {
  body: {
    errors?: string[];
  };
}

const SandboxAccessForm: FC<SandboxAccessFormProps> = ({
  apiIdentifier,
  authTypes,
  onSuccess,
  postUrl,
}) => {
  const formRef = useRef(null);
  const [submissionHasError, setSubmissionHasError] = useState(false);
  const [submissionErrors, setSubmissionErrors] = useState<string[]>([]);
  const [authType, setAuthType] = useState<string | null>();
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
      setCookie('CSRF-TOKEN', LPB_FORGERY_TOKEN, {
        path: postUrl,
        sameSite: 'strict',
        secure: true,
      });

      const response = await makeRequest<DevApplicationResponse>(
        postUrl,
        {
          body: JSON.stringify(applicationBody),
          headers: {
            'X-Csrf-Token': LPB_FORGERY_TOKEN,
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
      // This will only capture the errors on 4xx errors from the lighthouse-platform-backend.
      const errors = (error as SandboxAccessFormError).body.errors ?? [];
      setSubmissionErrors(errors);
    }
  };

  const authTypeChange = (event: React.FormEvent<HTMLFormElement>): void => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'apis[]') {
      switch (target.id) {
        case 'apisFormFieldacgclaims':
          setAuthType('acg');
          break;
        case 'apisFormFieldccgclaims':
          setAuthType('ccg');
          break;
        case 'apisFormFieldacgclaims':
          setAuthType('apikey');
          break;
        default:
      }
    }
  };

  if (authTypes.length === 1 && authType !== authTypes[0]) {
    setAuthType(authTypes[0]);
  }

  return (
    <div className="vads-l-row">
      <div className="vads-u-padding-x--2p5">
        <Formik
          innerRef={formRef}
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
              <Form noValidate onChange={authTypeChange}>
                <DeveloperInfo />
                {authTypes.length === 1 && (
                  <input name="apis[]" type="hidden" value={`${authTypes[0]}/${apiIdentifier}`} />
                )}
                {authTypes.length > 1 && (
                  <FieldSet legend="Choose your auth type" name="apis[]" required>
                    {authTypes.includes('apikey') && (
                      <CheckboxRadioField
                        type="radio"
                        label="API Key"
                        name="authType"
                        value={`apikey/${apiIdentifier}`}
                        required
                      />
                    )}
                    {authTypes.includes('acg') && (
                      <CheckboxRadioField
                        type="radio"
                        label="Authorization Code Flow"
                        name="apis[]"
                        value={`acg/${apiIdentifier}`}
                        required
                      />
                    )}
                    {authTypes.includes('ccg') && (
                      <CheckboxRadioField
                        type="radio"
                        label="Client Credentials Grant"
                        name="apis[]"
                        value={`ccg/${apiIdentifier}`}
                        required
                      />
                    )}
                  </FieldSet>
                )}

                {authType === 'acg' && <OAuthAcgAppInfo />}
                {authType === 'ccg' && <OAuthCcgAppInfo />}

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
                {submissionErrors.length > 0 && (
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
