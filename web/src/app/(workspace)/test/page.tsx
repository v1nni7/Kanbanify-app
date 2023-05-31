"use client";

import { useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";

const initialData = {
  tasks: {
    "task-1": { id: "task-1", content: "Take out the garbage" },
    "task-2": { id: "task-2", content: "Watch my favorite show" },
    "task-3": { id: "task-3", content: "Charge my phone" },
    "task-4": { id: "task-4", content: "Cook dinner" },
    "task-5": { id: "task-5", content: "Cook dinner" },
    "task-6": { id: "task-6", content: "Cook dinner" },
  },
  columns: {
    "column-1": {
      id: "column-1",
      title: "To do",
      taskIds: ["task-1", "task-2", "task-3", "task-4", "task-5", "task-6"],
    },
    "column-2": {
      id: "column-2",
      title: "In progress",
      taskIds: [],
    },
  },
  // Facilitate reordering of the columns
  columnOrder: ["column-1", "column-2"],
};

export default function Test() {
  const [state, setState] = useState<any>(initialData as any);

  const onDragEnd = (result: any) => {
    const { destination, source, draggableId, type } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnOrder = Array.from(state.columnOrder);
      newColumnOrder.splice(source.index, 1);
      newColumnOrder.splice(destination.index, 0, draggableId);

      const newState = {
        ...state,
        columnOrder: newColumnOrder,
      };
      setState(newState);
      return;
    }

    const home = state.columns[source.droppableId];
    const foreign = state.columns[destination.droppableId];

    if (home === foreign) {
      const newTaskIds = Array.from(home.taskIds);
      newTaskIds.splice(source.index, 1);
      newTaskIds.splice(destination.index, 0, draggableId);

      const newHome = {
        ...home,
        taskIds: newTaskIds,
      };

      const newState = {
        ...state,
        columns: {
          ...state.columns,
          [newHome.id]: newHome,
        },
      };

      setState(newState);
      return;
    }

    // moving from one list to another
    const homeTaskIds = Array.from(home.taskIds);
    homeTaskIds.splice(source.index, 1);
    const newHome = {
      ...home,
      taskIds: homeTaskIds,
    };

    const foreignTaskIds = Array.from(foreign.taskIds);
    foreignTaskIds.splice(destination.index, 0, draggableId);
    const newForeign = {
      ...foreign,
      taskIds: foreignTaskIds,
    };

    const newState = {
      ...state,
      columns: {
        ...state.columns,
        [newHome.id]: newHome,
        [newForeign.id]: newForeign,
      },
    };
    setState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {(provided) => (
          <div
            className="flex overflow-x-auto"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {state.columnOrder.map((columnId: any, index: any) => {
              const column = state.columns[columnId];
              return (
                <InnerListColumn
                  key={column.id}
                  column={column}
                  taskMap={state.tasks}
                  index={index}
                />
              );
            })}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

function InnerListColumn(props: any) {
  const { column, taskMap, index } = props;
  const tasks = column.taskIds.map((taskId: any) => taskMap[taskId]);

  return <Column column={column} tasks={tasks} index={index} />;
}

function InnerList(props: any) {
  return props.tasks.map((task: any, index: any) => (
    <Task key={task.id} task={task} index={index} />
  ));
}

function Column(props: any) {
  return (
    <Draggable draggableId={props.column.id} index={props.index}>
      {(provided) => (
        <div
          className="m-2 flex w-[220px] flex-col rounded-md border border-gray-400"
          {...provided.draggableProps}
          ref={provided.innerRef}
        >
          <h2 className="p-2" {...provided.dragHandleProps}>
            {props.column.title}
          </h2>
          <Droppable droppableId={props.column.id} type="task">
            {(provided, snapshot) => (
              <div
                className="min-h-[100px] flex-grow overflow-y-scroll p-2 transition"
                ref={provided.innerRef}
                {...provided.droppableProps}
              >
                <InnerList tasks={props.tasks} />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        </div>
      )}
    </Draggable>
  );
}

function Task(props: any) {
  return (
    <Draggable draggableId={props.task.id} index={props.index}>
      {(provided, snapshot) => (
        <div
          className="mb-2 h-32 rounded-md border border-gray-400 p-2"
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {props.task.content}
        </div>
      )}
    </Draggable>
  );
}
