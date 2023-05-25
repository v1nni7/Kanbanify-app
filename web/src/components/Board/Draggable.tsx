import { Draggable } from "react-beautiful-dnd";
import Droppable from "./Droppable";
import { useContext } from "react";
import { BoardContext } from "@/context/BoardContext";

interface DragProps {
  column: any;
  index: number;
}

export default function DraggableComponent({ column, index }: DragProps) {
  const { board } = useContext(BoardContext);

  const tasks = column.taskIds.map((taskId: string) => {
    return board.tasks[taskId];
  });

  return (
    <Draggable draggableId={column.id} index={index}>
      {({ draggableProps, dragHandleProps, innerRef }) => (
        <div className="flex h-full items-start">
          <div
            ref={innerRef}
            {...draggableProps}
            className="mr-2 min-h-[60px] w-64 rounded-md bg-slate-700 px-1 py-2"
          >
            <div {...dragHandleProps} className="p-1">
              <input
                type="text"
                defaultValue={column.title}
                className="w-full rounded-md border border-slate-700 bg-slate-700 p-1 text-xl text-slate-200 outline-0 transition focus:border-slate-400 focus:bg-slate-500/40"
              />
            </div>
            <Droppable droppableId={column.id} tasks={tasks} type="task" />
          </div>
        </div>
      )}
    </Draggable>
  );
}
