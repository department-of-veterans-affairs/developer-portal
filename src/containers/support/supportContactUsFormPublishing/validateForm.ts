import { FormikErrors } from 'formik';
import { FormType, SupportContactUsFormState } from '../../../types/contactForm';
import { validateEmailFormik, validatePresenceFormik } from '../../../utils/validators';

const validateForm = (values: SupportContactUsFormState): FormikErrors<SupportContactUsFormState> => {
  const errors: FormikErrors<SupportContactUsFormState> = {};
  const firstNameError = validatePresenceFormik('First name', values.firstName);
  const lastNameError = validatePresenceFormik('Last name', values.lastName);
  const emailError = validateEmailFormik(values.email);

  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (values.type === FormType.DEFAULT) {
    const descriptionError = validatePresenceFormik('Description', values.description);
    if (descriptionError) {
      errors.description = descriptionError;
    }
  } else {
    const apiDetailError = validatePresenceFormik('API details', values.apiDetails);
    const apiInternalOnlyError = validatePresenceFormik('API internal-only', values.apiInternalOnly);
    if (apiDetailError) {
      errors.apiDetails = apiDetailError;
    }

    if (apiInternalOnlyError) {
      errors.apiInternalOnly = apiInternalOnlyError;
    }
    if (values.apiInternalOnly === 'yes') {
      const apiInternalOnlyDetailsError = validatePresenceFormik('API internal-only details', values.apiInternalOnlyDetails);
      if (apiInternalOnlyDetailsError) {
        errors.apiInternalOnlyDetails = apiInternalOnlyDetailsError;
      }
    }
  }
  return errors;
};

export default validateForm;
