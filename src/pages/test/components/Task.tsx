import { IoCheckboxOutline, IoAdd } from "react-icons/io5";
import { Draggable } from "react-beautiful-dnd";
import { Dispatch, SetStateAction, useState } from "react";

interface TypeTask {
  index: number;
  task: any;
  createNewTask: any;
  inputTaskValue: string;
  setInputTaskValue: Dispatch<SetStateAction<string>>;
}

const Task = ({
  task,
  index,
  createNewTask,
  inputTaskValue,
  setInputTaskValue,
}: TypeTask) => {
  return (
    <>
      {task.isAction ? (
        <div className="board-create-task">
          <form onSubmit={createNewTask}>
            <input
              type="text"
              value={inputTaskValue}
              onChange={(e) => setInputTaskValue(e.target.value)}
            />
            <button type="submit" className="btn-submit">
              <IoAdd />
            </button>
          </form>
        </div>
      ) : (
        <Draggable draggableId={task.id} index={index}>
          {(provided) => (
            <div
              className="board-item"
              ref={provided.innerRef}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
            >
              <div className="board-content">
                <div className="board-item-title">{task.content}</div>
                <div className="board-item-checked">
                  <div className="board-icon-checked">
                    <IoCheckboxOutline />
                  </div>
                  <div className="board-number-checked">
                    {task.completedCheckbox}/{task.totalCheckbox}
                  </div>
                </div>
              </div>
            </div>
          )}
        </Draggable>
      )}
    </>
  );
};

export default Task;
