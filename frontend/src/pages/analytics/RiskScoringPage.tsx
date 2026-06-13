import { mockClients, mockLoans } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { RiskBadge } from '@/components/ui/RiskBadge'
import { ShieldAlert, Search, TrendingUp, Users, AlertTriangle } from 'lucide-react'
import { useState } from 'react'
import { formatCurrency } from '@/lib/utils'

function calcRisk(client: any) {
  let score = 100
  const clientLoans = mockLoans.filter((l: any) => l.clientId === client.id)
  const overdueLoans = clientLoans.filter((l: any) => l.status === 'OVERDUE' || l.status === 'DEFAULT')
  if (overdueLoans.length > 0) score -= overdueLoans.length * 20
  if (client.reliabilityRating < 3) score -= 15
  if (client.internalScore < 50) score -= 20
  if (client.status === 'BLACKLISTED') score = 0
  const activeLoans = clientLoans.filter((l: any) => l.status === 'ACTIVE').length
  if (activeLoans > 1) score -= 10
  score = Math.max(0, Math.min(100, score))
  const level: 'LOW' | 'MEDIUM' | 'HIGH' = score >= 70 ? 'LOW' : score >= 40 ? 'MEDIUM' : 'HIGH'
  return { score, level }
}

export default function RiskScoringPage() {
  const [search, setSearch] = useState('')
  const filtered = mockClients.filter((c: any) =>
    `${c.firstName} ${c.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
    c.nrcNumber?.toLowerCase().includes(search.toLowerCase())
  )

  const riskCounts = { LOW: 0, MEDIUM: 0, HIGH: 0 }
  mockClients.forEach((c: any) => { riskCounts[calcRisk(c).level]++ })

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Borrower Risk Scoring</h1>
        <p className="text-xs text-slate-500">Rule-based internal credit risk assessment for all clients</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Low Risk', count: riskCounts.LOW, icon: TrendingUp, bg: 'bg-emerald-500/10', color: 'text-emerald-400', border: 'border-emerald-500/30' },
          { label: 'Medium Risk', count: riskCounts.MEDIUM, icon: ShieldAlert, bg: 'bg-amber-500/10', color: 'text-amber-400', border: 'border-amber-500/30' },
          { label: 'High Risk', count: riskCounts.HIGH, icon: AlertTriangle, bg: 'bg-red-500/10', color: 'text-red-400', border: 'border-red-500/30' },
        ].map(item => (
          <Card key={item.label} className={`bg-slate-800 border-slate-700 ${item.border} border`}>
            <CardContent className="p-4 flex items-center gap-3">
              <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${item.bg}`}>
                <item.icon className={`w-5 h-5 ${item.color}`} />
              </div>
              <div>
                <p className="text-2xl font-bold text-white">{item.count}</p>
                <p className="text-xs text-slate-400">{item.label}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="relative max-w-sm">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
        <Input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search clients..." className="pl-9" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {filtered.map((client: any) => {
          const { score, level } = calcRisk(client)
          const clientLoans = mockLoans.filter((l: any) => l.clientId === client.id)
          const activeLoans = clientLoans.filter((l: any) => l.status === 'ACTIVE')
          const overdueLoans = clientLoans.filter((l: any) => l.status === 'OVERDUE' || l.status === 'DEFAULT')
          return (
            <Card key={client.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-semibold text-slate-100">{client.firstName} {client.lastName}</p>
                    <p className="text-xs text-slate-500">{client.occupation} · {client.nrcNumber}</p>
                  </div>
                  <RiskBadge level={level} />
                </div>
                <div className="mt-3">
                  <div className="flex justify-between mb-1">
                    <span className="text-xs text-slate-400">Risk Score</span>
                    <span className="text-xs font-semibold text-white">{score}/100</span>
                  </div>
                  <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${level === 'LOW' ? 'bg-emerald-500' : level === 'MEDIUM' ? 'bg-amber-500' : 'bg-red-500'}`} style={{ width: `${score}%` }} />
                  </div>
                </div>
                <div className="grid grid-cols-3 gap-2 mt-3">
                  <div className="text-center bg-slate-700/30 rounded p-2">
                    <p className="text-xs font-semibold text-white">{clientLoans.length}</p>
                    <p className="text-[10px] text-slate-500">Total Loans</p>
                  </div>
                  <div className="text-center bg-slate-700/30 rounded p-2">
                    <p className="text-xs font-semibold text-emerald-400">{activeLoans.length}</p>
                    <p className="text-[10px] text-slate-500">Active</p>
                  </div>
                  <div className="text-center bg-slate-700/30 rounded p-2">
                    <p className={`text-xs font-semibold ${overdueLoans.length > 0 ? 'text-red-400' : 'text-slate-400'}`}>{overdueLoans.length}</p>
                    <p className="text-[10px] text-slate-500">Overdue</p>
                  </div>
                </div>
                <div className="mt-3 space-y-1.5">
                  {[
                    { label: 'Payment History', ok: overdueLoans.length === 0, detail: overdueLoans.length > 0 ? `${overdueLoans.length} overdue` : 'Clean record' },
                    { label: 'Internal Score', ok: client.internalScore >= 60, detail: `${client.internalScore}/100` },
                    { label: 'Reliability Rating', ok: client.reliabilityRating >= 3, detail: `${client.reliabilityRating}/5 stars` },
                    { label: 'Client Status', ok: client.status === 'ACTIVE', detail: client.status },
                  ].map(f => (
                    <div key={f.label} className="flex items-center justify-between">
                      <span className="text-[10px] text-slate-500">{f.label}</span>
                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] text-slate-400">{f.detail}</span>
                        <span className={`text-[10px] font-bold ${f.ok ? 'text-emerald-400' : 'text-red-400'}`}>{f.ok ? '✓' : '✗'}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
