import { FormikErrors } from 'formik';
import { APPLY_FIELDS_TO_URL_FRAGMENTS } from '../../../../types/constants';
import {
  validateEmail,
  validateVAEmail,
  validatePresence,
  validateOAuthRedirectURI,
  validateOAuthApplicationType,
} from '../../../../utils/validators';
import { includesOAuthAPI, includesInternalOnlyAPI } from '../../../../apiDefs/query';
import { Values } from './SandboxAccessForm';

export const anyOAuthApisSelected = (apis: string[]): boolean => {
  const apiIdsByField = apis.flatMap(formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField]);
  return includesOAuthAPI(apiIdsByField);
};

export const anyInternalApisSelected = (apis: string[]): boolean => {
  const apiIdsByField = apis.flatMap(formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField]);
  return includesInternalOnlyAPI(apiIdsByField);
};

const anyApiSelected = ({ apis }: Values): boolean => apis.length > 0;

export const validateForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    email: validateEmail(values.email),
    firstName: validatePresence('first name', values.firstName),
    lastName: validatePresence('last name', values.lastName),
    organization: validatePresence('organization', values.organization),
  };

  if (!values.termsOfService) {
    errors.termsOfService = 'Terms of service agreement is required.';
  }

  if (!anyApiSelected(values)) {
    errors.apis = 'Choose at least one API.';
  }

  if (anyOAuthApisSelected(values.apis)) {
    errors.oAuthApplicationType = validateOAuthApplicationType(values.oAuthApplicationType);
    errors.oAuthRedirectURI = validateOAuthRedirectURI(values.oAuthRedirectURI);
  }

  if (anyInternalApisSelected(values.apis)) {
    const vaEmailPattern = /^[A-Za-z0-9._%+-]+@va.gov$/;

    errors.internalApiInfo = {
      programName: validatePresence('program name', values.internalApiInfo.programName),
      sponsorEmail: validateVAEmail(values.internalApiInfo.sponsorEmail),
      // eslint-disable-next-line no-negated-condition
      vaEmail: !vaEmailPattern.test(values.email) ? validateVAEmail(values.internalApiInfo.vaEmail) : '',
    };

    const internalInfoErrors = errors.internalApiInfo;

    if (!internalInfoErrors.programName && !internalInfoErrors.sponsorEmail && !internalInfoErrors.vaEmail) {
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
