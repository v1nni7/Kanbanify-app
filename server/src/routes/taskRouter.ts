import { Router } from 'express'
import taskController from '@/controllers/taskController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'

const taskRouter = Router()

taskRouter
  .all('*', validateTokenMiddleware)
  .post('/:boardURL', taskController.createTask)
  .post('/image/:boardURL', taskController.upsertImage)
  .post('/description/:boardURL', taskController.upsertDescription)
  .put('/title/:boardURL', taskController.updateTitle)
  .put('/order/:boardURL', taskController.updateOrder)
  .put('/column/:boardURL', taskController.updateTaskColumn)

export default taskRouter
