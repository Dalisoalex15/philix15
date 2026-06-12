import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockLoanStatusDistribution } from '@/data/mockData'

export default function LoanStatusChart() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-200">Loan Portfolio Distribution</CardTitle>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={220}>
          <PieChart>
            <Pie
              data={mockLoanStatusDistribution}
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={80}
              paddingAngle={3}
              dataKey="value"
            >
              {mockLoanStatusDistribution.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{ backgroundColor: '#1e293b', border: '1px solid #334155', borderRadius: '8px', color: '#f1f5f9' }}
              formatter={(value: number) => [`${value} loans`, '']}
            />
            <Legend
              formatter={(value) => <span className="text-xs text-slate-400">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
        <div className="grid grid-cols-5 gap-1 mt-2">
          {mockLoanStatusDistribution.map(({ name, value, color }) => (
            <div key={name} className="text-center">
              <div className="text-sm font-bold text-white">{value}</div>
              <div className="text-xs text-slate-400">{name}</div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
