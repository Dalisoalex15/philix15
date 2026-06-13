import { useState } from 'react'
import { mockExpensesDetailed } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Receipt, Plus, Check, X, DollarSign } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const categoryColor: Record<string, string> = {
  Fuel: 'bg-amber-500/20 text-amber-400', Internet: 'bg-blue-500/20 text-blue-400',
  Airtime: 'bg-cyan-500/20 text-cyan-400', Rent: 'bg-purple-500/20 text-purple-400',
  Salaries: 'bg-emerald-500/20 text-emerald-400', Marketing: 'bg-pink-500/20 text-pink-400',
  Transport: 'bg-orange-500/20 text-orange-400',
}

export default function ExpenseManagementPage() {
  const [expenses, setExpenses] = useState<any[]>(mockExpensesDetailed)
  const [filter, setFilter] = useState<'ALL' | 'PENDING' | 'APPROVED' | 'REJECTED'>('ALL')
  const [selected, setSelected] = useState<any>(null)

  const filtered = filter === 'ALL' ? expenses : expenses.filter(e => e.status === filter)
  const totals = {
    approved: expenses.filter(e => e.status === 'APPROVED').reduce((s, e) => s + e.amount, 0),
    pending: expenses.filter(e => e.status === 'PENDING').reduce((s, e) => s + e.amount, 0),
  }

  const approve = (id: string) => setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'APPROVED', approvedBy: 'Daliso Phiri', approvedAt: new Date().toISOString() } : e))
  const reject = (id: string) => setExpenses(prev => prev.map(e => e.id === id ? { ...e, status: 'REJECTED', rejectionReason: 'Declined by manager' } : e))

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Expense Management</h1>
          <p className="text-xs text-slate-500">Track, approve, and report on operational expenses</p>
        </div>
        <Button size="sm"><Plus className="w-4 h-4 mr-1" /> Submit Expense</Button>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Approved (Month)', value: formatCurrency(totals.approved), color: 'text-emerald-400' },
          { label: 'Pending Approval', value: formatCurrency(totals.pending), color: 'text-amber-400' },
          { label: 'Total Records', value: expenses.length, color: 'text-white' },
          { label: 'Pending Count', value: expenses.filter(e => e.status === 'PENDING').length, color: 'text-amber-400' },
        ].map(item => (
          <Card key={item.label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p>
              <p className={`text-xl font-bold mt-0.5 ${item.color}`}>{item.value}</p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1 w-fit">
        {(['ALL', 'PENDING', 'APPROVED', 'REJECTED'] as const).map(f => (
          <button key={f} onClick={() => setFilter(f)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${filter === f ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{f}</button>
        ))}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {filtered.map(exp => (
              <div key={exp.id} className="flex items-center gap-3 p-3 hover:bg-slate-700/20 transition-colors">
                <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 text-xs font-bold ${categoryColor[exp.category] ?? 'bg-slate-700 text-slate-400'}`}>
                  {exp.category.slice(0, 2).toUpperCase()}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200">{exp.description}</p>
                  <p className="text-[10px] text-slate-500">{exp.category} · {formatDate(exp.date)} · {exp.submittedBy}</p>
                  {(exp as any).rejectionReason && <p className="text-[10px] text-red-400 mt-0.5">{(exp as any).rejectionReason}</p>}
                </div>
                <div className="text-right shrink-0">
                  <p className="text-sm font-semibold text-white">{formatCurrency(exp.amount)}</p>
                  <Badge variant={exp.status === 'APPROVED' ? 'success' : exp.status === 'REJECTED' ? 'danger' : 'warning'} className="text-[10px]">{exp.status}</Badge>
                </div>
                {exp.status === 'PENDING' && (
                  <div className="flex gap-1 shrink-0">
                    <Button variant="ghost" size="xs" onClick={() => approve(exp.id)} className="text-emerald-400 hover:bg-emerald-500/10"><Check className="w-3.5 h-3.5" /></Button>
                    <Button variant="ghost" size="xs" onClick={() => reject(exp.id)} className="text-red-400 hover:bg-red-500/10"><X className="w-3.5 h-3.5" /></Button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
