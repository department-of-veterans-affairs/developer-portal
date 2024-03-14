import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';
import CheckboxRadioField from '../CheckboxRadioField';

import './TermsOfServiceCheckbox.scss';

interface TermsOfServiceCheckboxProps {
  termsOfServiceUrl: string;
}

export interface TermsOfServiceFormValues {
  termsOfService: boolean;
}

const TermsOfServiceCheckbox: React.FC<TermsOfServiceCheckboxProps> = <
  T extends TermsOfServiceFormValues,
>({
  termsOfServiceUrl,
}: TermsOfServiceCheckboxProps) => {
  const { errors, touched } = useFormikContext<T>();
  const hasTermsOfServiceError = !!errors.termsOfService && !!touched.termsOfService;
  return (
    <CheckboxRadioField
      label="I agree to the terms of service."
      name="termsOfService"
      required
      type="checkbox"
      description={
        <p className={classNames({ 'vads-u-font-weight--bold': hasTermsOfServiceError })}>
          Review our{' '}
          <a href={termsOfServiceUrl} target="_blank" rel="noopener noreferrer">
            terms of service
          </a>
          <span className="form-required-span">(*Required)</span>
        </p>
      }
      className="vads-u-margin-top--4 terms-of-service-checkbox"
      showError
    />
  );
};

export default TermsOfServiceCheckbox;
