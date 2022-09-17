import { useContext, useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";
import Board from "../assets/styles/Board";
import { AuthContext } from "../hooks/context/AuthContext";

const Boards = () => {
  const { user } = useContext<any>(AuthContext);

  const [workspaces, setWorkspaces] = useState<any>([]);

  const getUserBoards = useCallback(async () => {
    try {
      if (!user.token) {
        return;
      }

      const headers = { headers: { Authorization: `Bearer ${user.token}` } };

      const response = await api.getWorkspaces(headers);

      if (response.status === 200) {
        setWorkspaces(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }, [user.token]);

  useEffect(() => {
    getUserBoards();
  }, [getUserBoards, user.token]);

  return (
    <>
      <Board.Container>
        <Board.Horizontal>
          <Board.Item>
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
    </>
  );
};

export default Boards;
