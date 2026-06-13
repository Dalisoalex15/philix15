import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'SUPER_ADMIN' | 'MANAGER' | 'LOAN_OFFICER' | 'COLLECTIONS_OFFICER' | 'ACCOUNTANT'
  branch: string
  avatar?: string
}

interface AuthState {
  user: AuthUser | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (email: string, password: string) => Promise<{ success: boolean; error?: string }>
  logout: () => void
}

const DEMO_USERS: Record<string, { password: string; user: AuthUser }> = {
  'admin@philix.zm': {
    password: 'Admin@123',
    user: {
      id: 'USR-001',
      name: 'Alex Phiri',
      email: 'admin@philix.zm',
      role: 'SUPER_ADMIN',
      branch: 'Head Office - Lusaka',
    },
  },
  'officer@philix.zm': {
    password: 'Officer@123',
    user: {
      id: 'USR-002',
      name: 'Chanda Mbewe',
      email: 'officer@philix.zm',
      role: 'LOAN_OFFICER',
      branch: 'Lusaka Central',
    },
  },
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isLoading: false,

      login: async (email: string, password: string) => {
        set({ isLoading: true })
        await new Promise((res) => setTimeout(res, 800))

        const record = DEMO_USERS[email.toLowerCase()]
        if (record && record.password === password) {
          localStorage.setItem('philix_token', `mock-jwt-${record.user.id}`)
          set({ user: record.user, isAuthenticated: true, isLoading: false })
          return { success: true }
        }

        set({ isLoading: false })
        return { success: false, error: 'Invalid email or password' }
      },

      logout: () => {
        localStorage.removeItem('philix_token')
        set({ user: null, isAuthenticated: false })
      },
    }),
    {
      name: 'philix-auth',
      partialize: (state) => ({ user: state.user, isAuthenticated: state.isAuthenticated }),
    }
  )
)
