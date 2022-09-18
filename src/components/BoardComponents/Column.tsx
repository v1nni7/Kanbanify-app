import { Draggable, Droppable } from "react-beautiful-dnd";
import Board from "../../assets/styles/Board";
import Task from "./Task";

type ColumnPropsType = {
  index: number;
  column: { id: string; title: string; taskIds: string[] };
  tasks: {
    id: string;
    content: string;
    isAction: boolean;
    column: string;
    totalCheckbox: number;
    completedCheckbox: number;
  }[];
};

const Column = ({ column, tasks, index }: ColumnPropsType) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {(provided) => (
          <Board.ColumnHeight>
            <Board.Column {...provided.draggableProps} ref={provided.innerRef}>
              <Board.Title {...provided.dragHandleProps}>
                {column.title}
              </Board.Title>
              <Droppable droppableId={column.id} type="task">
                {(provided) => (
                  <Board.TaskList
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                  >
                    {tasks.map((task: any, index: number) => (
                      <Task key={task.id} index={index} task={task} columnTitle={column.title} />
                    ))}
                    {provided.placeholder}
                  </Board.TaskList>
                )}
              </Droppable>
            </Board.Column>
          </Board.ColumnHeight>
        )}
      </Draggable>
    </>
  );
};

export default Column;
