import { SetStateAction, useCallback, useEffect, useState } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { IoCheckmarkSharp } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { ThreeCircles } from "react-loader-spinner";
import { initialData } from "../../pages/test/components/data";

import Column from "./Column";

interface TypeColumns {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

const DroppableArea = () => {
  const [board, setBoard] = useState<SetStateAction<TypeColumns> | any>(initialData);

  const { idWorkspace } = useParams();

  const loadingBoard = useCallback(async () => {
    /*try {
        const response = await api.getWorkspaceData(idWorkspace as string);

        setBoard(response.data);
    } catch (error) {
        console.log(error);
    } */
  }, [idWorkspace]);

  useEffect(() => {
    loadingBoard();
  }, [loadingBoard]);

  const [inputColumnValue, setInputColumnValue] =
    useState<string>("Nova coluna");

  const handleDragEnd: any = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      //console.log("Source: " + source)
      console.log(destination);
      console.log(draggableId);

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
    },
    [board]
  );

  const createNewColumn: any = (e: HTMLFormElement) => {
    e.preventDefault();
    const newInputValue = inputColumnValue.replace(/[" "]/g, "-").toLowerCase();

    const newBoardData = {
      tasks: {
        ...board.tasks,
      },
      columns: {
        ...board.columns,
        [newInputValue]: {
          id: newInputValue,
          title: inputColumnValue,
          taskIds: [],
        },
      },
      columnOrder: [...board.columnOrder, newInputValue],
    };

    setBoard(newBoardData);
    setInputColumnValue("Nova coluna");
  };

  return (
    <>
      {board ? (
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
                  {board.columnOrder.map((columnId: any, index: number) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(
                      (taskId: number) => board.tasks[taskId]
                    );

                    return (
                      <Column
                        key={column.id}
                        column={column}
                        tasks={tasks}
                        index={index}
                        board={board}
                        setBoard={setBoard}
                      />
                    );
                  })}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </DragDropContext>
          <div className="board-create-column">
            <form onSubmit={createNewColumn}>
              <input
                type="text"
                value={inputColumnValue}
                onChange={(e) => setInputColumnValue(e.target.value)}
              />
              <button type="submit" className="btn-submit">
                <IoCheckmarkSharp />
              </button>
            </form>
          </div>
        </>
      ) : (
        <div className="loading">
          <ThreeCircles
            height="100"
            width="100"
            color="#7e57c2"
            wrapperStyle={{}}
            wrapperClass=""
            visible={true}
            ariaLabel="three-circles-rotating"
            outerCircleColor=""
            innerCircleColor=""
            middleCircleColor=""
          />
        </div>
      )}
    </>
  );
};

export default DroppableArea;
