import { Request, Response } from 'express'
import boardServices from '@/services/boardServices'

async function getBoards(req: Request, res: Response) {
  try {
    const { userId } = res.locals

    const boards = await boardServices.getBoardsByUserId(userId)

    res.status(200).json(boards)
  } catch (error) {
    console.log(error)
  }
}

async function getBoardContent(req: Request, res: Response) {
  try {
    const { boardURL } = req.params

    const board = await boardServices.getBoardByURL(boardURL)

    res.status(200).json(board)
  } catch (error) {
    console.log(error)
  }
}

async function createBoard(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals

    const newBoard = await boardServices.createBoard({ ...body, userId })

    res.status(201).json({ ...newBoard })
  } catch (error) {
    console.log(error)
  }
}

export default { getBoards, getBoardContent, createBoard }
