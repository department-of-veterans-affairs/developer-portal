import { useEffect } from 'react';
import { useFormikContext } from 'formik';

export const ScrollToFirstError = (): null => {
  const formik = useFormikContext();
  const { errors, isSubmitting } = formik;

  useEffect(() => {
    const errorElements = Object.keys(errors);
    if (!errorElements.length) {
      return;
    }

    const firstErrorName = errorElements[0];
    const firstErrorElement = document.querySelector(`[name="${firstErrorName}"]`);
    if (firstErrorElement) {
      (firstErrorElement.parentElement ?? firstErrorElement).scrollIntoView({
        behavior: 'smooth',
      });

      // Wait for the scroll to finish before focusing on the element
      setTimeout(() => {
        (firstErrorElement as HTMLElement).focus();
      }, 0);
    }
  }, [errors, isSubmitting]);

  return null;
};
