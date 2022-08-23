import Board from "./components/Board";
import { useNavigate } from "react-router-dom";

import "./styles.scss";

const Test = () => {
  let navigate = useNavigate();

  return (
    <>
      <div className="flex wrap-remove-storage">
        <button
          onClick={() => {
            localStorage.clear();
            navigate(0);
          }}
        >
          Limpar
        </button>
      </div>
      <section className="test-section">
        <Board />
      </section>
    </>
  );
};

export default Test;
