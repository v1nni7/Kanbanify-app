import { useState } from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Header from "./Header";
import Footer from "./Footer";
import InnerListTask from "./InnerListTask";
import { BiX } from "react-icons/bi";

export default function Column({ column, tasks, index }: any) {
  const [isOpen, setIsOpen] = useState(false);

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
                <Header
                  title={column.title}
                  isOpen={isOpen}
                  setIsOpen={setIsOpen}
                />
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
                      >
                        <form className="flex flex-col items-start gap-2 p-2">
                          <input
                            type="text"
                            placeholder="New column"
                            className="w-full rounded-lg border-2 border-neutral-600 bg-transparent p-2 font-alt text-neutral-400 outline-none placeholder:text-neutral-400 focus:border-neutral-500/80"
                          />

                          <div className="flex items-center gap-2 overflow-hidden text-neutral-300">
                            <button className="rounded-lg bg-violet-600 px-2 py-1 font-alt transition hover:bg-violet-600/50">
                              Submit
                            </button>

                            <button className="rounded-lg bg-neutral-600 p-2 transition hover:bg-neutral-600/50">
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
