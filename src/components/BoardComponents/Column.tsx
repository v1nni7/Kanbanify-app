import { Draggable, Droppable } from "react-beautiful-dnd";
import { Formik, Form } from "formik";
import { BiPlus } from "react-icons/bi";

import Board from "../../assets/styles/Board";
import Task from "./Task";
import { useContext } from "react";
import { AuthContext } from "../../hooks/context/AuthContext";
import api from "../../services/api";
import { useParams } from "react-router-dom";

type ColumnPropsType = {
  index: number;
  column: any;
  tasks: any;
  loadingBoard: Function;
};

const Column = ({ column, tasks, index, loadingBoard }: ColumnPropsType) => {
  const { stringId } = useParams();
  const { user } = useContext<any>(AuthContext);

  const handleAddTask = async (data: any) => {
    try {
      const order = column.taskIds.length + 1;
      const response = await api.createTask(data, stringId, column.id, order);

      if (response.status === 201) {
        loadingBoard()
        console.log("Task created");
      }
    } catch (error) {}
  };

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
