import React, { FC } from 'react';
import { CheckboxRadioField, FieldSet } from '../../../../components';
import { SelectedAPIs } from './SelectedApis';

const Verification: FC = () => (
  <>
    <h3>Confirm</h3>
    <FieldSet
      className="vads-u-margin-top--4"
      legend="Are you a US-based company?"
      legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
      errorClassName="vads-u-margin-left--2"
      name="isUSBasedCompany"
      required
    >
      <CheckboxRadioField type="radio" label="Yes" name="isUSBasedCompany" value="yes" required />
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
      errorClassName="vads-u-margin-left--2"
      name="is508Compliant"
    >
      <CheckboxRadioField type="radio" label="Yes" name="is508Compliant" value="yes"  />
      <CheckboxRadioField type="radio" label="No" name="is508Compliant" value="no"  />
    </FieldSet>

    <SelectedAPIs />
    <CheckboxRadioField
      label={
        <span>
          I agree to the <a href="/terms-of-service" target="_blank" rel="noreferrer noopener">Terms of Service</a>{' '}
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

export { Verification };
