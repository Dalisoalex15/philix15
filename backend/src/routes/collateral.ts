import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

router.get('/', async (req, res) => {
  try {
    const { status, assetType } = req.query
    const where: any = {}
    if (status) where.status = status
    if (assetType) where.assetType = assetType
    const items = await prisma.collateral.findMany({ where, include: { client: { select: { firstName: true, lastName: true } } }, orderBy: { createdAt: 'desc' } })
    res.json({ success: true, data: items })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch collateral' })
  }
})

router.get('/stats', async (req, res) => {
  try {
    const [total, held, released, totalValue] = await Promise.all([
      prisma.collateral.count(),
      prisma.collateral.count({ where: { status: 'HELD' } }),
      prisma.collateral.count({ where: { status: 'RELEASED' } }),
      prisma.collateral.aggregate({ _sum: { marketValue: true } }),
    ])
    res.json({ success: true, data: { total, held, released, totalValue: totalValue._sum.marketValue } })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch stats' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const item = await prisma.collateral.findUnique({
      where: { id: req.params.id },
      include: { client: true, loan: true, movements: { orderBy: { performedAt: 'desc' } } },
    })
    if (!item) return res.status(404).json({ success: false, message: 'Collateral not found' })
    res.json({ success: true, data: item })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch collateral item' })
  }
})

router.post('/', async (req, res) => {
  try {
    const count = await prisma.collateral.count()
    const vaultId = `PHX-${new Date().getFullYear()}-${String(count + 1001).padStart(4, '0')}`
    const item = await prisma.collateral.create({ data: { ...req.body, vaultId, heldAt: new Date() } })
    res.status(201).json({ success: true, data: item })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to register collateral' })
  }
})

router.post('/:id/release', async (req, res) => {
  try {
    const item = await prisma.collateral.update({
      where: { id: req.params.id },
      data: { status: 'RELEASED', releasedAt: new Date() },
    })
    await prisma.collateralMovement.create({
      data: { collateralId: req.params.id, action: 'RELEASED', fromStatus: 'HELD', toStatus: 'RELEASED', notes: req.body.notes, performedBy: (req as any).user?.userId },
    })
    res.json({ success: true, data: item })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to release collateral' })
  }
})

export default router
