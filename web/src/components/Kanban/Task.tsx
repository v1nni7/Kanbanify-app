'use client'

import Image from 'next/image'
import { useCallback, useContext } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IoCamera, IoEnter } from 'react-icons/io5'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineBars3BottomLeft, HiWindow } from 'react-icons/hi2'

import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import { upsertTaskDescription } from '@/services/board'
import PrimaryButton from '../_Buttons/PrimaryButton'

import { KanbanContext } from '@/context/KanbanContext'

type TaskProps = {
  task: {
    id: string
    title: string
    coverURL: string
    description: string
    checklistsIds: string[]
  }
  index: number
  boardURL: string
}

type DescriptionFieldValues = {
  description: string
}

export default function Task({ task, index, boardURL }: TaskProps) {
  const { setKanban } = useContext(KanbanContext)
  const [show, toggleShow, element, button] = useToggleClickOutside(false)
  const { handleSubmit, register, watch } = useForm<DescriptionFieldValues>()

  const onSubmitDescription: SubmitHandler<DescriptionFieldValues> =
    useCallback(
      async (data) => {
        try {
          await upsertTaskDescription(
            {
              ...data,
              taskId: task.id,
            },
            boardURL,
          )

          setKanban((prev: any) => {
            const newKanban = { ...prev }

            newKanban.tasks[task.id].description = data.description

            return newKanban
          })
        } catch (error) {
          console.log(error)
        }
      },
      [boardURL, setKanban, task.id],
    )

  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => (
          <div
            onClick={() => toggleShow()}
            className="group mb-2"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div
              ref={button}
              className="group h-full rounded-md bg-neutral-700 p-2 group-active:rotate-2 group-active:bg-neutral-700/80"
            >
              <h1 className="text-md text-neutral-400">{task.title}</h1>
            </div>
          </div>
        )}
      </Draggable>

      <div
        ref={element}
        className={`absolute right-0 top-0 z-20 h-full w-[600px] bg-neutral-600 transition-all ${
          show ? 'translate-x-0' : 'translate-x-[600px]'
        }`}
      >
        <div className="relative w-full">
          <button
            onClick={() => toggleShow()}
            className="absolute left-2 top-2 text-4xl text-indigo-200 transition-colors hover:text-indigo-200/60"
          >
            <IoEnter />
          </button>

          <input id="coverURL" type="file" hidden />

          {task?.coverURL ? (
            <>
              <Image
                width={600}
                height={600}
                src={task.coverURL}
                alt=""
                className="max-h-64 object-cover"
              />

              <label
                htmlFor="coverURL"
                className="absolute bottom-4 right-4 flex cursor-pointer items-center gap-2 rounded-md bg-neutral-600/80 p-1 transition-colors hover:bg-neutral-500/60"
              >
                <IoCamera className="text-xl" />
                Alterar capa
              </label>
            </>
          ) : (
            <label htmlFor="coverURL">
              <div className="flex h-64 w-full cursor-pointer items-center justify-center bg-neutral-700 transition-colors hover:bg-neutral-700/60">
                <IoCamera className="text-4xl text-neutral-400" />
              </div>
            </label>
          )}
        </div>

        <div className="p-2">
          <div className="mb-16 flex items-start gap-2">
            <HiWindow className="text-4xl text-neutral-400" />

            <form className="flex w-full flex-col items-start gap-2">
              <textarea
                rows={task.title.length > 50 ? 2 : 1}
                defaultValue={task.title}
                className="peer w-full resize-none rounded-md border border-transparent bg-transparent p-2 outline-none transition-colors focus:border-neutral-500 focus:bg-neutral-700/60"
              />

              <PrimaryButton
                size="sm"
                type="button"
                className="hidden animate-fade-in px-4 peer-focus:block"
                disabled={false}
              >
                Salvar
              </PrimaryButton>
            </form>
          </div>

          <div className="mb-4 flex items-start gap-2">
            <HiOutlineBars3BottomLeft className="text-4xl text-neutral-400" />

            <form
              onSubmit={handleSubmit(onSubmitDescription)}
              className="flex w-full flex-col items-start gap-2"
            >
              <textarea
                rows={4}
                {...register('description')}
                defaultValue={task.description}
                placeholder="Adicione uma descrição"
                className="w-full resize-none rounded-md border border-transparent bg-neutral-700/60 p-2 outline-none transition-colors placeholder:text-neutral-400 focus:border-neutral-500"
              />

              {watch('description') && (
                <PrimaryButton
                  size="sm"
                  type="submit"
                  className="animate-fade-in px-4"
                  disabled={false}
                >
                  Salvar
                </PrimaryButton>
              )}
            </form>
          </div>

          <div className="flex h-[300px] flex-col items-center justify-center">
            <h2 className="w-3/4 text-center text-xl">
              Área de checklists está em{' '}
              <span className="text-indigo-400">desenvolvimento</span>, aguarde
              novidades!
            </h2>
            <p>
              <span className="text-indigo-400">:D</span>
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
