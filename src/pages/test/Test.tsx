import { useContext, useEffect } from "react";
import { BoardContext } from "../../hooks/context/BoardContext/BoardContext";
import Board from "./components/Board";

import "./styles.scss";

const Test = () => {
  return (
    <>
      <section className="test-section">
        <Board />
      </section>
    </>
  );
};

export default Test;
