import { Request, Response } from 'express'
import feedbackServices from '@/services/feedbackServices'

async function createFeedback(req: Request, res: Response) {
  try {
    const { body } = req
    const { userId } = res.locals

    await feedbackServices.createFeedback({ ...body, userId })

    res.sendStatus(201)
  } catch (error) {
    console.log(error)
    if (error.status && error.message) {
      return res.status(error.status).send(error.message)
    }

    return res.status(500).send('Internal server error')
  }
}

export default { createFeedback }
