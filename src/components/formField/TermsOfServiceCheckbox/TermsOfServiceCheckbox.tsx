import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React from 'react';
import CheckboxRadioField from '../CheckboxRadioField';

import './TermsOfServiceCheckbox.scss';

export interface TermsOfServiceFormValues {
  termsOfService: boolean;
}

const TermsOfServiceCheckbox: React.FunctionComponent = <T extends TermsOfServiceFormValues>() => {
  const { errors, touched } = useFormikContext<T>();
  const hasTermsOfServiceError = !!errors.termsOfService && !!touched.termsOfService;
  return (
    <CheckboxRadioField
      label="I agree to the terms"
      name="termsOfService"
      required
      type="checkbox"
      description={
        <>
          <p className={classNames({ 'vads-u-font-weight--bold': hasTermsOfServiceError })}>
            Terms and conditions <span className="form-required-span">(*Required)</span>
          </p>
          <p className="vads-u-color--gray">
            Review our <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">terms of service</a>.
          </p>
        </>
      }
      className="vads-u-margin-top--4 terms-of-service-checkbox"
      showError
    />
  );
};

export default TermsOfServiceCheckbox;
