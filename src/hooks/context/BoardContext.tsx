import { createContext, SetStateAction, useEffect, useState } from "react";

interface TypeColumns {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

export const BoardContext: any = createContext(null);

const BoardContextProvider = ({ children }: any) => {
  const [board, setBoard] = useState<SetStateAction<TypeColumns> | any>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });
  const [inputColumnValue, setInputColumnValue] =
    useState<string>("Adicionar coluna");

  const getBoardStorage = JSON.parse(localStorage.getItem("board-1") as any);

  useEffect(() => {
    if (!getBoardStorage) {
      return;
    }
    setBoard(getBoardStorage);
  }, []);

  return (
    <>
      <BoardContext.Provider
        value={{
          board,
          setBoard,
          inputColumnValue,
          setInputColumnValue,
        }}
      >
        {children}
      </BoardContext.Provider>
    </>
  );
};

export default BoardContextProvider;
