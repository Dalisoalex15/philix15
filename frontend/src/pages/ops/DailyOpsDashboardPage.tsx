import { mockDailyOpsStats, mockUpcomingCollections, mockLoans, mockAuditLogs } from '@/data/mockData'
import { StatCard } from '@/components/ui/StatCard'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { AnnouncementBanner } from '@/components/dashboard/AnnouncementBanner'
import { formatCurrency, formatDateTime } from '@/lib/utils'
import {
  Briefcase, TrendingUp, Users, AlertTriangle, Clock, DollarSign,
  ArrowUpRight, ArrowDownRight, Activity, CheckCircle
} from 'lucide-react'

export default function DailyOpsDashboardPage() {
  const s = mockDailyOpsStats
  const pct = s.collectionsCompletionPct
  const pendingLoans = mockLoans.filter(l => l.status === 'PENDING').length
  const overdueLoans = mockLoans.filter(l => l.status === 'OVERDUE').length

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Daily Operations</h1>
        <p className="text-xs text-slate-500">Business health snapshot — {new Date().toLocaleDateString('en-ZM', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
      </div>

      <AnnouncementBanner />

      {/* KPI row */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
        <StatCard title="Loans Issued Today" value={s.loansIssuedToday} subtitle={`Disbursed ${formatCurrency(s.disbursedToday)}`} icon={Briefcase} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" variant="success" />
        <StatCard title="Collections Today" value={formatCurrency(s.collectionsToday)} subtitle={`${pct.toFixed(1)}% of target`} icon={TrendingUp} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        <StatCard title="New Clients" value={s.newClientsToday} subtitle="Registered today" icon={Users} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
        <StatCard title="Overdue Accounts" value={s.overdueCount} subtitle={formatCurrency(s.totalOverdueAmount)} icon={AlertTriangle} iconColor="text-red-400" iconBg="bg-red-500/10" variant="danger" />
        <StatCard title="Expected Today" value={formatCurrency(s.expectedTodayCollections)} subtitle="Scheduled payments" icon={Clock} iconColor="text-amber-400" iconBg="bg-amber-500/10" variant="warning" />
        <StatCard title="Pending Approvals" value={s.pendingApprovals} subtitle={`${s.pendingDisbursements} to disburse`} icon={Activity} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" />
      </div>

      {/* Collections progress */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Today's Collections Progress</CardTitle></CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-2">
              <span className="text-2xl font-bold text-white">{formatCurrency(s.collectionsToday)}</span>
              <span className="text-sm text-slate-400">of {formatCurrency(s.expectedTodayCollections)}</span>
            </div>
            <div className="w-full h-4 bg-slate-700 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all ${pct >= 80 ? 'bg-emerald-500' : pct >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                style={{ width: `${Math.min(pct, 100)}%` }}
              />
            </div>
            <div className="flex justify-between mt-1.5">
              <span className="text-xs text-slate-500">{pct.toFixed(1)}% collected</span>
              <span className="text-xs text-slate-500">{formatCurrency(s.expectedTodayCollections - s.collectionsToday)} remaining</span>
            </div>

            <div className="grid grid-cols-3 gap-3 mt-4">
              {[
                { label: 'Cash', amount: s.collectionsToday * 0.3, icon: ArrowUpRight, color: 'text-emerald-400' },
                { label: 'Mobile Money', amount: s.collectionsToday * 0.55, icon: ArrowUpRight, color: 'text-blue-400' },
                { label: 'Bank Transfer', amount: s.collectionsToday * 0.15, icon: ArrowUpRight, color: 'text-purple-400' },
              ].map(item => (
                <div key={item.label} className="bg-slate-700/40 rounded-lg p-3">
                  <div className="flex items-center gap-1.5 mb-1">
                    <item.icon className={`w-3.5 h-3.5 ${item.color}`} />
                    <span className="text-xs text-slate-400">{item.label}</span>
                  </div>
                  <p className="text-sm font-semibold text-white">{formatCurrency(Math.round(item.amount))}</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Status Breakdown</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            {[
              { label: 'Active Loans', value: mockLoans.filter(l => l.status === 'ACTIVE').length, color: 'bg-emerald-500', textColor: 'text-emerald-400' },
              { label: 'Pending Approval', value: pendingLoans, color: 'bg-amber-500', textColor: 'text-amber-400' },
              { label: 'Overdue', value: overdueLoans, color: 'bg-red-500', textColor: 'text-red-400' },
              { label: 'Staff On Duty', value: s.staffOnDuty, color: 'bg-blue-500', textColor: 'text-blue-400' },
              { label: 'Collateral Items In', value: s.collateralItemsIn, color: 'bg-purple-500', textColor: 'text-purple-400' },
            ].map(item => (
              <div key={item.label} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full ${item.color}`} />
                  <span className="text-xs text-slate-400">{item.label}</span>
                </div>
                <span className={`text-sm font-semibold ${item.textColor}`}>{item.value}</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Upcoming collections + Recent activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Upcoming Collections — Today</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockUpcomingCollections.slice(0, 5).map((c: any) => (
                <div key={c.id} className="flex items-center justify-between p-2 bg-slate-700/30 rounded-lg">
                  <div>
                    <p className="text-xs font-medium text-slate-200">{c.clientName}</p>
                    <p className="text-[10px] text-slate-500">{c.loanNumber}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs font-semibold text-white">{formatCurrency(c.amount)}</p>
                    <Badge variant={c.daysUntilDue === 0 ? 'warning' : c.daysUntilDue < 0 ? 'danger' : 'success'} className="text-[10px]">
                      {c.daysUntilDue === 0 ? 'Due Today' : c.daysUntilDue < 0 ? `${Math.abs(c.daysUntilDue)}d overdue` : `Due in ${c.daysUntilDue}d`}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Recent Activity</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockAuditLogs.slice(0, 6).map((log: any) => (
                <div key={log.id} className="flex items-start gap-2.5 p-2 bg-slate-700/30 rounded-lg">
                  <CheckCircle className="w-3.5 h-3.5 text-emerald-400 shrink-0 mt-0.5" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs text-slate-200 truncate">{log.description}</p>
                    <p className="text-[10px] text-slate-500">{formatDateTime(log.createdAt)} · {log.userName}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
