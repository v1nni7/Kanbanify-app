import { prisma } from '@/config/database'
import { Feedback } from '@prisma/client'

export type CreateFeedbackParams = Omit<
  Feedback,
  'id' | 'createdAt' | 'updatedAt'
>

function createFeedback(data: CreateFeedbackParams) {
  return prisma.feedback.create({
    data,
  })
}

export default { createFeedback }
