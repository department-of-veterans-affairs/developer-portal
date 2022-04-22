import React, { useEffect } from 'react';
import { useHistory, useLocation } from 'react-router';
import Modal from '@department-of-veterans-affairs/component-library/Modal';
import { useModalController } from '../../hooks';
import { VeteranResourcesContent } from './VeteranResourcesContent';
import './VeteranResources.scss';

export const VeteranResources = (): JSX.Element => {
  const history = useHistory();
  const location = useLocation();
  const { modalVisible, setModalVisible } = useModalController();

  const handleModalClose = (): void => {
    history.push(history.location.pathname);
    setModalVisible(false);
  };

  useEffect(() => {
    if (!modalVisible && location.hash === '#Veteran') {
      setModalVisible(true);
    }

    if (modalVisible && location.hash !== '#Veteran') {
      setModalVisible(false);
    }
  });

  return (
    <>
      <a
        className="vads-c-action-link--green"
        href="#Veteran"
        onClick={(): void => setModalVisible(true)}
      >
        Veterans, find helpful resources and contact info.
      </a>
      <Modal
        clickToClose
        id="veteran-resources-modal"
        visible={modalVisible}
        onClose={handleModalClose}
      >
        <VeteranResourcesContent />
      </Modal>
    </>
  );
};
