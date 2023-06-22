import { useContext } from 'react'
import { SubmitHandler, useForm } from 'react-hook-form'

import { KanbanContext } from '@/context/KanbanContext'
import PrimaryButton from '../_Buttons/PrimaryButton'
import { createColumn } from '@/services/board'

interface FieldValues {
  title: string
}

interface FormCreateColumnProps {
  boardURL: string
}

export default function FormCreateColumn({ boardURL }: FormCreateColumnProps) {
  const { setKanban } = useContext(KanbanContext)
  const { handleSubmit, register, watch, reset, formState } =
    useForm<FieldValues>()
  const { isSubmitting } = formState

  const watchTitle = watch('title')

  const onSubmit: SubmitHandler<FieldValues> = async ({ title }) => {
    try {
      const response = await createColumn(title, boardURL)

      if (response.status !== 201) {
        throw new Error('Error to get kanban board')
      }

      setKanban(
        (prevState: any) =>
          ({
            ...prevState,
            columns: {
              ...prevState.columns,
              [response.data.id]: {
                id: response.data.id,
                title: response.data.title,
                taskIds: [],
              },
            },
            columnOrder: [...prevState.columnOrder, response.data.id],
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
      className="flex flex-col items-start"
    >
      <input
        type="text"
        {...register('title')}
        placeholder="Add column"
        className="peer h-10 w-full rounded-lg bg-transparent p-2 text-lg font-semibold text-neutral-500 outline-none transition placeholder:text-neutral-500 focus:bg-neutral-700/80"
      />

      <div
        className={`flex h-0 items-center gap-2 overflow-hidden transition-all peer-focus:h-[40px] ${
          watchTitle && 'h-[40px]'
        }`}
      >
        <PrimaryButton
          size="xs"
          type="submit"
          className="px-4"
          disabled={isSubmitting}
        >
          Create
        </PrimaryButton>

        <button className="h-8 rounded-lg bg-neutral-600 px-2 text-sm text-neutral-200 transition hover:bg-neutral-600/80">
          Close
        </button>
      </div>
    </form>
  )
}
