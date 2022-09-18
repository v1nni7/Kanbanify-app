import { Draggable, Droppable } from "react-beautiful-dnd";
import { Formik, Form } from "formik";
import { BiPlus } from "react-icons/bi";

import Board from "../../assets/styles/Board";
import Task from "./Task";

type ColumnPropsType = {
  index: number;
  column: { id: string; title: string; taskIds: string[] };
  tasks: {
    id: string;
    content: string;
    isAction: boolean;
    column: string;
    totalCheckbox: number;
    completedCheckbox: number;
  }[];
};

const Column = ({ column, tasks, index }: ColumnPropsType) => {
  const handleAddTask = (data: any) => {
    try {
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <Board.ColumnHeight>
            <Board.Column {...provided.draggableProps} ref={provided.innerRef}>
              <Board.Title {...provided.dragHandleProps}>
                {column.title}
              </Board.Title>
              <Droppable droppableId={column.id} type="task">
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
                  initialValues={{ nameOfTask: "Add tasks" }}
                  onSubmit={handleAddTask}
                >
                  {({ handleChange, values }) => (
                    <Form>
                      <input
                        type="text"
                        onChange={handleChange("nameOfColumn")}
                        value={values.nameOfTask}
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
