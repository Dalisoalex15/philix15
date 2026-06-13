import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface KPICardProps {
  title: string
  value: string
  change?: number
  icon: LucideIcon
  iconColor?: string
  iconBg?: string
  subtitle?: string
  variant?: 'default' | 'warning' | 'danger' | 'success'
}

export default function KPICard({ title, value, change, icon: Icon, iconColor = 'text-emerald-400', iconBg = 'bg-emerald-500/10', subtitle, variant = 'default' }: KPICardProps) {
  const borderColor = {
    default: 'border-slate-700',
    warning: 'border-amber-500/30',
    danger: 'border-red-500/30',
    success: 'border-emerald-500/30',
  }[variant]

  return (
    <Card className={cn('bg-slate-800 hover:bg-slate-750 transition-colors', borderColor)}>
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-xs text-slate-400 uppercase tracking-wider font-medium truncate">{title}</p>
            <p className="text-2xl font-bold text-white mt-1 leading-tight">{value}</p>
            {subtitle && <p className="text-xs text-slate-500 mt-0.5 truncate">{subtitle}</p>}
            {change !== undefined && (
              <div className={cn('flex items-center gap-1 mt-1.5 text-xs font-medium', change >= 0 ? 'text-emerald-400' : 'text-red-400')}>
                {change >= 0 ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                <span>{Math.abs(change)}% vs last month</span>
              </div>
            )}
          </div>
          <div className={cn('w-10 h-10 rounded-lg flex items-center justify-center shrink-0 ml-3', iconBg)}>
            <Icon className={cn('w-5 h-5', iconColor)} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
