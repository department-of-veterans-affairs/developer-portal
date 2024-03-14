import React, { useState } from 'react';
import { useCookies } from 'react-cookie';
import { Form, Formik } from 'formik';
import { DevApplicationRequest, DevApplicationResponse } from '../../../../types/forms/apply';
import { HttpErrorResponse, ResponseType, makeRequest } from '../../../../utils/makeRequest';
import {
  TextField,
  FieldSet,
  CheckboxRadioField,
  TermsOfServiceCheckbox,
} from '../../../../components';
import { OAuthAcgAppInfo } from '../../../consumerOnboarding/components/sandbox/OAuthAcgAppInfo';
import { OAuthCcgAppInfo } from '../../../consumerOnboarding/components/sandbox/OAuthCcgAppInfo';
import { validateForm } from './validateForm';

export interface Values {
  description: string;
  email: string;
  firstName: string;
  lastName: string;
  oAuthApplicationType: string;
  oAuthPublicKey: string;
  oAuthRedirectURI: string;
  organization: string;
  termsOfService: boolean;
  typeAndApi: string;
}

const initialValues = {
  description: '',
  email: '',
  firstName: '',
  lastName: '',
  oAuthApplicationType: '',
  oAuthPublicKey: '',
  oAuthRedirectURI: '',
  organization: '',
  termsOfService: false,
  typeAndApi: '',
};

interface SandboxAccessFormProps {
  apiIdentifier: string;
  authTypes: string[];
  onFailure: (results: unknown) => void;
  onSuccess: (results: unknown) => void;
  urls: {
    acgPkceAuthUrl: string;
    ccgPublicKeyUrl: string;
    postUrl: string;
    termsOfServiceUrl: string;
  };
}

interface SandboxAccessFormError extends HttpErrorResponse {
  body: {
    errors?: string[];
  };
}

export const SandboxAccessForm = ({
  apiIdentifier,
  authTypes,
  onFailure,
  onSuccess,
  urls,
}: SandboxAccessFormProps): JSX.Element => {
  const [authType, setAuthType] = useState<string | null>();
  const setCookie = useCookies(['CSRF-TOKEN'])[1];

  const { acgPkceAuthUrl, ccgPublicKeyUrl, postUrl, termsOfServiceUrl } = urls;

  const handleSubmit = async (values: Values): Promise<void> => {
    const applicationBody: DevApplicationRequest = {
      ...values,
      apis: values.typeAndApi,
    };
    const forgeryToken = 'CsrfBlocker';

    try {
      setCookie('CSRF-TOKEN', forgeryToken, {
        path: postUrl,
        sameSite: 'strict',
        secure: true,
      });

      const response = await makeRequest<DevApplicationResponse>(
        postUrl,
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
        apis: [values.typeAndApi],
        email: json.email ?? values.email,
      });
    } catch (error: unknown) {
      // This will only capture the errors on 4xx errors from the lighthouse-platform-backend.
      const errors = (error as SandboxAccessFormError).body.errors ?? [];
      onFailure(errors);
    }
  };
  const authTypeChange = (event: React.FormEvent<HTMLFormElement>): void => {
    const target = event.target as HTMLInputElement;
    if (target.name === 'typeAndApi') {
      switch (target.id) {
        case `typeAndApiFormFieldacg${apiIdentifier}`:
          setAuthType('acg');
          break;
        case `typeAndApiFormFieldccg${apiIdentifier}`:
          setAuthType('ccg');
          break;
        case `typeAndApiFormFieldapikey${apiIdentifier}`:
          setAuthType('apikey');
          break;
        default:
      }
    }
  };

  if (authTypes.length === 1 && authType !== authTypes[0]) {
    setAuthType(authTypes[0]);
    initialValues.typeAndApi = `${authTypes[0]}/${apiIdentifier}`;
  }

  return (
    <Formik
      initialValues={initialValues}
      onSubmit={handleSubmit}
      validate={validateForm}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }): JSX.Element => {
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
            <TextField
              label="First name"
              name="firstName"
              required
              className="vads-u-margin-top--4"
            />
            <TextField
              label="Last name"
              name="lastName"
              required
              className="vads-u-margin-top--4"
            />
            <TextField
              label="Email address"
              name="email"
              type="email"
              required
              className="vads-u-margin-top--4"
            />
            <TextField
              label="Organization"
              name="organization"
              required
              className="vads-u-margin-top--4"
            />
            <TextField
              as="textarea"
              label="Briefly describe your project and how you'll use this API."
              name="description"
              className="vads-u-margin-top--4"
            />

            {authTypes.length > 1 && (
              <FieldSet
                className="vads-u-margin-top--4"
                legend="Choose your auth type"
                name="typeAndApi"
                required
              >
                {authTypes.includes('apikey') && (
                  <CheckboxRadioField
                    type="radio"
                    label="API Key"
                    name="typeAndApi"
                    value={`apikey/${apiIdentifier}`}
                    required
                  />
                )}
                {authTypes.includes('acg') && (
                  <CheckboxRadioField
                    type="radio"
                    label="Authorization Code Grant"
                    name="typeAndApi"
                    value={`acg/${apiIdentifier}`}
                    required
                  />
                )}
                {authTypes.includes('ccg') && (
                  <CheckboxRadioField
                    type="radio"
                    label="Client Credentials Grant"
                    name="typeAndApi"
                    value={`ccg/${apiIdentifier}`}
                    required
                  />
                )}
              </FieldSet>
            )}

            {authType === 'acg' && (
              <OAuthAcgAppInfo
                acgPkceAuthUrl={acgPkceAuthUrl}
                multipleTypes={authTypes.length > 1}
              />
            )}
            {authType === 'ccg' && (
              <OAuthCcgAppInfo
                ccgPublicKeyUrl={ccgPublicKeyUrl}
                multipleTypes={authTypes.length > 1}
              />
            )}

            <TermsOfServiceCheckbox termsOfServiceUrl={termsOfServiceUrl} />
            <button onClick={handleSubmitButtonClick} type="submit" className="vads-u-width--auto">
              {isSubmitting ? 'Sending...' : 'Submit'}
            </button>
          </Form>
        );
      }}
    </Formik>
  );
};
