'use client'

import { Draggable } from 'react-beautiful-dnd'

type TaskProps = {
  task: {
    id: string
    title: string
    coverURL: string
    description: string
    checklists: [
      {
        id: string
        title: string
        items: [
          {
            id: string
            title: string
            checked: boolean
          },
        ]
      },
    ]
  }
  index: number
}

export default function Task({ task, index }: TaskProps) {
  return (
    <>
      <Draggable draggableId={task.id} index={index}>
        {({ dragHandleProps, draggableProps, innerRef }) => (
          <div
            /* onClick={() => toggleShow()} */
            className="group mb-2"
            {...draggableProps}
            {...dragHandleProps}
            ref={innerRef}
          >
            <div className="h-full rounded-md bg-neutral-700 p-2 group-active:rotate-2 group-active:bg-neutral-700/80">
              <h1 className="text-sm text-neutral-400">{task.title}</h1>
            </div>
          </div>
        )}
      </Draggable>

      {/* <ModalTask task={task} show={show} element={element} width="large" /> */}
    </>
  )
}
