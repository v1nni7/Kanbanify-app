'use client'

import { Draggable, Droppable } from 'react-beautiful-dnd'
import { IoAddOutline, IoEllipsisVerticalSharp } from 'react-icons/io5'

import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import Footer from './Footer'
import InnerListTask from './InnerListTask'
import FormCreateTask from '../_Form/FormCreateTask'

export default function Column({ column, tasks, index, boardURL }: any) {
  const [isOpen, toggle, element, button] = useToggleClickOutside(false)

  return (
    <Draggable draggableId={column.id} index={index}>
      {({ dragHandleProps, innerRef, draggableProps }) => (
        <>
          <div
            className="inline-block h-full scroll-m-2 whitespace-nowrap align-top"
            {...draggableProps}
            ref={innerRef}
          >
            <div className="mr-2 flex max-h-full w-[300px] flex-col whitespace-normal rounded-md bg-neutral-800">
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
                      className="mx-1 min-h-[30px] flex-grow transition"
                      {...droppableProps}
                      ref={innerRef}
                    >
                      <div
                        className={`mb-2 overflow-hidden rounded-md transition-all ${
                          isOpen ? 'h-[100px]' : 'h-0'
                        }`}
                        ref={element}
                      >
                        <FormCreateTask
                          toggleOpen={toggle}
                          boardURL={boardURL}
                          columnId={column.id}
                        />
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
  )
}
