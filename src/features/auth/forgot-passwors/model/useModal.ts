import { useCallback, useState } from 'react';

export const useModal = () => {
  const [modal, setModal] = useState({
    open: false,
    title: "",
    message: "",
  });

  const showModal = useCallback((title: string, message: string) => {
    setModal({ open: true, title, message });
  }, []);

  const closeModal = useCallback(() => {
    setModal((prev) => ({ ...prev, open: false }));
  }, []);

  return {
    modal,
    showModal,
    closeModal,
  };
};