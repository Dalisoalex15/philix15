import { Trophy, Medal } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { mockTopOfficers } from '@/data/mockData'
import { formatCurrency } from '@/lib/utils'

export default function TopOfficersLeaderboard() {
  return (
    <Card className="bg-slate-800 border-slate-700">
      <CardHeader className="pb-2">
        <CardTitle className="text-sm text-slate-200 flex items-center gap-2">
          <Trophy className="w-4 h-4 text-amber-400" />
          Top Loan Officers
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {mockTopOfficers.map((officer, idx) => (
          <div key={officer.id} className="flex items-center gap-3 p-2 rounded-md bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
            <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold shrink-0 ${idx === 0 ? 'bg-amber-500 text-white' : idx === 1 ? 'bg-slate-500 text-white' : 'bg-amber-800 text-white'}`}>
              {idx + 1}
            </div>
            <div className="flex-1 min-w-0">
              <div className="text-xs font-medium text-slate-200 truncate">{officer.name}</div>
              <div className="text-xs text-slate-500">{officer.loansIssued} loans · {formatCurrency(officer.totalDisbursed)}</div>
            </div>
            <Badge variant="success" className="text-xs shrink-0">{officer.collectionRate}%</Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}
