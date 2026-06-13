import { useState } from 'react'
import { mockTasks } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { CheckSquare, Clock, AlertCircle, Circle, Plus, User } from 'lucide-react'
import { formatDate } from '@/lib/utils'
import { cn } from '@/lib/utils'

const STATUS_COLS = ['PENDING', 'IN_PROGRESS', 'COMPLETED'] as const
const priorityColor: Record<string, string> = {
  LOW: 'bg-slate-500/20 text-slate-400 border-slate-500/30',
  MEDIUM: 'bg-blue-500/20 text-blue-400 border-blue-500/30',
  HIGH: 'bg-amber-500/20 text-amber-400 border-amber-500/30',
  URGENT: 'bg-red-500/20 text-red-400 border-red-500/30',
}
const statusIcon = { PENDING: Circle, IN_PROGRESS: Clock, COMPLETED: CheckSquare, CANCELLED: AlertCircle }

export default function TasksPage() {
  const [tasks, setTasks] = useState<any[]>(mockTasks)

  const advance = (id: string) => {
    setTasks(prev => prev.map(t => {
      if (t.id !== id) return t
      const next = t.status === 'PENDING' ? 'IN_PROGRESS' : t.status === 'IN_PROGRESS' ? 'COMPLETED' : t.status
      return { ...t, status: next, completedAt: next === 'COMPLETED' ? new Date().toISOString().slice(0, 10) : t.completedAt }
    }))
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Task Management</h1>
          <p className="text-xs text-slate-500">Assign and track internal staff tasks</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> New Task</Button>
      </div>

      {/* Kanban board */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {STATUS_COLS.map(status => {
          const cols = tasks.filter(t => t.status === status)
          const Icon = statusIcon[status]
          const headerColor = { PENDING: 'text-slate-400', IN_PROGRESS: 'text-amber-400', COMPLETED: 'text-emerald-400' }[status]
          return (
            <div key={status} className="space-y-2">
              <div className="flex items-center gap-2 px-1">
                <Icon className={cn('w-4 h-4', headerColor)} />
                <span className={cn('text-xs font-semibold uppercase tracking-wider', headerColor)}>{status.replace('_', ' ')}</span>
                <span className="ml-auto text-xs bg-slate-700 text-slate-400 px-1.5 py-0.5 rounded-full">{cols.length}</span>
              </div>
              {cols.map(task => (
                <Card key={task.id} className="bg-slate-800 border-slate-700 hover:border-slate-600 transition-colors">
                  <CardContent className="p-3 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-xs font-medium text-slate-200 leading-snug flex-1">{task.title}</p>
                      <span className={cn('text-[10px] px-1.5 py-0.5 rounded-full border font-semibold shrink-0', priorityColor[task.priority])}>{task.priority}</span>
                    </div>
                    {task.description && <p className="text-[10px] text-slate-500 line-clamp-2">{task.description}</p>}
                    <div className="flex items-center gap-2 flex-wrap">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] text-slate-500">{task.assignedTo}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Clock className="w-3 h-3 text-slate-500" />
                        <span className="text-[10px] text-slate-500">{formatDate(task.dueDate)}</span>
                      </div>
                    </div>
                    {status !== 'COMPLETED' && (
                      <Button variant="ghost" size="xs" className="w-full text-emerald-400 hover:text-emerald-300 hover:bg-emerald-500/10 mt-1" onClick={() => advance(task.id)}>
                        {status === 'PENDING' ? '→ Start Task' : '→ Mark Complete'}
                      </Button>
                    )}
                    {status === 'COMPLETED' && task.completedAt && (
                      <p className="text-[10px] text-emerald-400">✓ Completed {formatDate(task.completedAt)}</p>
                    )}
                  </CardContent>
                </Card>
              ))}
              {cols.length === 0 && (
                <div className="border-2 border-dashed border-slate-700 rounded-lg p-6 text-center">
                  <p className="text-xs text-slate-600">No tasks</p>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}
