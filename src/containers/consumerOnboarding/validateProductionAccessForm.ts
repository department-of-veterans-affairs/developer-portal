import { FormikErrors } from 'formik';
import { validateYesOrNo } from '../../utils/validators';
import { Values } from './ProductionAccess';

export const validateProductionAccessForm = (values: Values): FormikErrors<Values> => {
  const errors: FormikErrors<Values> = {
    isUSBasedCompany: validateYesOrNo(values.isUSBasedCompany),
  };

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
