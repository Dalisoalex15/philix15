import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import helmet from 'helmet'
import compression from 'compression'
import rateLimit from 'express-rate-limit'
import logger from './lib/logger'
import authRoutes from './routes/auth'
import dashboardRoutes from './routes/dashboard'
import clientRoutes from './routes/clients'
import collateralRoutes from './routes/collateral'
import loanRoutes from './routes/loans'
import paymentRoutes from './routes/payments'
import collectionRoutes from './routes/collections'
import reportRoutes from './routes/reports'
import accountingRoutes from './routes/accounting'
import userRoutes from './routes/users'

const app = express()
const PORT = process.env.PORT || 3001

app.use(helmet())
app.use(cors({ origin: process.env.FRONTEND_URL || 'http://localhost:3000', credentials: true }))
app.use(compression())
app.use(express.json({ limit: '10mb' }))
app.use(express.urlencoded({ extended: true }))

const limiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 500, standardHeaders: true, legacyHeaders: false })
app.use('/api/', limiter)

const authLimiter = rateLimit({ windowMs: 15 * 60 * 1000, max: 20 })
app.use('/api/v1/auth/login', authLimiter)

app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/dashboard', dashboardRoutes)
app.use('/api/v1/clients', clientRoutes)
app.use('/api/v1/collateral', collateralRoutes)
app.use('/api/v1/loans', loanRoutes)
app.use('/api/v1/payments', paymentRoutes)
app.use('/api/v1/collections', collectionRoutes)
app.use('/api/v1/reports', reportRoutes)
app.use('/api/v1/accounting', accountingRoutes)
app.use('/api/v1/users', userRoutes)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString(), service: 'Philix Finance API' })
})

app.use((req, res) => res.status(404).json({ success: false, message: 'Route not found' }))

app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(err)
  res.status(500).json({ success: false, message: 'Internal server error' })
})

app.listen(PORT, () => logger.info(`Philix Finance API running on port ${PORT}`))

export default app
