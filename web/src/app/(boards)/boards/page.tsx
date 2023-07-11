'use client'

import { BiX } from 'react-icons/bi'
import { useLayoutEffect, useState } from 'react'

import BoardCard from '@/components/Boards'
import LoadingSpinner from '@/components/LoadingSpinner'
import FormCreateBoard from '@/components/_Form/FormCreateBoard'
import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import { getBoards } from '@/services/board'
import { Board } from '@/types/board-data'

export default function Boards() {
  const [isDropdownOpen, toggleDropdownOpen, dropdown, buttonCreate] =
    useToggleClickOutside(false)
  const [boards, setBoards] = useState<Board[] | null>(null)

  const loadingBoards = async () => {
    try {
      const response = await getBoards()

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
                className="rounded-md bg-neutral-600/50 p-2 font-alt text-neutral-400 transition hover:bg-neutral-500/20"
              >
                Criar quadro
              </button>

              <div
                className={`${
                  isDropdownOpen ? 'opacity-1 max-h-96' : 'max-h-0 opacity-0'
                } absolute top-12 z-30 w-72 overflow-hidden rounded-lg border border-neutral-600  bg-neutral-700 transition-all duration-300`}
                ref={dropdown}
              >
                <div className="flex flex-col">
                  <div className="flex w-full items-center  justify-between border-b border-neutral-600 p-2">
                    <h2 className="font-alt font-bold text-neutral-400">
                      Create board
                    </h2>

                    <button
                      onClick={() => toggleDropdownOpen()}
                      className="rounded-lg p-1 text-2xl text-neutral-400 transition hover:bg-neutral-500/20"
                    >
                      <BiX />
                    </button>
                  </div>

                  <FormCreateBoard setBoards={setBoards} />
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
