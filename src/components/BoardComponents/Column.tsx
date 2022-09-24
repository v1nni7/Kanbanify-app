import { Draggable, Droppable } from "react-beautiful-dnd";
import { useCallback } from "react";
import { Formik, Form } from "formik";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";

import Task from "./Task";
import Board from "../../assets/styles/Board";
import boardServices from "../../services/boardServices";

type ColumnPropsType = {
  tasks: any;
  column: any;
  index: number;
  board: any;
  setBoard: any;
};

const Column = ({ column, tasks, index, board, setBoard }: ColumnPropsType) => {
  const { boardId } = useParams();

  const handleAddTask = useCallback(
    async (data: any) => {
      try {
        const response = await boardServices.createTask({
          ...data,
          boardId,
          columnId: column.uuid,
          order: tasks.length !== 0 ? tasks.length + 1 : 1,
        });

        if (response.status === 201) {
          const newBoard = { ...board };
          newBoard.tasks[response.data.uuid] = response.data;
          newBoard.columns[column.uuid].taskIds.push(response.data.uuid);
          setBoard(newBoard);
        }
      } catch (error) {
        console.log(error);
      }
    },
    [board]
  );

  return (
    <>
      <Draggable draggableId={column.uuid} index={index}>
        {(provided) => (
          <Board.ColumnHeight>
            <Board.Column {...provided.draggableProps} ref={provided.innerRef}>
              <Board.Title {...provided.dragHandleProps}>
                {column.title}
              </Board.Title>
              <Droppable droppableId={column.uuid} type="task">
                {(provided) => (
                  <Board.TaskList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task: any, index: number) => (
                      <Task
                        key={index}
                        task={task}
                        index={index}
                        columnTitle={column.title}
                      />
                    ))}
                    {provided.placeholder}
                  </Board.TaskList>
                )}
              </Droppable>
              <Board.Create createTask={true}>
                <Formik
                  initialValues={{ title: "Add tasks" }}
                  onSubmit={handleAddTask}
                >
                  {({ handleChange, values }) => (
                    <Form>
                      <input
                        type="text"
                        value={values.title}
                        onChange={handleChange("title")}
                      />
                      <button type="submit">
                        <BiPlus />
                      </button>
                    </Form>
                  )}
                </Formik>
              </Board.Create>
            </Board.Column>
          </Board.ColumnHeight>
        )}
      </Draggable>
    </>
  );
};

export default Column;
