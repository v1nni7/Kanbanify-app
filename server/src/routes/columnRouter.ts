import columnController from '@/controllers/columnController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'
import { Router } from 'express'

const columnRouter = Router()

columnRouter
  .all('*', validateTokenMiddleware)
  .post('/:boardURL', columnController.createColumn)
  .put('/:boardURL', columnController.updateTitle)
  .put('/order/:boardURL', columnController.updateOrder)

export default columnRouter
