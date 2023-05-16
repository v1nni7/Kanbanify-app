import { Droppable } from "react-beautiful-dnd";
import Task from "./Task";

interface DroppableProps {
  tasks: any;
  type: string;
  droppableId: string;
}

export default function DroppableComponent({
  type,
  tasks,
  droppableId,
}: DroppableProps) {
  return (
    <Droppable droppableId={droppableId} type={type}>
      {({ droppableProps, innerRef, placeholder }) => (
        <>
          <div {...droppableProps} ref={innerRef}>
            {tasks.map((task: any, index: number) => (
              <Task key={task.id} task={task} index={index} />
            ))}
          </div>
          {placeholder}
        </>
      )}
    </Droppable>
  );
}
