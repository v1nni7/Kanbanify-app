import { notFoundError } from '@/errors/httpErrors'
import feedabackRepository, {
  CreateFeedbackParams,
} from '@/repositories/feedabackRepository'
import userRepository from '@/repositories/userRepository'

async function createFeedback(feedback: CreateFeedbackParams) {
  const { userId } = feedback

  await validateUserExistsOrFail(userId)

  await feedabackRepository.createFeedback(feedback)
}

async function validateUserExistsOrFail(userId: string) {
  const user = await userRepository.findById(userId)

  if (!user) {
    throw notFoundError('User not found')
  }
}

export default { createFeedback }
