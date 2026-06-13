import { useState } from 'react'
import { mockAuditLogs } from '@/data/mockData'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { ScrollText, Search, Shield, User, DollarSign, Package } from 'lucide-react'
import { formatDateTime } from '@/lib/utils'

const actionColor: Record<string, string> = {
  LOAN_APPROVED: 'success', LOAN_DISBURSED: 'success', LOAN_PAID: 'success', PAYMENT_RECORDED: 'success',
  CLIENT_CREATED: 'info', USER_CREATED: 'info', COLLATERAL_INTAKE: 'info', COLLATERAL_RELEASED: 'info',
  LOAN_REJECTED: 'danger', CLIENT_BLACKLISTED: 'danger', REPOSSESSION_INITIATED: 'danger',
  USER_LOGIN: 'secondary', SETTINGS_UPDATED: 'warning', EXPENSE_APPROVED: 'warning',
  USER_PASSWORD_CHANGED: 'warning', INVESTOR_PAYOUT: 'purple',
}

const actionIcon: Record<string, React.ComponentType<{className?: string}>> = {
  LOAN_APPROVED: DollarSign, LOAN_DISBURSED: DollarSign, LOAN_PAID: DollarSign, PAYMENT_RECORDED: DollarSign,
  CLIENT_CREATED: User, CLIENT_BLACKLISTED: User, USER_CREATED: User,
  COLLATERAL_INTAKE: Package, COLLATERAL_RELEASED: Package, REPOSSESSION_INITIATED: Package,
}

export default function AuditLogPage() {
  const [search, setSearch] = useState('')
  const filtered = mockAuditLogs.filter(l =>
    l.description.toLowerCase().includes(search.toLowerCase()) ||
    l.userName.toLowerCase().includes(search.toLowerCase()) ||
    l.action.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Audit Log</h1>
        <p className="text-xs text-slate-500">Complete record of all system actions with timestamps and user attribution</p>
      </div>

      <div className="flex items-center gap-3">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
          <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search logs..." className="pl-9" />
        </div>
        <span className="text-xs text-slate-500">{filtered.length} records</span>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {filtered.map(log => {
              const Icon = actionIcon[log.action] ?? Shield
              const variant = (actionColor[log.action] ?? 'secondary') as any
              return (
                <div key={log.id} className="flex items-start gap-3 p-3 hover:bg-slate-700/20 transition-colors">
                  <div className="w-7 h-7 bg-slate-700 rounded-full flex items-center justify-center shrink-0 mt-0.5">
                    <Icon className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap">
                      <Badge variant={variant} className="text-[10px]">{log.action.replace(/_/g, ' ')}</Badge>
                      <span className="text-xs text-slate-300 flex-1 min-w-0 truncate">{log.description}</span>
                    </div>
                    <div className="flex items-center gap-3 mt-0.5 flex-wrap">
                      <span className="text-[10px] text-slate-500">{formatDateTime(log.createdAt)}</span>
                      <span className="text-[10px] text-slate-500">by <span className="text-slate-400">{log.userName}</span></span>
                      <span className="text-[10px] text-slate-600">IP: {log.ipAddress}</span>
                    </div>
                  </div>
                </div>
              )
            })}
            {filtered.length === 0 && (
              <div className="text-center py-10">
                <ScrollText className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                <p className="text-sm text-slate-500">No logs found</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
