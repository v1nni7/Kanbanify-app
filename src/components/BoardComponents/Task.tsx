import { Draggable } from "react-beautiful-dnd";
import Icon from "../../assets/styles/Icon";

interface TaskPropsType {
  task: { id: string; title: string };
  index: number;
  columnTitle: string;
}

const Task = ({ index, task, columnTitle }: TaskPropsType) => {
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="board-tasklist"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
          >
            <div className="board-tasklist-item">
              <div className="board-tasklist-content">
                <div className="board-tasklist-flex">
                  <div className="board-tasklist-title">
                    {task.title}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Draggable>
    </>
  );
};

export default Task;
