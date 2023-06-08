import { Draggable, Droppable } from "react-beautiful-dnd";
import { BiX } from "react-icons/bi";
import { SubmitHandler, useForm } from "react-hook-form";
import { IoAddOutline, IoEllipsisVerticalSharp } from "react-icons/io5";
import useToggleClickOutside from "@/hooks/useToggleClickOutside";
import Footer from "./Footer";
import InnerListTask from "./InnerListTask";

type FieldValues = {
  title: string;
};

export default function Column({ column, tasks, index }: any) {
  const { handleSubmit, register } = useForm<FieldValues>();
  const [isOpen, toggle, element, button] = useToggleClickOutside(false);

  const onSubmit: SubmitHandler<FieldValues> = async ({ title }) => {
    try {
    } catch (error) {}
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
                        className={`mb-2 overflow-hidden rounded-lg bg-neutral-700/50 transition-all ${
                          isOpen ? "h-[100px]" : "h-0"
                        }`}
                        ref={element}
                      >
                        <form
                          onSubmit={handleSubmit(onSubmit)}
                          className="flex flex-col items-start gap-2 p-2"
                        >
                          <input
                            type="text"
                            placeholder="New column"
                            {...register("title")}
                            className="w-full rounded-lg border-2 border-neutral-600 bg-transparent p-2 font-alt text-neutral-400 outline-none placeholder:text-neutral-400 focus:border-neutral-500/80"
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
