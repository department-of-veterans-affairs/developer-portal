import { FormikErrors } from 'formik';
import { includesOAuthAPI } from '../../apiDefs/query';
import { APPLY_FIELDS_TO_URL_FRAGMENTS } from '../../types/constants';
import { validateYesOrNo, validatePresence } from '../../utils/validators';
import { Values } from './ProductionAccess';

export const anyOAuthApisSelected = (apis: string[]): boolean => {
  const apiIdsByField = apis.flatMap(formField => APPLY_FIELDS_TO_URL_FRAGMENTS[formField]);
  return includesOAuthAPI(apiIdsByField);
};

const anyApiSelected = ({ apis }: Values): boolean => apis.length > 0;

export const validateProductionAccessForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    is508Compliant: validateYesOrNo(values.is508Compliant),
    isUSBasedCompany: validateYesOrNo(values.isUSBasedCompany),
    primaryContact: {
      email: validatePresence('email', values.primaryContact.email),
      firstName: validatePresence('first name', values.primaryContact.firstName),
      lastName: validatePresence('last name', values.primaryContact.lastName),
    },
  };

  if (!anyApiSelected(values)) {
    errors.apis = 'Choose at least one API.';
  }

  if (!values.termsOfService) {
    errors.termsOfService = 'Agree to the Terms of Service to continue.';
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
