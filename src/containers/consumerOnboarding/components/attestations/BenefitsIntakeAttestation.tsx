import React, { useEffect, useState } from 'react';
import { useFormikContext } from 'formik';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { CheckboxRadioField } from '../../../../components';
import { useModalController } from '../../../../hooks';
import { Values } from '../../ProductionAccess';

export const BenefitsIntakeAttestation = (): JSX.Element => {
  const { errors, isSubmitting, values, setFieldError, setFieldValue } = useFormikContext<Values>();
  const { apis } = values;
  const {
    modalVisible: benefitsIntakeModalVisible,
    setModalVisible: setBenefitsIntakeModalVisible,
  } = useModalController();
  const [isAttestationFirstOpen, setIsAttestationFirstOpen] = useState(true);

  const handleConfirmClick = (): void => {
    if (!values.benefitsIntakeApiAttestation) {
      setFieldError(
        'benefitsIntakeApiAttestation',
        'You must attest to request production access for this API.',
      );
      return;
    }
    setBenefitsIntakeModalVisible(false);
  };

  const handleCancelClick = (): void => {
    setBenefitsIntakeModalVisible(false);
    setIsAttestationFirstOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setFieldValue('benefitsIntakeApiAttestation', false, false);
  };

  useEffect(() => {
    if (
      apis.includes('apikey/benefits') &&
      errors.benefitsIntakeApiAttestation &&
      !values.benefitsIntakeApiAttestation &&
      values.termsOfService &&
      isSubmitting
    ) {
      if (isAttestationFirstOpen) {
        setFieldError('benefitsIntakeApiAttestation', undefined);
      }
      setBenefitsIntakeModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors.benefitsIntakeApiAttestation, isSubmitting]);

  // Resets the attestation checkbox if the user removes the Benefits Intake API from their selection
  useEffect(() => {
    if (!apis.includes('apikey/benefits') && values.benefitsIntakeApiAttestation) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      setFieldValue('benefitsIntakeApiAttestation', false, false);
      setIsAttestationFirstOpen(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apis]);

  return (
    <VaModal
      large
      id="benefits-intake-attestation-modal"
      forcedModal
      modalTitle="Requirements for the Benefits Intake API"
      onCloseEvent={(): void => setBenefitsIntakeModalVisible(false)}
      visible={benefitsIntakeModalVisible}
      primaryButtonText="Confirm"
      onPrimaryButtonClick={handleConfirmClick}
      secondaryButtonText="Cancel"
      onSecondaryButtonClick={handleCancelClick}
      uswds
    >
      <p>
        By accessing or using the{' '}
        <span className="vads-u-font-weight--bold">Benefits Intake API</span> in the production
        environment provided by VA, you must affirm and attest that the end user of your application
        is:
      </p>
      <ol>
        <li>A VA benefits claimant;</li>
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
      </ol>
      <p>
        You must agree that this API will not be accessed by individuals or entities who do not meet
        the specified criteria above, and to limit your application&apos;s scope as authorized and
        defined by VA. Any expansion of your application&apos;s scope requires prior approval from
        VA.
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
    </VaModal>
  );
};
