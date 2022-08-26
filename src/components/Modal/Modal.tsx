import { ReactNode, useEffect, useRef, useState } from "react";
import "./styles.scss";

interface ModalTypes {
  onHide: Function;
  children: ReactNode;
  modalOpen: boolean;
}

const Modal = ({ onHide, children, modalOpen }: ModalTypes) => {
  const modal: any = useRef();
  const modalContent: any = useRef();

  const setModalClose = (el: any) => {
    if (el.target !== modal.current && el.target !== modalContent.current) {
      return;
    }

    onHide();
  };

  return (
    <>
      <div
        className={`modal ${modalOpen ? "show" : "hidden"}`}
        ref={modal}
        onClick={setModalClose}
      >
        <div className="modal-content" ref={modalContent}>
          <div className="modal-dialog">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Modal;
