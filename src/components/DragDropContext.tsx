import { Dispatch, ReactNode, useCallback, useContext, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import Board from "../assets/styles/Board";
import { BoardContext } from "../hooks/context/BoardContext";
import useStorage from "../hooks/useStorage";
import { IBoard } from "../interface/boardInterfaces";
import InputCreate from "./Board/InputCreate";
import Column from "./BoardComponents/Column";

interface IDragDropProps {
  children: ReactNode | any;
}

interface IFunctionProps {
  board: IBoard;
  setBoard: Dispatch<React.SetStateAction<IBoard>>;
}

const DragDropComponent = ({ children }: IDragDropProps) => {
  const { board, setBoard }: IFunctionProps = useContext(BoardContext);

  const { getStorage, saveStorage } = useStorage();

  const { boardId }: any = useParams();

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
        saveStorage(boardId, newState);
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
        saveStorage(boardId, newBoardData);
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
      saveStorage(boardId, newState);
    },
    [board]
  );

  return (
    <DragDropContext onDragEnd={handleDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {({ droppableProps, innerRef, placeholder }) => (
          <div className="board-content" {...droppableProps} ref={innerRef}>
            {board.columnOrder.map((columnId: string, index: number) => {
              const column = board.columns[columnId];
              const tasks = column.taskIds.map((taskId) => board.tasks[taskId]);

              return children({ column, tasks, index });
            })}
            {placeholder}

            <InputCreate type="column" columnId="newColumn" />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

export default DragDropComponent;
