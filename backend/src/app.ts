import express from 'express'
import type { Application, Request, Response } from 'express'

const app: Application = express()

app.use(express.json()) // to accept json data

app.get('/api/health', (req, res) => {
  res.send('Api is Running')
})


export default app