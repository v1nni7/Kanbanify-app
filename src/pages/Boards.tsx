import { useContext, useState, useEffect, useCallback } from "react";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { Formik } from "formik";
import { toast, ToastContainer } from "react-toastify";
import { ValidationError } from "yup";

import api from "../services/api";
import Modal from "../components/Modal";
import { AuthContext } from "../hooks/context/AuthContext";

import Form from "../assets/styles/Form";
import Icon from "../assets/styles/Icon";
import Board from "../assets/styles/Board";
import { Flex } from "../assets/styles/Modal";
import workspaceSchemaValidate from "../assets/schema/workspaceSchemaValidate";

const Boards = () => {
  const boardValues = {
    name: "",
    background: "",
  };

  const { user } = useContext<any>(AuthContext);

  const [workspaces, setWorkspaces] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<any>(false);
  const [isModalOpen, setIsModalOpen] = useState<any>(false);

  const getBoards = useCallback(async () => {
    try {
      if (!user.token) {
        return;
      }

      const headers = { headers: { Authorization: `Bearer ${user.token}` } };

      const response = await api.getBoards(headers);

      if (response.status === 200) {
        setWorkspaces(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user.token]);

  const createBoard = useCallback(
    async (data: any) => {
      try {
        const headers = { headers: { Authorization: `Bearer ${user.token}` } };
        setIsLoading(true);

        await workspaceSchemaValidate.workspaceSchema(data);

        const response = await api.createBoard(data, headers);

        if (response.status === 201) {
          getBoards();
          setIsModalOpen(false);
        }
      } catch (error: any) {
        if (error instanceof ValidationError) {
          toast.error(error.message);
          return;
        }

        toast.error(`${error.response.data}`);
      } finally {
        setIsLoading(false);
      }
    },
    [user.token]
  );

  useEffect(() => {
    getBoards();
  }, [getBoards]);

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

      <Board.Container>
        <Board.Horizontal>
          <Board.Item onClick={() => setIsModalOpen(true)}>
            <h2>Criar novo quadro</h2>
          </Board.Item>
          {workspaces.map((workspace: any) => (
            <Link key={workspace.id} to={`/workspace/${workspace.id}`}>
              <Board.Item image={workspace.background}>
                <Board.Overlay>
                  <h2>{workspace.name}</h2>
                </Board.Overlay>
              </Board.Item>
            </Link>
          ))}
        </Board.Horizontal>
      </Board.Container>

      <Modal onHide={() => setIsModalOpen(false)} modalOpen={isModalOpen}>
        <Flex>
          <Formik initialValues={boardValues} onSubmit={createBoard}>
            {({ handleChange, values }) => (
              <>
                <Form.Horizontal>
                  <Form.Group>
                    <Form.Label htmlFor="board">
                      <Icon.Board />
                    </Form.Label>
                    <Form.Control
                      id="board"
                      type="text"
                      onChange={handleChange("name")}
                      placeholder="Board name"
                      value={values.name}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Label htmlFor="background">
                      <Icon.Image />
                    </Form.Label>
                    <Form.Control
                      id="background"
                      type="text"
                      placeholder="Background image"
                      onChange={handleChange("background")}
                      value={values.background}
                      disabled={isLoading}
                    />
                  </Form.Group>
                  <Form.Group>
                    <Form.Submit type="submit" disabled={isLoading}>
                      {isLoading ? (
                        <ThreeDots color="#fff" height={20} width={60} />
                      ) : (
                        "Criar quadro"
                      )}
                    </Form.Submit>
                  </Form.Group>
                </Form.Horizontal>
              </>
            )}
          </Formik>

          <img
            src="https://media.discordapp.net/attachments/1013165623188148234/1020764046041034853/20945830.png"
            alt=""
          />
        </Flex>
      </Modal>
    </>
  );
};

export default Boards;
