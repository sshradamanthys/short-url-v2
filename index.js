import express from 'express'
import 'dotenv/config'
import './database/connect.js'

const app = express()

app.get('/', (req, res) => res.send('<h1>Testing Server</h1>'))

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`listening on port ${PORT}`))
