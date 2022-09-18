import { useCallback, useEffect, useState, SetStateAction } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { useParams } from "react-router-dom";
import { BiCheck } from "react-icons/bi";

import Column from "../components/BoardComponents/Column";
import { initialData } from "./test/components/data";
import Board from "../assets/styles/Board";
import { Form, Formik } from "formik";

type BoardType = {
  tasks: object;
  columns: object;
  columnOrder: TemplateStringsArray;
};

const BoardPage = () => {
  const { stringId } = useParams();
  const [board, setBoard] = useState<SetStateAction<BoardType> | any>(
    initialData
  );

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

  const handleAddColumn = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

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
            <Board.Create>
              <Formik
                initialValues={{ nameOfColumn: "New column" }}
                onSubmit={handleAddColumn}
              >
                {({ handleChange, values }) => (
                  <Form>
                    <input
                      type="text"
                      onChange={handleChange("nameOfColumn")}
                      value={values.nameOfColumn}
                    />
                    <button type="submit">
                      <BiCheck />
                    </button>
                  </Form>
                )}
              </Formik>
            </Board.Create>
          </>
        ) : (
          "Carregando..."
        )}
      </Board.Container>
    </>
  );
};

export default BoardPage;
