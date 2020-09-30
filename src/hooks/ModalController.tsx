import * as React from 'react';

const useModalController = (): {
  modalVisible: boolean;
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
} => {

  const [modalVisible, setModalVisible] = React.useState(false);

  React.useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && modalVisible) {
        setModalVisible(false);
      }
    };
    
    document.addEventListener("keydown", handleEscape, false);

    return () => {
      document.removeEventListener("keydown", handleEscape, false);
    };
  }, []);

  return {
    modalVisible,
    setModalVisible,
  };
};

export default useModalController;