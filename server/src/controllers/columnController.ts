import { Request, Response } from 'express'
import columnService from '@/services/columnService'

async function createColumn(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    const createdColumn = await columnService.createColumn(
      { ...body, boardURL },
      userId,
    )

    return res.status(201).send(createdColumn)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function updateTitle(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await columnService.updateTitle({ ...body, boardURL }, userId)

    res.sendStatus(200)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function updateOrder(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await columnService.updateOrder({ columnOrder: body, boardURL }, userId)

    res.sendStatus(200)
  } catch (error) {
    // console.log(error)
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

export default {
  createColumn,
  updateTitle,
  updateOrder,
}
