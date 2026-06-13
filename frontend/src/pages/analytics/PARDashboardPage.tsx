import { mockPARData } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { TrendingDown, TrendingUp, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

const PAR_CONFIG = [
  { key: 'PAR1', label: 'PAR 1', color: '#f59e0b', desc: 'Loans 1+ days overdue' },
  { key: 'PAR7', label: 'PAR 7', color: '#f97316', desc: 'Loans 7+ days overdue' },
  { key: 'PAR30', label: 'PAR 30', color: '#ef4444', desc: 'Loans 30+ days overdue' },
  { key: 'PAR60', label: 'PAR 60', color: '#dc2626', desc: 'Loans 60+ days overdue' },
  { key: 'PAR90', label: 'PAR 90', color: '#991b1b', desc: 'Loans 90+ days overdue (write-off risk)' },
]

export default function PARDashboardPage() {
  const d = mockPARData
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Portfolio at Risk (PAR)</h1>
        <p className="text-xs text-slate-500">Critical microfinance KPIs — percentage of portfolio with overdue repayments</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
        {PAR_CONFIG.map(({ key, label, color, desc }) => {
          const data = d[key as keyof typeof d] as any
          const improved = data.percentage < data.previousMonth
          return (
            <Card key={key} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-semibold text-slate-400">{label}</span>
                  {improved ? <TrendingDown className="w-3.5 h-3.5 text-emerald-400" /> : <TrendingUp className="w-3.5 h-3.5 text-red-400" />}
                </div>
                <p className="text-2xl font-bold" style={{ color }}>{data.percentage.toFixed(2)}%</p>
                <p className="text-[10px] text-slate-500 mt-0.5">{data.count} loans</p>
                <p className="text-[10px] text-slate-500">{formatCurrency(data.amount)}</p>
                <div className="mt-2 flex items-center gap-1">
                  <span className={`text-[10px] font-medium ${improved ? 'text-emerald-400' : 'text-red-400'}`}>
                    {improved ? '▼' : '▲'} vs {data.previousMonth.toFixed(2)}% prev
                  </span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2">
          <CardTitle className="text-sm text-slate-200">PAR Trend — 12 Months</CardTitle>
          <p className="text-xs text-slate-500">Monthly progression of portfolio at risk indicators</p>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={280}>
            <LineChart data={d.trend}>
              <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
              <XAxis dataKey="month" tick={{ fontSize: 9, fill: '#94a3b8' }} />
              <YAxis tick={{ fontSize: 9, fill: '#94a3b8' }} unit="%" />
              <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => [`${v}%`]} />
              <Legend wrapperStyle={{ fontSize: '10px' }} />
              <Line type="monotone" dataKey="PAR30" stroke="#ef4444" strokeWidth={2} dot={false} name="PAR 30" />
              <Line type="monotone" dataKey="PAR60" stroke="#dc2626" strokeWidth={2} dot={false} name="PAR 60" />
              <Line type="monotone" dataKey="PAR90" stroke="#991b1b" strokeWidth={2} dot={false} name="PAR 90" strokeDasharray="4 2" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">PAR Interpretation Guide</CardTitle></CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-emerald-400">PAR30 below 5%</p>
              <p className="text-[10px] text-slate-400 mt-1">Healthy portfolio. Industry benchmark for microfinance. Philix Finance current: {d.PAR30.percentage.toFixed(2)}% ✓</p>
            </div>
            <div className="bg-amber-500/10 border border-amber-500/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-amber-400">PAR30 5%–10%</p>
              <p className="text-[10px] text-slate-400 mt-1">Early warning zone. Requires management attention and collections intensification.</p>
            </div>
            <div className="bg-red-500/10 border border-red-500/20 rounded-lg p-3">
              <p className="text-xs font-semibold text-red-400">PAR30 above 10%</p>
              <p className="text-[10px] text-slate-400 mt-1">Critical. Immediate action required. Review underwriting criteria and collections strategy.</p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
