import { boardCollection } from '@/config/mongo'

export type CreateTaskParams = {
  title: string
  taskId: string
  columnId: string
  boardURL: string
}

export type UpdateTaskOrderParams = {
  taskIds: string
  columnId: string
  boardURL: string
}

export type UpsertDescriptionParams = {
  taskId: string
  boardURL: string
  description: string
}

export type UpdateTaskColumnParams = {
  taskId: string
  sourceId: string
  destinationId: string
  taskOrder: string[]
  boardURL: string
}

export type UpdateTaskImageParams = {
  taskId: string
  boardURL: string
  coverURL: string
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

function updateTitle({ title, taskId, boardURL }: CreateTaskParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}.title`]: title,
      },
    },
  )
}

function updateOrder({ columnId, taskIds, boardURL }: UpdateTaskOrderParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columns.${columnId}.taskIds`]: taskIds,
      },
    },
  )
}

function updateTaskColumn({
  taskId,
  sourceId,
  destinationId,
  taskOrder,
  boardURL,
}: UpdateTaskColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $pull: {
        [`content.columns.${sourceId}.taskIds`]: taskId,
      },
      $set: {
        [`content.columns.${destinationId}.taskIds`]: taskOrder,
      },
    },
  )
}

function upsertImage({ coverURL, taskId, boardURL }: UpdateTaskImageParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.tasks.${taskId}.coverURL`]: coverURL,
      },
    },
    { upsert: true },
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

export default {
  createTask,
  updateTitle,
  updateOrder,
  updateTaskColumn,
  upsertImage,
  upsertDescription,
}
