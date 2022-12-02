import { Field, Form, Formik, FormikValues } from "formik";
import { useCallback, useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiCheck, BiPlus, BiX } from "react-icons/bi";
import { TailSpin } from "react-loader-spinner";
import { Params, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { string, ValidationError } from "yup";
import useStorage from "../../hooks/useStorage";
import { IColumnProps } from "../../interface/boardInterfaces";
import Modal from "../Modal";
import Task from "./Task";

interface IAddTask {
  resetForm: () => void;
}

const Column = ({ column, tasks, index, board, setBoard }: IColumnProps) => {
  const { boardId }: Readonly<Params<string> | any> = useParams();
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [taskModal, setTaskModal] = useState<any>(null);

  const { saveStorage } = useStorage();

  const handleKeyPress = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      e.preventDefault();
      if (e.key !== "Enter") {
        return;
      }

      e.target.blur();
      handleEditColumn(column.id, e.target.value);
    },
    [column.id]
  );

  const handleEditColumn = useCallback(
    (columnId: string, title: string) => {
      try {
        const newBoardData = {
          ...board,
          columns: {
            ...board?.columns,
            [columnId]: {
              ...board?.columns[columnId],
              title,
            },
          },
        };

        setBoard(newBoardData);
        saveStorage(boardId, newBoardData);
      } catch (error) {
        toast.error("Não foi possível editar a coluna");
      }
    },
    [board]
  );

  const handleAddTask = useCallback(
    (values: FormikValues, { resetForm }: IAddTask) => {
      try {
        const newTask = {
          id: Math.random().toString(36).substring(2, 9),
          title: values.newTitle,
          totalCheckbox: 0,
          completedCheckbox: 0,
          display: {
            description: "",
            date: "",
            time: "",
            tags: [],
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
        saveStorage(boardId, newState);

        resetForm();
      } catch (error: any) {
        console.log(error);
      }
    },
    [boardId, board, column, setBoard, tasks]
  );

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <div className="column">
            <div
              className="column-container"
              {...provided.draggableProps}
              ref={provided.innerRef}
            >
              <div className="column-title" {...provided.dragHandleProps}>
                <input
                  type="text"
                  autoComplete="off"
                  id="edit-column-title"
                  className="column-title-editable"
                  defaultValue={column.title}
                  onKeyUp={handleKeyPress}
                  onBlur={(e) => handleEditColumn(column.id, e.target.value)}
                />
              </div>
              <Droppable droppableId={column.id} type="task">
                {(provided) => (
                  <div {...provided.droppableProps} ref={provided.innerRef}>
                    {tasks.map((task: any, index: number) => (
                      <Task
                        key={task.id}
                        task={task}
                        index={index}
                        setModalOpen={setModalOpen}
                        setTaskModal={setTaskModal}
                      />
                    ))}
                    {provided.placeholder}

                    <div className="task">
                      <Formik
                        enableReinitialize
                        onSubmit={handleAddTask}
                        initialValues={{ newTitle: "" }}
                      >
                        {({ handleChange, values, resetForm }) => (
                          <Form
                            className={`task-container ${
                              values.newTitle ? "show" : "hidden"
                            }`}
                          >
                            <Field
                              id="new-task"
                              autoComplete="off"
                              className="task-input-create"
                              value={values.newTitle}
                              placeholder="Adicionar nova tarefa"
                              onChange={handleChange("newTitle")}
                            />
                            <div className="form-actions">
                              <button type="submit" className="btn-create">
                                Adicionar tarefa
                              </button>
                              <button
                                type="button"
                                className="btn-cancel"
                                onClick={() => resetForm()}
                              >
                                <BiPlus />
                              </button>
                            </div>
                          </Form>
                        )}
                      </Formik>
                    </div>
                  </div>
                )}
              </Droppable>
            </div>
          </div>
        )}
      </Draggable>
      <Modal isModalLarge modalOpen={modalOpen} setModalOpen={setModalOpen}>
        {taskModal ? (
          <>
            <div className="modal-header">{taskModal?.title}</div>
            <div className="modal-body">
              <div className="modal-wrap-input">
                <label htmlFor="">Adicione uma descrição</label>
                <textarea name="" id="description"></textarea>
              </div>
            </div>
            <div className="modal-footer"></div>
          </>
        ) : (
          <>
            <div className="modal-loading">
              <TailSpin
                height="60"
                width="60"
                color="#a555ff"
                ariaLabel="tail-spin-loading"
                radius="1"
                wrapperClass=""
                visible={true}
              />
            </div>
          </>
        )}
      </Modal>
    </>
  );
};

export default Column;
