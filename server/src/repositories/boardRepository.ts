import { boardCollection } from '@/config/mongo'

export type CreateBoardParams = {
  userId: number
  name: string
  url: string
  background: string
}

function createBoard({ name, url, userId, background }: CreateBoardParams) {
  boardCollection.insertOne({
    url,
    name,
    userId,
    background,
    content: {
      tasks: {},
      columns: {},
      columnOrder: [],
    },
    members: {
      [userId]: {
        id: userId,
        hasPermission: true,
      },
    },
  })
}

function findBoardByUserId(userId: number) {
  return boardCollection.find({ userId }).toArray()
}

async function findBoardByURL(boardURL: string) {
  return boardCollection.findOne({
    url: boardURL,
  })
}

export default {
  createBoard,
  findBoardByUserId,
  findBoardByURL,
}
