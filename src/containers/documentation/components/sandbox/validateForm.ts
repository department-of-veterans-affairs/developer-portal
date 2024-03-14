/* eslint-disable no-console */
import { FormikErrors } from 'formik';
import {
  validateEmail,
  validatePresence,
  validateOAuthRedirectURI,
  validateOAuthApplicationType,
  validateOAuthPublicKey,
} from '../../../../utils/validators';
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
