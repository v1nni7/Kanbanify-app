import { SetStateAction } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Task from "./Task";

interface TypeColumn {
  column: { id: string; title: string; taskIds: string };
  tasks: any;
  index: number;
  board: object;
  setBoard: SetStateAction<object>;
}

const Column = ({ column, tasks, index, board, setBoard }: TypeColumn) => {
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
                    tasks.map((task: object, index: number) => (
                      <Task key={index} index={index} task={task} />
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
