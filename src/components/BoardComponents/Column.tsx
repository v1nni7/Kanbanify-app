import { Form, Formik, FormikValues } from "formik";
import React, { FocusEventHandler } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiCheck, BiPlus, BiX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { string, ValidationError } from "yup";
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

  const { boardId }: any = useParams();

  const handleSubmitTask = async (data: FormikValues) => {
    try {
      const newTask = {
        id: Math.random().toString(36).substr(2, 9),
        title: data.title,
        info: {
          description: "",
          date: "",
          time: "",
        },
      };

      const newTasks = { ...board.tasks, [newTask.id]: newTask };

      const newColumn = {
        ...board.columns[column.id],
        taskIds: [...board.columns[column.id].taskIds, newTask.id],
      };

      const newColumns = { ...board.columns, [newColumn.id]: newColumn };

      const newState = {
        ...board,
        tasks: newTasks,
        columns: newColumns,
      };

      setBoard(newState);

      const oldBoard = JSON.parse(localStorage.getItem("boards") as any);
      const newBoard = { ...oldBoard, [boardId]: newState };
      localStorage.setItem("boards", JSON.stringify(newBoard));
    } catch (error: any) {
      if (error instanceof ValidationError) {
        toast.error(error.message);
      }

      if (error.response) {
        toast.error(error.response.data.message);
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== "Enter") {
      return;
    }

    e.target.blur();
    handleEditColumn(e);
  };

  const handleEditColumn = (
    event:
      | React.KeyboardEvent<HTMLInputElement>
      | React.FocusEvent<HTMLInputElement>
  ) => {
    try {
      const columnTitle: string = event.target.value;

      const newColumn = {
        ...board.columns[column.id],
        title: columnTitle,
      };

      const newColumns = { ...board.columns, [newColumn.id]: newColumn };

      const newState = {
        ...board,
        columns: newColumns,
      };

      setBoard(newState);
      const oldBoardData = JSON.parse(localStorage.getItem("boards") as any);
      const newBoard = { ...oldBoardData, [boardId]: newState };
      localStorage.setItem("boards", JSON.stringify(newBoard));
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
                <input
                  type="text"
                  autoComplete="off"
                  id="edit-column-title"
                  className="column-title-input"
                  defaultValue={column.title}
                  onBlur={handleEditColumn}
                  onKeyDown={handleKeyDown}
                />
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
                              <button
                                className="btn-board-submit"
                                type="submit"
                              >
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
