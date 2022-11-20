import { Form, Formik, FormikValues } from "formik";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import Task from "./Task";

interface ColumnProps {
  column: { id: string; title: string; taskIds: string[] };
  tasks: [];
  index: number;
  board: any;
  setBoard: Function;
}

const Column = ({ column, tasks, index, board, setBoard }: ColumnProps) => {
  const initialTaskValue = {
    title: "",
  };

  const handleSubmitTask = async (data: FormikValues) => {
    try {
      setBoard((prevState: any) => {
        const newTask = {
          id: Math.random().toString(36).substr(2, 9),
          title: data.title,
        };

        const newTaskIds = Array.from(column.taskIds);
        newTaskIds.push(newTask.id);

        const newColumn = {
          ...column,
          taskIds: newTaskIds,
        };

        const newState = {
          ...prevState,
          tasks: {
            ...prevState.tasks,
            [newTask.id]: newTask,
          },
          columns: {
            ...prevState.columns,
            [newColumn.id]: newColumn,
          },
        };

        return newState;
      });
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
      }

      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div className="board-column-height">
            <div
              className="board-column"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="board-column-title" {...provided.dragHandleProps}>
                {column.title}
              </div>
              <Droppable droppableId={column.id} type="task">
                {(provided) => (
                  <div
                    className="board-column-tasks"
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task: any, index: number) => (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        columnTitle={column.title}
                      />
                    ))}
                    {provided.placeholder}

                    <div className="board-task-create">
                      <div className="board-task-create-background">
                        <Formik
                          onSubmit={handleSubmitTask}
                          initialValues={initialTaskValue}
                        >
                          {({ handleChange, values }) => (
                            <Form className="form-create-board-item">
                              <input
                                type="text"
                                placeholder="Criar tarefa"
                                className="board-control"
                                onChange={handleChange("title")}
                                value={values.title}
                              />
                              <button className="board-submit" type="submit">
                                <BiPlus />
                              </button>
                            </Form>
                          )}
                        </Formik>
                      </div>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
