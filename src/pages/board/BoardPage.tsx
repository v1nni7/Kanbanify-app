import { useContext } from "react";
import Board from "../../components/Board/Board";
import { BoardContext } from "../../hooks/context/BoardContext";

import "./styles.scss";

const BoardPage = () => {
  const { setBoard } = useContext(BoardContext);

  const handleClearStorage = () => {
    localStorage.clear();
    setBoard({
      tasks: {},
      columns: {},
      columnOrder: [],
    });
  };

  return (
    <>
      <div className="flex clear-button">
        <button type="button" onClick={handleClearStorage}>Limpar</button>
      </div>
      <div className="workspace">
        <Board />
      </div>
    </>
  );
};

export default BoardPage;
