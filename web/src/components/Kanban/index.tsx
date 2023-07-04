'use client'

import { useCallback, useContext, useEffect } from 'react'
import { DragDropContext, Droppable } from 'react-beautiful-dnd'

import { KanbanContext } from '@/context/KanbanContext'
import { getBoard } from '@/services/board'

import InnerListColumn from './InnerListColumn'
import FormCreateColumn from '../_Form/FormCreateColumn'

export default function Kanban({ boardURL }: { boardURL: string }) {
  const { kanban, setKanban, handleDragEnd, setBoardURL } =
    useContext(KanbanContext)

  const loadingBoard = useCallback(async () => {
    try {
      const { status, data } = await getBoard(boardURL)

      if (status !== 200) {
        throw new Error('Error to get kanban board')
      }

      setBoardURL(boardURL)
      setKanban(data.content)
    } catch (error) {
      console.log(error)
    }
  }, [boardURL, setBoardURL, setKanban])

  useEffect(() => {
    loadingBoard()
  }, [loadingBoard])

  return (
    <>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable
          droppableId="all-columns"
          direction="horizontal"
          type="column"
        >
          {({ droppableProps, innerRef, placeholder }) => (
            <div className="flex h-full" {...droppableProps} ref={innerRef}>
              {kanban &&
                kanban.columnOrder?.map((columnId: string, index: number) => {
                  const column = kanban.columns[columnId]

                  return (
                    <InnerListColumn
                      key={column.id}
                      boardURL={boardURL}
                      taskMap={kanban.tasks}
                      column={column}
                      index={index}
                    />
                  )
                })}

              {placeholder}

              {kanban && kanban.columnOrder?.length < 4 && (
                <div className="inline-block h-full scroll-m-2 whitespace-nowrap align-top">
                  <div className="mr-2 w-[300px] rounded-md bg-neutral-800 p-2">
                    <FormCreateColumn boardURL={boardURL} />
                  </div>
                </div>
              )}
            </div>
          )}
        </Droppable>
      </DragDropContext>
    </>
  )
}
