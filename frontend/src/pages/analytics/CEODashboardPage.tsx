import { mockDashboardStats, mockPARData, mockCapitalUtilization, mockStaffPerformance, mockDailyOpsStats, mockLoans, mockInvestors } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { StatCard } from '@/components/ui/StatCard'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Crown, TrendingUp, DollarSign, Shield, AlertTriangle, Award, Target, Wallet, Activity, Briefcase } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function CEODashboardPage() {
  const s = mockDashboardStats as any
  const d = mockDailyOpsStats
  const cap = mockCapitalUtilization
  const totalCapital = (mockInvestors as any[]).reduce((sum: number, i: any) => sum + i.amount, 0)
  const overdueLoans = mockLoans.filter((l: any) => l.status === 'OVERDUE' || l.status === 'DEFAULT')
  const atRiskAmount = overdueLoans.reduce((sum: number, l: any) => sum + (l.outstandingBalance ?? 0), 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-3 bg-gradient-to-r from-emerald-900/30 to-slate-900 border border-emerald-600/20 rounded-xl p-4">
        <Crown className="w-8 h-8 text-amber-400" />
        <div>
          <h1 className="text-lg font-bold text-slate-100">Executive Dashboard — Daliso Phiri</h1>
          <p className="text-xs text-slate-400">Complete business health overview · {new Date().toLocaleDateString('en-ZM', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</p>
        </div>
        <div className="ml-auto"><Badge variant="success" className="text-xs">LIVE</Badge></div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Today's Collections" value={formatCurrency(d.collectionsToday)} subtitle={`${d.collectionsCompletionPct.toFixed(0)}% of target`} icon={DollarSign} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" variant="success" />
        <StatCard title="Capital Utilization" value={`${cap.utilizationPct}%`} subtitle={`${formatCurrency(cap.activeLoansValue)} deployed`} icon={Wallet} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        <StatCard title="PAR 30" value={`${mockPARData.PAR30.percentage.toFixed(2)}%`} subtitle={`${mockPARData.PAR30.count} loans at risk`} icon={Shield} iconColor="text-amber-400" iconBg="bg-amber-500/10" variant="warning" />
        <StatCard title="Loans At Risk" value={formatCurrency(atRiskAmount)} subtitle={`${overdueLoans.length} overdue loans`} icon={AlertTriangle} iconColor="text-red-400" iconBg="bg-red-500/10" variant="danger" />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Active Portfolio" value={formatCurrency(cap.activeLoansValue)} subtitle="Outstanding balance" icon={Briefcase} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
        <StatCard title="Total Capital" value={formatCurrency(totalCapital)} subtitle={`${(mockInvestors as any[]).length} investors`} icon={Target} iconColor="text-cyan-400" iconBg="bg-cyan-500/10" />
        <StatCard title="New Clients Today" value={d.newClientsToday} subtitle="Registered" icon={Activity} iconColor="text-pink-400" iconBg="bg-pink-500/10" />
        <StatCard title="Default Rate" value={`${mockPARData.PAR90.percentage.toFixed(2)}%`} subtitle="PAR90 benchmark" icon={TrendingUp} iconColor={mockPARData.PAR90.percentage < 1 ? 'text-emerald-400' : 'text-red-400'} iconBg={mockPARData.PAR90.percentage < 1 ? 'bg-emerald-500/10' : 'bg-red-500/10'} variant={mockPARData.PAR90.percentage < 1 ? 'success' : 'danger'} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Capital Position</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[
                { label: 'Total Capital', value: cap.totalCapital, color: 'bg-emerald-500', pct: 100 },
                { label: 'Loaned Out', value: cap.activeLoansValue, color: 'bg-blue-500', pct: cap.utilizationPct },
                { label: 'Available', value: cap.effectiveAvailable, color: 'bg-slate-600', pct: (cap.effectiveAvailable / cap.totalCapital) * 100 },
              ].map(item => (
                <div key={item.label}>
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">{item.label}</span>
                    <span className="text-xs font-medium text-white">{formatCurrency(item.value)}</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${item.color}`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
            <div className="mt-4 text-center">
              <span className={`text-3xl font-bold ${cap.utilizationPct > 90 ? 'text-red-400' : 'text-emerald-400'}`}>{cap.utilizationPct}%</span>
              <p className="text-xs text-slate-400">utilized</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Portfolio Quality</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {(['PAR1', 'PAR7', 'PAR30', 'PAR60', 'PAR90'] as const).map(key => {
              const data = mockPARData[key] as any
              return (
                <div key={key} className="flex items-center justify-between py-1 border-b border-slate-700 last:border-0">
                  <span className="text-xs text-slate-400">{key.replace('PAR', 'PAR ')} days</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-slate-500">{data.count} loans</span>
                    <span className={`text-xs font-bold ${data.percentage > 5 ? 'text-red-400' : data.percentage > 2 ? 'text-amber-400' : 'text-emerald-400'}`}>{data.percentage.toFixed(2)}%</span>
                  </div>
                </div>
              )
            })}
            <div className="mt-2 p-2 bg-emerald-500/10 rounded text-center">
              <p className="text-xs text-emerald-400 font-medium">Portfolio Health: GOOD</p>
              <p className="text-[10px] text-slate-400">PAR30 below 5% benchmark</p>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200 flex items-center gap-2"><Award className="w-4 h-4 text-amber-400" /> Top Collectors</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {mockStaffPerformance.slice(0, 5).map((officer, idx) => (
              <div key={officer.userId} className="flex items-center gap-2 py-1">
                <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold shrink-0 ${idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-slate-400 text-slate-900' : 'bg-slate-700 text-slate-400'}`}>{idx + 1}</span>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-slate-200 truncate">{officer.name}</p>
                  <div className="w-full h-1 bg-slate-700 rounded mt-0.5 overflow-hidden">
                    <div className="h-full bg-emerald-500 rounded" style={{ width: `${officer.collectionRate}%` }} />
                  </div>
                </div>
                <span className={`text-xs font-bold shrink-0 ${officer.collectionRate >= 85 ? 'text-emerald-400' : officer.collectionRate >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{officer.collectionRate.toFixed(0)}%</span>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">PAR Trend — 12 Months</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={mockPARData.trend}>
              <defs>
                <linearGradient id="par30Grad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#ef4444" stopOpacity={0.2} /><stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} />
              <Area type="monotone" dataKey="PAR30" stroke="#ef4444" fill="url(#par30Grad)" strokeWidth={2} name="PAR30" />
              <Area type="monotone" dataKey="PAR90" stroke="#991b1b" fill="none" strokeWidth={1.5} strokeDasharray="4 2" name="PAR90" />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
