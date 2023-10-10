import React from 'react';
import Modal from 'component-library-legacy/Modal';
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
        onClick={(): void => setModalVisible(true)}
      >
        Veteran resources
      </button>
      <Modal
        aria-describedby="veteran-resources-description"
        aria-labelledby="veteran-resources-header"
        clickToClose
        cssClass="veteran-resources-modal"
        onClose={handleModalClose}
        role="dialog"
        primaryButton={{ action: handleModalClose, text: 'Close' }}
        visible={modalVisible}
      >
        <VeteranResourcesContent />
      </Modal>
    </>
  );
};
