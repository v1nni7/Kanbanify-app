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
  kanban: BoardData;
  setKanban: (kanban: BoardData) => void;
  updateBoard: (kanban: BoardData) => void;
  handleDragEnd: (data: any) => void;
};

type BoardContextProviderProps = {
  children: React.ReactNode;
};

export const KanbanContext = createContext({} as BoardContextType);

export default function KanbanContextProvider({
  children,
}: BoardContextProviderProps) {
  const [kanban, setKanban] = useState({
    tasks: {},
    columns: {},
    columnOrder: [],
    url: "",
    isLoading: true,
  } as BoardData);

  const updateBoard = async (kanban: any) => {
    try {
      const response = await updateBoardRequest(kanban, kanban.url);

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
        const newColumnOrder = Array.from(kanban.columnOrder);
        newColumnOrder.splice(source.index, 1);
        newColumnOrder.splice(destination.index, 0, draggableId);

        const newState = {
          ...kanban,
          columnOrder: newColumnOrder,
        };

        setKanban(newState);
        updateBoard(newState);
        return;
      }

      const start = kanban?.columns[source.droppableId];
      const finish = kanban?.columns[destination.droppableId];

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds);
        newTaskIds.splice(source.index, 1);
        newTaskIds.splice(destination.index, 0, draggableId);

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        };

        const newBoardData: any = {
          ...kanban,
          columns: {
            ...kanban?.columns,
            [newColumn.id]: newColumn,
          },
        };

        setKanban(newBoardData);
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
        ...kanban,
        columns: {
          ...kanban?.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      };

      setKanban(newState);
      updateBoard(newState);
    },
    [kanban]
  );

  return (
    <KanbanContext.Provider value={{ kanban, setKanban, updateBoard, handleDragEnd }}>
      {children}
    </KanbanContext.Provider>
  );
}
