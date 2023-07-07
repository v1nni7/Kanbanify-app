import { randomUUID } from 'node:crypto'
import { forbiddenError, notFoundError } from '@/errors/httpErrors'
import boardRepository from '@/repositories/boardRepository'
import columnRepository, {
  CreateColumnParams,
  UpdateColumnOrderParams,
} from '@/repositories/columnRepository'

async function createColumn(body: CreateColumnParams, userId: string) {
  const { boardURL } = body

  await validateBoardExistsOrFail(boardURL)

  await validateUserHasPermissionOrFail(userId, boardURL)

  const columnId = randomUUID()

  await columnRepository.createColumn({ ...body, columnId })

  return { ...body, id: columnId }
}

async function updateTitle(body: CreateColumnParams, userId: string) {
  const { boardURL } = body

  await validateBoardExistsOrFail(boardURL)

  await validateUserHasPermissionOrFail(userId, boardURL)

  await columnRepository.updateTitle(body)
}

async function updateOrder(body: UpdateColumnOrderParams, userId: string) {
  const { boardURL } = body

  await validateBoardExistsOrFail(boardURL)

  await validateUserHasPermissionOrFail(userId, boardURL)

  await columnRepository.updateOrder(body)
}

async function validateBoardExistsOrFail(boardURL?: string) {
  const board = await boardRepository.findBoardByURL(boardURL)

  if (!board) {
    throw notFoundError('Board not found')
  }
}

async function validateUserHasPermissionOrFail(
  userId?: string,
  boardURL?: string,
) {
  const board = await boardRepository.findBoardByURL(boardURL)

  const member = board.members[userId]

  if (!member) {
    throw forbiddenError("You don't have permission to do this action")
  }
}

export default {
  createColumn,
  updateTitle,
  updateOrder,
  validateBoardExistsOrFail,
  validateUserHasPermissionOrFail,
}
