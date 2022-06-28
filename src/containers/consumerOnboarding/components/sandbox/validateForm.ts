import { FormikErrors } from 'formik';
import {
  validateEmail,
  validateVAEmail,
  validatePresence,
  validateOAuthRedirectURI,
  validateOAuthApplicationType,
  isVaEmail,
} from '../../../../utils/validators';
import {
  includesInternalSponsorshipAPI,
  includesAuthCodeAPI,
  includesCcgAPI,
} from '../../../../apiDefs/query';
import { Values } from './SandboxAccessForm';

const anyApiSelected = ({ apis }: Values): boolean => apis.length > 0;

export const validateForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    email: validateEmail(values.email),
    firstName: validatePresence('first name', values.firstName),
    lastName: validatePresence('last name', values.lastName),
    organization: validatePresence('organization', values.organization),
  };

  if (!values.termsOfService) {
    errors.termsOfService = 'You must agree to the terms of service to continue.';
  }

  if (!anyApiSelected(values)) {
    errors.apis = 'Choose at least one API.';
  }

  if (includesAuthCodeAPI(values.apis)) {
    errors.oAuthApplicationType = validateOAuthApplicationType(values.oAuthApplicationType);
    errors.oAuthRedirectURI = validateOAuthRedirectURI(values.oAuthRedirectURI);
  }

  if (includesCcgAPI(values.apis)) {
    errors.oAuthPublicKey = validatePresence('oAuthPublicKey', values.oAuthPublicKey);
  }

  if (includesInternalSponsorshipAPI(values.apis)) {
    errors.internalApiInfo = {
      programName: validatePresence('program name', values.internalApiInfo.programName),
      sponsorEmail: validateVAEmail(values.internalApiInfo.sponsorEmail),
      // eslint-disable-next-line no-negated-condition
      vaEmail: !isVaEmail(values.email) ? validateVAEmail(values.internalApiInfo.vaEmail) : '',
    };

    const internalInfoErrors = errors.internalApiInfo;

    if (
      !internalInfoErrors.programName &&
      !internalInfoErrors.sponsorEmail &&
      !internalInfoErrors.vaEmail
    ) {
      delete errors.internalApiInfo;
    }
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
