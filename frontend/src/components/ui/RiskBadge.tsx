import { cn } from '@/lib/utils'

const styles = {
  LOW: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  MEDIUM: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  HIGH: 'bg-red-500/20 text-red-400 border-red-500/30',
  GREEN: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  YELLOW: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  ORANGE: 'bg-orange-500/20 text-orange-400 border-orange-500/30',
  RED: 'bg-red-500/20 text-red-400 border-red-500/30',
}

export function RiskBadge({ level, className }: { level: string; className?: string }) {
  return (
    <span className={cn('inline-flex items-center px-2 py-0.5 rounded-full text-xs font-semibold border', styles[level as keyof typeof styles] ?? 'bg-slate-700 text-slate-400 border-slate-600', className)}>
      {level}
    </span>
  )
}
