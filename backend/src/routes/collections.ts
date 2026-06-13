import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'
import { categorizeRisk } from '../services/riskEngine'

const router = Router()
router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const loans = await prisma.loan.findMany({
      where: { status: { in: ['OVERDUE', 'DEFAULT'] } },
      include: { client: { select: { firstName: true, lastName: true, phone: true } } },
    })
    const categorized = loans.map(l => {
      const daysOverdue = l.nextDueDate ? Math.floor((Date.now() - new Date(l.nextDueDate).getTime()) / (1000 * 60 * 60 * 24)) : 0
      return { ...l, daysOverdue, riskCategory: categorizeRisk(Math.max(0, daysOverdue)) }
    })
    res.json({ success: true, data: categorized })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch collections' })
  }
})

export default router
