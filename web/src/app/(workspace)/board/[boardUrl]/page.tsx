"use client";

import { useCallback, useContext, useEffect } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { KanbanContext } from "@/context/KanbanContext";
import { getBoardContentRequest } from "@/services/board";
import Kanban from "@/components/Kanban";

export default function kanban({ params }: { params: { boardUrl: string } }) {
  const { kanban, setKanban, handleDragEnd } = useContext(KanbanContext);

  const loadingBoard = useCallback(async () => {
    try {
      if (kanban.columnOrder.length > 0) {
        return;
      }

      const response = await getBoardContentRequest(params.boardUrl);

      if (response.status !== 200) {
        return;
      }

      setKanban(response.data.content);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    loadingBoard();
  }, [loadingBoard]);

  return (
    <>
      <section className="h-full w-full overflow-hidden bg-neutral-600/20 p-4">
        <Kanban />
        {/* <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable
            droppableId="all-columns"
            direction="horizontal"
            type="column"
          >
            {({ droppableProps, innerRef, placeholder }) => (
              <div
                {...droppableProps}
                ref={innerRef}
                className="flex h-full overflow-x-auto"
              >
                {kanban.columnOrder.length > 0 &&
                  kanban.columnOrder?.map((columnId: string, index) => {
                    const column = kanban.columns[columnId];

                    return (
                      <Column key={column.id} column={column} index={index} />
                    );
                  })}

                {placeholder}
              </div>
            )}
          </Droppable>
        </DragDropContext> */}
      </section>
    </>
  );
}

function Column({ column, index }: any) {
  const { kanban } = useContext(KanbanContext);
  const tasks = column?.taskIds?.map((taskId: string) => kanban.tasks[taskId]);

  return (
    <Draggable draggableId={column.id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <>
          <div className="inline-block h-full scroll-m-2 whitespace-nowrap align-top">
            <div
              ref={innerRef}
              {...draggableProps}
              className="relative mr-2 flex max-h-full w-[300px] flex-col whitespace-normal rounded-lg bg-neutral-800"
            >
              {/* Header */}
              <div
                {...dragHandleProps}
                className="flex w-full items-center justify-between p-2"
              >
                <h2 className="font-alt text-lg font-semibold text-neutral-500">
                  {column.title}
                </h2>

                <div className="flex items-center gap-2">
                  <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
                    <IoAddOutline className="text-xl text-neutral-200" />
                  </button>
                  <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
                    <IoEllipsisVerticalSharp className="text-xl text-neutral-200" />
                  </button>
                </div>
              </div>

              <div className="mx-1 flex h-full flex-col overflow-y-auto">
                <Droppable droppableId={column.id} type="task">
                  {({ droppableProps, innerRef, placeholder }) => (
                    <>
                      {/* List Tasks */}
                      <div
                        {...droppableProps}
                        ref={innerRef}
                        className="h-full p-1"
                      >
                        {tasks?.map((task: any, index: number) => (
                          <Task key={task.id} task={task} index={index} />
                        ))}
                      </div>
                      {placeholder}
                    </>
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

function Task({ task, index }: any) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className="mb-2 rounded-lg bg-neutral-700 p-2"
        >
          <div className="w-full">
            <img
              src="http://localhost:5000/uploads/laptop.jpg"
              alt=""
              className="max-h-32 w-full rounded-lg object-cover"
            />
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-neutral-100">{task.title}</h1>
            <p className="text-neutral-400">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
            </p>
          </div>
        </div>
      )}
    </Draggable>
  );
}
