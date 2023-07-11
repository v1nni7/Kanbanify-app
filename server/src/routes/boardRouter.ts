import boardController from '@/controllers/boardController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'
import { Router } from 'express'

const boardRouter = Router()

boardRouter
  .all('/', validateTokenMiddleware)
  .get('/', boardController.getBoards)
  .get('/:boardURL', boardController.getBoardContent)
  .post('/', boardController.createBoard)

export default boardRouter
