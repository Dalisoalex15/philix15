import { Router } from 'express'
import { z } from 'zod'
import prisma from '../lib/prisma'
import { verifyToken } from '../middleware/auth'

const router = Router()
router.use(verifyToken)

const clientSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  nrcNumber: z.string().min(9),
  phone: z.string().min(10),
  email: z.string().email().optional(),
  address: z.string().min(1),
  occupation: z.string().optional(),
  employerName: z.string().optional(),
  salary: z.number().optional(),
  payDate: z.number().optional(),
  businessName: z.string().optional(),
  businessType: z.string().optional(),
  marketLocation: z.string().optional(),
  monthlyRevenue: z.number().optional(),
  studentId: z.string().optional(),
  university: z.string().optional(),
})

router.get('/', async (req, res) => {
  try {
    const { search, status, page = '1', limit = '20' } = req.query
    const where: any = {}
    if (status) where.status = status
    if (search) where.OR = [
      { firstName: { contains: search as string, mode: 'insensitive' } },
      { lastName: { contains: search as string, mode: 'insensitive' } },
      { nrcNumber: { contains: search as string } },
      { phone: { contains: search as string } },
      { clientCode: { contains: search as string, mode: 'insensitive' } },
    ]
    const [clients, total] = await Promise.all([
      prisma.client.findMany({ where, skip: (parseInt(page as string) - 1) * parseInt(limit as string), take: parseInt(limit as string), orderBy: { createdAt: 'desc' } }),
      prisma.client.count({ where }),
    ])
    res.json({ success: true, data: { clients, total, page: parseInt(page as string), limit: parseInt(limit as string) } })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Failed to fetch clients' })
  }
})

router.get('/:id', async (req, res) => {
  try {
    const client = await prisma.client.findUnique({
      where: { id: req.params.id },
      include: { loans: { orderBy: { createdAt: 'desc' } }, collateral: true, notes: { orderBy: { createdAt: 'desc' } } },
    })
    if (!client) return res.status(404).json({ success: false, message: 'Client not found' })
    res.json({ success: true, data: client })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch client' })
  }
})

router.post('/', async (req, res) => {
  try {
    const data = clientSchema.parse(req.body)
    const count = await prisma.client.count()
    const clientCode = `CLT-${new Date().getFullYear()}-${String(count + 1).padStart(4, '0')}`
    const client = await prisma.client.create({ data: { ...data, clientCode } })
    res.status(201).json({ success: true, data: client })
  } catch (err: any) {
    if (err.name === 'ZodError') return res.status(400).json({ success: false, message: err.errors })
    res.status(500).json({ success: false, message: 'Failed to create client' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const data = clientSchema.partial().parse(req.body)
    const client = await prisma.client.update({ where: { id: req.params.id }, data })
    res.json({ success: true, data: client })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to update client' })
  }
})

router.post('/:id/notes', async (req, res) => {
  try {
    const note = await prisma.clientNote.create({
      data: { clientId: req.params.id, content: req.body.content, type: req.body.type || 'GENERAL', createdById: (req as any).user?.userId },
    })
    res.status(201).json({ success: true, data: note })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to add note' })
  }
})

export default router
