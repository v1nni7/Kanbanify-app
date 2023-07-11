import { randomUUID } from 'node:crypto'
import taskRepository, {
  CreateTaskParams,
  UpdateTaskColumnParams,
  UpdateTaskImageParams,
  UpdateTaskOrderParams,
  UpsertDescriptionParams,
} from '@/repositories/taskRepository'
import columnService from './columnService'

async function createTask(body: CreateTaskParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  const taskId = randomUUID()

  await taskRepository.createTask({ ...body, taskId })

  return { ...body, id: taskId }
}

async function updateTitle(body: CreateTaskParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateTitle(body)
}

async function updateOrder(body: UpdateTaskOrderParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateOrder(body)
}

async function updateTaskColumn(body: UpdateTaskColumnParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.updateTaskColumn(body)
}

async function upsertImage(body: UpdateTaskImageParams, userId: string) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.upsertImage(body)
}

async function upsertDescription(
  body: UpsertDescriptionParams,
  userId: string,
) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.upsertDescription(body)
}

export default {
  createTask,
  updateTitle,
  updateOrder,
  updateTaskColumn,
  upsertImage,
  upsertDescription,
}
