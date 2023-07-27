import { useEffect } from 'react';
import { useFormikContext } from 'formik';

export const ScrollToFirstError = (): null => {
  const formik = useFormikContext();
  const { errors, isSubmitting } = formik;

  useEffect(() => {
    if (Object.keys(errors).length) {
      const firstErrorName = Object.keys(errors)[0];
      const firstErrorElement = document.querySelector(`[name="${firstErrorName}"]`);
      if (firstErrorElement) {
        firstErrorElement.parentElement?.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, [errors, isSubmitting]);

  return null;
};
