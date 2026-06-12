import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import { z } from 'zod';
import prisma from '../lib/prisma';
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from '../lib/jwt';
import { verifyToken } from '../middleware/auth';
import logger from '../lib/logger';

const router = Router();

// ─── Schemas ────────────────────────────────────────────────────────────────

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

const refreshSchema = z.object({
  refreshToken: z.string().min(1),
});

// ─── POST /api/v1/auth/login ─────────────────────────────────────────────────

router.post('/login', async (req: Request, res: Response) => {
  try {
    const parsed = loginSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        data: null,
        message: parsed.error.errors.map((e) => e.message).join(', '),
      });
    }

    const { email, password } = parsed.data;

    const user = await prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Invalid email or password',
      });
    }

    if (!user.isActive) {
      return res.status(403).json({
        success: false,
        data: null,
        message: 'Account is inactive. Please contact your administrator.',
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Invalid email or password',
      });
    }

    // Update lastLogin
    await prisma.user.update({
      where: { id: user.id },
      data: { lastLogin: new Date() },
    });

    const accessToken = generateAccessToken({ userId: user.id, email: user.email, role: user.role });
    const refreshToken = generateRefreshToken({ userId: user.id });

    // Persist session
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    await prisma.session.create({
      data: {
        userId: user.id,
        refreshToken,
        expiresAt,
        userAgent: req.headers['user-agent'] ?? null,
        ipAddress: (req.ip ?? req.socket?.remoteAddress) ?? null,
      },
    });

    logger.info(`User ${user.email} logged in`);

    return res.status(200).json({
      success: true,
      data: {
        accessToken,
        refreshToken,
        user: {
          id: user.id,
          email: user.email,
          firstName: user.firstName,
          lastName: user.lastName,
          role: user.role,
          isActive: user.isActive,
        },
      },
      message: 'Login successful',
    });
  } catch (error) {
    logger.error('Login error:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error',
    });
  }
});

// ─── POST /api/v1/auth/refresh ───────────────────────────────────────────────

router.post('/refresh', async (req: Request, res: Response) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'refreshToken is required',
      });
    }

    const { refreshToken } = parsed.data;

    // Verify the JWT signature first
    let payload: { userId: string };
    try {
      payload = verifyRefreshToken(refreshToken) as { userId: string };
    } catch {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Invalid or expired refresh token',
      });
    }

    // Check session exists in DB
    const session = await prisma.session.findFirst({
      where: {
        refreshToken,
        userId: payload.userId,
        expiresAt: { gt: new Date() },
      },
      include: { user: true },
    });

    if (!session) {
      return res.status(401).json({
        success: false,
        data: null,
        message: 'Session not found or expired',
      });
    }

    if (!session.user.isActive) {
      return res.status(403).json({
        success: false,
        data: null,
        message: 'Account is inactive',
      });
    }

    const newAccessToken = generateAccessToken({
      userId: session.user.id,
      email: session.user.email,
      role: session.user.role,
    });

    return res.status(200).json({
      success: true,
      data: { accessToken: newAccessToken },
      message: 'Token refreshed',
    });
  } catch (error) {
    logger.error('Refresh error:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error',
    });
  }
});

// ─── POST /api/v1/auth/logout ────────────────────────────────────────────────

router.post('/logout', async (req: Request, res: Response) => {
  try {
    const parsed = refreshSchema.safeParse(req.body);
    if (!parsed.success) {
      return res.status(400).json({
        success: false,
        data: null,
        message: 'refreshToken is required',
      });
    }

    const { refreshToken } = parsed.data;

    await prisma.session.deleteMany({ where: { refreshToken } });

    logger.info('User logged out');

    return res.status(200).json({
      success: true,
      data: null,
      message: 'Logged out successfully',
    });
  } catch (error) {
    logger.error('Logout error:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error',
    });
  }
});

// ─── GET /api/v1/auth/me ─────────────────────────────────────────────────────

router.get('/me', verifyToken, async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.userId;

    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        role: true,
        isActive: true,
        phone: true,
        createdAt: true,
        lastLogin: true,
      },
    });

    if (!user) {
      return res.status(404).json({
        success: false,
        data: null,
        message: 'User not found',
      });
    }

    return res.status(200).json({
      success: true,
      data: { user },
      message: 'User retrieved successfully',
    });
  } catch (error) {
    logger.error('Me error:', error);
    return res.status(500).json({
      success: false,
      data: null,
      message: 'Internal server error',
    });
  }
});

export default router;
