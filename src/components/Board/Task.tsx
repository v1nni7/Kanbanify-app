import { Draggable } from "react-beautiful-dnd";
import { ITask } from "../../interface/boardInterfaces";

interface ITaskProps {
  task: ITask;
  index: number;
}

const Task = ({ task, index }: ITaskProps) => {
  return <>
    <Draggable draggableId={task.id} index={index}>
      {({draggableProps, dragHandleProps, innerRef}) => (
        <div className="task" {...draggableProps} {...dragHandleProps} ref={innerRef}>
          <div className="task-container">
            <div className="board-tasklist-item">
              <div className="task-title">
                {task.title}
              </div>
            </div>
          </div>
        </div>
      )}
    </Draggable>
  </>;
};

export default Task;
