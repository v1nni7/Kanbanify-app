import { ReactNode, useRef } from "react";
import { Overlay, Content, Dialog } from "../../assets/styles/Modal";

interface ModalTypes {
  onHide: Function;
  children: ReactNode;
  modalOpen: boolean;
}

const Modal = ({ onHide, children, modalOpen }: ModalTypes | any) => {
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
      <Overlay isModalOpen={modalOpen} ref={modal} onClick={setModalClose}>
        <Content ref={modalContent}>
          <Dialog>{children}</Dialog>
        </Content>
      </Overlay>
    </>
  );
};

export default Modal;
