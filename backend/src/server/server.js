import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import morgan from 'morgan'

import * as middleware from './middlewares/index.js'
import APIv1 from './api/v1/routes/index.js'

const PORT = process.env.PORT
const app = express()

// Express Security Config
app.use(cors())
app.use(helmet())

// Express Midelware Config
app.use(express.urlencoded({ extended: true, limit: '5mb' }))
app.use(express.json({ limit: '5mb' }))
app.use(morgan('dev'))

// Express Routes Custom
app.use('/api/v1', APIv1)

// Express Routes System
app.use('/health', middleware.health)
app.use(middleware.notFound)

app.listen(PORT, () => console.log('Server UP!'))

export default app
