import { Link, useParams } from "react-router-dom";
import { useCallback, useEffect, useState } from "react";

import "./styles.scss";
import Modal from "../../components/Modal";
import api from "../../services/api";

const Boards = () => {
  const [createdWorkspaces, setCreatedWorkspaces] = useState<any>([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const loadingAllBoards = useCallback(async () => {
    try {
      const response = await api.getAllWorkspaces();
      setCreatedWorkspaces(response.data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadingAllBoards();
  }, [loadingAllBoards]);

  return (
    <>
      <section className="boards-section">
        <div className="boards flex flex-wrap">
          <div className="board" onClick={() => setModalOpen(!modalOpen)}>
            <div className="board-background background-new-board flex justify-content-center align-items-center">
              <h2>Criar novo quadro</h2>
            </div>
          </div>
          {createdWorkspaces ? (
            createdWorkspaces?.map((createdWorkspace: any, index: number) => (
              <Link
                to={`/workspace/${createdWorkspace.id}`}
                className="board"
                key={index}
              >
                <div className="board-background">
                  <img src={createdWorkspace.backgroundImage} alt="" />
                </div>
                <div className="board-background-gradient flex align-items-end">
                  <h2>{createdWorkspace.name}</h2>
                </div>
              </Link>
            ))
          ) : (
            <></>
          )}
          {/* <Link to="/workspace/1" className="board">
            <div className="board-background">
              <img src={backgroundImage} alt="" />
            </div>
            <div className="board-background-gradient flex align-items-end">
              <h2>Meu primeiro quadro</h2>
            </div>
          </Link> */}
        </div>
      </section>

      <Modal onHide={() => setModalOpen(!modalOpen)} modalOpen={modalOpen}>
        <form className="form-create-workspace">
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Nome do Workspace
            </label>
            <input className="form-control" name="name" type="text" />
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
