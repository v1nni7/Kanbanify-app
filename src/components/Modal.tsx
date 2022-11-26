import React, { useState, useRef, useEffect } from "react";

interface ModalPropsType {
  modalOpen?: boolean;
  setModalOpen: Function;
  isModalLarge?: boolean;
  children: React.ReactNode;
}

const Modal = ({ children, isModalLarge, modalOpen, setModalOpen }: ModalPropsType) => {
  const modal = useRef<HTMLDivElement>(null);
  const modalDialog = useRef<HTMLDivElement>(null);

  const onHide = () => {
    setModalOpen(false);
  };

  const handleModalClose = (event: React.MouseEvent<HTMLElement>) => {
    if (event.target !== modal.current && event.target !== modalDialog.current) {
      return;
    }

    onHide();
  };

  return (
    <div
      ref={modal}
      className={`modal ${modalOpen ? "show" : "hidden"}`}
      onClick={handleModalClose}
    >
      <div
        ref={modalDialog}
        className={`modal-dialog ${isModalLarge ? "modal-dialog-lg" : ""}`}
      >
        <div className="modal-content">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
