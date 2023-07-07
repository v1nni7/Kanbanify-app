import { Request, Response } from 'express'
import taskService from '@/services/taskService'

async function createTask(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    const newTask = await taskService.createTask({ ...body, boardURL }, userId)

    return res.status(201).json({ ...newTask })
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function upsertDescription(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await taskService.upsertDescription({ ...body, boardURL }, userId)

    return res.sendStatus(200)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

export default { createTask, upsertDescription }
