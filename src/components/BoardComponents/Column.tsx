import { Form, Formik, FormikValues } from "formik";
import React, { FocusEventHandler } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiCheck, BiPlus, BiX } from "react-icons/bi";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { string, ValidationError } from "yup";
import { IColumnProps } from "../../interface/boardInterfaces";
import Task from "./Task";

const Column = ({ column, tasks, index, board, setBoard }: IColumnProps) => {
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
                        columnTitle={column.title}
                      />
                    ))}
                    {provided.placeholder}

                    <div className="board-task-create">
                      <div className="board-task-create-background">
                        <input
                          type="text"
                          placeholder="Criar tarefa"
                          className="board-control"
                        />
                        <button className="btn-board-submit" type="submit">
                          <BiPlus />
                        </button>
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
