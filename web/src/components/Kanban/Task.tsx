'use client'

import Image from 'next/image'
import { useCallback, useContext, useEffect } from 'react'
import { Draggable } from 'react-beautiful-dnd'
import { IoCamera, IoCheckmarkSharp, IoClose } from 'react-icons/io5'
import { FaAngleDoubleRight } from 'react-icons/fa'
import { SubmitHandler, useForm } from 'react-hook-form'
import { HiOutlineBars3BottomLeft, HiWindow } from 'react-icons/hi2'

import { KanbanContext } from '@/context/KanbanContext'
import useFilePreview from '@/hooks/useFilePreview'
import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import {
  updateTaskTitle,
  uploadImage,
  upsertTaskDescription,
  upsertTaskImageURL,
} from '@/services/board'
import PrimaryButton from '../_Buttons/PrimaryButton'

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

type FieldValues = {
  title?: string
  coverMedia?: string
  description?: string
}

export default function Task({ task, index, boardURL }: TaskProps) {
  const { setKanban } = useContext(KanbanContext)
  const [show, toggleShow, element, button] = useToggleClickOutside(false)
  const { handleSubmit, register, watch } = useForm<FieldValues>()

  const [preview, setPreview] = useFilePreview(watch('coverMedia'))

  const setPreviewNull = useCallback(() => {
    if (show) {
      return
    }
    setPreview(null)
  }, [show, setPreview])

  const changedTitle = watch('title')
  const changedDescription = watch('description')

  const onSubmitCoverURL: SubmitHandler<FieldValues> = useCallback(
    async ({ coverMedia }) => {
      try {
        if (!coverMedia) return

        const formData = new FormData()

        let coverURL: string | null = null

        if (coverMedia?.length > 0) {
          formData.append('media', coverMedia[0])
          const response = await uploadImage(formData)

          coverURL = response.data
        }

        await upsertTaskImageURL({ taskId: task.id, coverURL }, boardURL)

        setKanban((prev: any) => {
          const newKanban = { ...prev }

          newKanban.tasks[task.id].coverURL = coverURL

          return newKanban
        })
        setPreview(null)
      } catch (error) {
        console.log(error)
      }
    },
    [],
  )

  const onSubmitTitle: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        await updateTaskTitle({ title: data.title, taskId: task.id }, boardURL)

        setKanban((prev: any) => {
          const newKanban = { ...prev }

          newKanban.tasks[task.id].title = data.title

          return newKanban
        })
      } catch (error) {
        console.log(error)
      }
    },
    [boardURL, setKanban, task.id],
  )

  const onSubmitDescription: SubmitHandler<FieldValues> = useCallback(
    async (data) => {
      try {
        await upsertTaskDescription(
          {
            taskId: task.id,
            description: data.description,
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

  useEffect(() => {
    setPreviewNull()
  }, [setPreviewNull])

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
          show ? 'opacity-1 translate-x-0' : 'translate-x-[600px] opacity-0'
        }`}
      >
        <div className="relative w-full">
          <div className="absolute left-2 top-2 flex items-center justify-center rounded-md bg-neutral-700/60">
            <button
              onClick={() => toggleShow()}
              className="text-4xl text-neutral-400 transition-colors hover:text-neutral-400/60"
            >
              <FaAngleDoubleRight />
            </button>
          </div>

          <form onSubmit={handleSubmit(onSubmitCoverURL)}>
            <input
              id={`coverURL-${task.id}`}
              {...register('coverMedia')}
              type="file"
              hidden
            />

            {task?.coverURL || preview ? (
              <>
                <Image
                  width={600}
                  height={600}
                  src={preview || task.coverURL}
                  alt=""
                  className="max-h-64 object-cover"
                />

                <div className="absolute bottom-2 right-2 flex items-center justify-center gap-2">
                  {preview && (
                    <>
                      <button
                        type="submit"
                        className="rounded-md bg-indigo-500 p-1 text-xl transition-colors hover:bg-indigo-500/80"
                      >
                        <IoCheckmarkSharp />
                      </button>

                      <button
                        type="button"
                        onClick={() => setPreview(null)}
                        className="rounded-md bg-red-500 p-1 text-xl transition-colors hover:bg-red-500/80"
                      >
                        <IoClose />
                      </button>
                    </>
                  )}
                  <label
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') {
                        e.preventDefault()
                        e.currentTarget.click()
                      }
                    }}
                    htmlFor={`coverURL-${task.id}`}
                    className="flex h-7 cursor-pointer items-center gap-2 rounded-md bg-neutral-600/80 p-1 transition-colors hover:bg-neutral-500/60"
                  >
                    <IoCamera className="text-xl" />
                    Alterar capa
                  </label>
                </div>
              </>
            ) : (
              <label htmlFor={`coverURL-${task.id}`}>
                <div className="flex h-64 w-full cursor-pointer items-center justify-center bg-neutral-700 transition-colors hover:bg-neutral-700/60">
                  <IoCamera className="text-4xl text-neutral-400" />
                </div>
              </label>
            )}
          </form>
        </div>

        <div className="p-2">
          <div className="mb-12 flex items-start gap-2">
            <HiWindow className="text-4xl text-neutral-400" />

            <form
              onSubmit={handleSubmit(onSubmitTitle)}
              className="flex w-full flex-col items-start gap-2"
            >
              <textarea
                {...register('title')}
                defaultValue={task.title}
                rows={task.title.length > 50 ? 2 : 1}
                className="w-full resize-none rounded-md border border-transparent bg-transparent p-2 outline-none transition-colors focus:border-neutral-500 focus:bg-neutral-700/60"
              />

              {changedTitle !== task.title && (
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

              {changedDescription &&
                changedDescription !== task.description &&
                changedDescription?.length > 0 && (
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
