import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

router.post('/', async (req, res) => {
  try {
    const { loanId, amount, paymentMethod, referenceNumber, notes } = req.body
    const loan = await prisma.loan.findUnique({ where: { id: loanId } })
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' })

    const count = await prisma.payment.count()
    const paymentNumber = `PAY-${new Date().getFullYear()}-${String(count + 1).padStart(6, '0')}`
    const interestPaid = Number(amount) * (Number(loan.totalInterest) / Number(loan.totalAmount))
    const principalPaid = Number(amount) - interestPaid

    const payment = await prisma.payment.create({
      data: {
        paymentNumber, loanId, clientId: loan.clientId, amount, interestPaid, principalPaid,
        paymentMethod, referenceNumber, notes, recordedById: (req as any).user?.userId,
        paymentDate: new Date(),
      },
    })

    const newBalance = Math.max(0, Number(loan.outstandingBalance) - principalPaid)
    await prisma.loan.update({ where: { id: loanId }, data: { outstandingBalance: newBalance, status: newBalance === 0 ? 'PAID' : loan.status } })

    res.status(201).json({ success: true, data: payment })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to record payment' })
  }
})

router.get('/loan/:loanId', async (req, res) => {
  try {
    const payments = await prisma.payment.findMany({ where: { loanId: req.params.loanId }, orderBy: { paymentDate: 'desc' } })
    res.json({ success: true, data: payments })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch payments' })
  }
})

export default router
