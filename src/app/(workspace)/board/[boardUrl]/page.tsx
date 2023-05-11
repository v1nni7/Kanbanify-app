"use client";

import { BoardContext } from "@/context/BoardContext";
import useUpdateBoard from "@/hooks/useUpdateBoard";
import { getBoardContentRequest } from "@/services/board";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { BiX } from "react-icons/bi";

export type TypeData = {
  tasks: any;
  columns: any;
  columnOrder: Array<string>;
};

export default function Board({ params }: { params: { boardUrl: string } }) {
  const { onSubmitBoard } = useUpdateBoard();
  const { board, setBoard, handleDragEnd } = useContext(BoardContext);
  const { handleSubmit, register, resetField } = useForm();

  const onSubmit = async ({ title }: any) => {
    try {
      await onSubmitBoard({ title, type: "column" });
    } catch (error) {
      console.log(error);
    } finally {
      resetField("title");
    }
  };

  const loadingBoard = async () => {
    try {
      if (!board.isLoading) return;

      const response = await getBoardContentRequest(params.boardUrl);

      if (response.status === 200) {
        setBoard({ ...response.data.content, isLoading: false });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingBoard();
    console.clear();
  }, []);

  return (
    <>
      <section className="flex h-[calc(100%-84px)] items-center relative">
        <aside className="h-full bg-slate-700 p-4">
          <ul className="flex flex-col">
            <li></li>
          </ul>
        </aside>

        <div className="h-full p-4">
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable
              droppableId="all-columns"
              direction="horizontal"
              type="column"
            >
              {({ droppableProps, innerRef, placeholder }) => (
                <div
                  className="h-full flex relative"
                  {...droppableProps}
                  ref={innerRef}
                >
                  {board.columnOrder.length !== 0
                    ? board.columnOrder.map(
                        (columnId: string, index: number) => {
                          const column = board.columns[columnId];
                          const tasks = column.taskIds.map(
                            (taskId: string) => board.tasks[taskId]
                          );

                          return (
                            <Column
                              key={column.id}
                              column={column}
                              tasks={tasks}
                              index={index}
                              boardURL={params.boardUrl}
                            />
                          );
                        }
                      )
                    : null}
                  {placeholder}

                  <div className="h-full flex items-start">
                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="w-64 min-h-[62px] flex items-start flex-col justify-start bg-slate-700 rounded-md p-1 px-2 transition"
                    >
                      <input
                        type="text"
                        placeholder="New column"
                        {...register("title")}
                        className="w-full peer rounded-md text-slate-200 bg-slate-700 border border-slate-700 focus:border-slate-500 focus:bg-slate-600 transition outline-0 my-2 p-1"
                      />
                      <div className="flex items-center hidden peer-focus:flex pb-2">
                        <button className="text-slate-200 bg-blue-500 hover:bg-blue-600 rounded-md mr-2 p-1">
                          Add column
                        </button>
                        <button className="text-slate-200 bg-neutral-500 hover:bg-neutral-600 rounded-md p-2">
                          <BiX />
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </div>
      </section>
    </>
  );
}

function Column({ column, tasks, index }: any) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { onSubmitBoard } = useUpdateBoard();
  const { register, handleSubmit, resetField } = useForm();

  const onSubmit = async ({ title }: any) => {
    try {
      await onSubmitBoard({ title: title, type: "task", columnId: column.id });
    } catch (error) {
      console.log(error);
    } finally {
      resetField("title");
    }
  };

  return (
    <Draggable draggableId={column.id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <div className="h-full flex items-start">
          <div
            ref={innerRef}
            {...draggableProps}
            className="w-64 min-h-[60px] bg-slate-700 rounded-md mr-2 py-2 px-1"
          >
            <div {...dragHandleProps} className="p-1">
              <input
                id="title"
                type="text"
                ref={inputRef}
                defaultValue={column.title}
                className="w-full text-slate-200 text-xl bg-slate-700 outline-0 rounded-md border border-slate-700 focus:border-slate-400 p-1 focus:bg-slate-500/40 transition"
              />
            </div>
            <Droppable droppableId={column.id} type="task">
              {({ droppableProps, innerRef, placeholder }) => (
                <>
                  <div {...droppableProps} ref={innerRef}>
                    {tasks.map((task: any, index: number) => (
                      <Task key={task.id} task={task} index={index} />
                    ))}
                  </div>
                  {placeholder}

                  <div className="p-1">
                    <form onSubmit={handleSubmit(onSubmit)}>
                      <input
                        type="text"
                        placeholder="Add task"
                        {...register("title")}
                        className="w-full peer text-slate-200 bg-slate-700 border border-slate-700 focus:bg-slate-600 focus:border-slate-500 transition rounded-md outline-0 focus:mb-2 p-1"
                      />
                      <div className="flex items-center hidden peer-focus:flex">
                        <button
                          type="submit"
                          className="text-slate-200 bg-blue-500 hover:bg-blue-600 rounded-md mr-2 p-1"
                        >
                          Add task
                        </button>
                        <button
                          type="button"
                          className="text-slate-200 bg-neutral-500 hover:bg-neutral-600 rounded-md p-2"
                        >
                          <BiX />
                        </button>
                      </div>
                    </form>
                  </div>
                </>
              )}
            </Droppable>
          </div>
        </div>
      )}
    </Draggable>
  );
}

function Task({ index, task }: any) {
  return (
    <Draggable draggableId={task.id} index={index}>
      {({ draggableProps, innerRef, dragHandleProps }) => (
        <div
          ref={innerRef}
          {...draggableProps}
          {...dragHandleProps}
          className="p-1 group"
        >
          <div className="rounded-md group-active:bg-slate-500/80 group-active:rotate-2 transition p-2 bg-slate-600 text-slate-200">
            {task.title}
          </div>
        </div>
      )}
    </Draggable>
  );
}
