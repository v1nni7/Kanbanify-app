'use client'

import { ReactNode, createContext, useCallback, useState } from 'react'
import {
  updateColumnOrder,
  updateTaskOrder,
  updateTaskToNewColumn,
} from '@/services/board'

type BoardContextProviderProps = {
  children: ReactNode
}

export const KanbanContext = createContext({} as any)

export default function KanbanContextProvider({
  children,
}: BoardContextProviderProps) {
  const [kanban, setKanban] = useState<any>(null)
  const [boardURL, setBoardURL] = useState<string>('')

  const handleUpdateTaskToNewColumn = async (
    content: any,
    differentColumn = false,
  ) => {
    try {
      if (differentColumn) {
        await updateTaskToNewColumn(content, boardURL)
        return
      }

      await updateTaskOrder(content, boardURL)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateColumnOrder = async (content: any) => {
    try {
      const newColumnOrder = content.columnOrder

      await updateColumnOrder(newColumnOrder, boardURL)
    } catch (error) {
      console.log(error)
    }
  }

  const handleUpdateBoard = () => {
    console.log('Função inativa')
  }

  const handleDragEnd = useCallback(
    ({ destination, source, draggableId, type }: any) => {
      if (!kanban) {
        return
      }

      if (!destination) {
        return
      }

      if (
        destination.droppableId === source.droppbleId &&
        destination.index === source.index
      ) {
        return
      }

      if (type === 'column') {
        const newColumnOrder = Array.from(kanban.columnOrder)
        newColumnOrder.splice(source.index, 1)
        newColumnOrder.splice(destination.index, 0, draggableId)

        const newState = {
          ...kanban,
          columnOrder: newColumnOrder,
        }

        setKanban(newState)
        handleUpdateColumnOrder(newState)
        return
      }

      const start = kanban?.columns[source.droppableId]
      const finish = kanban?.columns[destination.droppableId]

      if (start === finish) {
        const newTaskIds = Array.from(start.taskIds)
        newTaskIds.splice(source.index, 1)
        newTaskIds.splice(destination.index, 0, draggableId)

        const newColumn = {
          ...start,
          taskIds: newTaskIds,
        }

        const newBoardData: any = {
          ...kanban,
          columns: {
            ...kanban?.columns,
            [newColumn.id]: newColumn,
          },
        }

        setKanban(newBoardData)

        const content = {
          columnId: source.droppableId,
          taskIds: newTaskIds,
        }

        handleUpdateTaskToNewColumn(content, false)
        return
      }

      // Movendo de uma lista para outra
      const startTaskIds = Array.from(start.taskIds)
      startTaskIds.splice(source.index, 1)
      const newStart = {
        ...start,
        taskIds: startTaskIds,
      }

      const finishTaskIds = Array.from(finish.taskIds)
      finishTaskIds.splice(destination.index, 0, draggableId)
      const newFinish = {
        ...finish,
        taskIds: finishTaskIds,
      }

      const newState = {
        ...kanban,
        columns: {
          ...kanban?.columns,
          [newStart.id]: newStart,
          [newFinish.id]: newFinish,
        },
      }

      setKanban(newState)
      const sourceColumnId = source.droppableId
      const destinationColumnId = destination.droppableId

      const content = {
        taskId: draggableId,
        sourceColumnId,
        destinationColumnId,
        newTaskOrder: finishTaskIds,
      }
      handleUpdateTaskToNewColumn(content, true)
    },
    [kanban],
  )

  return (
    <KanbanContext.Provider
      value={{
        kanban,
        setKanban,
        handleUpdateBoard,
        handleDragEnd,
        setBoardURL,
      }}
    >
      {children}
    </KanbanContext.Provider>
  )
}
