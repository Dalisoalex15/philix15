import { useParams, useNavigate } from 'react-router-dom'
import { ArrowLeft, Shield, Tag, MapPin, User, Link, Unlock, Gavel } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { mockCollateral } from '@/data/mockData'
import { formatCurrency, formatDate } from '@/lib/utils'

const assetIcons: Record<string, string> = { SMARTPHONE: '📱', LAPTOP: '💻', TABLET: '📱', GAMING_CONSOLE: '🎮', ELECTRONICS: '⚡', EQUIPMENT: '🔧', OTHER: '📦' }

export default function CollateralDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const item = mockCollateral.find(c => c.id === id) ?? mockCollateral[0]

  const getStatusVariant = (status: string) => ({ HELD: 'warning', RELEASED: 'success', AUCTIONED: 'danger' } as Record<string, any>)[status] ?? 'secondary'

  return (
    <div className="space-y-4">
      <Button variant="ghost" size="sm" onClick={() => navigate(-1)}>
        <ArrowLeft className="w-4 h-4 mr-1.5" />Back to Vault
      </Button>

      {/* Header */}
      <Card className="bg-slate-800 border-slate-700">
        <CardContent className="p-5">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-slate-700 rounded-xl flex items-center justify-center text-4xl">{assetIcons[item.assetType] ?? '📦'}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-mono text-emerald-400 font-bold text-lg">{item.vaultId}</span>
                <Badge variant={getStatusVariant(item.status)}>{item.status}</Badge>
              </div>
              <h2 className="text-xl font-bold text-white">{item.brand} {item.model}</h2>
              <p className="text-sm text-slate-400">{item.assetType.replace('_', ' ')} · {item.color} · {item.condition} Condition</p>
            </div>
            <div className="flex gap-2">
              {item.status === 'HELD' && (
                <>
                  <Button size="sm" variant="outline"><Unlock className="w-4 h-4 mr-1.5" />Release</Button>
                  <Button size="sm" variant="destructive"><Gavel className="w-4 h-4 mr-1.5" />Auction</Button>
                </>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Asset Details */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><Tag className="w-4 h-4 text-blue-400" />Asset Details</CardTitle></CardHeader>
          <CardContent className="space-y-2">
            {[
              { label: 'Asset Type', value: item.assetType.replace('_', ' ') },
              { label: 'Brand', value: item.brand },
              { label: 'Model', value: item.model },
              { label: 'Color', value: item.color },
              { label: 'Condition', value: item.condition },
              { label: 'Serial Number', value: item.serialNumber },
              { label: 'IMEI', value: (item as any).imei },
            ].map(({ label, value }) => value && (
              <div key={label} className="flex justify-between">
                <span className="text-xs text-slate-400">{label}</span>
                <span className="text-xs text-slate-200 font-mono">{value}</span>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Valuation */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm">Valuation</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-400">Market Value</span>
              <span className="text-lg font-bold text-white">{formatCurrency(item.marketValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-slate-700/50 rounded-lg">
              <span className="text-sm text-slate-400">Forced Sale Value</span>
              <span className="text-lg font-bold text-amber-400">{formatCurrency(item.forcedSaleValue)}</span>
            </div>
            <div className="flex justify-between items-center p-3 bg-emerald-500/10 rounded-lg border border-emerald-500/20">
              <span className="text-sm text-slate-400">Loan-to-Value Ratio</span>
              <span className="text-lg font-bold text-emerald-400">{item.loanToValueRatio}%</span>
            </div>
          </CardContent>
        </Card>

        {/* Storage Location */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><MapPin className="w-4 h-4 text-purple-400" />Storage Location</CardTitle></CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Shelf', value: item.shelfNumber, color: 'bg-blue-500/20 border-blue-500/30 text-blue-400' },
                { label: 'Position', value: item.vaultPosition, color: 'bg-purple-500/20 border-purple-500/30 text-purple-400' },
                { label: 'Locker', value: item.lockerNumber, color: 'bg-emerald-500/20 border-emerald-500/30 text-emerald-400' },
              ].map(({ label, value, color }) => (
                <div key={label} className={`text-center p-3 rounded-lg border ${color}`}>
                  <div className="text-xl font-bold">{value}</div>
                  <div className="text-xs text-slate-400 mt-1">{label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Client & Loan */}
        <Card className="bg-slate-800 border-slate-700">
          <CardHeader className="pb-2"><CardTitle className="text-sm flex items-center gap-2"><User className="w-4 h-4 text-amber-400" />Associated Records</CardTitle></CardHeader>
          <CardContent className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
              <span className="text-xs text-slate-400">Client</span>
              <Button size="xs" variant="ghost" className="text-emerald-400" onClick={() => navigate(`/clients/${item.clientId}`)}>
                {item.clientName}
              </Button>
            </div>
            {item.loanId && (
              <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded-lg">
                <span className="text-xs text-slate-400">Linked Loan</span>
                <Button size="xs" variant="ghost" className="text-blue-400" onClick={() => navigate(`/loans/${item.loanId}`)}>
                  View Loan
                </Button>
              </div>
            )}
            <div className="flex justify-between">
              <span className="text-xs text-slate-400">Held Since</span>
              <span className="text-xs text-slate-200">{item.heldAt ? formatDate(item.heldAt) : '—'}</span>
            </div>
            {(item as any).releasedAt && (
              <div className="flex justify-between">
                <span className="text-xs text-slate-400">Released</span>
                <span className="text-xs text-emerald-400">{formatDate((item as any).releasedAt)}</span>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Chain of Custody */}
      <Card className="bg-slate-800 border-slate-700">
        <CardHeader className="pb-2"><CardTitle className="text-sm">Chain of Custody</CardTitle></CardHeader>
        <CardContent>
          <div className="space-y-3">
            {[
              { action: 'Item Registered & Held', date: item.heldAt, by: 'Precious Lungu', status: 'HELD' },
              ...(item.status === 'RELEASED' ? [{ action: 'Collateral Released to Client', date: (item as any).releasedAt, by: 'Alex Mwale', status: 'RELEASED' }] : []),
            ].map((event, idx) => (
              <div key={idx} className="flex items-start gap-3">
                <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${event.status === 'HELD' ? 'bg-amber-400' : 'bg-emerald-400'}`} />
                <div className="flex-1">
                  <p className="text-sm text-slate-200">{event.action}</p>
                  <p className="text-xs text-slate-400">{event.date ? formatDate(event.date) : '—'} · By: {event.by}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
