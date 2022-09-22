import { Draggable, Droppable } from "react-beautiful-dnd";
import { useCallback } from "react";
import { Formik, Form } from "formik";
import { BiPlus } from "react-icons/bi";
import { useParams } from "react-router-dom";

import Task from "./Task";
import Board from "../../assets/styles/Board";

type ColumnPropsType = {
  tasks: any;
  column: any;
  index: number;
};

const Column = ({ column, tasks, index }: ColumnPropsType) => {
  const { stringId } = useParams();

  const handleAddTask = useCallback(() => {}, []);

  return (
    <>
      <Draggable draggableId={column.stringId} index={index}>
        {(provided) => (
          <Board.ColumnHeight>
            <Board.Column {...provided.draggableProps} ref={provided.innerRef}>
              <Board.Title {...provided.dragHandleProps}>
                {column.title}
              </Board.Title>
              <Droppable droppableId={column.stringId} type="task">
                {(provided) => (
                  <Board.TaskList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task: any, index: number) => (
                      <Task
                        key={task.id}
                        index={index}
                        task={task}
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
