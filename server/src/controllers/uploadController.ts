import uploadServices from '@/services/uploadServices'
import { Request, Response } from 'express'

async function uploadImage(req: Request, res: Response) {
  try {
    const { media } = req.files

    const response = await uploadServices.uploadImage(media)

    res.status(200).json(response)
  } catch (error) {
    res.status(error.status || 500).json(error.message)
  }
}

export default { uploadImage }
