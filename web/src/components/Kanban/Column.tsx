import { Draggable, Droppable } from "react-beautiful-dnd";
import ColumnHeader from "./ColumnHeader";
import InnerListTask from "./InnerListTask";

export default function Column({ column, tasks, index }: any) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {({ dragHandleProps, innerRef, draggableProps }) => (
        <>
          <div
            className="inline-block h-full scroll-m-2 whitespace-nowrap align-top"
            {...draggableProps}
            ref={innerRef}
          >
            <div className="relative mr-2 flex max-h-full w-[300px] flex-col whitespace-normal rounded-lg bg-neutral-800">
              <div {...dragHandleProps}>
                <ColumnHeader title={column.title} />
              </div>

              <div className="mx-1 h-full overflow-y-auto">
                <Droppable droppableId={column.id} type="task">
                  {({ droppableProps, innerRef, placeholder }) => (
                    <div
                      className="mx-1 min-h-[30px] flex-grow transition"
                      {...droppableProps}
                      ref={innerRef}
                    >
                      <InnerListTask tasks={tasks} />

                      {placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
}
