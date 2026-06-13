import { mockAnnouncements } from '@/data/mockData'
import { Megaphone, X } from 'lucide-react'
import { useState } from 'react'
import { cn } from '@/lib/utils'

export function AnnouncementBanner() {
  const [dismissed, setDismissed] = useState<string[]>([])
  const active = mockAnnouncements.filter(a => a.isActive && !dismissed.includes(a.id))
  if (active.length === 0) return null

  return (
    <div className="space-y-1.5 mb-4">
      {active.slice(0, 2).map(a => (
        <div key={a.id} className={cn('flex items-start gap-3 px-4 py-2.5 rounded-lg text-sm border',
          a.priority === 'HIGH' ? 'bg-amber-500/10 border-amber-500/30 text-amber-300' : 'bg-blue-500/10 border-blue-500/30 text-blue-300'
        )}>
          <Megaphone className="w-4 h-4 shrink-0 mt-0.5" />
          <div className="flex-1 min-w-0">
            <span className="font-semibold">{a.title} </span>
            <span className="text-xs opacity-80">{a.body.slice(0, 100)}{a.body.length > 100 ? '…' : ''}</span>
          </div>
          <button onClick={() => setDismissed(d => [...d, a.id])} className="opacity-60 hover:opacity-100">
            <X className="w-3.5 h-3.5" />
          </button>
        </div>
      ))}
    </div>
  )
}
