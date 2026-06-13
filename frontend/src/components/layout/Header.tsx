import { Bell, Search, Plus } from 'lucide-react'
import { useLocation } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { useAuthStore } from '@/store/authStore'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Executive Dashboard',
  '/clients': 'Client Management',
  '/loans': 'Loan Management',
  '/collateral': 'Collateral Vault',
  '/payments': 'Payment Processing',
  '/collections': 'Collections & Recovery',
  '/reports': 'Reports & Analytics',
  '/accounting': 'Accounting',
  '/users': 'User Management',
  '/settings': 'System Settings',
}

export default function Header() {
  const location = useLocation()
  const { user } = useAuthStore()
  const title = Object.entries(pageTitles).find(([k]) => location.pathname.startsWith(k))?.[1] ?? 'Philix Finance'

  return (
    <header className="h-14 bg-slate-900 border-b border-slate-700 flex items-center justify-between px-5 shrink-0">
      <div>
        <h1 className="text-sm font-semibold text-slate-100">{title}</h1>
        <p className="text-xs text-slate-500">Philix Finance · Creating a Future Together</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative hidden md:block">
          <Search className="absolute left-2.5 top-2 w-3.5 h-3.5 text-slate-400" />
          <Input placeholder="Search..." className="pl-8 w-56 h-7 text-xs bg-slate-800 border-slate-600" />
        </div>

        <button className="relative text-slate-400 hover:text-slate-200 transition-colors">
          <Bell className="w-5 h-5" />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full flex items-center justify-center text-[10px] text-white font-bold">8</span>
        </button>

        <div className="flex items-center gap-2 pl-3 border-l border-slate-700">
          <div className="w-7 h-7 rounded-full bg-emerald-700 flex items-center justify-center text-xs font-bold text-white">
            {user?.name?.split(' ').map(n => n[0]).join('').slice(0, 2).toUpperCase() ?? 'PF'}
          </div>
          <div className="hidden md:block">
            <div className="text-xs font-medium text-slate-200">{user?.name}</div>
            <div className="text-xs text-slate-500">{user?.branch}</div>
          </div>
        </div>
      </div>
    </header>
  )
}
