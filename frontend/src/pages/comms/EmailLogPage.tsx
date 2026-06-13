import { mockEmailLogs } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Mail, Search, RefreshCw, CheckCircle, XCircle } from 'lucide-react'
import { useState } from 'react'
import { formatDateTime } from '@/lib/utils'

const templateBadge: Record<string, any> = {
  LOAN_APPROVAL: 'success', LOAN_REJECTION: 'danger', PAYMENT_REMINDER: 'warning',
  OVERDUE_NOTICE: 'danger', LOAN_CLOSURE: 'success', COLLATERAL_RELEASE: 'info',
}

export default function EmailLogPage() {
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState('ALL')

  const filtered = mockEmailLogs.filter(log => {
    const matchSearch = log.recipientName.toLowerCase().includes(search.toLowerCase()) || log.subject.toLowerCase().includes(search.toLowerCase())
    const matchStatus = statusFilter === 'ALL' || log.status === statusFilter
    return matchSearch && matchStatus
  })

  const sent = mockEmailLogs.filter(l => l.status === 'SENT').length
  const failed = mockEmailLogs.filter(l => l.status === 'FAILED').length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Email Log</h1>
        <p className="text-xs text-slate-500">Record of all automated and manual emails sent via Philix Finance SMTP</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Card className="bg-slate-800 border-slate-700"><CardContent className="p-4 flex items-center gap-3"><Mail className="w-5 h-5 text-blue-400" /><div><p className="text-xs text-slate-500">Total Sent</p><p className="text-xl font-bold text-white">{mockEmailLogs.length}</p></div></CardContent></Card>
        <Card className="bg-slate-800 border-emerald-500/30"><CardContent className="p-4 flex items-center gap-3"><CheckCircle className="w-5 h-5 text-emerald-400" /><div><p className="text-xs text-slate-500">Delivered</p><p className="text-xl font-bold text-emerald-400">{sent}</p></div></CardContent></Card>
        <Card className="bg-slate-800 border-red-500/30"><CardContent className="p-4 flex items-center gap-3"><XCircle className="w-5 h-5 text-red-400" /><div><p className="text-xs text-slate-500">Failed</p><p className="text-xl font-bold text-red-400">{failed}</p></div></CardContent></Card>
      </div>

      <div className="flex items-center gap-3 flex-wrap">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search by recipient or subject..." className="pl-9" />
        </div>
        <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {['ALL', 'SENT', 'FAILED'].map(s => (
            <button key={s} onClick={() => setStatusFilter(s)} className={`px-3 py-1 rounded text-xs font-medium transition-colors ${statusFilter === s ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{s}</button>
          ))}
        </div>
        <span className="text-xs text-slate-500">{filtered.length} records</span>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {filtered.map(log => (
              <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-slate-700/20 transition-colors">
                <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${log.status === 'SENT' ? 'bg-emerald-500/20' : 'bg-red-500/20'}`}>
                  {log.status === 'SENT' ? <CheckCircle className="w-3.5 h-3.5 text-emerald-400" /> : <XCircle className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2 flex-wrap">
                    <Badge variant={templateBadge[log.templateType] ?? 'secondary'} className="text-[10px]">{log.templateType.replace(/_/g, ' ')}</Badge>
                    <span className="text-xs text-slate-300 truncate flex-1">{log.subject}</span>
                  </div>
                  <p className="text-xs text-slate-500 mt-0.5">To: {log.recipientName} ({log.recipientEmail})</p>
                  {log.error && <p className="text-[10px] text-red-400 mt-0.5">Error: {log.error}</p>}
                  <p className="text-[10px] text-slate-600 mt-0.5">{formatDateTime(log.sentAt)}</p>
                </div>
                {log.status === 'FAILED' && (
                  <Button variant="ghost" size="xs" className="text-amber-400 hover:bg-amber-500/10 shrink-0">
                    <RefreshCw className="w-3 h-3 mr-1" /> Retry
                  </Button>
                )}
              </div>
            ))}
            {filtered.length === 0 && (
              <div className="text-center py-10">
                <Mail className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No email logs found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
