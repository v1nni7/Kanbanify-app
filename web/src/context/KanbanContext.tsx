"use client";

import { createContext, useCallback, useState } from "react";

type BoardContextProviderProps = {
  children: React.ReactNode;
};

export const KanbanContext = createContext({} as any);

export default function KanbanContextProvider({
  children,
}: BoardContextProviderProps) {
  const [kanban, setKanban] = useState<any>(null);

  const updateBoard = async (kanban: any) => {
    try {
      // const response = await updateKanbanRequest(kanban);

      // if (response.status === 200) {
      //   return;
      // }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDragEnd = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      if (!kanban) {
        return;
      }

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
    <KanbanContext.Provider
      value={{ kanban, setKanban, updateBoard, handleDragEnd }}
    >
      {children}
    </KanbanContext.Provider>
  );
}
