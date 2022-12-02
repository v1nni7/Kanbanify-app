import { Draggable, Droppable } from "react-beautiful-dnd";
import { IBoard, IColumn, ITask } from "../../interface/boardInterfaces";
import InputCreate from "./InputCreate";
import InputEdit from "./InputEdit";

interface IColumnProps {
  index: number;
  tasks: ITask[];
  column: IColumn;
  children: React.ReactNode | any;
}

const Column = ({ index, tasks, column, children }: IColumnProps) => {
  return (
    <>
      <Draggable draggableId={column.id} index={index}>
        {({ draggableProps, dragHandleProps, innerRef }) => (
          <div className="column">
            <div
              className="column-container"
              {...draggableProps}
              ref={innerRef}
            >
              <div className="column-title" {...dragHandleProps}>
                <InputEdit defaultValue={column.title} object={column} type="column" />
              </div>
              <Droppable droppableId={column.id} type="task">
                {({droppableProps, placeholder, innerRef}) => (
                  <div {...droppableProps} ref={innerRef}>
                    {tasks.map((task, index) => {
                      return children({ task, index })
                    })}
                    {placeholder}

                    <InputCreate type="task" columnId={column.id} />
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
