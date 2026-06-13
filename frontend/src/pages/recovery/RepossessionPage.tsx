import { mockRepossessions } from '@/data/mockData'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Package, Gavel, CheckCircle, AlertTriangle, TrendingDown } from 'lucide-react'
import { formatCurrency, formatDate } from '@/lib/utils'

const statusConfig: Record<string, { label: string; color: string; badgeVariant: any }> = {
  INITIATED: { label: 'Initiated', color: 'text-amber-400', badgeVariant: 'warning' },
  HELD: { label: 'Held in Vault', color: 'text-blue-400', badgeVariant: 'info' },
  AT_AUCTION: { label: 'At Auction', color: 'text-purple-400', badgeVariant: 'purple' },
  SOLD: { label: 'Sold', color: 'text-emerald-400', badgeVariant: 'success' },
  RETURNED: { label: 'Returned', color: 'text-slate-400', badgeVariant: 'secondary' },
}

export default function RepossessionPage() {
  const totalRecovered = mockRepossessions.filter(r => r.recoveryAmount).reduce((s, r) => s + (r.recoveryAmount ?? 0), 0)
  const totalOutstanding = mockRepossessions.reduce((s, r) => s + r.outstandingBalance, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-lg font-semibold text-slate-100">Recovery & Repossession</h1>
        <p className="text-xs text-slate-500">Track repossessed collateral, auction status, and recovery performance</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {[
          { label: 'Active Cases', value: mockRepossessions.filter(r => r.status !== 'SOLD' && r.status !== 'RETURNED').length, icon: Package, color: 'text-amber-400', bg: 'bg-amber-500/10' },
          { label: 'Total Outstanding', value: formatCurrency(totalOutstanding), icon: AlertTriangle, color: 'text-red-400', bg: 'bg-red-500/10' },
          { label: 'Total Recovered', value: formatCurrency(totalRecovered), icon: CheckCircle, color: 'text-emerald-400', bg: 'bg-emerald-500/10' },
          { label: 'Recovery Rate', value: totalOutstanding > 0 ? `${((totalRecovered / totalOutstanding) * 100).toFixed(0)}%` : 'N/A', icon: TrendingDown, color: 'text-blue-400', bg: 'bg-blue-500/10' },
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

      <div className="space-y-3">
        {mockRepossessions.map(rep => {
          const cfg = statusConfig[rep.status]
          return (
            <Card key={rep.id} className="bg-slate-800 border-slate-700">
              <CardContent className="p-4">
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-start gap-3 flex-1 min-w-0">
                    <div className="w-10 h-10 bg-slate-700 rounded-lg flex items-center justify-center shrink-0">
                      <Package className="w-5 h-5 text-slate-400" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-slate-100">{rep.brand} {rep.model}</p>
                        <Badge variant={cfg.badgeVariant} className="text-[10px]">{cfg.label}</Badge>
                      </div>
                      <p className="text-xs text-slate-500 mt-0.5">Vault: {rep.vaultId} · {rep.assetType}</p>
                      <p className="text-xs text-slate-500">Client: {rep.clientName} · {rep.daysOverdue} days overdue</p>
                      <p className="text-xs text-slate-400 mt-1">{rep.notes}</p>
                    </div>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-red-400">{formatCurrency(rep.outstandingBalance)}</p>
                    <p className="text-[10px] text-slate-500">outstanding</p>
                    {rep.recoveryAmount && (
                      <>
                        <p className="text-sm font-semibold text-emerald-400 mt-1">{formatCurrency(rep.recoveryAmount)}</p>
                        <p className="text-[10px] text-slate-500">recovered</p>
                      </>
                    )}
                  </div>
                </div>
                <div className="mt-3 pt-3 border-t border-slate-700 flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-4 text-[10px] text-slate-500">
                    <span>Initiated: {formatDate(rep.initiatedAt)} by {rep.initiatedBy}</span>
                    {rep.auctionDate && <span className="flex items-center gap-1"><Gavel className="w-3 h-3" />Auction: {formatDate(rep.auctionDate)}</span>}
                    {rep.auctionHouse && <span>{rep.auctionHouse}</span>}
                  </div>
                  {rep.status !== 'SOLD' && rep.status !== 'RETURNED' && (
                    <Button size="xs" variant="outline">Update Status</Button>
                  )}
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
