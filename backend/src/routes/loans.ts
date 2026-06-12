import { Router } from 'express'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'
import { calculateLoanSchedule, calculateTotalInterest, calculateProcessingFee } from '../services/loanCalculator'

const router = Router()
router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const { status, loanType, clientId } = req.query
    const where: any = {}
    if (status) where.status = status
    if (loanType) where.loanType = loanType
    if (clientId) where.clientId = clientId
    const loans = await prisma.loan.findMany({ where, include: { client: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } })
    res.json({ success: true, data: loans })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch loans' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const loan = await prisma.loan.findUnique({
      where: { id: req.params.id },
      include: { client: true, collateral: true, schedule: { orderBy: { installmentNumber: 'asc' } }, payments: { orderBy: { paymentDate: 'desc' } } },
    })
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' })
    res.json({ success: true, data: loan })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch loan' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { clientId, loanType, principal, interestRate, durationMonths, repaymentFrequency, collateralId, notes } = req.body
    const count = await prisma.loan.count()
    const loanNumber = `LN-${new Date().getFullYear()}-${String(count + 10001).padStart(5, '0')}`
    const totalInterest = calculateTotalInterest(principal, interestRate, durationMonths)
    const processingFee = calculateProcessingFee(principal)
    const loan = await prisma.loan.create({
      data: {
        loanNumber, clientId, loanType, principal, interestRate, processingFee,
        totalInterest, totalAmount: principal + totalInterest + processingFee,
        outstandingBalance: principal, repaymentFrequency, durationMonths, notes,
        loanOfficerId: (req as any).user?.userId,
        collateral: collateralId ? { connect: [{ id: collateralId }] } : undefined,
      },
    })
    res.status(201).json({ success: true, data: loan })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create loan' })
  }
})

router.post('/:id/approve', async (req, res) => {
  try {
    const loan = await prisma.loan.update({
      where: { id: req.params.id },
      data: { status: 'APPROVED', approvedById: (req as any).user?.userId, approvedAt: new Date() },
    })
    res.json({ success: true, data: loan })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to approve loan' })
  }
})

router.post('/:id/disburse', async (req, res) => {
  try {
    const loan = await prisma.loan.findUnique({ where: { id: req.params.id } })
    if (!loan) return res.status(404).json({ success: false, message: 'Loan not found' })
    const startDate = new Date()
    const schedule = calculateLoanSchedule(Number(loan.principal), Number(loan.interestRate), loan.durationMonths, loan.repaymentFrequency, startDate)
    const updated = await prisma.loan.update({
      where: { id: req.params.id },
      data: { status: 'ACTIVE', disbursedAt: startDate, startDate, disbursedAmount: Number(loan.principal) - Number(loan.processingFee) },
    })
    await prisma.loanSchedule.createMany({
      data: schedule.map(s => ({ loanId: loan.id, ...s })),
    })
    res.json({ success: true, data: updated })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to disburse loan' })
  }
})

export default router
