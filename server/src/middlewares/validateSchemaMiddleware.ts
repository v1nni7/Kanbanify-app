import { Request, Response, NextFunction } from 'express'
import { ObjectSchema } from 'joi'

export default function validateSchemaMiddleware(schema: ObjectSchema) {
  return async (req: Request, res: Response, next: NextFunction) => {
    const { body } = req
    const { error } = schema.validate(body)

    if (error) {
      return res.status(400).json({ message: error.message })
    }

    next()
  }
}
