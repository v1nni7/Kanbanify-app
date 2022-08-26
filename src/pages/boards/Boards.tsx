import { Link } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import backgroundImage from "../../assets/images/backgrounds/codebackground.jpg";

import "./styles.scss";
import { SetStateAction, useState } from "react";
import Modal from "../../components/Modal";

const Boards = () => {
  const [workspaces, setWorkspaces] = useState([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState({ name: "", type: "" });

  return (
    <>
      <section className="boards-section">
        <div className="container">
          <div className="boards flex flex-wrap">
            <div className="board" onClick={() => setModalOpen(!modalOpen)}>
              <div className="board-background background-new-board flex justify-content-center align-items-center">
                <h2>Criar novo quadro</h2>
              </div>
            </div>
            <Link to="/board/1" className="board">
              <div className="board-background">
                <img src={backgroundImage} alt="" />
              </div>
              <div className="board-background-gradient flex align-items-end">
                <h2>Meu primeiro quadro</h2>
              </div>
            </Link>
          </div>
        </div>
      </section>

      <Modal onHide={() => setModalOpen(!modalOpen)} modalOpen={modalOpen}>
        <form className="form-create-workspace">
          <div className="form-group">
            <label htmlFor="" className="form-label">Nome do Workspace</label>
            <input className="form-control" type="text" />
          </div>
          <div className="form-group">
            <button type="submit">Enviar</button>
          </div>
        </form>
      </Modal>
    </>
  );
};

export default Boards;
