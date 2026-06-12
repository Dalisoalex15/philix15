import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockWeeklyCollections } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

export default function RepaymentChart() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-200">Weekly Collections vs Target</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <BarChart data={mockWeeklyCollections} margin={{ top: 5, right: 5, left: 0, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
            <XAxis dataKey="week" tick={{ fontSize: 10, fill: '#94a3b8' }} />
            <YAxis tick={{ fontSize: 10, fill: '#94a3b8' }} tickFormatter={(v) => `K${(v/1000).toFixed(0)}k`} />
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9', fontSize: '12px' }}
              formatter={(value: number) => [formatCurrency(value), '']}
            />
            <Legend formatter={(v) => <span className="text-xs text-slate-400">{v}</span>} />
            <Bar dataKey="collected" name="Collected" fill="#10b981" radius={[3, 3, 0, 0]} />
            <Bar dataKey="target" name="Target" fill="#334155" radius={[3, 3, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  )
}
