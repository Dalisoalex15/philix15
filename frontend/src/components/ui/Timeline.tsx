import { cn } from '@/lib/utils'
import { Phone, Mail, MessageSquare, Users, Smartphone } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

const channelIcon: Record<string, React.ComponentType<{ className?: string }>> = {
  CALL: Phone, EMAIL: Mail, SMS: MessageSquare, WHATSAPP: Smartphone, VISIT: Users,
}
const channelColor: Record<string, string> = {
  CALL: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  EMAIL: 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30',
  SMS: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30',
  WHATSAPP: 'bg-green-500/20 text-green-400 border-green-500/30',
  VISIT: 'bg-purple-500/20 text-purple-400 border-purple-500/30',
}

export function TimelineItem({ channel, summary, outcome, loggedBy, loggedAt, followUpDate }: {
  channel: string; summary: string; outcome?: string; loggedBy: string; loggedAt: string; followUpDate?: string
}) {
  const Icon = channelIcon[channel] ?? MessageSquare
  return (
    <div className="flex gap-3 pb-4 relative">
      <div className="flex flex-col items-center">
        <div className={cn('w-8 h-8 rounded-full border flex items-center justify-center shrink-0', channelColor[channel] ?? 'bg-slate-700 text-slate-400 border-slate-600')}>
          <Icon className="w-3.5 h-3.5" />
        </div>
        <div className="w-px flex-1 bg-slate-700 mt-1" />
      </div>
      <div className="flex-1 pb-2">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-semibold text-slate-200">{channel}</span>
          {outcome && <span className="text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded">{outcome.replace(/_/g, ' ')}</span>}
        </div>
        <p className="text-xs text-slate-300 mt-0.5">{summary}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="text-[10px] text-slate-500">{formatDateTime(loggedAt)}</span>
          <span className="text-[10px] text-slate-600">•</span>
          <span className="text-[10px] text-slate-500">{loggedBy}</span>
          {followUpDate && <span className="text-[10px] text-amber-400">Follow-up: {followUpDate}</span>}
        </div>
      </div>
    </div>
  )
}

export function Timeline({ children }: { children: React.ReactNode }) {
  return <div className="py-2">{children}</div>
}
