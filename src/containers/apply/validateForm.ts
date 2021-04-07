import { FormikErrors } from 'formik';
import { APPLY_FIELDS_TO_URL_FRAGMENTS } from '../../types/constants';
import { validateEmail, validatePresence, validateOAuthRedirectURI } from '../../utils/validators';
import { includesOAuthAPI } from '../../apiDefs/query';
import { Values } from './ApplyForm';

export const anyOAuthApisSelected = ({ apis }: Values): boolean => {
  const apiIdsByField = apis.flatMap(
    formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField],
  );
  return includesOAuthAPI(apiIdsByField);
};

const anyApiSelected = ({ apis }: Values): boolean => apis.length > 0;

export const validateForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    email: validateEmail(values.email),
    firstName: validatePresence('first name', values.firstName),
    lastName: validatePresence('last name', values.firstName),
    organization: validatePresence('organization', values.firstName),
  };

  if (!values.termsOfService) {
    errors.termsOfService = 'Terms of service agreement is required.';
  }

  if (!anyApiSelected(values)) {
    errors.apis = 'At least one API is required for submission.';
  }

  if (anyOAuthApisSelected(values)) {
    errors.oAuthApplicationType = validatePresence('Application Type', values.oAuthApplicationType);
    errors.oAuthRedirectURI = validateOAuthRedirectURI(values.oAuthRedirectURI);
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
