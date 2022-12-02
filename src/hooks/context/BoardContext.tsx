import { IBoard } from "../../interface/boardInterfaces";
import { createContext, useState, useEffect } from "react";
import data from "../../assets/data/data.json";

interface IContextProps {
  children: React.ReactNode;
}

// use createContext with type

const BoardContext = createContext<any>({});

const BoardContextProvider = ({ children }: IContextProps) => {
  const [board, setBoard] = useState<IBoard>(data);

  return (
    <BoardContext.Provider value={{ board, setBoard }}>
      {children}
    </BoardContext.Provider>
  );
};

export { BoardContext, BoardContextProvider };
