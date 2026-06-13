import { useState } from 'react'
import { mockInvestors, mockInvestorPayouts } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { PiggyBank, TrendingUp, DollarSign, Calendar, FileText } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'
import { useNavigate } from 'react-router-dom'

export default function InvestorManagementPage() {
  const navigate = useNavigate()
  const totalCapital = (mockInvestors as any[]).reduce((s: number, i: any) => s + i.amount, 0)
  const pendingPayouts = mockInvestorPayouts.filter(p => p.status === 'PENDING')
  const pendingTotal = pendingPayouts.reduce((s, p) => s + p.amount, 0)

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold text-slate-100">Investor Management</h1>
          <p className="text-xs text-slate-500">Track capital investments, monthly returns, and payout history</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => navigate('/finance/investor-report')}>
            <FileText className="w-4 h-4 mr-1" /> Shareholder Report
          </Button>
          <Button size="sm"><PiggyBank className="w-4 h-4 mr-1" /> Add Investor</Button>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Total Capital', value: formatCurrency(totalCapital), icon: DollarSign, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Active Investors', value: (mockInvestors as any[]).length, icon: PiggyBank, color: 'text-blue-400', bg: 'bg-blue-500/10' },
          { label: 'Pending Payouts', value: formatCurrency(pendingTotal), icon: Calendar, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Avg Return Rate', value: `${((mockInvestors as any[]).reduce((s: number, i: any) => s + i.returnRate, 0) / (mockInvestors as any[]).length).toFixed(1)}%`, icon: TrendingUp, color: 'text-purple-400', bg: 'bg-purple-500/10' },
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

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {(mockInvestors as any[]).map((inv: any) => {
          const payouts = mockInvestorPayouts.filter(p => p.investorId === inv.id)
          const paidPayouts = payouts.filter(p => p.status === 'PAID')
          return (
            <Card key={inv.id} className="bg-slate-800 border-slate-700">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm text-slate-200">{inv.name}</CardTitle>
                  <Badge variant="success" className="text-[10px]">{inv.status ?? 'ACTIVE'}</Badge>
                </div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="grid grid-cols-2 gap-2">
                  <div className="bg-slate-700/40 rounded p-2">
                    <p className="text-[10px] text-slate-500">Capital</p>
                    <p className="text-xs font-semibold text-white">{formatCurrency(inv.amount)}</p>
                  </div>
                  <div className="bg-slate-700/40 rounded p-2">
                    <p className="text-[10px] text-slate-500">Return Rate</p>
                    <p className="text-xs font-semibold text-emerald-400">{inv.returnRate}% p.a.</p>
                  </div>
                  <div className="bg-slate-700/40 rounded p-2">
                    <p className="text-[10px] text-slate-500">Monthly Payout</p>
                    <p className="text-xs font-semibold text-white">{formatCurrency(inv.monthlyEarnings)}</p>
                  </div>
                  <div className="bg-slate-700/40 rounded p-2">
                    <p className="text-[10px] text-slate-500">Paid Months</p>
                    <p className="text-xs font-semibold text-white">{paidPayouts.length}</p>
                  </div>
                </div>
                <div>
                  <p className="text-[10px] text-slate-500 mb-2">Recent Payouts</p>
                  {payouts.slice(0, 3).map(p => (
                    <div key={p.id} className="flex items-center justify-between py-1">
                      <span className="text-[10px] text-slate-400">{p.month}</span>
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-medium text-white">{formatCurrency(p.amount)}</span>
                        <Badge variant={p.status === 'PAID' ? 'success' : 'warning'} className="text-[10px]">{p.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 text-[10px] text-slate-500 border-t border-slate-700 pt-2">
                  <span>{inv.phone}</span>
                  <span>·</span>
                  <span>{inv.email}</span>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm text-slate-200">Payout History</CardTitle></CardHeader>
        <CardContent className="p-0">
          <div className="divide-y divide-slate-700">
            {mockInvestorPayouts.map(p => (
              <div key={p.id} className="flex items-center justify-between p-3">
                <div>
                  <p className="text-xs font-medium text-slate-200">{p.investorName}</p>
                  <p className="text-[10px] text-slate-500">{p.month} · {p.paidAt ? `Paid ${formatDate(p.paidAt)}` : 'Pending'}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-sm font-semibold text-white">{formatCurrency(p.amount)}</span>
                  <Badge variant={p.status === 'PAID' ? 'success' : 'warning'} className="text-[10px]">{p.status}</Badge>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
