import { useState } from 'react'
import { mockFollowUpReminders } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Bell, Clock, User, CheckCircle, AlertTriangle, Plus } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

export default function RemindersPage() {
  const [reminders, setReminders] = useState(mockFollowUpReminders)

  const dismiss = (id: string) => setReminders(prev => prev.map(r => r.id === id ? { ...r, status: 'DISMISSED' } : r))
  const active = reminders.filter(r => r.status === 'PENDING')
  const dismissed = reminders.filter(r => r.status === 'DISMISSED')

  const isOverdue = (dueAt: string) => new Date(dueAt) < new Date()

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Follow-up Reminders</h1>
          <p className="text-xs text-slate-500">Schedule and track client follow-ups and action items</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Add Reminder</Button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <div className="bg-slate-800 border border-amber-500/30 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-amber-400">{active.filter(r => isOverdue(r.dueAt)).length}</p>
          <p className="text-xs text-slate-400">Overdue</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-white">{active.length}</p>
          <p className="text-xs text-slate-400">Pending</p>
        </div>
        <div className="bg-slate-800 border border-slate-700 rounded-lg p-3 text-center">
          <p className="text-2xl font-bold text-slate-400">{dismissed.length}</p>
          <p className="text-xs text-slate-400">Dismissed</p>
        </div>
      </div>

      <div className="space-y-2">
        <h2 className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Reminders</h2>
        {active.length === 0 && (
          <div className="text-center py-8 border-2 border-dashed border-slate-700 rounded-lg">
            <Bell className="w-8 h-8 text-slate-600 mx-auto mb-2" />
            <p className="text-sm text-slate-500">No pending reminders</p>
          </div>
        )}
        {active.map(r => {
          const overdue = isOverdue(r.dueAt)
          return (
            <Card key={r.id} className={`bg-slate-800 ${overdue ? 'border-amber-500/40' : 'border-slate-700'}`}>
              <CardContent className="p-3 flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${overdue ? 'bg-amber-500/20' : 'bg-slate-700'}`}>
                  {overdue ? <AlertTriangle className="w-4 h-4 text-amber-400" /> : <Bell className="w-4 h-4 text-slate-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-slate-200">{r.clientName}</span>
                    {overdue && <Badge variant="warning" className="text-[10px]">OVERDUE</Badge>}
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{r.note}</p>
                  <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <Clock className="w-3 h-3" />{formatDateTime(r.dueAt)}
                    </span>
                    <span className="text-[10px] text-slate-500 flex items-center gap-1">
                      <User className="w-3 h-3" />{r.createdBy}
                    </span>
                  </div>
                </div>
                <Button variant="ghost" size="xs" onClick={() => dismiss(r.id)} className="text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 shrink-0">
                  <CheckCircle className="w-3.5 h-3.5" />
                </Button>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {dismissed.length > 0 && (
        <div className="space-y-2">
          <h2 className="text-xs font-semibold text-slate-600 uppercase tracking-wider">Dismissed</h2>
          {dismissed.map(r => (
            <div key={r.id} className="flex items-center gap-3 p-2.5 bg-slate-800/50 rounded-lg opacity-50">
              <CheckCircle className="w-4 h-4 text-slate-600 shrink-0" />
              <div className="flex-1 min-w-0">
                <span className="text-xs text-slate-500">{r.clientName} — {r.note}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
