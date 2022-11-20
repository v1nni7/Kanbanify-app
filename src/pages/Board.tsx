import { Formik, FormikValues, Form } from "formik";
import { useCallback, useState, SetStateAction, useEffect } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import Column from "../components/BoardComponents/Column";

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
      console.log(destination);

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
        const newBoarData = { ...oldBoardData, [boardId]: newState };
        localStorage.setItem("boards", JSON.stringify(newBoarData));
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

  useEffect(() => {
    const board = JSON.parse(localStorage.getItem("boards") as any)[boardId];
    if(board) {
      setBoard(board);
    }
  }, []);

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
                {board.columnOrder.length > 0 ? (
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
                    initialValues={initialColumnValues}
                    onSubmit={handleSubmitColumn}
                  >
                    {({ handleChange, values }) => (
                      <Form className="form-create-board-item">
                        <input
                          type="text"
                          className="board-control"
                          placeholder="Criar coluna"
                          onChange={handleChange("columnTitle")}
                          value={values.columnTitle}
                        />
                        <button type="submit" className="board-submit">
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
