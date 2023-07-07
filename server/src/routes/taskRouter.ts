import { Router } from 'express'
import taskController from '@/controllers/taskController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const taskRouter = Router()

taskRouter
  .all('*', validateTokenMiddleware)
  .post('/:boardURL', taskController.createTask)

export default taskRouter
