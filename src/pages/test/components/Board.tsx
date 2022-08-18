import { SetStateAction, useCallback, useEffect, useState } from "react";
import { ThreeCircles } from "react-loader-spinner";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { initialData } from "./data";

import Column from "./Column";

interface TypeColumns {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

const DroppableArea = () => {
  const [board, setBoard] = useState<SetStateAction<TypeColumns> | any>();

  const handleDragEnd: any = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      // Reorganizar as colunas
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
        localStorage.setItem("board", JSON.stringify(newState));
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
        localStorage.setItem("board", JSON.stringify(newBoardData));
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
      localStorage.setItem("board", JSON.stringify(newState));
    },
    [board]
  );

  useEffect(() => {
    setBoard(initialData);
  }, []);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {(provided) => (
            <div
              className="flex"
              {...provided.droppableProps}
              ref={provided.innerRef}
            >
              {board ? (
                board?.columnOrder.map((columnId: number, index: number) => {
                  const column = board.columns[columnId];
                  const tasks = column.taskIds.map(
                    (tasksId: number) => board.tasks[tasksId]
                  );

                  return (
                    <Column
                      key={index}
                      column={column}
                      tasks={tasks}
                      index={index}
                      board={board}
                      setBoard={setBoard}
                    />
                  );
                })
              ) : (
                <div className="modal-load">
                  <ThreeCircles height={80} width={80} color="#7e57c2" />
                </div>
              )}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
};

export default DroppableArea;
