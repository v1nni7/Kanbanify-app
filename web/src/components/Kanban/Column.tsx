import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiX } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import { createTask } from "@/services/board";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import { KanbanContext } from "@/context/KanbanContext";
import Footer from "./Footer";
import InnerListTask from "./InnerListTask";
import { useContext } from "react";

type FieldValues = {
  title: string;
};

export default function Column({ column, tasks, index, boardURL }: any) {
  const { kanban, setKanban } = useContext(KanbanContext);
  const { handleSubmit, register } = useForm<FieldValues>();
  const [isOpen, toggle, element, button] = useToggleClickOutside(false);

  const onSubmit: SubmitHandler<FieldValues> = async ({ title }) => {
    try {
      const { status, data } = await createTask(title, boardURL, column.id);

      if (status !== 201) {
        throw new Error("Error to create task");
      }

      const newKanban = {
        ...kanban,
        tasks: {
          ...kanban.tasks,
          [data.id]: {
            id: data.id,
            title: data.title,
          },
        },
        columns: {
          ...kanban.columns,
          [column.id]: {
            ...kanban.columns[column.id],
            taskIds: [...kanban.columns[column.id].taskIds, data.id],
          },
        },
      };

      setKanban(newKanban);
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className="flex items-center justify-between px-2 py-4">
                  <h2 className="font-alt text-lg font-semibold text-neutral-500">
                    {column.title}
                  </h2>

                  <div className="flex items-center gap-2">
                    <button
                      ref={button}
                      onClick={() => toggle()}
                      className="rounded-md p-1 transition hover:bg-neutral-700/60"
                    >
                      <IoAddOutline className="text-xl text-neutral-200" />
                    </button>
                    <button className="rounded-md p-1 transition hover:bg-neutral-700/60">
                      <IoEllipsisVerticalSharp className="text-xl text-neutral-200" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="mx-1 h-full overflow-y-auto">
                <Droppable droppableId={column.id} type="task">
                  {({ droppableProps, innerRef, placeholder }) => (
                    <div
                      className="relative mx-1 min-h-[30px] flex-grow transition"
                      {...droppableProps}
                      ref={innerRef}
                    >
                      <div
                        className={`mb-2 overflow-hidden rounded-lg bg-neutral-900/60 transition-all ${
                          isOpen ? "h-[100px]" : "h-0"
                        }`}
                        ref={element}
                      >
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col items-start gap-2 p-2"
                        >
                          <input
                            id="title"
                            type="text"
                            placeholder="New Task"
                            {...register("title")}
                            className="w-full rounded-md bg-neutral-700 p-2 text-lg font-bold text-neutral-400 placeholder-neutral-500 outline-none transition-colors focus:bg-neutral-700/60"
                          />

                          <div className="flex items-center gap-2 overflow-hidden text-neutral-300">
                            <button
                              type="submit"
                              className="rounded-lg bg-violet-600 px-2 py-1 font-alt transition hover:bg-violet-600/50"
                            >
                              Submit
                            </button>

                            <button
                              type="button"
                              onClick={() => toggle()}
                              className="rounded-lg bg-neutral-600 p-2 transition hover:bg-neutral-600/50"
                            >
                              <BiX />
                            </button>
                          </div>
                        </form>
                      </div>

                      <InnerListTask tasks={tasks} />

                      {placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
              <Footer tasks={tasks} />
            </div>
          </div>
        </>
      )}
    </Draggable>
  );
}
