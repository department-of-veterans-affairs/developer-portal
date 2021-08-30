import { FormikErrors } from 'formik';
import { FormType, ContactUsFormState } from '../../../types/forms/contactUsForm';
import { validateEmail, validatePresence } from '../../../utils/validators';

const validateForm = (values: ContactUsFormState): FormikErrors<ContactUsFormState> => {
  const errors: FormikErrors<ContactUsFormState> = {};
  const firstNameError = validatePresence('first name', values.firstName);
  const lastNameError = validatePresence('last name', values.lastName);
  const emailError = validateEmail(values.email);

  if (firstNameError) {
    errors.firstName = firstNameError;
  }

  if (lastNameError) {
    errors.lastName = lastNameError;
  }

  if (emailError) {
    errors.email = emailError;
  }

  if (values.type === FormType.CONSUMER) {
    const descriptionError = validatePresence('description', values.description);
    if (descriptionError) {
      errors.description = descriptionError;
    }
  } else {
    const apiDetailError = validatePresence('API details', values.apiDetails);
    const apiInternalOnlyError = validatePresence('API internal-only', values.apiInternalOnly);
    if (apiDetailError) {
      errors.apiDetails = apiDetailError;
    }

    if (apiInternalOnlyError) {
      errors.apiInternalOnly = apiInternalOnlyError;
    }
    if (values.apiInternalOnly === 'yes') {
      const apiInternalOnlyDetailsError = validatePresence(
        'API internal-only details',
        values.apiInternalOnlyDetails,
      );
      if (apiInternalOnlyDetailsError) {
        errors.apiInternalOnlyDetails = apiInternalOnlyDetailsError;
      }
    }
  }
  return errors;
};

export default validateForm;
