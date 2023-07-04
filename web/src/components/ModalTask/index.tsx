'use client'

import Image from 'next/image'
import { useContext } from 'react'
import { useForm } from 'react-hook-form'
import {
  BiAlignJustify,
  BiCamera,
  BiCheck,
  BiTask,
  BiWindowAlt,
  BiX,
} from 'react-icons/bi'

import { KanbanContext } from '@/context/KanbanContext'
import useToggleClickOutside from '@/hooks/useToggleClickOutside'
import Modal from '../Modal'
import { IoImagesOutline } from 'react-icons/io5'
import PrimaryButton from '../_Buttons/PrimaryButton'

type Task = {
  id: string
  title: string
  coverURL: string
  description: string
  checklistsIds: string[]
}

type ModalTaskProps = {
  task: Task
  element: any
  show: boolean
  width: 'large' | 'medium' | 'small'
}

interface FieldValues {
  title: string
  coverURL: string
  description: string
}

export default function ModalTask(props: ModalTaskProps) {
  const { task } = props
  const { kanban } = useContext(KanbanContext)
  const { handleSubmit, register, watch } = useForm<FieldValues>()
  const [isDropdownOpen, toggleDropdownOpen, dropdown, buttonCreate] =
    useToggleClickOutside(false)

  console.log(task)

  const onBlurSubmit = (el: any) => {
    console.log(el.target?.value)
  }

  const onSubmit = () => {
    console.log(task.id)
  }

  // Criando acessibilidade no label

  const handleKeyDown = (event: any) => {
    if (
      event.key === ' ' ||
      event.key === 'Enter' ||
      event.key === 'Spacebar'
    ) {
      event.preventDefault()
      const target = event.target as HTMLLabelElement
      target.click()
    }
  }

  return (
    <Modal {...props}>
      <div className="my-10 overflow-hidden rounded-md border border-neutral-600 bg-neutral-700">
        {/* Header */}
        <div className="flex w-full flex-col">
          {task.coverURL && (
            <div className="relative h-52">
              <Image
                width={1920}
                height={208}
                src={task.coverURL}
                className="h-full w-full object-cover"
                alt="cover media url"
              />

              <button className="absolute right-2 top-2 rounded-md p-1 text-xl text-neutral-300 transition-colors hover:bg-neutral-600/60">
                <BiX className="text-2xl" />
              </button>

              <label
                tabIndex={0}
                htmlFor="coverURL"
                className="absolute bottom-2 right-2 flex cursor-pointer items-center gap-1 rounded-md bg-neutral-600/80 px-2 py-1 text-sm text-neutral-300 transition-colors hover:bg-neutral-600/60 focus:outline-2"
              >
                <BiCamera className="text-xl" />
                Change cover
              </label>
              <input type="file" id="coverURL" hidden />
            </div>
          )}

          <div className="p-2">
            <h2 className="text-md hidden text-neutral-300">{task.title}</h2>
            <textarea
              defaultValue={task.title}
              className="text-md w-full resize-none rounded-md border border-transparent bg-transparent p-1 text-neutral-300 outline-none transition-colors focus:border-neutral-400/50 focus:bg-neutral-600/50"
            />
          </div>
        </div>

        {/* Description */}
        <div className="p-2">
          <div className="flex flex-col items-start gap-2">
            <div className="flex items-center text-neutral-200">
              <BiAlignJustify className="text-2xl " />

              <h2 className="text-md">Description</h2>
            </div>

            <div className="w-full p-1">
              <textarea
                {...register('description')}
                onBlur={onBlurSubmit}
                className="h-24 w-full resize-none rounded-md bg-neutral-600/50 p-2 text-sm font-normal text-neutral-200 outline-none"
                defaultValue={task.description}
              />
            </div>
          </div>
        </div>

        {/* Checklists */}
        <div className="p-2">
          <div className="flex flex-col items-start gap-2">
            <div className="flex w-full items-center justify-between text-neutral-200">
              <h2 className="text-md flex items-center gap-1">
                <BiTask className="text-2xl" /> Checklist
              </h2>

              <div className="relative px-2">
                <button
                  ref={buttonCreate}
                  onClick={() => toggleDropdownOpen()}
                  className="rounded-md bg-neutral-500/20 p-2 transition-colors hover:bg-neutral-500/10"
                >
                  Adicionar checklist
                </button>

                <div
                  className={`${
                    isDropdownOpen ? 'opacity-1 max-h-96' : 'max-h-0 opacity-0'
                  } absolute -left-28 top-12 z-30 w-72 overflow-hidden rounded-lg border border-neutral-500  bg-neutral-700 transition-all duration-300`}
                  ref={dropdown}
                >
                  <div className="flex flex-col">
                    <div className="flex w-full items-center justify-between border-b border-neutral-600 p-2">
                      <h2 className="font-alt text-neutral-400">
                        Create checklist
                      </h2>

                      <button
                        onClick={() => toggleDropdownOpen()}
                        className="rounded-lg p-1 text-2xl text-neutral-400 transition hover:bg-neutral-500/20"
                      >
                        <BiX />
                      </button>
                    </div>

                    <form
                      onSubmit={handleSubmit(onSubmit)}
                      className="flex w-full flex-col justify-center gap-4 px-2 py-4"
                    >
                      <input
                        type="text"
                        autoComplete="off"
                        {...register('title')}
                        placeholder="Checklist title"
                        className="h-12 rounded-lg bg-neutral-600 p-2 text-lg text-neutral-300 outline-none transition placeholder:text-neutral-500 focus:bg-neutral-600/70"
                      />

                      <PrimaryButton
                        size="sm"
                        type="submit"
                        className="px-4"
                        disabled={false}
                      >
                        Submit
                      </PrimaryButton>
                    </form>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex w-full flex-col gap-2 p-1">
              {task.checklistIds.length > 0 &&
                task.checklistIds.map((checkListId: string) => {
                  const checklist = kanban.checklists[checkListId]

                  return (
                    <div
                      className="flex w-full flex-col gap-2 rounded-md bg-neutral-600 p-2"
                      key={checkListId}
                    >
                      <div className="flex items-center gap-1 text-neutral-300">
                        <BiWindowAlt className="text-2xl" />

                        <input
                          type="text"
                          defaultValue={checklist.title}
                          className="text-md w-full rounded-md border border-transparent bg-transparent p-1 text-neutral-300 outline-none transition-colors focus:border-neutral-400/50 focus:bg-neutral-500/50"
                        />
                      </div>

                      <div className="flex flex-col gap-1">
                        {checklist.itemIds.map((itemId: string) => {
                          const item = kanban.items[itemId]

                          return (
                            <div
                              className="ml-1 flex items-center gap-1 rounded-md p-1 hover:bg-neutral-500/50"
                              key={itemId}
                            >
                              <input
                                hidden
                                id={itemId}
                                type="checkbox"
                                defaultChecked={item.checked}
                                className="peer h-4 w-4 rounded-md border border-neutral-400 text-sm"
                              />

                              <label
                                tabIndex={0}
                                htmlFor={itemId}
                                onKeyDown={handleKeyDown}
                                className="flex h-5 w-5 items-center justify-center rounded-sm bg-neutral-300 transition-colors peer-checked:bg-indigo-500"
                              >
                                <BiCheck className="text-xl text-neutral-300" />
                              </label>

                              <input
                                defaultValue={item.title}
                                className="w-full rounded-md border border-transparent bg-transparent p-2 text-sm text-neutral-300 outline-none transition-colors focus:border-neutral-400/50 focus:bg-neutral-800/50"
                              />
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  )
                })}
            </div>
          </div>
        </div>
      </div>
    </Modal>
  )
}
