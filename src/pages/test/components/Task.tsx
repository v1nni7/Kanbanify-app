import { IoCheckboxOutline } from "react-icons/io5";
import { Draggable } from "react-beautiful-dnd";

interface TypeTask {
  index: number;
  task: any;
}

const Task = ({ task, index }: TypeTask) => {
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {(provided) => (
          <div
            className="board-item"
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <div
              className={`board-content ${
                task.completedCheckbox ? null : "board-without-checklist"
              }`}
            >
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
    </>
  );
};

export default Task;
