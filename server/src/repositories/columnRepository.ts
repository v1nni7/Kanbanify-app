import { boardCollection } from '@/config/mongo'

export type CreateColumnParams = {
  title: string
  columnId: string
  boardURL: string
}

export type UpdateColumnOrderParams = {
  boardURL: string
  columnOrder: string[]
}

function createColumn({ title, columnId, boardURL }: CreateColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columns.${columnId}`]: {
          id: columnId,
          title,
          taskIds: [],
        },
      },
      $push: {
        [`content.columnOrder`]: columnId,
      },
    },
  )
}

function updateTitle({ title, columnId, boardURL }: CreateColumnParams) {
  return boardCollection.updateOne(
    { url: boardURL },
    {
      $set: {
        [`content.columns.${columnId}.title`]: title,
      },
    },
  )
}

function updateOrder({ columnOrder, boardURL }: UpdateColumnOrderParams) {
  return boardCollection.updateOne(
    {
      url: boardURL,
    },
    {
      $set: {
        [`content.columnOrder`]: columnOrder,
      },
    },
  )
}

export default { createColumn, updateTitle, updateOrder }
