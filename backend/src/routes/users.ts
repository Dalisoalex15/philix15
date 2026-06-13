import { Router } from 'express'
import bcrypt from 'bcryptjs'
import prisma from '../lib/prisma'
import { verifyToken, requireRole } from '../middleware/auth'

const router = Router()
router.use(verifyToken)
router.use(requireRole('SUPER_ADMIN', 'MANAGER'))

router.get('/', async (req, res) => {
  try {
    const users = await prisma.user.findMany({ select: { id: true, email: true, firstName: true, lastName: true, role: true, isActive: true, lastLogin: true, createdAt: true } })
    res.json({ success: true, data: users })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to fetch users' })
  }
})

router.post('/', async (req, res) => {
  try {
    const { email, firstName, lastName, role, password } = req.body
    const hashed = await bcrypt.hash(password, 12)
    const user = await prisma.user.create({ data: { email, firstName, lastName, role, password: hashed } })
    const { password: _, ...safe } = user
    res.status(201).json({ success: true, data: safe })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to create user' })
  }
})

router.put('/:id', async (req, res) => {
  try {
    const { password, ...data } = req.body
    const updateData: any = data
    if (password) updateData.password = await bcrypt.hash(password, 12)
    const user = await prisma.user.update({ where: { id: req.params.id }, data: updateData })
    const { password: _, ...safe } = user
    res.json({ success: true, data: safe })
  } catch {
    res.status(500).json({ success: false, message: 'Failed to update user' })
  }
})

export default router
