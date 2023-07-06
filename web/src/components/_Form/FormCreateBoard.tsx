import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { IoImagesOutline } from 'react-icons/io5'
import { SubmitHandler, useForm } from 'react-hook-form'
import useFilePreview from '@/hooks/useFilePreview'
import { createBoard, uploadImage } from '@/services/board'
import PrimaryButton from '../_Buttons/PrimaryButton'

interface FieldValues {
  name: string
  media: FileList
}

interface FormCreateBoardProps {
  setBoards: any
}

export default function FormCreateBoard({ setBoards }: FormCreateBoardProps) {
  const router = useRouter()

  const { handleSubmit, register, watch, reset, formState } =
    useForm<FieldValues>()
  const { isSubmitting } = formState
  const [preview] = useFilePreview(watch('media'))

  const onSubmit: SubmitHandler<FieldValues> = async ({ name, media }) => {
    try {
      const formData = new FormData()

      let mediaURL = null

      if (media.length > 0) {
        formData.append('media', media[0])
        const response = await uploadImage(formData)

        mediaURL = response.data
      }

      const newBoard = {
        name,
        background: mediaURL,
      }

      const response = await createBoard(newBoard)

      const url = response.data.url

      if (response.status !== 201) {
        return
      }

      router.push(`/board/${url}`)
      setBoards((prev: any) => [...prev, newBoard])
      reset()
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col justify-center gap-4 px-2 py-4"
    >
      <input
        type="text"
        autoComplete="off"
        {...register('name')}
        placeholder="Board name"
        className="h-12 rounded-lg bg-neutral-600 p-2 text-lg text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:bg-neutral-600/70"
      />
      <input hidden id="media" type="file" {...register('media')} />
      <label
        htmlFor="media"
        className="opacity-1 flex h-36 cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-500/50 transition hover:opacity-70"
      >
        {preview ? (
          <Image
            width={180}
            height={180}
            src={preview}
            className="h-full w-full rounded-lg"
            alt=""
          />
        ) : (
          <IoImagesOutline className="text-4xl text-neutral-500" />
        )}
      </label>

      <PrimaryButton
        size="sm"
        type="submit"
        className="px-4"
        disabled={isSubmitting}
      >
        Submit
      </PrimaryButton>
    </form>
  )
}
