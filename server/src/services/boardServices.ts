import { randomUUID } from 'node:crypto'
import boardRepository, {
  CreateBoardParams,
} from '@/repositories/boardRepository'

async function createBoard(body: CreateBoardParams) {
  const boardURL = randomUUID()

  boardRepository.createBoard({ ...body, url: boardURL })

  return {
    ...body,
    url: boardURL,
    content: {
      tasks: {},
      columns: {},
      columnOrder: [],
    },
  }
}

async function getBoardsByUserId(userId: number) {
  return boardRepository.findBoardByUserId(userId)
}

async function getBoardByURL(boardURL: string) {
  return await boardRepository.findBoardByURL(boardURL)
}

export default { getBoardsByUserId, getBoardByURL, createBoard }
