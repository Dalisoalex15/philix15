import { mockCapitalUtilization, mockInvestors } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts'
import { Wallet, TrendingUp, ArrowDownRight, Lock } from 'lucide-react'
import { formatCurrency, formatPercent } from '@/lib/utils'
import { StatCard } from '@/components/ui/StatCard'

export default function CapitalUtilizationPage() {
  const d = mockCapitalUtilization
  const pct = d.utilizationPct
  const gaugeColor = pct > 90 ? '#ef4444' : pct > 75 ? '#f59e0b' : '#10b981'

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Capital Utilization</h1>
        <p className="text-xs text-slate-500">Real-time view of how invested capital is deployed across the loan portfolio</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        <StatCard title="Total Capital" value={formatCurrency(d.totalCapital)} subtitle="From investors" icon={Wallet} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" variant="success" />
        <StatCard title="Loaned Out" value={formatCurrency(d.activeLoansValue)} subtitle="Active portfolio" icon={TrendingUp} iconColor="text-blue-400" iconBg="bg-blue-500/10" />
        <StatCard title="Available Capital" value={formatCurrency(d.availableCapital)} subtitle="Ready to deploy" icon={ArrowDownRight} iconColor="text-purple-400" iconBg="bg-purple-500/10" />
        <StatCard title="Reserved" value={formatCurrency(d.reservedForApproved)} subtitle="Approved, pending disbursement" icon={Lock} iconColor="text-amber-400" iconBg="bg-amber-500/10" variant="warning" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gauge */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Utilization Rate</CardTitle></CardHeader>
          <CardContent className="flex flex-col items-center py-4">
            <div className="relative w-40 h-40">
              <svg viewBox="0 0 100 100" className="transform -rotate-90 w-full h-full">
                <circle cx="50" cy="50" r="40" fill="none" stroke="#334155" strokeWidth="10" />
                <circle cx="50" cy="50" r="40" fill="none" stroke={gaugeColor} strokeWidth="10"
                  strokeDasharray={`${pct * 2.51} 251`} strokeLinecap="round" />
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-white">{pct.toFixed(1)}%</span>
                <span className="text-xs text-slate-400">utilized</span>
              </div>
            </div>
            <div className="w-full space-y-2 mt-4">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Loaned Out</span>
                <span className="text-white font-medium">{formatCurrency(d.activeLoansValue)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Available</span>
                <span className="text-emerald-400 font-medium">{formatCurrency(d.effectiveAvailable)}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Reserved</span>
                <span className="text-amber-400 font-medium">{formatCurrency(d.reservedForApproved)}</span>
              </div>
            </div>
            <div className="mt-3 text-center">
              <p className={`text-xs font-medium ${pct > 90 ? 'text-red-400' : pct > 75 ? 'text-amber-400' : 'text-emerald-400'}`}>
                {pct > 90 ? '⚠ Capital nearly depleted' : pct > 75 ? '● Healthy utilization' : '● Capital available for new loans'}
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Trend chart */}
        <Card className="bg-slate-800 border-slate-700 lg:col-span-2">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Utilization Trend — 6 Months</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={d.trend}>
                <defs>
                  <linearGradient id="utilGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" tick={{ fontSize: 10, fill: '#94a3b8' }} />
                <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} unit="%" domain={[50, 100]} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => [`${v}%`, 'Utilization']} />
                <ReferenceLine y={90} stroke="#ef4444" strokeDasharray="4 2" label={{ value: '90% limit', fontSize: 9, fill: '#ef4444' }} />
                <Area type="monotone" dataKey="utilization" stroke="#10b981" fill="url(#utilGrad)" strokeWidth={2} dot={{ r: 3, fill: '#10b981' }} />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Investor Capital Breakdown</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {(mockInvestors as any[]).map((inv: any) => {
              const pctUsed = Math.round(60 + Math.random() * 20)
              return (
                <div key={inv.id} className="flex items-center gap-4 p-3 bg-slate-700/30 rounded-lg">
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-semibold text-slate-200">{inv.name}</p>
                    <p className="text-[10px] text-slate-500">{formatCurrency(inv.amount)} invested · {inv.returnRate}% p.a.</p>
                  </div>
                  <div className="w-32">
                    <div className="flex justify-between mb-1">
                      <span className="text-[10px] text-slate-500">Deployed</span>
                      <span className="text-[10px] text-slate-300">{pctUsed}%</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${pctUsed}%` }} />
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
