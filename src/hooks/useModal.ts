import { useState } from 'react';

const useModal = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setIsModalOpen(true);
  };

  const handleCloseModal = () => setIsModalOpen(false);

  return {
    isModalOpen,
    handleOpenModal,
    handleCloseModal,
  };
};

export default useModal;
