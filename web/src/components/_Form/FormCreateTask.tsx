import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'
import { BiX } from 'react-icons/bi'

import { createTask } from '@/services/board'
import { KanbanContext } from '@/context/KanbanContext'
import LoadingSpinner from '../LoadingSpinner'

interface FieldValues {
  title: string
}

interface FormCreateTaskProps {
  toggleOpen: any
  columnId: string
  boardURL: string
}

export default function FormCreateTask({
  toggleOpen,
  boardURL,
  columnId,
}: FormCreateTaskProps) {
  const { setKanban } = useContext(KanbanContext)
  const { handleSubmit, register, formState, reset } = useForm<FieldValues>()
  const { isSubmitting } = formState

  const onSubmit: SubmitHandler<FieldValues> = async ({ title }) => {
    try {
      const response = await createTask(title, boardURL, columnId)

      if (response.status !== 201) {
        throw new Error('Error to create task')
      }

      const { data } = response

      setKanban(
        (prev: any) =>
          ({
            ...prev,
            tasks: {
              ...prev.tasks,
              [data.id]: {
                id: data.id,
                title: data.title,
              },
            },
            columns: {
              ...prev.columns,
              [columnId]: {
                ...prev.columns[columnId],
                taskIds: [...prev.columns[columnId].taskIds, data.id],
              },
            },
          } as any),
      )

      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-2 bg-neutral-500/40 p-2"
    >
      <input
        type="text"
        {...register('title')}
        placeholder="Add Task"
        className="w-full rounded-md bg-neutral-800/50 p-2 font-alt text-lg text-neutral-400 placeholder-neutral-500 outline-none transition-colors focus:bg-neutral-800/40"
      />

      <div className="flex items-center gap-2">
        <button
          type="submit"
          className="flex h-8 w-20 items-center justify-center rounded-md bg-indigo-500 px-2 font-alt text-neutral-300 transition-colors hover:bg-indigo-500/80 disabled:bg-indigo-400"
          disabled={isSubmitting}
        >
          {isSubmitting ? <LoadingSpinner height={25} width={25} /> : 'Submit'}
        </button>

        <button
          type="button"
          onClick={() => toggleOpen()}
          className="h-8 rounded-md bg-neutral-800/60 px-1 text-2xl text-neutral-200 hover:bg-neutral-800/50"
        >
          <BiX />
        </button>
      </div>
    </form>
  )
}
