import classNames from 'classnames';
import { useFormikContext } from 'formik';
import React, { FC, useEffect, useRef } from 'react';
import { CheckboxRadioField, FieldSet } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { SelectedAPIs } from './SelectedApis';

interface VerificationProps {
  hasPassedStep: boolean;
}

const Verification: FC<VerificationProps> = props => {
  const firstInputRef = useRef<HTMLInputElement>(null);
  useEffect(() => {
    if (props.hasPassedStep) {
      firstInputRef.current?.focus();
    }
  }, [props.hasPassedStep]);

  const { errors, touched } = useFormikContext<Values>();
  const hasTermsOfServiceError = errors.termsOfService && touched.termsOfService;

  return (
    <>
      <h3>Confirm</h3>
      <FieldSet
        className="vads-u-margin-top--4"
        legend="Are you a US-based company?"
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
        name="isUSBasedCompany"
        required
      >
        <CheckboxRadioField
          type="radio"
          label="Yes"
          name="isUSBasedCompany"
          value="yes"
          required
          innerRef={firstInputRef}
        />
        <CheckboxRadioField type="radio" label="No" name="isUSBasedCompany" value="no" required />
      </FieldSet>
      <FieldSet
        className="vads-u-margin-top--4"
        legend={
          <span>
            Is your application and website{' '}
            <a href="http://section508.gov" target="_blank" rel="noopener noreferrer">
              Section 508
            </a>{' '}
            compliant?
          </span>
        }
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
        name="is508Compliant"
        required
      >
        <CheckboxRadioField type="radio" label="Yes" name="is508Compliant" value="yes" required />
        <CheckboxRadioField type="radio" label="No" name="is508Compliant" value="no" required />
      </FieldSet>

      <SelectedAPIs />
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
        className="vads-u-margin-top--4"
        showError
      />
    </>
  );
};

export { Verification };
