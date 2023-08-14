import React, { FC } from 'react';
import { useFormikContext } from 'formik';
import { CheckboxRadioField, FieldSet, TermsOfServiceCheckbox } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { TERMS_OF_SERVICE_PATH } from '../../../../types/constants/paths';
import { SelectedAPIs } from './SelectedApis';
import './Verification.scss';

const Verification: FC = () => {
  const {
    values: { apis },
  } = useFormikContext<Values>();
  return (
    <fieldset>
      <legend>
        <h3 className="vads-u-margin-bottom--0">Confirm</h3>
      </legend>
      <FieldSet
        className="vads-u-margin-top--4"
        legend="Are you a US-based company?"
        legendClassName="vads-u-font-weight--normal vads-u-font-size--base"
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
        name="is508Compliant"
        required
      >
        <CheckboxRadioField type="radio" label="Yes" name="is508Compliant" value="yes" required />
        <CheckboxRadioField type="radio" label="No" name="is508Compliant" value="no" required />
      </FieldSet>
      <div className="verification-divider vads-u-margin-top--4 vads-u-margin-bottom--1p5" />
      <SelectedAPIs selectedApis={apis} />
      <TermsOfServiceCheckbox termsOfServiceUrl={TERMS_OF_SERVICE_PATH} />
    </fieldset>
  );
};

export { Verification };
