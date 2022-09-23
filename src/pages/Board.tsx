import { useCallback, useState, SetStateAction, useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";
import { Form, Formik } from "formik";

import Board from "../assets/styles/Board";
import Column from "../components/BoardComponents/Column";
import { AuthContext } from "../hooks/context/AuthContext";
import boardServices from "../services/boardServices";

type BoardType = {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
};

const BoardPage = () => {
  const { boardId } = useParams();
  const { user } = useContext<any>(AuthContext);
  const [board, setBoard] = useState<SetStateAction<BoardType> | any>({
    tasks: {},
    columns: {},
    columnOrder: [],
  });

  console.log(board);

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
            [newColumn.stringId]: newColumn,
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
          [newStart.stringId]: newStart,
          [newFinish.stringId]: newFinish,
        },
      };

      setBoard(newState);
    },
    [board]
  );

  const handleAddColumn = useCallback(
    async (data: any) => {
      try {
        const response = await boardServices.createColumn({
          ...data,
          boardId,
          order: board.columnsOrder ? board.columnsOrder.length + 1 : 0,
        });

        if (response.status === 201) {
          setBoard({
            ...board,
            columns: {
              ...board.columns,
              [response.data.stringId]: response.data,
            },
            columnOrder: [...board.columnOrder, response.data.stringId],
          });
        }
      } catch (error) {
        console.log(error);
      }
    },
    [board]
  );

  return (
    <>
      <Board.Container>
        {board ? (
          <>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable
                droppableId="all-columns"
                direction="horizontal"
                type="column"
              >
                {(provided) => (
                  <Board.ColumnContainer
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {board.columnOrder.map((columnId: any, index: any) => {
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
                        />
                      );
                    })}
                    {provided.placeholder}
                  </Board.ColumnContainer>
                )}
              </Droppable>
            </DragDropContext>
          </>
        ) : (
          <></>
        )}
        <Board.Create>
          <Formik
            enableReinitialize
            initialValues={{ title: "New column" }}
            onSubmit={handleAddColumn}
          >
            {({ handleChange, values }) => (
              <Form>
                <input
                  type="text"
                  onChange={handleChange("title")}
                  value={values.title}
                />
                <button type="submit">
                  <BiCheck />
                </button>
              </Form>
            )}
          </Formik>
        </Board.Create>
      </Board.Container>
    </>
  );
};

export default BoardPage;
