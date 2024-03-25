import React, { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import { CheckboxRadioField, FieldSet, TermsOfServiceCheckbox } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { TERMS_OF_SERVICE_PATH } from '../../../../types/constants/paths';
import { Attestation } from '../../Attestation';
import { attestationApis } from '../../validationSchema';
import { lookupAttestationApi, lookupAttestationIdentifier } from '../../../../apiDefs/query';
import { APIDescription } from '../../../../apiDefs/schema';
import { SelectedAPIs } from './SelectedApis';
import './Verification.scss';

const Verification: FC = () => {
  const {
    values: { apis },
    setFieldValue,
  } = useFormikContext<Values>();

  // Resets attestationChecked value if user unselects all APIs that require attestation
  useEffect(() => {
    if (!attestationApis.some(api => apis.includes(api))) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setFieldValue('attestationChecked', false, false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apis]);

  let attestationApi: APIDescription | undefined;
  const formattedApisValues = apis.map(apiValue => apiValue.split('/')[1]);
  const attestationIdentifier = lookupAttestationIdentifier(formattedApisValues);
  if (attestationIdentifier) {
    attestationApi = lookupAttestationApi(attestationIdentifier);
  }

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
      {attestationApi && <Attestation api={attestationApi} />}
    </fieldset>
  );
};

export { Verification };
