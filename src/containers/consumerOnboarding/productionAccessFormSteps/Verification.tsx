import React, { FC } from 'react';
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
        <CheckboxRadioField type="radio" label="Yes" name="type" value="yes" />
        <CheckboxRadioField type="radio" label="No" name="type" value="no" />
      </fieldset>
      <fieldset>
        <legend className="vads-u-font-weight--normal vads-u-font-size--base">
          Is your application and website <a href="http://section508.gov">Section 508</a> compliant?
        </legend>
        <CheckboxRadioField type="radio" label="Yes" name="type" value="yes" />
        <CheckboxRadioField type="radio" label="No" name="type" value="no" />
      </fieldset>
      <SelectedApis selectedApis={[]} />
    </>
  );
};

export default Verification;
