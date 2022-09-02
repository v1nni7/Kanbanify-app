import {
  createContext,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { initialData } from "../../pages/test/components/data";
import api from "../../services/api";

export const BoardContext: any = createContext(null);

const BoardContextProvider = ({ children }: any) => {

  const [inputColumnValue, setInputColumnValue] =
    useState<string>("Adicionar coluna");

  return (
    <>
      <BoardContext.Provider
        value={{
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
