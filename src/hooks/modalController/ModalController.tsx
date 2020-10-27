import * as React from 'react';

export interface ModalController {
  modalVisible: boolean;
  setModalVisible: (visible: boolean) => void;
}

const useModalController = (): ModalController => {
  const [modalVisible, setModalVisibleState] = React.useState(false);
  /**
   * We're using a mutable ref here so that we can use it within the effect without
   * the chance of our state being out of sync
   */
  const modalVisibleRef = React.useRef<boolean>(false);

  const setModalVisible = (visible: boolean) => {
    modalVisibleRef.current = visible;
    setModalVisibleState(visible);
  };

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalVisibleRef.current) {
        setModalVisible(false);
      }
    };

    document.addEventListener('keydown', handleEscape, false);

    return () => {
      document.removeEventListener('keydown', handleEscape, false);
    };
  }, []);

  return {
    modalVisible,
    setModalVisible,
  };
};

export { useModalController };
