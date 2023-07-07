import { Router } from 'express'

import userRouter from './userRouter'
import boardRouter from './boardRouter'
import uploadRouter from './uploadRouter'
import columnRouter from './columnRouter'
import taskRouter from './taskRouter'

const router = Router()

router.use('/user', userRouter)
router.use('/boards', boardRouter)
router.use('/upload', uploadRouter)
router.use('/columns', columnRouter)
router.use('/tasks', taskRouter)

export default router
