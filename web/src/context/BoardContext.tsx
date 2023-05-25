"use client";

import { updateBoardRequest } from "@/services/board";
import { createContext, useCallback, useState } from "react";

type TaskData = {
  [key: string]: {
    id: string;
    title: string;
    totalCheckbox: number;
    completedCheckbox: number;
  };
};

type ColumnData = {
  [key: string]: {
    id: string;
    title: string;
    taskIds: string[];
  };
};

type BoardData = {
  tasks: TaskData;
  columns: ColumnData;
  columnOrder: string[];
  isLoading: boolean;
};

type BoardContextType = {
  board: BoardData;
  setBoard: (board: BoardData) => void;
  updateBoard: (board: BoardData) => void;
  handleDragEnd: (data: any) => void;
};

type BoardContextProviderProps = {
  children: React.ReactNode;
};

export const BoardContext = createContext({} as BoardContextType);

export default function BoardContextProvider({
  children,
}: BoardContextProviderProps) {
  const [board, setBoard] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
    url: "",
    isLoading: true,
  } as BoardData);

  const updateBoard = async (board: any) => {
    try {
      const response = await updateBoardRequest(board, board.url);

      if (response.status === 200) {
        return;
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      if (!destination) {
        return;
      }

      if (
        destination.droppableId === source.droppbleId &&
        destination.index === source.index
      ) {
        return;
      }

      if (type === "column") {
        const newColumnOrder = Array.from(board.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...board,
          columnOrder: newColumnOrder,
        };

        setBoard(newState);
        updateBoard(newState);
        return;
      }

      const start = board?.columns[source.droppableId];
      const finish = board?.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newBoardData: any = {
          ...board,
          columns: {
            ...board?.columns,
            [newColumn.id]: newColumn,
          },
        };

        setBoard(newBoardData);
        updateBoard(newBoardData);
        return;
      }

      // Movendo de uma lista para outra
      const startTaskIds = Array.from(start.taskIds);
      startTaskIds.splice(source.index, 1);
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      };

      const finishTaskIds = Array.from(finish.taskIds);
      finishTaskIds.splice(destination.index, 0, draggableId);
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      };

      const newState = {
        ...board,
        columns: {
          ...board?.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setBoard(newState);
      updateBoard(newState);
    },
    [board]
  );

  return (
    <BoardContext.Provider value={{ board, setBoard, updateBoard, handleDragEnd }}>
      {children}
    </BoardContext.Provider>
  );
}
