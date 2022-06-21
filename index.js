import 'dotenv/config'
import express from 'express'
import './database/connect.js'
import authRouter from './routes/auth.js'
import linkRouter from './routes/link.js'
import redirectRouter from './routes/redirect.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/v1', authRouter)
app.use('/api/v1/link', linkRouter)
app.use('/', redirectRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
