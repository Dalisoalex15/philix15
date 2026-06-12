import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, Briefcase, Shield, CreditCard,
  AlertTriangle, BarChart3, DollarSign, Settings, UserCog,
  ChevronLeft, ChevronRight, Building2, LogOut, TrendingUp
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'

const navItems = [
  { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { path: '/clients', label: 'Clients', icon: Users },
  { path: '/loans', label: 'Loans', icon: Briefcase },
  { path: '/collateral', label: 'Collateral Vault', icon: Shield },
  { path: '/payments', label: 'Payments', icon: CreditCard },
  { path: '/collections', label: 'Collections', icon: AlertTriangle },
  { path: '/reports', label: 'Reports', icon: BarChart3 },
  { path: '/accounting', label: 'Accounting', icon: DollarSign },
  { path: '/users', label: 'User Management', icon: UserCog, adminOnly: true },
  { path: '/settings', label: 'Settings', icon: Settings },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const initials = user?.name
    ? user.name.split(' ').map(n => n[0]).join('').toUpperCase().slice(0, 2)
    : 'PF'

  return (
    <aside className={cn(
      'flex flex-col h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 relative',
      collapsed ? 'w-16' : 'w-60'
    )}>
      {/* Logo */}
      <div className={cn('flex items-center border-b border-slate-700 shrink-0', collapsed ? 'px-3 py-4 justify-center' : 'px-4 py-4')}>
        <div className="flex items-center gap-2 shrink-0">
          <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shrink-0">
            <TrendingUp className="w-5 h-5 text-white" />
          </div>
          {!collapsed && (
            <div>
              <div className="text-white font-bold text-sm leading-tight">PHILIX</div>
              <div className="text-emerald-400 text-xs leading-tight">FINANCE</div>
            </div>
          )}
        </div>
      </div>

      {/* Collapse toggle */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="absolute -right-3 top-16 w-6 h-6 bg-slate-700 border border-slate-600 rounded-full flex items-center justify-center text-slate-400 hover:text-white hover:bg-slate-600 transition-colors z-10"
      >
        {collapsed ? <ChevronRight className="w-3 h-3" /> : <ChevronLeft className="w-3 h-3" />}
      </button>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-2 space-y-0.5">
        {!collapsed && (
          <div className="px-2 mb-2">
            <span className="text-xs font-semibold text-slate-500 uppercase tracking-widest">Navigation</span>
          </div>
        )}
        {navItems.map(({ path, label, icon: Icon, adminOnly }) => {
          if (adminOnly && user?.role !== 'SUPER_ADMIN') return null
          const isActive = location.pathname === path || location.pathname.startsWith(path + '/')
          return (
            <NavLink
              key={path}
              to={path}
              className={cn(
                'flex items-center gap-3 px-2 py-2 rounded-md text-sm transition-all group',
                collapsed ? 'justify-center' : '',
                isActive
                  ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                  : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
              )}
              title={collapsed ? label : undefined}
            >
              <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
              {!collapsed && <span className="truncate">{label}</span>}
            </NavLink>
          )
        })}
      </nav>

      {/* User section */}
      <div className={cn('border-t border-slate-700 p-3', collapsed ? 'flex flex-col items-center gap-2' : '')}>
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-xs bg-emerald-700">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">{user?.name}</div>
              <div className="text-xs text-slate-500 truncate">{user?.role}</div>
            </div>
          </div>
        )}
        <Button
          variant="ghost"
          size={collapsed ? 'icon' : 'sm'}
          onClick={logout}
          className="w-full text-slate-400 hover:text-red-400 hover:bg-red-500/10"
          title="Logout"
        >
          <LogOut className="w-4 h-4" />
          {!collapsed && <span className="ml-2">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
