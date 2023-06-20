'use client'

import { SubmitHandler, useForm } from 'react-hook-form'
import { useLayoutEffect, useState } from 'react'
import { IoImagesOutline } from 'react-icons/io5'

import LoadingSpinner from '@/components/LoadingSpinner'
import BoardCard from '@/components/Boards'
import { getAllBoards } from '@/services/board'
import { Board } from '@/types/board-data'
import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import useFilePreview from '@/hooks/useFilePreview'
import Image from 'next/image'
import PrimaryButton from '@/components/_Buttons/PrimaryButton'

type FieldValues = {
  name: string
  media: FileList
}

export default function Boards() {
  const [isDropdownOpen, toggleDropdownOpen, dropdown, buttonCreate] =
    useToggleClickOutside(false)
  const [boards, setBoards] = useState<Board[] | null>(null)
  const { handleSubmit, register, watch } = useForm<FieldValues>()

  const file = watch('media')
  const [preview] = useFilePreview(file)

  const onSubmit: SubmitHandler<FieldValues> = async ({ media, name }) => {}

  const loadingBoards = async () => {
    try {
      const response = await getAllBoards()

      if (response.status !== 200) {
        return
      }

      setBoards(response.data)
    } catch (error) {
      console.log(error)
    }
  }

  useLayoutEffect(() => {
    loadingBoards()
  }, [])

  return (
    <>
      <section className="relative h-full w-full overflow-hidden bg-neutral-600/20 p-4">
        {boards ? (
          <>
            <div className="relative mb-4">
              <button
                ref={buttonCreate}
                onClick={() => toggleDropdownOpen()}
                className="rounded-lg bg-neutral-600/50 p-2 font-alt text-neutral-400 transition hover:bg-neutral-500/20"
              >
                Create
              </button>

              <div
                className={`${
                  isDropdownOpen ? 'opacity-1 max-h-96' : 'max-h-0 opacity-0'
                } absolute top-12 z-30 w-72 overflow-hidden rounded-lg border border-neutral-600  bg-neutral-700 transition-all duration-300`}
                ref={dropdown}
              >
                <div className="flex flex-col">
                  <h2 className="border-b border-neutral-600 p-2 text-center font-alt font-bold text-neutral-400">
                    Create board
                  </h2>

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
                    <input
                      hidden
                      id="media"
                      type="file"
                      {...register('media')}
                    />
                    <label
                      htmlFor="media"
                      className="opacity-1 flex h-36 cursor-pointer items-center justify-center rounded-lg border border-dashed border-neutral-500/50 transition hover:opacity-50"
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

                    <PrimaryButton type="button" size="md" disabled={false}>
                      Submit
                    </PrimaryButton>
                  </form>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-4">
              {boards.map((board, index) => (
                <BoardCard key={index} index={index} board={board} />
              ))}
            </div>
          </>
        ) : (
          <div className="flex h-full w-full flex-col items-center justify-center">
            <LoadingSpinner width={50} height={50} strokeWidth={3} />
            <h2 className="font-alt text-xl font-semibold text-neutral-300">
              Carregando quadros...
            </h2>
          </div>
        )}
      </section>
    </>
  )
}
