import boardController from '@/controllers/boardController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'
import { Router } from 'express'

const boardRouter = Router()

boardRouter
  .all('/', validateTokenMiddleware)
  .get('/', boardController.getBoards)
  .get('/:boardURL', boardController.getBoardContent)
  .post('/', boardController.createBoard)
  .post('/task/:boardURL', boardController.createTask)
  .post('/task/image/:boardURL', boardController.upsertTaskImage)
  .post(
    '/task/description/:boardURL',
    boardController.updateOrCreateTaskDescription,
  )
  .put('/:boardURL', boardController.updateBoard)
  .put('/task/title/:boardURL', boardController.updateTaskTitle)
  .put('/taskOrder/:boardURL', boardController.updateTaskOrder)
  .put('/task/column/:boardURL', boardController.updateTaskToNewColumn)

export default boardRouter
