/* eslint-disable no-console */
import { FormikErrors } from 'formik';
import {
  validateEmail,
  validatePresence,
  validateOAuthRedirectURI,
  validateOAuthApplicationType,
  validateOAuthPublicKey,
} from '../../../../utils/validators';
import { attestationApis } from '../../../../containers/consumerOnboarding/validationSchema';
import { Values } from './SandboxAccessForm';

export const validateForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    email: validateEmail(values.email),
    firstName: validatePresence('first name', values.firstName),
    lastName: validatePresence('last name', values.lastName),
    organization: validatePresence('organization', values.organization),
    typeAndApi: validatePresence('auth type', values.typeAndApi),
  };

  if (!values.termsOfService) {
    errors.termsOfService = 'You must agree to the terms of service to continue.';
  }

  if (values.typeAndApi.startsWith('acg')) {
    errors.oAuthApplicationType = validateOAuthApplicationType(values.oAuthApplicationType);
    errors.oAuthRedirectURI = validateOAuthRedirectURI(values.oAuthRedirectURI);
  }

  if (values.typeAndApi.startsWith('ccg')) {
    errors.oAuthPublicKey = validateOAuthPublicKey(values.oAuthPublicKey);
  }

  if (
    attestationApis.some(api => values.typeAndApi.split('/')[1] === api) &&
    !values.attestationChecked
  ) {
    errors.attestationChecked = 'You must acknowledge the above to get sandbox access to this API.';
  }

  /*
   * This removes any fields that have an 'undefined' error (as returned by validatePresence)
   * This is needed, otherwise formik thinks there is still an error
   */
  return Object.entries(errors).reduce((reducedErrors, [key, value]) => {
    if (value) {
      reducedErrors[key] = value;
    }
    return reducedErrors;
  }, {});
};
