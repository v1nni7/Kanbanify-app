"use client"

import { BiX } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { useCallback, useContext, useEffect } from "react";
import { IoAddOutline } from "react-icons/io5";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import { KanbanContext } from "@/context/KanbanContext";
import { createColumn, getBoard } from "@/services/board";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import InnerListColumn from "./InnerListColumn";

type FieldValues = {
  title: string;
};

export default function Kanban({ boardURL }: { boardURL: string }) {
  const [isOpen, toggle, element] = useToggleClickOutside(false);
  const { handleSubmit, register } = useForm<FieldValues>();
  const { kanban, setKanban, handleDragEnd, setBoardURL } = useContext(KanbanContext);

  const onSubmit: SubmitHandler<FieldValues> = useCallback(
    async ({ title }) => {
      try {
        const { status, data } = await createColumn(title, boardURL);

        if (status !== 201) {
          throw new Error("Error to get kanban board");
        }

        const newKanban = {
          ...kanban,
          columns: {
            ...kanban.columns,
            [data.id]: {
              id: data.id,
              title: data.title,
              taskIds: [],
            },
          },
          columnOrder: [...kanban.columnOrder, data.id],
        };

        setKanban(newKanban);

        toggle();
      } catch (error) {
        console.log(error);
      }
    },
    [boardURL]
  );

  const loadingBoard = async () => {
    try {
      const { status, data } = await getBoard(boardURL);

      if (status !== 200) {
        throw new Error("Error to get kanban board");
      }

      setBoardURL(boardURL);
      setKanban(data.content);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    loadingBoard();
  }, []);

  return (
    <>
      <div className="mb-4 flex">
        <button
          onClick={() => toggle()}
          className="flex items-center rounded-lg bg-neutral-700 p-2 text-lg font-bold text-neutral-400 transition-colors hover:bg-neutral-700/60 focus:bg-neutral-700/60"
        >
          <IoAddOutline className="text-2xl" onClick={toggle} />
          New Column
        </button>

        {isOpen && (
          <div className="absolute left-0 top-0 z-20 flex h-full w-full items-center justify-center bg-neutral-700/50">
            <div ref={element} className="w-96 gap-4 rounded-lg bg-neutral-800">
              <div className="flex items-center justify-between p-4">
                <h2 className="font-alt text-xl font-bold text-neutral-400">
                  New Column
                </h2>

                <button
                  onClick={() => toggle()}
                  className="rounded-md text-neutral-400 outline-none transition-colors hover:bg-neutral-400/20 focus:bg-neutral-400/20"
                >
                  <BiX className="text-3xl" />
                </button>
              </div>
              <div className="px-4 pb-4 pt-2">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <div className="flex flex-col gap-2">
                    <input
                      id="title"
                      type="text"
                      placeholder="New Column"
                      {...register("title")}
                      className="rounded-md bg-neutral-700 p-2 text-lg font-bold  text-neutral-400 placeholder-neutral-500 outline-none transition-colors focus:bg-neutral-700/60"
                    />
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => toggle()}
                      className="rounded-md bg-neutral-700 p-2 text-lg font-bold text-neutral-400 transition-colors hover:bg-neutral-700/60 focus:bg-neutral-700/60"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="rounded-md bg-violet-600 p-2 text-lg font-bold text-neutral-300 transition-colors hover:bg-violet-600/60 focus:bg-violet-600/60"
                    >
                      Create
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {({ droppableProps, innerRef, placeholder }) => (
            <div
              className="flex h-full overflow-x-auto overflow-y-hidden"
              {...droppableProps}
              ref={innerRef}
            >
              {kanban &&
                kanban.columnOrder?.map((columnId: string, index: number) => {
                  const column = kanban.columns[columnId];

                  return (
                    <InnerListColumn
                      key={column.id}
                      boardURL={boardURL}
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
