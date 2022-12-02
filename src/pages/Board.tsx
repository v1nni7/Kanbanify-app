import { useCallback, useState, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiX } from "react-icons/bi";
import { Params, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import Column from "../components/BoardComponents/Column";
import { IBoard } from "../interface/boardInterfaces";
import { Form, Formik, Field, FormikValues } from "formik";
import useStorage from "../hooks/useStorage";

interface IAddColumn {
  resetForm: () => void;
}

const BoardPage = () => {
  const { boardId }: Readonly<Params<string> | any> = useParams();

  const { getStorage, saveStorage } = useStorage();

  const [board, setBoard] = useState<IBoard>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  console.log(board)

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

  const handleAddColumn = useCallback(
    async (values: FormikValues, { resetForm }: IAddColumn) => {
      try {
        const newColumn = {
          id: Math.random().toString(36).substring(2, 9),
          title: values.newTitle,
          taskIds: [],
        };

        const newBoard = {
          ...board,
          columns: {
            ...board?.columns,
            [newColumn.id]: newColumn,
          },
          columnOrder: [...board?.columnOrder, newColumn.id],
        };

        setBoard(newBoard);
        saveStorage(boardId, newBoard);

        resetForm();
      } catch (error) {}
    },
    [board]
  );

  const loadingBoard = useCallback(() => {
    try {
      const boardStorage = JSON.parse(localStorage.getItem("boards") as any)[
        boardId
      ];

      if (boardStorage) {
        setBoard(boardStorage);
      }
    } catch (error) {
      toast.success("Carregando quadro...");
    }
  }, []);

  useEffect(() => {
    loadingBoard();
  }, [loadingBoard]);

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
                {board.columnOrder.map((columnId: string, index: number) => {
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
                })}
                {provided.placeholder}

                <div className="column">
                  <Formik
                    enableReinitialize
                    onSubmit={handleAddColumn}
                    initialValues={{ newTitle: "" }}
                  >
                    {({ handleChange, handleBlur, values, resetForm }) => (
                      <Form
                        className={`column-container container-flex container-sm ${
                          values.newTitle ? "show" : "hidden close-anim"
                        }`}
                      >
                        <Field
                          type="text"
                          id="new-column"
                          autoComplete="off"
                          className="column-input-create"
                          placeholder="Adicionar nova coluna"
                          onBlur={handleBlur("newTitle")}
                          onChange={handleChange("newTitle")}
                          value={values.newTitle}
                        />
                        <div className="form-actions">
                          <button type="submit" className="btn-create">
                            Adicionar coluna
                          </button>
                          <button
                            type="button"
                            className="btn-cancel"
                            onClick={() => resetForm()}
                          >
                            <BiX />
                          </button>
                        </div>
                      </Form>
                    )}
                  </Formik>
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
