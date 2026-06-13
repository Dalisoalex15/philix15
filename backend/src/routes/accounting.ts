import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

router.get('/summary', async (req, res) => {
  try {
    const [payments, expenses, investors] = await Promise.all([
      prisma.payment.aggregate({ _sum: { amount: true, interestPaid: true } }),
      prisma.expense.aggregate({ _sum: { amount: true } }),
      prisma.investor.findMany(),
    ])
    res.json({ success: true, data: { totalCollections: payments._sum.amount, totalInterest: payments._sum.interestPaid, totalExpenses: expenses._sum.amount, investors } })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to get accounting summary' })
  }
})

router.get('/expenses', async (req, res) => {
  try {
    const expenses = await prisma.expense.findMany({ orderBy: { date: 'desc' } })
    res.json({ success: true, data: expenses })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch expenses' })
  }
})

router.post('/expenses', async (req, res) => {
  try {
    const expense = await prisma.expense.create({ data: { ...req.body, recordedById: (req as any).user?.userId } })
    res.status(201).json({ success: true, data: expense })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create expense' })
  }
})

router.get('/investors', async (req, res) => {
  try {
    const investors = await prisma.investor.findMany()
    res.json({ success: true, data: investors })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch investors' })
  }
})

router.post('/investors', async (req, res) => {
  try {
    const investor = await prisma.investor.create({ data: req.body })
    res.status(201).json({ success: true, data: investor })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create investor' })
  }
})

export default router
