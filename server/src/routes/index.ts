import { Router } from 'express'
import userRouter from './userRouter'
import boardRouter from './boardRouter'
import uploadRouter from './uploadRouter'
import columnRouter from './columnRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/upload', uploadRouter)
router.use('/columns', columnRouter)

export default router
