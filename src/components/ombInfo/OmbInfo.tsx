import React from 'react';
import {
  VaButton,
  VaModal,
} from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import './OmbInfo.scss';
import { useModalController } from '../../hooks';

interface OmbInfoProps {
  expDate: string;
  ombNumber: string;
  resBurden: number;
}
export const OmbInfo = ({ expDate, ombNumber, resBurden }: OmbInfoProps): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();

  return (
    <div className="dev-portal-omb-info">
      <div>
        Estimated burden: <strong>{resBurden} minutes</strong>
      </div>
      <div>
        OMB Control #: <strong>{ombNumber}</strong>
      </div>
      <div>
        Expiration date: <strong>{expDate}</strong>
      </div>
      <VaButton
        text="View Privacy Act Statement"
        onClick={(): void => setModalVisible(true)}
        secondary
      />
      <VaModal
        uswds
        onCloseEvent={(): void => setModalVisible(false)}
        visible={modalVisible}
        modalTitle="Privacy Act Statement"
      >
        <p>
          This information is being collected in accordance with section 3507 of the Paperwork
          Reduction Act of 1995. VA may not conduct or sponsor, and you are not required to respond
          to, a collection of information unless it displays a valid OMB number. The estimated time
          needed to complete this form will average {resBurden} minutes. Information gathered will
          be kept private and confidential to the extent provided by law. Completion of this form is
          voluntary.
        </p>
      </VaModal>
    </div>
  );
};
