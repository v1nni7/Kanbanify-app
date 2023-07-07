import { Router } from 'express'
import taskController from '@/controllers/taskController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const taskRouter = Router()

taskRouter
  .all('*', validateTokenMiddleware)
  .post('/:boardURL', taskController.createTask)
  .post('/description/:boardURL', taskController.upsertDescription)

export default taskRouter
