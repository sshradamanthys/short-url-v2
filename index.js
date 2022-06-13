import express from 'express'
import 'dotenv/config'
import './database/connect.js'
import authRouter from './routes/auth.js'
import cookieParser from 'cookie-parser'

const app = express()
app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/v1', authRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
