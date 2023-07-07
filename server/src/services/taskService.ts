import { randomUUID } from 'node:crypto'
import taskRepository, {
  CreateTaskParams,
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

async function upsertDescription(
  body: UpsertDescriptionParams,
  userId: string,
) {
  const { boardURL } = body

  await columnService.validateBoardExistsOrFail(boardURL)

  await columnService.validateUserHasPermissionOrFail(userId, boardURL)

  await taskRepository.upsertDescription(body)
}

export default { createTask, upsertDescription }
