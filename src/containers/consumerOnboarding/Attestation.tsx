import React, { useEffect, useState } from 'react';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useFormikContext } from 'formik';
import { CheckboxRadioField } from '../../components';
import { useModalController } from '../../hooks';
import { APIDescription } from '../../apiDefs/schema';
import { Values as SandboxValues } from '../documentation/components/sandbox';
import { Values } from './ProductionAccess';

interface AttestationProps {
  api: APIDescription;
  children?: React.ReactNode;
}

export const Attestation = ({ api, children }: AttestationProps): JSX.Element => {
  const { errors, isSubmitting, values, setFieldError, setFieldValue } = useFormikContext<
    Values | SandboxValues
  >();
  const { modalVisible: attestationModalVisible, setModalVisible: setAttestationModalVisible } =
    useModalController();
  const [isAttestationFirstOpen, setIsAttestationFirstOpen] = useState(true);

  const handleConfirmClick = (): void => {
    if (!values.attestationChecked) {
      setFieldError(
        'attestationChecked',
        'You must attest to request production access for this API.',
      );
      return;
    }
    setAttestationModalVisible(false);
  };

  const handleCancelClick = (): void => {
    setAttestationModalVisible(false);
    setIsAttestationFirstOpen(false);
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    setFieldValue('attestationChecked', false, false);
  };

  useEffect(() => {
    if (
      isSubmitting &&
      errors.attestationChecked &&
      !values.attestationChecked &&
      Object.keys(errors).length === 1
    ) {
      if (isAttestationFirstOpen) {
        setFieldError('attestationChecked', undefined);
      }
      setAttestationModalVisible(true);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [errors, isSubmitting, values]);

  return (
    <VaModal
      large
      id="attestation-modal"
      forcedModal
      modalTitle={`Requirements for the ${api.name}`}
      onCloseEvent={(): void => setAttestationModalVisible(false)}
      visible={attestationModalVisible}
      primaryButtonText="Confirm"
      onPrimaryButtonClick={handleConfirmClick}
      secondaryButtonText="Cancel"
      onSecondaryButtonClick={handleCancelClick}
      uswds
    >
      {children ?? (
        <>
          <p>
            By accessing or using the <span className="vads-u-font-weight--bold">{api.name}</span>{' '}
            in the production environment provided by VA, you must affirm and attest that the end
            user of your application is:
          </p>
          <ol>
            <li>A VA benefits claimant;</li>
            <li>
              An individual accredited by VA to prepare, present, and prosecute VA benefits claims;
            </li>
            <li>
              An accredited representative of a Veteran Service Organization (VSO) recognized by VA
              to represent VA benefits claimants; or
            </li>
            <li>
              A person authorized by the VA secretary to prepare, present, and prosecute a VA
              benefits claim pursuant to 38 C.F.R. § 14.630.
            </li>
          </ol>
          <p>
            You must agree that this API will not be accessed by individuals or entities who do not
            meet the specified criteria above, and to limit your application&apos;s scope as
            authorized and defined by VA. Any expansion of your application&apos;s scope requires
            prior approval from VA.
          </p>
          <p>
            Violation of these terms may result in revocation of API access and possible legal
            action. In addition, a willfully false statement or certification is a criminal offense
            and is punishable by law. See 18 U.S.C. § 1001.
          </p>
          <CheckboxRadioField
            type="checkbox"
            label="I attest that I have read, understood, and agree to the terms above."
            name="attestationChecked"
            required
            showError
          />
        </>
      )}
    </VaModal>
  );
};
