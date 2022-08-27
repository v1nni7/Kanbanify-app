import { Link, useNavigate } from "react-router-dom";
import { IoAddCircleOutline } from "react-icons/io5";
import backgroundImage from "../../assets/images/backgrounds/codebackground.jpg";

import "./styles.scss";
import {
  FormEvent,
  useCallback,
  useEffect,
  useState,
} from "react";
import Modal from "../../components/Modal";

interface ValuesFormType {
  name: string;
  type: string;
}

const Boards = () => {
  let navigate = useNavigate();

  const [workspaces, setWorkspaces] = useState([]);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [modalForm, setModalForm] = useState<any>({
    name: "",
    type: "",
  });

  const handleFormChange = useCallback(
    (e: any) => {
      setModalForm({
        [e.target.name]: e.target.value,
      });
    },
    [modalForm]
  );

  const handleSaveBoard = useCallback(
    (e: FormEvent) => {
      e.preventDefault();
      let boardId = `board-${modalForm.name
        .replace(/[" "]/g, "-")
        .toLowerCase()}`;

      const newObject = {
        id: boardId,
        name: modalForm.name,
      };

      const arrBoardName: any = JSON.parse(
        localStorage.getItem("userBoards") as any
      );
      if (!arrBoardName) {
        localStorage.setItem("userBoards", JSON.stringify([newObject]));
        setModalForm({
          name: "",
          type: "",
        });
        setModalOpen(false);
        navigate(`/board/${boardId}`);
        return;
      }

      localStorage.setItem(
        "userBoards",
        JSON.stringify([...arrBoardName, newObject])
      );
      setModalForm({
        name: "",
        type: "",
      });
      setModalOpen(false);
      navigate(`/board/${boardId}`);
    },
    [modalForm]
  );

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
        <form className="form-create-workspace" onSubmit={handleSaveBoard}>
          <div className="form-group">
            <label htmlFor="" className="form-label">
              Nome do Workspace
            </label>
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={handleFormChange}
            />
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
