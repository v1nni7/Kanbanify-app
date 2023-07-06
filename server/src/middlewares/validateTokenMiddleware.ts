import { Request, Response, NextFunction } from 'express'
import jwt, { JwtPayload } from 'jsonwebtoken'

export default function validateTokenMiddleware(
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const { authorization } = req.headers
  const token = authorization?.replace('Bearer ', '')

  if (!token) {
    return res.sendStatus(401)
  }

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload

    res.locals.userId = decoded.id

    next()
  } catch (error) {
    res.sendStatus(401)
  }
}
