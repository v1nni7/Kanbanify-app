import { useState, useRef, useCallback } from "react";
import { Draggable } from "react-beautiful-dnd";
import { BiPlus, BiX } from "react-icons/bi";
import Modal from "../Modal";
import { ITaskProps } from "../../interface/boardInterfaces";

interface ITag {
  id: string;
  name: string;
}

const Task = ({ index, task, setTaskModal, setModalOpen }: ITaskProps) => {
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="task"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="task-container">
              <div
                className="board-tasklist-item"
                onClick={() => {
                  setTaskModal(task);
                  setModalOpen(true);
                }}
              >
                <div className="task-title">{task.title}</div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
