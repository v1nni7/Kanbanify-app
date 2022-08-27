import { createContext, SetStateAction, useEffect, useState } from "react";

interface TypeColumns {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

export const BoardContext: any = createContext(null);

const BoardContextProvider = ({ children }: any) => {
  const [url, setUrl] = useState();
  console.log(url);

  const [board, setBoard] = useState<SetStateAction<TypeColumns> | any>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });
  const [inputColumnValue, setInputColumnValue] =
    useState<string>("Adicionar coluna");

  useEffect(() => {
    const getBoardStorage = JSON.parse(localStorage.getItem(`${url}`) as any);
    if (!getBoardStorage) {
      return;
    }
    setBoard(getBoardStorage);
  }, [url]);

  return (
    <>
      <BoardContext.Provider
        value={{
          board,
          setUrl,
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
