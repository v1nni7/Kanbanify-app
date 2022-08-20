import { createContext, SetStateAction, useState } from "react";

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
  const [inputTaskValue, setInputTaskValue] = useState<string>("Adicionar tarefa");
  const [inputColumnValue, setInputColumnValue] = useState<string>("Adicionar coluna");

  return (
    <>
      <BoardContext.Provider
        value={{
          board,
          setBoard,
          inputTaskValue,
          setInputTaskValue,
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
