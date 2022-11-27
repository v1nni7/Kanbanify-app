import { useState, useEffect } from "react";
import { IBoard } from "../interface/boardInterfaces";

const useStorage = () => {
  const getStorage = async (boardId: string) => {
    const boardStorage = JSON.parse(localStorage.getItem("boards") as string)[
      boardId
    ];

    return boardStorage;
  };

  const saveStorage = async (boardId: string, newState: IBoard) => {
    const oldState = JSON.parse(localStorage.getItem("boards") as string);

    const newStateStorage = {
      ...oldState,
      [boardId]: newState,
    };

    localStorage.setItem("boards", JSON.stringify(newStateStorage));
  };

  return { getStorage, saveStorage };
};

export default useStorage;
