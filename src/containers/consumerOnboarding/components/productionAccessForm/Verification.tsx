import React, { FC, useEffect, useRef } from 'react';
import { CheckboxRadioField, FieldSet } from '../../../../components';
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
        label={
          <span>
            I agree to the <a href="/terms-of-service" target="_blank" rel="noopener noreferrer">Terms of Service</a>{' '}
            <span className="form-required-span">(*Required)</span>
          </span>
        }
        name="termsOfService"
        required
        type="checkbox"
        className="form-checkbox"
      />
    </>
  );
};

export { Verification };
