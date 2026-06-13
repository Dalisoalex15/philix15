import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard, Users, Briefcase, Shield, CreditCard, AlertTriangle,
  BarChart3, Settings, UserCog, ChevronLeft, ChevronRight, LogOut,
  TrendingUp, Activity, Wallet, PiggyBank, Receipt, TrendingDown,
  Award, ShieldAlert, Crown, Package, Megaphone, Mail, MessageSquare,
  FileText, CheckSquare, BookOpen, ScrollText, Building2, Server,
  Calculator, Unlock, DollarSign, Bell
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { useAuthStore } from '@/store/authStore'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { useState } from 'react'

type NavItem = {
  path: string
  label: string
  icon: React.ComponentType<{ className?: string }>
  roles?: string[]
}

type NavSection = {
  label: string
  items: NavItem[]
}

const navSections: NavSection[] = [
  {
    label: 'Main',
    items: [
      { path: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { path: '/clients', label: 'Clients', icon: Users },
      { path: '/loans', label: 'Loans', icon: Briefcase },
    ],
  },
  {
    label: 'Operations',
    items: [
      { path: '/ops/daily', label: 'Daily Operations', icon: Activity },
      { path: '/collections', label: 'Collections', icon: AlertTriangle },
      { path: '/ops/cashflow', label: 'Cash Flow', icon: TrendingUp, roles: ['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT'] },
      { path: '/ops/reminders', label: 'Reminders', icon: Bell },
    ],
  },
  {
    label: 'Collateral Vault',
    items: [
      { path: '/collateral', label: 'Vault Inventory', icon: Shield },
      { path: '/collateral/assess', label: 'Assessment', icon: Calculator },
      { path: '/collateral/release', label: 'Release Queue', icon: Unlock, roles: ['SUPER_ADMIN', 'MANAGER'] },
    ],
  },
  {
    label: 'Finance',
    items: [
      { path: '/payments', label: 'Payments', icon: CreditCard },
      { path: '/finance/expenses', label: 'Expenses', icon: Receipt, roles: ['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT'] },
      { path: '/finance/investors', label: 'Investors', icon: PiggyBank, roles: ['SUPER_ADMIN', 'MANAGER', 'ACCOUNTANT'] },
      { path: '/finance/capital', label: 'Capital Utilization', icon: Wallet, roles: ['SUPER_ADMIN', 'MANAGER'] },
    ],
  },
  {
    label: 'Analytics',
    items: [
      { path: '/reports', label: 'Reports', icon: BarChart3 },
      { path: '/analytics/par', label: 'PAR Dashboard', icon: TrendingDown, roles: ['SUPER_ADMIN', 'MANAGER'] },
      { path: '/analytics/staff', label: 'Staff Performance', icon: Award, roles: ['SUPER_ADMIN', 'MANAGER'] },
      { path: '/analytics/risk', label: 'Risk Scoring', icon: ShieldAlert },
      { path: '/analytics/executive', label: 'Executive View', icon: Crown, roles: ['SUPER_ADMIN'] },
    ],
  },
  {
    label: 'Recovery',
    items: [
      { path: '/recovery/repossession', label: 'Repossession', icon: Package, roles: ['SUPER_ADMIN', 'MANAGER', 'COLLECTIONS_OFFICER'] },
    ],
  },
  {
    label: 'Tasks',
    items: [
      { path: '/tasks', label: 'My Tasks', icon: CheckSquare },
    ],
  },
  {
    label: 'Communications',
    items: [
      { path: '/comms/announcements', label: 'Announcements', icon: Megaphone },
      { path: '/comms/emails', label: 'Email Log', icon: Mail, roles: ['SUPER_ADMIN', 'MANAGER'] },
      { path: '/comms/history', label: 'Comm History', icon: MessageSquare },
    ],
  },
  {
    label: 'Documents',
    items: [
      { path: '/documents/generate', label: 'Document Generator', icon: FileText },
    ],
  },
  {
    label: 'Knowledge Base',
    items: [
      { path: '/wiki', label: 'Internal Wiki', icon: BookOpen },
    ],
  },
  {
    label: 'Administration',
    items: [
      { path: '/admin/audit', label: 'Audit Logs', icon: ScrollText, roles: ['SUPER_ADMIN', 'MANAGER'] },
      { path: '/admin/branches', label: 'Branches', icon: Building2, roles: ['SUPER_ADMIN'] },
      { path: '/users', label: 'User Management', icon: UserCog, roles: ['SUPER_ADMIN'] },
      { path: '/admin/system-health', label: 'System Health', icon: Server, roles: ['SUPER_ADMIN'] },
      { path: '/settings', label: 'Settings', icon: Settings, roles: ['SUPER_ADMIN', 'MANAGER'] },
    ],
  },
]

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false)
  const { user, logout } = useAuthStore()
  const location = useLocation()

  const initials = user?.name
    ? user.name.split(' ').map((n: string) => n[0]).join('').toUpperCase().slice(0, 2)
    : 'PF'

  const canView = (roles?: string[]) => {
    if (!roles) return true
    return roles.includes(user?.role ?? '')
  }

  return (
    <aside className={cn(
      'flex flex-col h-screen bg-slate-900 border-r border-slate-700 transition-all duration-300 relative shrink-0',
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
      <nav className="flex-1 overflow-y-auto py-2 px-2 scrollbar-thin">
        {navSections.map((section) => {
          const visibleItems = section.items.filter(item => canView(item.roles))
          if (visibleItems.length === 0) return null
          return (
            <div key={section.label} className="mb-1">
              {!collapsed && (
                <div className="text-[10px] font-semibold text-slate-500 uppercase tracking-widest px-2 mt-4 mb-1">
                  {section.label}
                </div>
              )}
              {collapsed && <div className="border-t border-slate-800 my-2" />}
              {visibleItems.map(({ path, label, icon: Icon }) => {
                const isActive = location.pathname === path || (path !== '/collateral' && path !== '/wiki' && location.pathname.startsWith(path + '/'))
                return (
                  <NavLink
                    key={path}
                    to={path}
                    className={cn(
                      'flex items-center gap-3 px-2 py-1.5 rounded-md text-sm transition-all',
                      collapsed ? 'justify-center' : '',
                      isActive
                        ? 'bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'
                        : 'text-slate-400 hover:bg-slate-700/50 hover:text-slate-200'
                    )}
                    title={collapsed ? label : undefined}
                  >
                    <Icon className={cn('shrink-0', collapsed ? 'w-5 h-5' : 'w-4 h-4')} />
                    {!collapsed && <span className="truncate text-xs">{label}</span>}
                  </NavLink>
                )
              })}
            </div>
          )
        })}
      </nav>

      {/* User section */}
      <div className={cn('border-t border-slate-700 p-3 shrink-0', collapsed ? 'flex flex-col items-center gap-2' : '')}>
        {!collapsed && (
          <div className="flex items-center gap-2 mb-2 px-1">
            <Avatar className="w-7 h-7">
              <AvatarFallback className="text-xs bg-emerald-700">{initials}</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">{user?.name}</div>
              <div className="text-[10px] text-slate-500 truncate">{user?.role?.replace(/_/g, ' ')}</div>
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
          {!collapsed && <span className="ml-2 text-xs">Logout</span>}
        </Button>
      </div>
    </aside>
  )
}
