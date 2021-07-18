import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { CheckboxRadioField } from '../../../components';
import SelectedApis from './SelectedApis';

const Verification: FC = () => {
  return (
    <>
      <h3>Confirm</h3>
      <fieldset>
        <legend className="vads-u-font-weight--normal vads-u-font-size--base">
          Are you a US-based company?
        </legend>
        <CheckboxRadioField type="radio" label="Yes" name="isUSBasedCompany" value="yes" />
        <CheckboxRadioField type="radio" label="No" name="isUSBasedCompany" value="no" />
      </fieldset>
      <fieldset>
        <legend className="vads-u-font-weight--normal vads-u-font-size--base">
          Is your application and website{' '}
          <a href="http://section508.gov" target="_blank" rel="noopener noreferrer">
            Section 508
          </a>{' '}
          compliant?
        </legend>
        <CheckboxRadioField type="radio" label="Yes" name="is508Compliant" value="yes" />
        <CheckboxRadioField type="radio" label="No" name="is508Compliant" value="no" />
      </fieldset>
      <SelectedApis selectedApis={[]} />
      <CheckboxRadioField
        label={
          <span>
            I agree to the <Link to="/terms-of-service">Terms of Service</Link>{' '}
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

export default Verification;
