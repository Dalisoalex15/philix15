import { LucideIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

interface StatCardProps {
  title: string
  value: string | number
  subtitle?: string
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  trend?: number
  variant?: 'default' | 'success' | 'warning' | 'danger'
  className?: string
}

export function StatCard({ title, value, subtitle, icon: Icon, iconColor = 'text-emerald-400', iconBg = 'bg-emerald-500/10', trend, variant = 'default', className }: StatCardProps) {
  const borderColor = { default: 'border-slate-700', success: 'border-emerald-500/30', warning: 'border-amber-500/30', danger: 'border-red-500/30' }[variant]
  return (
    <div className={cn('bg-slate-800 border rounded-lg p-4 flex items-start gap-3', borderColor, className)}>
      <div className={cn('w-9 h-9 rounded-lg flex items-center justify-center shrink-0', iconBg)}>
        <Icon className={cn('w-4 h-4', iconColor)} />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-xs text-slate-500 uppercase tracking-wider truncate">{title}</p>
        <p className="text-xl font-bold text-white mt-0.5">{value}</p>
        {subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
        {trend !== undefined && (
          <p className={cn('text-xs mt-0.5 font-medium', trend >= 0 ? 'text-emerald-400' : 'text-red-400')}>
            {trend >= 0 ? '▲' : '▼'} {Math.abs(trend)}%
          </p>
        )}
      </div>
    </div>
  )
}
