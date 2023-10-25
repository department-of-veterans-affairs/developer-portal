import React from 'react';
import { VaModal } from '@department-of-veterans-affairs/component-library/dist/react-bindings';
import { useModalController } from '../../hooks';
import { VeteranResourcesContent } from './VeteranResourcesContent';
import './VeteranResources.scss';

export const VeteranResources = (): JSX.Element => {
  const { modalVisible, setModalVisible } = useModalController();

  const handleModalClose = (): void => setModalVisible(false);

  return (
    <>
      <button
        className="usa-button usa-button-secondary"
        type="button"
        id="veteran-resources-modal-button"
        onClick={(): void => setModalVisible(true)}
      >
        Veteran resources
      </button>
      <VaModal
        modalTitle="Veteran resources"
        onCloseEvent={handleModalClose}
        onPrimaryButtonClose={handleModalClose}
        visible={modalVisible}
      >
        <VeteranResourcesContent />
      </VaModal>
    </>
  );
};
