import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

router.get('/loans-issued', async (req, res) => {
  try {
    const { from, to } = req.query
    const where: any = {}
    if (from || to) where.createdAt = { ...(from ? { gte: new Date(from as string) } : {}), ...(to ? { lte: new Date(to as string) } : {}) }
    const loans = await prisma.loan.findMany({ where, include: { client: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } })
    res.json({ success: true, data: loans })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to generate report' })
  }
})

router.get('/outstanding', async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({ where: { status: { in: ['ACTIVE', 'OVERDUE', 'DEFAULT'] } }, include: { client: { select: { firstName: true, lastName: true } } } })
    const total = loans.reduce((s, l) => s + Number(l.outstandingBalance), 0)
    res.json({ success: true, data: { loans, totalOutstanding: total } })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to generate report' })
  }
})

export default router
