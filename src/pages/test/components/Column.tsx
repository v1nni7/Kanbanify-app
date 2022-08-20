import { Dispatch, SetStateAction } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

interface TypeColumn {
  column: { id: string; title: string; taskIds: string };
  tasks: any;
  index: number;
  board: object;
  inputTaskValue: string;
  setInputTaskValue: Dispatch<SetStateAction<string>>;
  createNewTask: Function;
  setBoard: SetStateAction<object>;
}

const Column = ({
  column,
  tasks,
  index,
  board,
  setBoard,
  createNewTask,
  inputTaskValue,
  setInputTaskValue,
}: TypeColumn) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
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
                <div
                  className="tasklist"
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                >
                  {tasks ? (
                    tasks.map((task: any, index: number) => (
                      <Task
                        key={task.id}
                        index={index}
                        task={task}
                        createNewTask={createNewTask}
                        inputTaskValue={inputTaskValue}
                        setInputTaskValue={setInputTaskValue}
                      />
                    ))
                  ) : (
                    <></>
                  )}
                  {provided.placeholder}
                </div>
              )}
            </Droppable>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Column;
