'use client'

import { useRef } from 'react'
import { Draggable, Droppable } from 'react-beautiful-dnd'
import {
  IoAddOutline,
  IoCheckmarkSharp,
  IoCreateOutline,
} from 'react-icons/io5'

import useToggleClickOutside from '@/hooks/useToggleClickOutside'

import Footer from './Footer'
import InnerListTask from './InnerListTask'
import FormCreateTask from '../_Form/FormCreateTask'
import { SubmitHandler, useForm } from 'react-hook-form'

interface FieldValues {
  title: string
}

export default function Column({ column, tasks, index, boardURL }: any) {
  const { handleSubmit, register, watch } = useForm<FieldValues>()
  const [isOpen, toggle, element, button] = useToggleClickOutside(false)

  const showButton = column.title !== watch('title')

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data)
  }

  return (
    <Draggable draggableId={column.id} index={index}>
      {({ dragHandleProps, innerRef, draggableProps }) => (
        <>
          <div
            className="inline-block h-full scroll-m-2 whitespace-nowrap align-top"
            {...draggableProps}
            ref={innerRef}
          >
            <div className="mx-1 flex max-h-full w-[324px] flex-col whitespace-normal rounded-md bg-neutral-800">
              <div {...dragHandleProps}>
                <div className="flex items-center justify-between gap-1 px-2 py-4">
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex w-full items-center gap-2"
                  >
                    <input
                      type="text"
                      {...register('title')}
                      defaultValue={column.title}
                      onBlur={() => onSubmit({ title: watch('title') })}
                      className="w-full rounded-md border-2 border-transparent bg-transparent p-1 text-zinc-400 outline-none transition-all duration-300 focus:border-zinc-500 focus:bg-zinc-400/10"
                    />

                    {showButton && (
                      <button
                        type="submit"
                        className="animate-fade-in rounded-md bg-indigo-500 p-1"
                      >
                        <IoCheckmarkSharp />
                      </button>
                    )}
                  </form>

                  <div className="relative flex items-center gap-2">
                    <button
                      ref={button}
                      onClick={() => toggle()}
                      className="rounded-md p-1 transition hover:bg-neutral-700/60"
                    >
                      <IoAddOutline className="text-xl text-neutral-200" />
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
