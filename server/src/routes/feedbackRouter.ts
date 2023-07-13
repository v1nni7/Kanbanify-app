import { Router } from 'express'
import feedbackController from '@/controllers/feedbackController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const feedbackRouter = Router()

feedbackRouter
  .all('*', validateTokenMiddleware)
  .post('/', feedbackController.createFeedback)

export default feedbackRouter
