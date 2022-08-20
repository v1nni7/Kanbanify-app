import { IoCheckboxOutline, IoAdd } from "react-icons/io5";
import { Draggable } from "react-beautiful-dnd";
import { Dispatch, SetStateAction, useContext, useState } from "react";
import { BoardContext } from "../../../hooks/context/BoardContext/BoardContext";

interface TypeTask {
  index: number;
  task: any;
}

const Task = ({ task, index }: TypeTask) => {
  const { board, setBoard } = useContext(BoardContext);

  const [inputTaskValue, setInputTaskValue] =
    useState<string>("Adicionar tarefa");

  const createNewTask: any = (e: HTMLFormElement) => {
    e.preventDefault();

    const newTaskId = `task-${inputTaskValue.replace(" ", "-").toLowerCase()}`;

    const newColumnValue = {
      ...board.columns[task.column],
      taskIds: [...board.columns[task.column].taskIds, newTaskId],
    };

    setBoard({
      tasks: {
        ...board.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: inputTaskValue,
          isAction: false,
          column: task.column,
          totalCheckbox: undefined,
          completedCheckbox: undefined,
        },
      },
      columns: {
        ...board.columns,
        [task.column]: newColumnValue,
      },
      columnOrder: [board.columnOrder],
    });
  };

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
