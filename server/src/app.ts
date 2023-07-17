import express from 'express'
import fileupload from 'express-fileupload'
import cors from 'cors'
import router from './routes'

const app = express()

app.use(fileupload({ createParentPath: true }))
app.use(cors())
app.use(express.json())
app.use('/uploads', express.static(__dirname.concat('/uploads')))

app.use(router)

export default app
