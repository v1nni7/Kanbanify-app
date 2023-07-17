import uploadController from '@/controllers/uploadController'
import validateTokenMiddleware from '@/middlewares/validateTokenMiddleware'
import { Router } from 'express'

const uploadRouter = Router()

uploadRouter.post('/', validateTokenMiddleware, uploadController.uploadImage)

export default uploadRouter
