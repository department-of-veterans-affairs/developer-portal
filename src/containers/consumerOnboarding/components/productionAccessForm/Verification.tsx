import React, { FC, useEffect } from 'react';
import { useFormikContext } from 'formik';
import Modal from 'component-library-legacy/Modal';
import { CheckboxRadioField, FieldSet, TermsOfServiceCheckbox } from '../../../../components';
import { Values } from '../../ProductionAccess';
import { TERMS_OF_SERVICE_PATH } from '../../../../types/constants/paths';
import { useModalController } from '../../../../hooks';
import { SelectedAPIs } from './SelectedApis';
import './Verification.scss';

const Verification: FC = () => {
  const { errors, isSubmitting, values } = useFormikContext<Values>();
  const { apis } = values;
  const {
    modalVisible: benefitsIntakeModalVisible,
    setModalVisible: setBenefitsIntakeModalVisible,
  } = useModalController();

  // opens modal when submitting form and errors.benefitsIntakeApiAttestation is present
  useEffect(() => {
    if (
      apis.includes('apikey/benefits') &&
      errors.benefitsIntakeApiAttestation &&
      !values.benefitsIntakeApiAttestation &&
      isSubmitting
    ) {
      setBenefitsIntakeModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.benefitsIntakeApiAttestation, isSubmitting]);

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
      <Modal
        title="Requirements for the Benefits Intake API"
        onClose={(): void => setBenefitsIntakeModalVisible(false)}
        visible={benefitsIntakeModalVisible}
        primaryButton={{
          action: () => setBenefitsIntakeModalVisible(false),
          text: 'Confirm',
        }}
        secondaryButton={{
          action: () => setBenefitsIntakeModalVisible(false),
          text: 'Cancel',
        }}
      >
        <p>
          By accessing or using the{' '}
          <span className="vads-u-font-weight--bold">Benefits Intake API</span> in the production
          environment provided by VA, you must affirm and attest that the end user of your
          application is:
        </p>
        <ol>
          <li> A VA benefits claimant;</li>
          <li>
            An individual accredited by VA to prepare, present, and prosecute VA benefits claims;
          </li>
          <li>
            An accredited representative of a Veteran Service Organization (VSO) recognized by VA to
            represent VA benefits claimants; or
          </li>
          <li>
            A person authorized by the VA secretary to prepare, present, and prosecute a VA benefits
            claim pursuant to 38 C.F.R. § 14.630.
          </li>
        </ol>{' '}
        <p>
          You must agree that this API will not be accessed by individuals or entities who do not
          meet the specified criteria above, and to limit your application&apos;s scope as
          authorized and defined by VA. Any expansion of your application&apos;s scope requires
          prior approval from VA.
        </p>
        <p>
          Violation of these terms may result in revocation of API access and possible legal action.
          In addition, a willfully false statement or certification is a criminal offense and is
          punishable by law. See 18 U.S.C. § 1001.
        </p>
        <CheckboxRadioField
          type="checkbox"
          label="I attest that I have read, understood, and agree to the terms above."
          name="benefitsIntakeApiAttestation"
          required
          showError
        />
      </Modal>
    </fieldset>
  );
};

export { Verification };
