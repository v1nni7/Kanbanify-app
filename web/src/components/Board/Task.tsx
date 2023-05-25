import { Draggable } from "react-beautiful-dnd";

interface TaskProps {
  task: any;
  index: number;
}

export default function Task({ task, index }: TaskProps) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div className="group p-1" {...dragHandleProps} {...draggableProps} ref={innerRef}>
          <div className="rounded-md bg-slate-600 p-2 text-slate-200 transition group-active:rotate-2 group-active:bg-slate-500/80">
            {task.title}
          </div>
        </div>
      )}
    </Draggable>
  );
}
