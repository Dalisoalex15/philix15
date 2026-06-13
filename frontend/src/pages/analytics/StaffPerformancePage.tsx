import { mockStaffPerformance } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'
import { Award, TrendingUp, Users, AlertTriangle } from 'lucide-react'
import { formatCurrency } from '@/lib/utils'

export default function StaffPerformancePage() {
  const top = mockStaffPerformance[0]
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Staff Performance Dashboard</h1>
        <p className="text-xs text-slate-500">Per-officer metrics — loans issued, collection rates, defaults</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Staff Tracked', value: mockStaffPerformance.length, icon: Users, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Top Collector', value: top.name.split(' ')[0], icon: Award, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Best Collection Rate', value: `${top.collectionRate.toFixed(1)}%`, icon: TrendingUp, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Total Defaults', value: mockStaffPerformance.reduce((s, o) => s + o.defaults, 0), icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
        ].map(item => (
          <Card key={item.label} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.bg}`}>
                <item.icon className={`w-4 h-4 ${item.color}`} />
              </div>
              <div>
                <p className="text-[10px] text-slate-500 uppercase tracking-wider">{item.label}</p>
                <p className="text-lg font-bold text-white">{item.value}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Collection Rate by Officer</CardTitle></CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={mockStaffPerformance} layout="vertical" barSize={14}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" horizontal={false} />
                <XAxis type="number" tick={{ fontSize: 9, fill: '#94a3b8' }} unit="%" domain={[0, 100]} />
                <YAxis dataKey="name" type="category" tick={{ fontSize: 9, fill: '#94a3b8' }} width={90} />
                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', fontSize: '11px' }} formatter={(v: any) => [`${v}%`, 'Collection Rate']} />
                <Bar dataKey="collectionRate" fill="#10b981" radius={[0, 3, 3, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Performance Leaderboard</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              {mockStaffPerformance.map((officer, idx) => (
                <div key={officer.userId} className="flex items-center gap-3 p-2.5 bg-slate-700/30 rounded-lg">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-slate-400 text-slate-900' : idx === 2 ? 'bg-amber-700 text-white' : 'bg-slate-700 text-slate-400'}`}>
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-slate-200">{officer.name}</p>
                    <p className="text-[10px] text-slate-500">{officer.activeClients} clients · {officer.loansIssued} loans issued</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-bold ${officer.collectionRate >= 85 ? 'text-emerald-400' : officer.collectionRate >= 70 ? 'text-amber-400' : 'text-red-400'}`}>{officer.collectionRate.toFixed(1)}%</p>
                    <p className="text-[10px] text-slate-500">{officer.defaults} defaults</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-3">
        {mockStaffPerformance.map(officer => (
          <Card key={officer.userId} className="bg-slate-800 border-slate-700">
            <CardContent className="p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-slate-100">{officer.name}</p>
                  <p className="text-xs text-slate-500">{officer.role.replace(/_/g, ' ')} · Rank #{officer.rank}</p>
                </div>
                <Badge variant={officer.collectionRate >= 85 ? 'success' : officer.collectionRate >= 70 ? 'warning' : 'danger'} className="text-xs">
                  {officer.collectionRate.toFixed(1)}% collection rate
                </Badge>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-2">
                {[
                  { label: 'Loans Issued', value: officer.loansIssued },
                  { label: 'Disbursed', value: formatCurrency(officer.totalDisbursed) },
                  { label: 'Active Clients', value: officer.activeClients },
                  { label: 'Collections', value: `${formatCurrency(officer.collectionsActual)} / ${formatCurrency(officer.collectionsTarget)}` },
                  { label: 'Defaults', value: officer.defaults, danger: officer.defaults > 2 },
                ].map(item => (
                  <div key={item.label} className="bg-slate-700/30 rounded p-2 text-center">
                    <p className={`text-xs font-semibold ${(item as any).danger ? 'text-red-400' : 'text-white'}`}>{item.value}</p>
                    <p className="text-[10px] text-slate-500">{item.label}</p>
                  </div>
                ))}
              </div>
              <div className="mt-3">
                <div className="flex justify-between mb-1">
                  <span className="text-[10px] text-slate-500">Collections Progress</span>
                  <span className="text-[10px] text-slate-400">{formatCurrency(officer.collectionsActual)} of {formatCurrency(officer.collectionsTarget)}</span>
                </div>
                <div className="w-full h-1.5 bg-slate-700 rounded-full overflow-hidden">
                  <div className={`h-full rounded-full ${officer.collectionRate >= 85 ? 'bg-emerald-500' : officer.collectionRate >= 70 ? 'bg-amber-500' : 'bg-red-500'}`}
                    style={{ width: `${Math.min(officer.collectionRate, 100)}%` }} />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
