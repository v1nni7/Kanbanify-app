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

async function updateTitle(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await taskService.updateTitle({ ...body, boardURL }, userId)

    return res.sendStatus(200)
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

    await taskService.updateOrder(
      { ...body, taskIds: body.taskIds, boardURL },
      userId,
    )

    return res.sendStatus(200)
  } catch (error) {
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function updateTaskColumn(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await taskService.updateTaskColumn(
      { ...body, taskOrder: body.taskOrder, boardURL },
      userId,
    )

    return res.sendStatus(200)
  } catch (error) {
    console.log(error)
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

async function upsertImage(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals
    const { boardURL } = req.params

    await taskService.upsertImage({ ...body, boardURL }, userId)

    return res.sendStatus(200)
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

export default {
  createTask,
  updateTitle,
  updateOrder,
  updateTaskColumn,
  upsertImage,
  upsertDescription,
}
