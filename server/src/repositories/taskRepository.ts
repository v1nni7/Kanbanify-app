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

export type UpsertDescriptionParams = {
  taskId: string
  boardURL: string
  description: string
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

function upsertDescription({
  description,
  taskId,
  boardURL,
}: UpsertDescriptionParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}.description`]: description,
      },
    },
    { upsert: true },
  )
}

export default { createTask, upsertDescription }
