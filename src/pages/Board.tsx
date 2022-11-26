import { Formik, FormikValues, Form } from "formik";
import { useCallback, useState, SetStateAction, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import Column from "../components/BoardComponents/Column";
import dataJson from "../assets/data/data.json";

interface BoardType {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
}

const BoardPage = () => {
  const { boardId }: any = useParams();
  const [board, setBoard] = useState<SetStateAction<BoardType> | any>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  const handleDragEnd: any = useCallback(
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

  const initialColumnValues = {
    columnTitle: "",
  };

  const handleSubmitColumn = useCallback(
    async (data: FormikValues) => {
      try {
        const newColumn = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.columnTitle,
          taskIds: [],
        };

        const newColumnOrder = Array.from(board.columnOrder);
        newColumnOrder.push(newColumn.id);

        const newState = {
          ...board,
          columns: {
            ...board.columns,
            [newColumn.id]: newColumn,
          },
          columnOrder: newColumnOrder,
        };

        setBoard(newState);

        const oldBoardData = JSON.parse(localStorage.getItem("boards") as any);
        const newBoardData = { ...oldBoardData, [boardId]: newState };
        localStorage.setItem("boards", JSON.stringify(newBoardData));
      } catch (error: any) {
        if (error instanceof ValidationError) {
          toast.error(error.message);
        }

        if (error.response) {
          toast.error(error.response.data.message);
        }
      }
    },
    [board]
  );

  const loadingEmptyBoard = useCallback(() => {
    try {
      /* const boardStorage = JSON.parse(localStorage.getItem("boards") as any);
      if (boardStorage[boardId]) {
        setBoard(boardStorage[boardId]);
      } */
      setBoard(dataJson)
    } catch (error) {
      return error;
    }
  }, []);

  useEffect(() => {
    loadingEmptyBoard();
  }, [loadingEmptyBoard]);

  return (
    <>
      <section className="board">
        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {(provided) => (
              <div
                className="board-column-container"
                {...provided.droppableProps}
                ref={provided.innerRef}
              >
                {board.columnOrder ? (
                  board.columnOrder.map((columnId: any, index: number) => {
                    const column = board.columns[columnId];
                    const tasks = column.taskIds.map(
                      (taskId: any) => board.tasks[taskId]
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

                <div className="board-column-create">
                  <Formik
                    enableReinitialize
                    initialValues={initialColumnValues}
                    onSubmit={handleSubmitColumn}
                  >
                    {({
                      handleChange,
                      values,
                      isSubmitting,
                      resetForm,
                      submitForm,
                    }) => (
                      <Form className="form-create-board-item">
                        <input
                          type="text"
                          className="board-control"
                          placeholder="Criar coluna"
                          onChange={handleChange("columnTitle")}
                          value={values.columnTitle}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            resetForm();
                            submitForm();
                          }}
                          className="btn-board-submit"
                        >
                          <BiPlus />
                        </button>
                      </Form>
                    )}
                  </Formik>
                </div>
              </div>
            )}
          </Droppable>
        </DragDropContext>
      </section>
    </>
  );
};

export default BoardPage;
