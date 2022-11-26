import { Formik, FormikValues, Form } from "formik";
import { useCallback, useState, SetStateAction, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import Column from "../components/BoardComponents/Column";
import data from "../assets/data/data.json";
import { IBoard } from "../interface/boardInterfaces";

interface BoardType {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

const BoardPage = () => {
  const { boardId }: any = useParams();
  const [board, setBoard] = useState<IBoard>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  console.log(board);

  const [newTitle, setNewTitle] = useState("");

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
        const oldBoardData = JSON.parse(localStorage.getItem("boards") as any);
        const newBoard = { ...oldBoardData, [boardId]: newState };
        localStorage.setItem("boards", JSON.stringify(newBoard));
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
        const oldBoardData = JSON.parse(localStorage.getItem("boards") as any);
        const newBoard = { ...oldBoardData, [boardId]: newBoardData };
        localStorage.setItem("boards", JSON.stringify(newBoard));
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
      const oldBoardData = JSON.parse(localStorage.getItem("boards") as any);
      const newBoard = { ...oldBoardData, [boardId]: newState };
      localStorage.setItem("boards", JSON.stringify(newBoard));
    },
    [board]
  );

  const handleAddColumn = useCallback(async () => {}, []);

  useEffect(() => {
    setBoard(data);
  }, []);

  return (
    <>
      <main className="board-screen-wrapper">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="board-content"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columnOrder ? (
                  board.columnOrder.map((columnId: string, index: number) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(
                      (taskId) => board.tasks[taskId]
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
                  })
                ) : (
                  <></>
                )}
                {provided.placeholder}

                <div className="column">
                  <div className="column-container flex-center container-sm">
                    <input
                      type="text"
                      className="column-input-create"
                      placeholder="+ Adicionar nova coluna"
                      onChange={(e) => setNewTitle(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
        <aside></aside>
      </main>
    </>
  );
};

export default BoardPage;
