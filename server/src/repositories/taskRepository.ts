import { boardCollection } from '@/config/mongo'

export type CreateTaskParams = {
  title: string
  taskId: string
  columnId: string
  boardURL: string
}

export type UpdateTaskOrderParams = {
  taskId: string
  columnId: string
  boardURL: string
}

function createTask({ title, taskId, columnId, boardURL }: CreateTaskParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}`]: {
          id: taskId,
          title,
          description: '',
        },
      },
      $push: {
        [`content.columns.${columnId}.taskIds`]: taskId,
      },
    },
  )
}

export default { createTask }
