import { useContext } from "react";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { KanbanContext } from "@/context/KanbanContext";
import InnerListColumn from "./InnerListColumn";

export default function Container() {
  const { kanban, setKanban, handleDragEnd } = useContext(KanbanContext);

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {({ droppableProps, innerRef, placeholder }) => (
            <div
              className="flex h-full overflow-y-hidden overflow-x-auto"
              {...droppableProps}
              ref={innerRef}
            >
              {kanban.columnOrder.length > 0 &&
                kanban.columnOrder?.map((columnId, index) => {
                  const column = kanban.columns[columnId];

                  return (
                    <InnerListColumn
                      key={column.id}
                      taskMap={kanban.tasks}
                      column={column}
                      index={index}
                    />
                  );
                })}

              {placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  );
}
