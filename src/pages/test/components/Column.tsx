import { useContext, useState } from "react";
import { IoAdd } from "react-icons/io5";
import { Draggable, Droppable } from "react-beautiful-dnd";
import { BoardContext } from "../../../hooks/context/BoardContext/BoardContext";
import Task from "./Task";

interface TypeColumn {
  column: { id: string; title: string; taskIds: string };
  tasks: any;
  index: number;
}

const Column = ({ column, tasks, index }: TypeColumn) => {
  const { board, setBoard, inputTaskValue, setInputTaskValue } =
    useContext(BoardContext);

  const createNewTask: any = (e: HTMLFormElement) => {
    e.preventDefault();

    const newTaskId = `task-${inputTaskValue
      .replace(/[" "]/g, "-")
      .toLowerCase()}`;

    const newColumnValue = {
      ...board.columns[column.id],
      taskIds: [...board.columns[column.id].taskIds, newTaskId],
    };

    setBoard({
      ...board,
      tasks: {
        ...board.tasks,
        [newTaskId]: {
          id: newTaskId,
          content: inputTaskValue,
          isAction: false,
          column: column.id,
          totalCheckbox: undefined,
          completedCheckbox: undefined,
        },
      },
      columns: {
        ...board.columns,
        [column.id]: newColumnValue,
      },
    });
  };

  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <>
            <div className="board-column">
              <div
                className="board"
                {...provided.draggableProps}
                ref={provided.innerRef}
              >
                <div className="board-title" {...provided.dragHandleProps}>
                  {column.title}
                </div>
                <Droppable droppableId={column.id} type="task">
                  {(provided) => (
                    <>
                      <div
                        className="tasklist"
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                      >
                        {tasks.map((task: any, index: number) => (
                          <Task key={task.id} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                      </div>
                    </>
                  )}
                </Droppable>
                <div className="board-create-task">
                  <form onSubmit={createNewTask}>
                    <input
                      type="text"
                      value={inputTaskValue}
                      onChange={(e) => setInputTaskValue(e.target.value)}
                    />
                    <button className="btn-submit">
                      <IoAdd />
                    </button>
                  </form>
                </div>
              </div>
            </div>
          </>
        )}
      </Draggable>
    </>
  );
};

export default Column;
