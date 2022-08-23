import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Board from "../../components/Board/Board";

import "./styles.scss";

const BoardPage = () => {
  let navigate = useNavigate();

  const handleClearStorage = () => {
    localStorage.clear();
    navigate(0);
  };

  return (
    <>
      <div className="flex clear-button">
        <button onClick={handleClearStorage}>Limpar</button>
      </div>
      <div className="workspace">
        <Board />
      </div>
    </>
  );
};

export default BoardPage;
