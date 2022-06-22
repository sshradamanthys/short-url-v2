import 'dotenv/config'
import './database/connect.js'
import cors from 'cors'
import express from 'express'
import authRouter from './routes/auth.js'
import linkRouter from './routes/link.js'
import redirectRouter from './routes/redirect.js'
import cookieParser from 'cookie-parser'

const app = express()

const whiteList = [process.env.ORIGIN_REACT, process.env.ORIGIN_VUE]
app.use(
  cors({
    origin: function (origin, cb) {
      if (!origin || whiteList.includes(origin)) return cb(null, origin)

      return cb('Cors Error: Unauthorized Origin')
    }
  })
)

app.use(express.json())
app.use(express.static('public'))
app.use(cookieParser())
app.use('/api/v1', authRouter)
app.use('/api/v1/link', linkRouter)
app.use('/', redirectRouter)

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
