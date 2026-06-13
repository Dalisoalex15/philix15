import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

router.get('/stats', async (req, res) => {
  try {
    const [
      totalClients, activeLoansCount, pendingApprovals, overdueLoans,
      totalOutstanding, collateralCount, collateralValue,
      todayLoans, paidLoans, defaultLoans
    ] = await Promise.all([
      prisma.client.count(),
      prisma.loan.count({ where: { status: 'ACTIVE' } }),
      prisma.loan.count({ where: { status: 'PENDING' } }),
      prisma.loan.count({ where: { status: 'OVERDUE' } }),
      prisma.loan.aggregate({ _sum: { outstandingBalance: true }, where: { status: { in: ['ACTIVE', 'OVERDUE'] } } }),
      prisma.collateral.count({ where: { status: 'HELD' } }),
      prisma.collateral.aggregate({ _sum: { marketValue: true } }),
      prisma.loan.count({ where: { disbursedAt: { gte: new Date(new Date().setHours(0,0,0,0)) } } }),
      prisma.loan.count({ where: { status: 'PAID' } }),
      prisma.loan.count({ where: { status: 'DEFAULT' } }),
    ])
    const totalLoans = activeLoansCount + paidLoans + defaultLoans + overdueLoans
    res.json({
      success: true, data: {
        totalClients, activeLoans: activeLoansCount, pendingApprovals, overdueLoans,
        totalOutstanding: totalOutstanding._sum.outstandingBalance ?? 0,
        collateralHeld: collateralCount, collateralValue: collateralValue._sum.marketValue ?? 0,
        loansToday: todayLoans, defaultRate: totalLoans > 0 ? (defaultLoans / totalLoans * 100).toFixed(1) : 0,
      }
    })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch dashboard stats' })
  }
})

export default router
