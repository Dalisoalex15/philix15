import { useState } from 'react'
import { mockCashFlow } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingUp, TrendingDown, DollarSign, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'
import { StatCard } from '@/components/ui/StatCard'

type Period = 'daily' | 'weekly' | 'monthly'

export default function CashFlowPage() {
  const [period, setPeriod] = useState<Period>('monthly')
  const data = mockCashFlow[period]
  const xKey = period === 'daily' ? 'date' : period === 'weekly' ? 'week' : 'month'

  const totals = data.reduce((acc, d) => ({
    inflow: acc.inflow + d.inflow, outflow: acc.outflow + d.outflow, net: acc.net + d.net
  }), { inflow: 0, outflow: 0, net: 0 })

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Cash Flow Dashboard</h1>
          <p className="text-xs text-slate-500">Money in vs money out — track Philix Finance liquidity in real time</p>
        </div>
        <div className="flex gap-1 bg-slate-800 border border-slate-700 rounded-lg p-1">
          {(['daily', 'weekly', 'monthly'] as Period[]).map(p => (
            <button key={p} onClick={() => setPeriod(p)} className={`px-3 py-1 rounded text-xs font-medium capitalize transition-colors ${period === p ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-slate-200'}`}>{p}</button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <StatCard title="Total Inflow" value={formatCurrency(totals.inflow)} subtitle="Repayments + interest + fees" icon={ArrowUpRight} iconColor="text-emerald-400" iconBg="bg-emerald-500/10" variant="success" />
        <StatCard title="Total Outflow" value={formatCurrency(totals.outflow)} subtitle="Disbursements + expenses" icon={ArrowDownRight} iconColor="text-red-400" iconBg="bg-red-500/10" variant="danger" />
        <StatCard title="Net Position" value={formatCurrency(totals.net)} subtitle={totals.net >= 0 ? 'Positive cash flow' : 'Negative — attention needed'} icon={DollarSign} iconColor={totals.net >= 0 ? 'text-emerald-400' : 'text-red-400'} iconBg={totals.net >= 0 ? 'bg-emerald-500/10' : 'bg-red-500/10'} variant={totals.net >= 0 ? 'success' : 'danger'} />
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Inflow vs Outflow — {period.charAt(0).toUpperCase() + period.slice(1)}</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={data} barSize={period === 'daily' ? 10 : 18}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey={xKey} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `K${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => [formatCurrency(v)]} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Bar dataKey="inflow" fill="#10b981" name="Inflow" radius={[2,2,0,0]} />
              <Bar dataKey="outflow" fill="#ef4444" name="Outflow" radius={[2,2,0,0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Net Position Trend</CardTitle></CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={data}>
              <defs>
                <linearGradient id="netGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey={xKey} tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} tickFormatter={(v) => `K${(v/1000).toFixed(0)}k`} />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => [formatCurrency(v), 'Net']} />
              <Area type="monotone" dataKey="net" stroke="#10b981" fill="url(#netGrad)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  )
}
